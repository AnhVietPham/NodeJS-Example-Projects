const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const favouriteSchema = new Schema({
       dishes: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Dish'
       }],
       postedBy:{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
       }
},{
       timestamps: true
});

var Favourites = mongoose.model('Favourites', favouriteSchema);

module.exports = Favourites;