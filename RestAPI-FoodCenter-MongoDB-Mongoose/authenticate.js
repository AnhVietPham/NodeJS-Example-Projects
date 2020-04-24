const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookTokenStrategy = require('passport-facebook-token');
var jwt = require('jsonwebtoken');

var config = require('./config');
var User = require('./models/users');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
       return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

exports.verifyAdmin = (req, res, next) => {
       if (req.user._doc.admin) {
              next();
       } else {
              var err = new Error('You are not authorized to perform this operation!');
              err.statusCode = 403;
              next(err);
       }
}

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

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
       clientID: config.facebook.clientId,
       clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
       User.findOne({ facebookId: profile.id }, (err, user) => {
              if (err) {
                     return done(err, false);
              }
              if (!err && user !== null) {
                     return done(null, user);
              } else {
                     user = new User({ username: profile.displayName });
                     user.facebookId = profile.id;
                     user.firstName = profile.name.firstName;
                     user.lastName = profile.name.lastName;
                     user.save((err, user) => {
                            if (err) {
                                   done(err, false);
                            }
                            else {
                                   done(null, user);
                            }
                     });
              }
       });
}));

exports.verifyUser = passport.authenticate('jwt', { session: false });