const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
var config = require('./config');

const app = express();


const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');
const leaderShipRouter = require('./routes/leaderShipRouter');
const usersRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');
const favouritesRouter = require('./routes/favouritesRouter');

const FileStore = require('session-file-store')(session);

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected  correctly to server ");

}, (err) => { console.log(err); });

app.use(passport.initialize());

app.get('/',(req, res) => {
    res.render('index', { user: req.user });
});

app.use('/users', usersRouter);

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderShipRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favourites', favouritesRouter);

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert'),
}, app);

httpServer.listen(9999, () => {
    console.log('HTTP Server running on port 9999');
});

httpsServer.listen(8888, () => {
    console.log('HTTPS Server running on port 8888');
});
