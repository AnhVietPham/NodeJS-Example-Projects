const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('./models/users');

passport.use('signup', LocalStrategy({
       accountField: 'account',
       fullNameField: 'fullname',
       passwordField: 'password'
}, async (account, fullname, password, done) => {
       try {
              const user = await UserModel.create({ account, fullname, password });
              return done(null, user);
       } catch (error) {
              done(error)
       }
}))

passport.use('signin', LocalStrategy({
       accountField: 'account',
       passwordField: 'password'
}, async (account, password, done) => {
       try {
              const user = await UserModel.findOne({ account });
              if (!user) {
                     return done(null, false, {
                            isSuccess: false,
                            data: null,
                            errors: {
                                   message: "User not found",
                                   errorDetails: null
                            }
                     })
              }
              const validate = await user.isValidPassword(password);
              if (!validate) {
                     return done(null, false, {
                            isSuccess: false,
                            data: null,
                            errors: {
                                   message: "Wrong password",
                                   errorDetails: null
                            }
                     })
              }
              return done(null, user, {
                     isSuccess: false,
                     data: user,
                     errors: null
              })
       } catch (error) {

       }
}))

const jwt = require('jsonwebtoken')


