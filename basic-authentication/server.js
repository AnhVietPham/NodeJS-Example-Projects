const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error.handler');
const basicAuth = require('./helpers/auth');

const app = express();

app.use(bodyParser.json());
app.use(basicAuth)
app.use(errorHandler);

require('./routes/routes')(app);

app.listen(9999, () => {
    console.log('Server is running on port 9999');
})