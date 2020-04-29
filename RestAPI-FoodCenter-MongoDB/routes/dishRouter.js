const express = require('express');
const bodyParser = require('body-parser');

const dishesRouter = express.Router();
dishesRouter.use(bodyParser.json());

dishesRouter.route('/')
       .get((req, res, next) => {

       })
       .post((req, res, next) => {

       })
       .put((req, res, next) => {

       })
       .delete((req, res, next) => {

       })


dishesRouter.route('/:dishId')
       .get((req, res, next) => {

       })
       .post((req, res, next) => {

       })
       .put((req, res, next) => {

       })
       .delete((req, res, next) => {

       })
module.exports = dishesRouter;