'use strict';

const Post = require('../schema-models/post');

const postHandler = {};

postHandler.getPost = function(req, res) {
  let queryObject = {title: req.user.title};

  Post.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(err => console.error(err));
};

postHandler.createPost = function(req, res, next) {
  const data = req.body;
  Post.create(data)
    .then(createdPost => res.status(200).send(createdPost))
    .catch(err => next(err));
};

postHandler.deletePost = function(req, res, next) {
  const {id} = req.params;
  console.log(id);
  Post.findByIdAndDelete(id)
    .then(deletedPost => res.status(200).send(deletedPost))
    .catch(err => next(err));

};

postHandler.updatePost = function(req, res, next){
  const {id} = req.params;
  Post.findByIdAndUpdate(id)
    .then(updatedPost => res.status(200).send(updatedPost))
    .catch(err => next(err));
};


module.exports = postHandler;