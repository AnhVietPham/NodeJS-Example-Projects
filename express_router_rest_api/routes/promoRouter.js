const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end("We will send all promotions to You!!")
    })
    .post((req, res, next) => {
        res.end(`Hey Guy! We will give you to know more about information of Leader. Name Promotion : ${req.body.namePromotion} and Description : ${req.body.descriptionPromotion}`)
    })
    .put((req, res, next) => {
        res.statusCode = 300;
        res.end('PUT operation does not support on /promotions');
    })
    .delete((req, res, next) => {
        res.end('Delete all Promotions!!!')
    })


promoRouter.route('/:promoId')
    .get((req, res, next) => {
        res.end(`Hey guy! Now we will send detail of is promotion: ${req.params.promoId} to you!!`)
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(`POST operator does not support on promotions/ : ${req.params.promoId}`);
    })
    .put((req, res, next) => {
        res.write(`Updating with promotion: ${req.params.promoId} `);
        res.end(`We are updating your promotion with promoId = ${req.params.promoId} and Content is updated namePromotion : ${req.body.namePromotion} and description : ${req.body.descriptionPromotion}`);
    })
    .delete((req, res, next) => {
        res.end(`We are deleting your promotion : ${req.params.promoId}`);
    })

module.exports = promoRouter;