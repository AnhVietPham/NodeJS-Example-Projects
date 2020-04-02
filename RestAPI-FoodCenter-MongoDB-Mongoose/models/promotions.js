const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType;

var Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
       name: {
              type: String,
              required: true,
              default: ""
       },
       image: {
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
              type: Currency,
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