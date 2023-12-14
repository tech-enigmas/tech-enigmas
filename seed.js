'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Trip = require('./src/auth/schema-models/travelRoutes');

async function seed() {
  const myTrip = new Trip({
    email: 'greasonemily@gmail.com',
    location: 'Olympia, WA',
    campsite: {
      site: 'hunter canyon',
      fee:'',
      description: 'campground'
    },
    airbnb: {
      city: 'Seattle',
      price:'',
      name: 'house on capitol hill'
    },
  });

  await myTrip.save()
    .then(() => console.log('saved to database'))
    .catch(error => console.error(error));

  await Trip.create({
    email: 'josh@gmail.com',
    location: 'Seattle, WA',
    campsite: {
      site: 'hunter canyon',
      fee:'',
      description: 'campground'
    },
    airbnb: {
      city: 'Olympia',
      price:'',
      name: 'house on capitol hill'
    },
  })
    .then(() => console.log('saved to database'))
    .catch(error => console.error(error));

  mongoose.disconnect();
}

seed();