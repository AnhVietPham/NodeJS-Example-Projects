const express = require('express');
const cors = require('cors');
const app = express();

const whileList = ['http://localhost:9999', 'https://localhost:8888'];

var corsOptionDelegate = (req, callback) => {
       var corsOptions;
       console.log(req.header('Origin'));
       if (whileList.indexOf(req.header('Origin')) !== -1) {
              corsOptions = { origin: true };
       } else {
              corsOptions = { origin: false };
       }
       callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
