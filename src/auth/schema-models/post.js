'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema ({
  title: String,
  body: String,
  id: Number,
  status: Boolean,
  userId: Number,
  keyWord: [String],
  likes: Number,
  comments: [],
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;