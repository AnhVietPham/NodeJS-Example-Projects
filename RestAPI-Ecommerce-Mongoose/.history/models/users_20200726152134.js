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
       var user = this;

       // only hash the password if it has been modified (or is new)
       if (!user.isModified('password')) return next();

       // generate a salt
       bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
              if (err) return next(err);

              // hash the password using our new salt
              bcrypt.hash(user.password, salt, function (err, hash) {
                     if (err) return next(err);

                     // override the cleartext password with the hashed one
                     user.password = hash;
                     next();
              });
       });
});

UserSchema.methods.isValidPassword = async (pass) => {
       const user = this;
       const compare = await bcrypt.compare(pass, user.password);
       return compare;
}

module.exports = mongoose.model('User', UserSchema);