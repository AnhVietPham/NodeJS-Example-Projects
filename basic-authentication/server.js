const express = require("express");
const bodyParser = require('body-parser');
const error = require('./helpers/error.handler');
const auth = require('./helpers/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(auth.basicAuth)

require('./routes/routes')(app);

app.use(error.errorHandler)


app.listen(80, () => {
    console.log('Server is running on port 8989');
})