const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType;

const promotionSchema = new Schema({
       name: {
              type: String,
              required: true,
              default: ""
       },
       imgae: {
              type: String,
              required: true,
              default: ""
       },
       label: {
              type: String,
              required: true,
              default: "",
       },
       price: {
              type: String,
              require: true,
              min: 0
       },
       description: {
              type: String,
              required: true,
              default: ""
       },
       featured: {
              type: String,
              required: true,
              default: ""
       }
});

var Promontions = mongoose.model('Promotions', promotionSchema);

module.exports = Promontions;