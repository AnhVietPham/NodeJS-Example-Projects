const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType;

var Currency = mongoose.Types.Currency;

const leaderShip = new Schema({
       name: {
              type: String,
              require: true,
              default: ""
       },
       image: {
              type: String,
              require: true,
              default: ""
       },
       designation: {
              type: String,
              require: true,
              default: ""
       },
       abbr: {
              type: String,
              require: true,
              default: ""
       },
       description: {
              type: String,
              require: true,
              default: ""
       },
       features: {
              type: Boolean,
              require: true,
              default: false
       }
});

var LeaderShip = mongoose.model('LeaderShips', leaderShip);

module.exports = LeaderShip;