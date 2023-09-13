'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
  username: String,
  password: String,
  id: Number,
  role: String,
});

const userModel = mongoose.model('User', userSchema);
// 'User' is the name of the collection that will hold the JSON objects

module.exports = userModel;