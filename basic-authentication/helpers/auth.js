const userService = require('../users/user.service')

module.exports = basicAuth

async function basicAuth(req, res, next) {
    if(req.path == '/users/signin'){
        return next()
    }

    if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1)
        return res.status(401).json({
            message: 'Missing Authorization'
        })
    next()
}