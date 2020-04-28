const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Favourites = require('../models/favourites');

const favouritesRouter = express.Router();
favouritesRouter.use(bodyParser.json());

favouritesRouter.route('/')
       .get(authenticate.verifyUser, (req, res, next) => {
              Favourites.find({ 'postedBy': req.user._doc._id })
                     .populate('dishes')
                     .then((favourites) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favourites);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .post(authenticate.verifyUser, (req, res, next) => {
              Favourites.findOne({ 'postedBy': req.user._doc._id })
                     .then((favourite) => {
                            if (!favourite) {
                                   Favourites.create({ 'postedBy': req.user._doc._id })
                                          .then((favourite) => {
                                                 for (var i = 0; i < req.body.length; i++) {
                                                        if (favourite.dishes.indexOf(req.body[i].id) === -1) {
                                                               favourite.dishes.push(req.body[i].id);
                                                        }
                                                 }
                                                 favourite.save()
                                                        .then((favourite) => {
                                                               console.log('Favourites ', favourite);
                                                               res.statusCode = 200;
                                                               res.setHeader('Content-Type', 'application/json');
                                                               res.json(favourite);
                                                        }, (err) => next(err))
                                                        .catch((err) => next(err));
                                          }, (err) => next(err))
                                          .catch((err) => next(err));

                            } else {
                                   for (var i = 0; i < req.body.length; i++) {
                                          if (favourite.dishes.indexOf(req.body[i].id) === -1) {
                                                 favourite.dishes.push(req.body[i].id);
                                          }
                                   }
                                   favourite.save()
                                          .then((favourite) => {
                                                 res.statusCode = 200;
                                                 res.setHeader('Content-Type', 'application/json');
                                                 res.json(favourite)
                                          }, (err) => next(err))
                                          .catch((err) => next(err));
                            }
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .delete(authenticate.verifyUser, (req, res, next) => {
              Favourites.findOneAndRemove({ 'postedBy': req.user._doc._id })
                     .then((respFavourite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(respFavourite);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })

favouritesRouter.route('/:dishId')
       .get(authenticate.verifyUser, (req, res, next) => {
              res.statusCode = 403;
              res.end('GET Operator not supported on /:dishId: ' + req.params.dishId);
       })
       .post(authenticate.verifyUser, (req, res, next) => {
              Favourites.findOne({ 'postedBy': req.user._doc._id })
                     .then((favourites) => {
                            if (favourites.dishes.indexOf(req.params.dishId) === -1) {
                                   favourites.dishes.push(req.params.dishId);
                            }
                            favourites.save()
                                   .then((favourites) => {
                                          console.log('Favourites ', favourites);
                                          res.statusCode = 200;
                                          res.setHeader('Content-Type', 'application/json');
                                          res.json(favourites);
                                   }, (err) => next(err))
                                   .catch((err) => next(err));
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .put(authenticate.verifyUser, (req, res, next) => {
              res.statusCode = 403;
              res.end('PUT Operator not supported on /:dishId: ' + req.params.dishId);
       })
       .delete(authenticate.verifyUser, (req, res, next) => {
              Favourites.findOne({ 'postedBy': req.user._doc._id })
                     .then((favourites) => {
                            var indexOfDish = favourites.dishes.indexOf(req.params.dishId);
                            if (indexOfDish >= 0) {
                                   favourites.dishes.splice(indexOfDish, 1);
                                   favourites.save()
                                          .then((favourites) => {
                                                 res.statusCode = 200;
                                                 res.setHeader('Content-Type', 'application/json');
                                                 res.json(favourites);
                                          }, (err) => next(err))
                                          .catch((err) => next(err));
                            } else {
                                   res.statusCode = 404;
                                   res.end('Don\'t find dishId')
                            }
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })

module.exports = favouritesRouter;
