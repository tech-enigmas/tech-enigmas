'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
  username: String,
  password: String,
  id: Number,
  role: String,
});

const userModel = mongoose.model('Post', userSchema);

module.exports = userModel;