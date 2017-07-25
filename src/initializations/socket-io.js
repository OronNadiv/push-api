const verbose = require('debug')('ha:initializations:socket-io:verbose')
const warn = require('debug')('ha:initializations:socket-io:warn')
const error = require('debug')('ha:initializations:socket-io:error')

const {createClient} = require('redis')
const {parse} = require('redis-url')
const _str = require('underscore.string')
const config = require('./../config')
const socketIO = require('socket.io')
const socketIOJwt = require('socketio-jwt')
const socketIORedis = require('socket.io-redis')

const redisUrl = parse(config.redisUrl)
const host = redisUrl.hostname
const port = redisUrl.port
const password = redisUrl.password
const pub = createClient(port, host, {auth_pass: password})
const sub = createClient(port, host, {return_buffers: true, auth_pass: password})
const adapter = socketIORedis({pubClient: pub, subClient: sub})

module.exports = server => {
  adapter.pubClient.on('error', error)
  adapter.subClient.on('error', error)

  const io = socketIO(server)
  io.adapter(adapter)

  function init (groupId, isTrusted) {
    const suffix = isTrusted ? '-trusted' : ''
    const namespace = io.of(`/${groupId}${suffix}`)
    namespace
      .on('connection', socket => {
        try {
          verbose('connection called.')

          socket
            .on('authenticated', socket => {
              try {
                verbose('authorized called.')
                const token = socket.decoded_token
                verbose('token:', !!token)

                const namespace = socket.nsp.name
                const expectedNamespace = `/${token.group_id}${suffix}`

                if (!namespace) {
                  warn('Empty namespace.  namespace:', namespace, 'Token:', token)
                  socket.disconnect()
                } else if (namespace !== expectedNamespace) {
                  warn(
                    'Namespace is invalid.  Expected: ',
                    expectedNamespace,
                    'Actual:',
                    namespace,
                    'Token:',
                    token
                  )
                  socket.disconnect()
                } else if (!_str(namespace).endsWith(suffix)) {
                  warn(
                    'Namespace is invalid.  Expected: ',
                    expectedNamespace,
                    'Actual:',
                    namespace,
                    'Token:',
                    token
                  )
                  socket.disconnect()
                } else if (isTrusted && !token.is_trusted) {
                  warn('Untrusted user has subscribed to trusted events. Token:', token)
                  socket.disconnect()
                }
              } catch (err) {
                error('in "authenticated":', err)
              }
            })
            .on('join', rooms => {
              try {
                rooms.forEach(room => {
                  verbose('Joining room:', room)
                  socket.join(room)
                })
              } catch (err) {
                error('in "join":', err)
              }
            })
            .on('leave', rooms => {
              try {
                rooms.forEach(room => {
                  verbose('Leaving room:', room)
                  socket.leave(room)
                })
              } catch (err) {
                error('in "leave":', err)
              }
            })
            .on('unauthorized', () => {
              verbose('unauthorized called.')
            })

          socketIOJwt.authorize({
            secret: config.authPublicKey,
            timeout: 30000 // 30 seconds to send the authentication message
          })(socket)
        } catch (err) {
          error('in "connection":', err)
        }
      })
  }

  init('1', true)
  init('1', false)
  // todo: fetch all the groups and initialize for each of them.
}
