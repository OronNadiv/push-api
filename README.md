#### DEPRECATED.  Using [PubNub][pubnub] for push notifications.  

# Home Automation - Push API
Back-end server that handles [Socket-IO][socket-io] communication between the clients and the other API servers. It uses [Redis][redis]'s Pub-Sub mechanism for scalability and distributes architecture.

[![JavaScript Style Guide][standard-image]][standard-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][dependencies-dev-image]][dependencies-dev-url]

I suggest you first [read][overview-url] about the different components of the home automation application.  
This will help you understand better the general architecture and different functions of the system.

## Installation instructions
Click [here][server-installation-instruction-url] and follow the installation instructions for the server micro-service, before moving to the next step.

## Environment variables (configuration)
__AUTH\_PUBLIC\_KEY__ (required): content of auth server's publickey.  
__NODE\_ENV__ (required): set up the running environment.  Default: `production`.  `production` will enforce encryption using SSL and other security mechanisms.  
__PORT__ (required): server's port.  default: `3005`  
__REDIS\_URL__ / __REDISCLOUD\_URL__ (required): redis url.  Default: if NODE_ENV = `production` => `none`, otherwise: `redis://localhost:6379`  
__UI\_URL__ (required): url to the [UI][ui-url] server. Default: if NODE_ENV = `production` => `none`, otherwise: `http://localhost:3000`

### License
[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0.html)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[dependencies-image]: https://david-dm.org/OronNadiv/push-api/status.svg
[dependencies-url]: https://david-dm.org/OronNadiv/push-api
[dependencies-dev-image]: https://david-dm.org/OronNadiv/push-api/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/OronNadiv/push-api?type=dev
[travis-image]: http://img.shields.io/travis/OronNadiv/push-api.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/push-api
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/push-api.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/push-api
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com

[redis]: http://redis.io
[socket-io]: http://socket.io

[overview-url]: https://oronnadiv.github.io/home-automation
[client-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-raspberry-pi-clients
[server-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-server-micro-services
[private-public-keys-url]: https://oronnadiv.github.io/home-automation/#generating-private-and-public-keys

[alarm-url]: https://github.com/OronNadiv/alarm-system-api
[auth-url]: https://github.com/OronNadiv/authentication-api
[camera-url]: https://github.com/OronNadiv/camera-api
[garage-url]: https://github.com/OronNadiv/garage-door-api
[notifications-url]: https://github.com/OronNadiv/notifications-api
[push-url]: https://github.com/OronNadiv/push-api
[storage-url]: https://github.com/OronNadiv/storage-api
[ui-url]: https://github.com/OronNadiv/home-automation-ui
