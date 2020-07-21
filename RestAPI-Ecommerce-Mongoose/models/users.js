const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
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

module.exports = mongoose.model('User', User);