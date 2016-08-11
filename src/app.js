const error = require('debug')('ha:app:error')

const domain = require('domain')
const diehard = require('diehard')
const Promise = require('bluebird')
const expressInitializer = require('./initializations/express')
const socketIOInitializer = require('./initializations/socket-io')

const d = domain.create()

d.on('error', error)

d.run(() => {
  Promise
    .try(expressInitializer)
    .get('server')
    .then(socketIOInitializer)
    .then(() => diehard.listen({timeout: 5000}))
})
