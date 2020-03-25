const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router()

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end("We will send all dishes to You!!")
    })
    .post((req, res, next) => {
        res.end(`Hey Guy! We will give you to know more about information of Dish. Name Dish : ${req.body.nameDish} and Description : ${req.body.descriptionDish}`)
    })
    .put((req, res, next) => {
        res.statusCode = 300;
        res.end('PUT operation does not support on /dishes');
    })
    .delete((req, res, next) => {
        res.end('Delete all Dishes!!!')
    })

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end(`Hey guy! Now we will send detail of is dish: ${req.params.dishId} to you!!`)
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operator does not support on dishes/ : ${req.params.dishId}`);
    })
    .put((req, res, next) => {
        res.write(`Updating with dish: ${req.params.dishId} `);
        res.end(`We are updating your dish with dishId = ${req.params.dishId} and Content is updated nameDish : ${req.body.nameDish} and description : ${req.body.descriptionDish}`);
    })
    .delete((req, res, next) => {
        res.end(`We are deleting your dish : ${req.params.dishId}`);
    })

module.exports = dishRouter;