const express = require('express');
const mongoose = require('mongoose');
const auth = require('./helpers/auth');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const authenticate = require('./authenticate')
var config = require('./config');

const app = express();

const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');
const leaderShipRouter = require('./routes/leaderShipRouter');
const usersRouter = require('./routes/userRouter');
const FileStore = require('session-file-store')(session);

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected  correctly to server ");

}, (err) => { console.log(err); });

// app.use(cookieParser('12345-67890-09876-54321'));
// app.use(session({
//     name: 'session-id',
//     secret: '12345-67890-09876-54321',
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore
// }));

app.use(passport.initialize());
// app.use(passport.session());

app.use('/users', usersRouter);

// app.use(auth.basicAuth);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderShipRouter);


app.listen(9999, () => {
    console.log('Server is connecting on port 9999!')
})
