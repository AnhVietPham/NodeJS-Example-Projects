const express = require('express');
const bodyParser = require('body-parser');
const mysql =  require('mysql');
const http = require('http');
const config = require('./helpers/config');

const app = express();
const httpServer = http.createServer(app);

const connect = mysql.createConnection({
       host: config.HOST,
       user: config.USERNAME,
       password: config.PASSWORD,
       database: config.DATABASE
})

httpServer.listen(config.PORT, () => {
       console.log(`HTTP Server running on port ${config.PORT}`);
})