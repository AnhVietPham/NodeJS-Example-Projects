const express = require('express');
const bodyParse = require('body-parser');
var authenticate = require('../authenticate');

const LeaderShips = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParse.json());

leaderRouter.route('/')
       .get((req, res, next) => {
              LeaderShips.find({})
                     .then((leader) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(leader);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              LeaderShips.create(req.body)
                     .then((leader) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(leader);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              res.statusCode = 403;
              res.end('Put operations not supported on /leaders');
       })
       .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              LeaderShips.remove({})
                     .then((resq) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resq);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       });

leaderRouter.route('/:leaderId')
       .get((req, res, next) => {
              LeaderShips.findById(req.params.leaderId)
                     .then((leader) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(leader);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              res.statusCode = 403;
              res.end('POST operation not supported on /leaders/', req.params.leaderId);
       })
       .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              LeaderShips.findByIdAndUpdate(req.params.leaderId, {
                     $set: req.body
              }, { new: true })
                     .then((leader) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(leader);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       })
       .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
              LeaderShips.findByIdAndRemove(req.params.leaderId)
                     .then((resq) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resq);
                     }, (err) => next(err))
                     .catch((err) => next(err));
       });
module.exports = leaderRouter;