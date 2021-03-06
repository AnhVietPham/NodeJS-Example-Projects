const userService =  require('../users/user.service')

exports.authenticate = (req, res, next) => {
    userService.authenticate(req.body)
    .then(user => user ? res.json(user) :res.status(400).json({
        message: 'Username or password is incorrect'
    }))
    .catch(err => next(err));
}

exports.getAll = (req, res, next) => {
    userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));

}