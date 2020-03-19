const userService = require('../users/user.service')

exports.basicAuth = (req, res, next) => {
    if(req.path == '/users/signin'){
        return next()
    }

    if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1)
        return res.status(401).json({
            message: 'Missing Authorization'
        })

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = userService.authenticate({username, password});

    if(!user){
        return res.status(401).json({
            message: 'Invalid Authenticatin Credentials'
        });
    }

    next()
}