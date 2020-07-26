const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
       account: {
              type: String,
              default: "",
              unique: true
       },
       fullname: {
              type: String,
              default: ""
       },
       password: {
              type: String,
              default: "",
              require: true
       }
})

UserSchema.pre('save', function (next) {
       const user = this;

       if (!user.isModified('password')) return next();

       bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
              if (err) return next(err);

              bcrypt.hash(user.password, salt, function (err, hash) {
                     if (err) return next(err);

                     user.password = hash;
                     next();
              });
       });
});

UserSchema.methods.isValidPassword = (pass) => {
       const user = this;
       const compare = bcrypt.compare(pass, user.password);
       return compare;
}

module.exports = mongoose.model('User', UserSchema);