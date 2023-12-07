'use strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const travelRouteSchema = new Schema({
  email: String,
  location: String,
  campsite: Object,
  airbnb: Object,
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
});
module.exports = mongoose.model('TravelRoute', travelRouteSchema);