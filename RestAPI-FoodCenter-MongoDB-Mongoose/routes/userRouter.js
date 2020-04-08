const express = require('express');
const bodyParse = require('body-parser');

const User = require('../models/users');

const userRouter = express.Router();

userRouter.use(bodyParse.json());

userRouter.post('/signup', (req, res, next) => {
       User.findOne({ username: req.body.username })
              .then((user) => {
                     if (user != null) {
                            var err = new Error('User' + req.body.username + 'already exists!');
                            err.status = 403;
                            next(err);
                     } else {
                            return User.create({
                                   username: req.body.username,
                                   password: req.body.password
                            });
                     }
              })
              .then((user) => {
                     res.statusCode = 200;
                     res.setHeader('Content-Type', 'application/json');
                     res.json(user);
              }, (err) => next(err))
              .catch((err) => next(err));
});

userRouter.post('/signin', (req, res, next) => {
       if (!req.session.admin) {
              var authHeader = req.headers.authorization;
              if (!authHeader) {
                     var err = new Error('You are not authenticated');
                     res.setHeader('WWW-Authenticate', 'Basic');
                     return next(err);
              }

              var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
              var username = auth[0];
              var password = auth[1];

              User.findOne({ username: username })
                     .then((user) => {
                            if (user === null) {
                                   var err = new Error('User ' + username + ' does not exist!');
                                   err.statusCode = 403;
                                   next(err);
                            } else if (user.password !== password) {
                                   var err = new Error('Password is not correct!');
                                   err.statusCode = 403;
                                   next(err);
                            } else if (user.username === username && user.password === password) {
                                   req.session.admin = 'authenticated';
                                   res.statusCode = 200;
                                   res.setHeader('Content-Type', 'text/plain');
                                   res.end('You are authenticated!')
                            }
                     }, (err) => next(err))
                     .catch((err) => next(err));
       } else {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain');
              res.end('You are already authenticated!')
       }
});

userRouter.get('/signout', (req, res, next) => {
       if (req.session) {
              req.session.destroy();
              res.clearCookie('session-id');
              res.end('You are signed out!');
       } else {
              var err = new Error('You are not signed in!');
              err.statusCode = 403;
              next(err);
       }
});

module.exports = userRouter;