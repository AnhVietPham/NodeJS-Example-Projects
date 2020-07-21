const express = require('express')
const bodyParser = require('body-parser')
const User = require('../models/users')

const userRouters = express.Router();

userRouters.use(bodyParser.json());

userRouters.post('/signin', (req, res) => {
       let account = req.body.account
       let password = req.body.password
       let data;
       if (account.length > 0 && password.length > 0) {
              data = {
                     account: account,
                     password: password
              }
       } else {
              res.json({
                     status: 0,
                     msgError: "Dữ liệu không hợp lệ!"
              })
       }
       User.findOne(data)
              .then(user => {
                     res.statusCode = 200;
                     res.setHeader('Content-Type', 'application/json');
                     res.json(user)
              }, err => next(err))
              .catch(err => next(err))
})

module.exports = userRouters;