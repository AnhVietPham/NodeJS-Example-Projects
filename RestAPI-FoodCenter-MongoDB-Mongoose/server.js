const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected  correctly to server ");

}, (err) => { console.log(err); });

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);

app.listen(9999, () => {
    console.log('Server is connecting on port 9999!')
})
