const error = require('debug')('ha:config:error')

const fs = require('fs')
const path = require('path')

const config = {production: process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'PRODUCTION'}

config.authPublicKey = process.env.AUTH_PUBLIC_KEY || (config.production ? null : fs.readFileSync(path.join(__dirname, '../test/keys/public_key.pem')))
if (!config.authPublicKey) {
  error(
    'Login public key could not be found in the environment variable.  Please set \'AUTH_PUBLIC_KEY\'.'
  )
  process.exit(1)
}

config.port = process.env.PORT || (config.production ? null : 3005)
if (!config.port) {
  error(
    'Port could not be found in the environment variable.  Please set \'PORT\'.'
  )
  process.exit(1)
}

config.redisUrl = process.env.REDIS_URL || process.env.REDISCLOUD_URL || (config.production ? null : 'redis://localhost:6379')
if (!config.redisUrl) {
  error(
    'Redis URL could not be found in the environment variable.  Please set \'REDIS_URL\'.'
  )
  process.exit(1)
}

config.skipSSL = process.env.SKIP_SSL && process.env.SKIP_SSL.toUpperCase() === 'TRUE'

config.uiUrl = process.env.UI_URL || (config.production ? null : 'http://localhost:3000')
if (!config.uiUrl) {
  error(
    'UI URL could not be found in the environment variable.  Please set \'UI_URL\'.'
  )
  process.exit(1)
}

module.exports = config
