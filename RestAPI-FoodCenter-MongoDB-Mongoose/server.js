const express = require('express');
const mongoose = require('mongoose');
const auth = require('./helpers/auth');
const app = express();
const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');
const leaderShipRouter = require('./routes/leaderShipRouter');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected  correctly to server ");

}, (err) => { console.log(err); });

app.use(auth.basicAuth);

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderShipRouter);

app.listen(9999, () => {
    console.log('Server is connecting on port 9999!')
})
