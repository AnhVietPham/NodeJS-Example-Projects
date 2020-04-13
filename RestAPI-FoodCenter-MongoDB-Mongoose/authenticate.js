var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');
var User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
       return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var otps = {};
otps.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
otps.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(otps, (jwt_payload, done) => {
       console.log("JWT payload: ", jwt_payload);
       User.findOne({ _id: jwt_payload._id }, (err, user) => {
              if (err) {
                     return done(err, false);
              }
              else if (user) {
                     return done(null, user);
              }
              else {
                     return done(null, false);
              }
       });
}));

exports.verifyUser = passport.authenticate('jwt', {session: false});