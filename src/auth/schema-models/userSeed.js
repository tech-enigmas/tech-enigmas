'use strict';

// THIS FILE "SEEDS" DATA INTO THE DATABASE. WE NEED SOMETHING IN THE DATABASE TO 'READ'
// THIS IS SO WE CAN TEST THE CRUD FUNCTIONALITY

const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.PORT);
mongoose.connect(process.env.MONGODB_URL);

const User = require('./users');

async function seed(){
  const blogUser = new User({
    username: 'Emma',
    password: 'myblogrules',
    id: 100,
    role: 'admin',
  });

  await blogUser.save()
    .then(() => console.log('Saved Emma to the database'))
    .catch(err => console.error(err));

  await User.create({
    username: 'Josh',
    password: 'myblogrocks',
    id: 101,
    role: 'admin'
  })
    .then(() => console.log('Saved Josh to the database'))
    .catch(err => console.error(err));

  await User.create({
    username: 'Christina',
    password: 'myblogisbest',
    id: 102,
    role: 'admin'
  })
    .then(() => console.log('Saved Josh to the database'))
    .catch(err => console.error(err));
  

  mongoose.disconnect();

}

seed();