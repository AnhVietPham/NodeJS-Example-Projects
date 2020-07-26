const mongoose = require('mongoose')
const bcrypt =  require('bcrypt');
const Schema = mongoose.Schema

const UserSchema = new Schema({
       account:{
              type: String,
              default: ""
       },
       fullname:{
              type: String,
              default:""
       },
       password:{
              type:String,
              default:""
       }
})

UserSchema.pre('save', async (next) => {
       const user = this;
       const hash = await bcrypt.hash(this.password, 10);
       this.password = hash;
       next();
});

UserSchema.methods.isValidPassword =  async (pass) => {
       const user = this;
       const compare = await bcrypt.compare(pass, user.password);
       return compare;
}

module.exports = mongoose.model('User', UserSchema);