const middleware = {}

middleware['access-control'] = require('../middleware/access-control.js')
middleware['access-control'] = middleware['access-control'].default || middleware['access-control']

middleware['guest'] = require('../middleware/guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

export default middleware
