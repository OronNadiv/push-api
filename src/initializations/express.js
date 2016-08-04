const path = require('path')
const LOG_PREFIX = `"${path.basename(__filename)}":`
const log = require('../logger')
const verbose = log.verbose.bind(log, LOG_PREFIX)
const info = log.info.bind(log, LOG_PREFIX)
const error = log.error.bind(log, LOG_PREFIX)

const cors = require('cors')
const Promise = require('bluebird')
const express = require('express')
const diehard = require('diehard')
const config = require('./../config')
const ping = require('./../middleware/ping')

const app = express()

module.exports = () => {
  return new Promise(resolve => {
    app.use('/ping', ping)
    app.use(cors({
      origin: config.uiUrl,
      credentials: true,
      exposedHeaders: ['X-Total-Count'],
      maxAge: 10 * 60
    }))

    app.use((err, req, res) => {
      if (!(err instanceof Error)) {
        // req is actually res.
        error('unknown request.  See logs for more details.')
        return req.sendStatus(404)
      }
      error('sending Error.  Err: ', err)
      return res.sendStatus(err.status || 500)
    })

    const server = app.listen(config.port, () => {
      info(`Express server listening on port ${server.address().port}`)

      diehard.register(done => {
        verbose('Shutting down http server')
        server.close(() => {
          verbose('Http server was shutdown successfully.')
          done()
        })
      })

      resolve({server: server, express: app})
    })
  })
}
