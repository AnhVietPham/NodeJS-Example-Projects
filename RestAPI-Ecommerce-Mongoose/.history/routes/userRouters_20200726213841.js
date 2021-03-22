const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const userRouters = express.Router();
userRouters.use(bodyParser.json());


userRouters.post('/signup', (req, res, next) => {
       let account = req.body.account;
       let fullname = req.body.fullname;
       let password = req.body.password;

       if (!account || !fullname | !password) {
              res.json({
                     isSuccess: false,
                     errors: {
                            message: 'Vui long nhap day du thong tin',
                            errorDetails: null
                     }
              })
       } else {
              const newUser = new User({
                     account: account,
                     fullname: fullname,
                     password: password
              });
              newUser.save()
                     .then((user) => {
                            res.json({
                                   isSuccess: false,
                                   data: {
                                          account: user.account,
                                          fullname: user.fullname
                                   },
                                   errors: null
                            })
                     }, (err) => next(err))
                     .catch((err) => next(err));
       }
});

userRouters.post('/signin', (req, res, next) => {
       let account = req.body.account;
       let password = req.body.password;
       let data;
       if (account.length > 0 && password.length) {
              data = {
                     account: account,
                     password: password
              };
       } else {
              res.json({
                     isSuccess: false,
                     errors: {
                            message: "Vui long nhap day du thong tin",
                            errorDetails: null
                     }
              });
       }

       User.findOne({ account: account })
              .then((user) => {
                     if (!user) {
                            res.json({
                                   isSuccess: false,
                                   data: null,
                                   errors: {
                                          message: "Tai khoan hoac mat khau khong chinh xac",
                                          errorDetails: null
                                   }
                            });
                     } else {
                            user.comparePassword(password, (err, isMatch) => {
                                   if (isMatch && !err){
                                          let token = jwt.sign(user, config.secretKey);
                                   }
                            });
                     }
              }, (err) => next(err))
              .catch((err) => next(err))
})


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