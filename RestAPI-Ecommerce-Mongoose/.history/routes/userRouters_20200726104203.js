const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const authenticate = require('../authenticate');



const userRouters = express.Router();
userRouters.use(authenticate.initialize());
userRouters.use(bodyParser.json());

userRouters.post('/signup', authenticate.authenticate('local-signup', { session: false }), (req, res, next) => {
       res.json({
              isSuccess: true,
              data: {
                     account: user.account,
                     fullname: user.fullname
              },
              errors: null
       });
});

// userRouters.post('/signin', async (req, res, next) => {
//        passport.authenticate('signin', async (err, user, info) => {
//               try {
//                      if (err || !user) {
//                             const error = Error('An Error occurred');
//                             return next(error);
//                      }
//                      req.login(user, { session: false }, async (err) => {
//                             if (err) return next(err);
//                             const body = { _id: user._id, account: user.account };
//                             const token = jwt.sign({ user: body }, 'top_secret');
//                             return res.json({ token });
//                      });
//               } catch (error) {
//                      return next(error);
//               }
//        })
// });

// userRouters.post('/signin', (req, res) => {
//        let account = req.body.account
//        let password = req.body.password
//        let data;
//        if (account.length > 0 && password.length > 0) {
//               data = {
//                      account: account,
//                      password: password
//               }
//        } else if (account.length == 0 && password.length > 0) {
//               res.json({
//                      isSuccess: false,
//                      errors: {
//                             message: "Thông tin không hợp lệ",
//                             errorDetails: [
//                                    {
//                                           field: 'account',
//                                           message: 'Account is not empty'
//                                    }
//                             ]
//                      }
//               })
//        } else if (password.length == 0 && account.length > 0) {
//               res.json({
//                      isSuccess: false,
//                      errors: {
//                             message: "Thông tin không hợp lệ",
//                             errorDetails: [
//                                    {
//                                           field: 'password',
//                                           message: 'Password is not empty'
//                                    }
//                             ]
//                      }
//               })
//        } else {
//               res.json({
//                      isSuccess: false,
//                      errors: {
//                             message: "Thông tin không hợp lệ",
//                             errorDetails: [
//                                    {
//                                           field: 'account',
//                                           message: 'Account is not empty'
//                                    },
//                                    {
//                                           field: 'password',
//                                           message: 'Password is not empty'
//                                    }
//                             ]
//                      }
//               })
//        }

//        User.findOne(data)
//               .then(user => {
//                      res.statusCode = 200;
//                      res.setHeader('Content-Type', 'application/json');
//                      if (user != null) {
//                             res.json({
//                                    isSuccess: true,
//                                    data: {
//                                           account: user.account,
//                                           fullname: user.fullname
//                                    },
//                                    errors: null
//                             })
//                      }
//                      else {
//                             res.json({
//                                    isSuccess: false,
//                                    data: null,
//                                    errors: {
//                                           message: "Tài khoản hoặc mật khẩu không chính xác!",
//                                           errorDetails: null
//                                    }
//                             })
//                      }
//               }, err => next(err))
//               .catch(err => next(err))
// })

module.exports = userRouters;