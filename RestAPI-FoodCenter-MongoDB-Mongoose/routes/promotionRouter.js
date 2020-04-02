const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
       .get((req, res, next) => {
              Promotions.find({})
                     .then((promotion) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', "application/json");
                            res.json(promotion);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .post((req, res, next) => {
              Promotions.create(req.body)
                     .then((promotion) => {
                            console.log('Promption: ', promotion);
                            console.log('Promotion Price: ', promotion.price);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(promotion);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .put((req, res, next) => {
              res.statusCode = 403;
              res.end('Put operation not supported on /promotions');
       })
       .delete((req, res, next) => {
              Promotions.remove({})
                     .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       });

promotionRouter.route('/:promotionId')
       .get((req, res, next) => {
              Promotions.findById(req.params.promotionId)
                     .then((promotion) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(promotion);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .post((req, res, next) => {
              res.statusCode = 403;
              res.end('POST operation not supported on /promotions/', req.params.promotionId);
       })
       .put((req, res, next) => {
              Promotions.findByIdAndUpdate(req.params.promotionId, {
                     $set: req.body
              }, { new: true })
                     .then((promotion) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(promotion);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .delete((req, res, next) => {
              Promotions.findByIdAndRemove(req.params.promotionId)
                     .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json');
                            res.json(resp);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       });

module.exports = promotionRouter;