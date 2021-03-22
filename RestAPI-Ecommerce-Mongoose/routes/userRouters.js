const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const bcrypt = require('bcrypt');

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
                                          message: "Khong tim thay tai khoan.",
                                          errorDetails: null
                                   }
                            });
                     } else {
                            let isMatchedPassword = bcrypt.compareSync(password, user.password);
                            if (isMatchedPassword) {
                                   let token = jwt.sign(user.toJSON(), config.secretKey);
                                   res.json({
                                          isSuccess: true,
                                          data: {
                                                 account: user.account,
                                                 fullname: user.fullname,
                                                 token: token
                                          },
                                          errors: null
                                   });
                            } else {
                                   res.json({
                                          isSuccess: false,
                                          data: null,
                                          errors: {
                                                 message: "Mat khau khong chinh xac",
                                                 errorDetails: null
                                          }
                                   });
                            }
                     }
              }, (err) => next(err))
              .catch((err) => next(err))
})

module.exports = userRouters;