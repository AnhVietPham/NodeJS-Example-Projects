const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

