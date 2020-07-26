const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

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

UserSchema.pre('save', (next) => {
       const user = this;
       const hash = bcrypt.hash(user.password, 10);
       user.password = hash;
       next();
});

UserSchema.methods.isValidPassword = async (pass) => {
       const user = this;
       const compare = await bcrypt.compare(pass, user.password);
       return compare;
}

module.exports = mongoose.model('User', UserSchema);