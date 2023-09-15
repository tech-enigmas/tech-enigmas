'use strict';

const User = require('../schema-models/users');

const userHandler = {};

userHandler.getUser = function(req, res) {
  let queryObject = {};

  if(req.query.username){
    queryObject = {username: req.query.username};
  }
  User.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(err => console.error(err));
};

userHandler.createUser = function(req, res, next) {
  const data = req.body;
  User.create(data)
    .then(createdUser => res.status(200).send(createdUser))
    .catch(err => next(err));
  
};

userHandler.deleteUser = function(req, res, next) {
  const {id} = req.params;
  console.log(id);
  User.findByIdAndDelete(id)
    .then(deletedUser => res.status(200).send(deletedUser))
    .catch(err => next(err));
};

userHandler.updateUser = function(req, res, next){
  const {id} = req.params;
  User.findByIdAndUpdate(id)
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(err => next(err));
};

module.exports = userHandler;