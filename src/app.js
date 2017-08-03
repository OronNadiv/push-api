const diehard = require('diehard')
const Promise = require('bluebird')
const expressInitializer = require('./initializations/express')
const socketIOInitializer = require('./initializations/socket-io')

Promise
  .try(expressInitializer)
  .get('server')
  .then(socketIOInitializer)
  .then(() => diehard.listen({timeout: 5000}))
