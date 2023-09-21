'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema ({
  title: String,
  body: String,
  id: Number,
  status: Boolean,
  author: String,
  keyWord: [String],
  likes: Number,
  comments: [],
});

const postModel = mongoose.model('Post', postSchema);
// 'Post' is the name of the collection that will hold the JSON objects


module.exports = postModel;