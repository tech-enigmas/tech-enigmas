'use strict';

// THIS FILE "SEEDS" DATA INTO THE DATABASE. WE NEED SOMETHING IN THE DATABASE TO 'READ'
// THIS IS SO WE CAN TEST THE CRUD FUNCTIONALITY

const mongoose = require('mongoose');
require('dotenv').config();
console.log(process.env.PORT);
mongoose.connect(process.env.MONGODB_URL);
const Post = require('./post');

async function seed(){
  const blogPost = new Post({
    title: 'Yellowstone',
    body: 'I vistited Yellowstone. Someone tried to pet a buffalo. It was really cool.',
    id: 200,
    status: true,
    userId: 100,
    keyWord: ['buffalo'],
    likes: 1000,
    comments: [],
  });

  await blogPost.save()
    .then(() => console.log('Saved Yellowstone to the database'))
    .catch(err => console.error(err));


  await Post.create({
    title: 'Moab',
    body: 'I vistited Moab. I hiked in Arches NP. It was really hot.',
    id: 201,
    status: true,
    userId: 101,
    keyWord: ['Moab'],
    likes: 1000,
    comments: [],
  })
    .then(() => console.log('Saved Moab to the database'))
    .catch(err => console.error(err));
}

seed();