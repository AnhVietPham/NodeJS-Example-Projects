const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end("We will send all leaders to You!!")
    })
    .post((req, res, next) => {
        res.end(`Hey Guy! We will give you to know more about information of Leader. Name Dish : ${req.body.nameLeader} and Description : ${req.body.descriptionLeader}`)
    })
    .put((req, res, next) => {
        res.statusCode = 300;
        res.end('PUT operation does not support on /leaders');
    })
    .delete((req, res, next) => {
        res.end('Delete all Leaders!!!')
    })


leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        res.end(`Hey guy! Now we will send detail of is leader: ${req.params.leaderId} to you!!`)
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operator does not support on leaders/ : ${req.params.leaderId}`);
    })
    .put((req, res, next) => {
        res.write(`Updating with leaderId: ${req.params.leaderId} `);
        res.end(`We are updating your leader with leaderId = ${req.params.leaderId} and Content is updated nameLeader : ${req.body.nameLeader} and description : ${req.body.descriptionLeader}`);
    })
    .delete((req, res, next) => {
        res.end(`We are deleting your leader : ${req.params.leaderId}`);
    })

module.exports = leaderRouter;