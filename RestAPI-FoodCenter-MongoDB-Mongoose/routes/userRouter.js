const express = require('express');
const bodyParse = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');
const User = require('../models/users');
const cors = require('./cors')
const userRouter = express.Router();

userRouter.use(bodyParse.json());

// userRouter.post('/signup', (req, res, next) => {
//        User.findOne({ username: req.body.username })
//               .then((user) => {
//                      if (user != null) {
//                             var err = new Error('User' + req.body.username + 'already exists!');
//                             err.status = 403;
//                             next(err);
//                      } else {
//                             return User.create({
//                                    username: req.body.username,
//                                    password: req.body.password
//                             });
//                      }
//               })
//               .then((user) => {
//                      res.statusCode = 200;
//                      res.setHeader('Content-Type', 'application/json');
//                      res.json(user);
//               }, (err) => next(err))
//               .catch((err) => next(err));
// });

userRouter.post('/signup', cors.corsWithOptions, (req, res, next) => {
       User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
              if (err) {
                     res.statusCode = 500;
                     res.setHeader('Content-Type', 'application/json');
                     res.json({ err: err });
              } else {
                     if (req.body.firstName) user.firstName = req.body.firstName;
                     if (req.body.lastName) user.lastName = req.body.lastName;
                     user.save((err, user) => {
                            if (err) {
                                   res.statusCode = 500;
                                   res.setHeader('Content-Type', 'application/json');
                                   res.json({ err: err });
                                   return;
                            }
                            passport.authenticate('local')(req, res, () => {
                                   res.statusCode = 200;
                                   res.setHeader('Content-Type', 'application/json');
                                   res.json({ success: true, status: 'Registration Successful!' });
                            });
                     })
              }
       });
});

// userRouter.post('/signin', (req, res, next) => {
//        if (!req.session.admin) {
//               var authHeader = req.headers.authorization;
//               if (!authHeader) {
//                      var err = new Error('You are not authenticated');
//                      res.setHeader('WWW-Authenticate', 'Basic');
//                      return next(err);
//               }

//               var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//               var username = auth[0];
//               var password = auth[1];

//               User.findOne({ username: username })
//                      .then((user) => {
//                             if (user === null) {
//                                    var err = new Error('User ' + username + ' does not exist!');
//                                    err.statusCode = 403;
//                                    next(err);
//                             } else if (user.password !== password) {
//                                    var err = new Error('Password is not correct!');
//                                    err.statusCode = 403;
//                                    next(err);
//                             } else if (user.username === username && user.password === password) {
//                                    req.session.admin = 'authenticated';
//                                    res.statusCode = 200;
//                                    res.setHeader('Content-Type', 'text/plain');
//                                    res.end('You are authenticated!')
//                             }
//                      }, (err) => next(err))
//                      .catch((err) => next(err));
//        } else {
//               res.statusCode = 200;
//               res.setHeader('Content-Type', 'text/plain');
//               res.end('You are already authenticated!')
//        }
// });

userRouter.post('/signin', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
       var token = authenticate.getToken({ _id: req.user._id });
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

userRouter.get('/signout', cors.corsWithOptions, (req, res, next) => {
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

userRouter.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
       User.find({})
              .then((users) => {
                     res.status = 200;
                     res.setHeader('Content-Type', 'application/json');
                     res.json(users);
              }, (err) => next(err))
              .catch((err) => next(err));
});

module.exports = userRouter;