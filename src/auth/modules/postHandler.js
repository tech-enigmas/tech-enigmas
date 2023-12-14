'use strict';

const Post = require('../schema-models/post');

const postHandler = {};

postHandler.getPost = function (req, res) {
  console.log('getPostHandler');
  let queryObject = '';
  if (req.query?.title)
    queryObject = { title: req.query?.title };
  if (queryObject)
    Post.find(queryObject)
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.error('Error in Post.find(queryObject):', err);
        res.status(500).send({ error: 'Internal Server Error' });
      });
  else {
    console.log('looking with no query');
    Post.find()
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.error('Error in Post.find():', err);
        res.status(500).send({ error: 'Internal Server Error' });
      });
  }
};

postHandler.createPost = function (req, res, next) {
  const data = req.body;
  console.log(data);
  Post.create(data)
    .then(createdPost => {
      console.log(createdPost);
      res.status(200).send(createdPost)
    })
    .catch(err => next(err));
};

postHandler.deletePost = function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  Post.findByIdAndDelete(id)
    .then(deletedPost => res.status(200).send(deletedPost))
    .catch(err => next(err));

};

postHandler.updatePost = function (req, res, next) {
  const { id } = req.params;
  Post.findByIdAndUpdate(id)
    .then(updatedPost => res.status(200).send(updatedPost))
    .catch(err => next(err));
};


module.exports = postHandler;