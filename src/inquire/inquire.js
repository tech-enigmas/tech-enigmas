'use strict';

require('dotenv').config();
const inquirer = require('inquirer');
const mongoose = require('mongoose');
const Post = require('../auth/schema-models/post');

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('Mongoose is connected'));

function signIn() {
  inquirer
    .prompt([
      {
        name: 'user_name',
        type: 'input',
        message: 'What is your name?',
      },
      {
        name: 'password',
        type: 'input',
        message: 'Please pick a password',
      },
      {
        name: 'powers',
        type: 'confirm',
        message: 'Will you have the powers of an Administrator?',
      },
    ])

    .then((answer) => {
      console.log(
        `Hello ${answer.user_name} your password is ${answer.password}. You have ${answer.powers} admin powers`
      );
      createBlog();
    });
}
async function createBlog() {
  const answer = await inquirer
    .prompt([
      {
        type: 'editor',
        name: 'blog_post',
        message: 'What is your blog about?',
      },
    ])
    .then((answer) => {
      try {
        const blogPost = new Post({
          title: 'tester',
          body: answer.blog_post,
          id: 100,
          status: true,
          userId: 100,
          keyWord: ['buffalo'],
          likes: 1000,
          comments: [],
        });
        // const newAnswer = new Post({ body: answer.blog_post });
        blogPost.save().then((result) => console.log(result));
        console.info('Answer:', answer.blog_post);
      } catch (e) {
        console.log(e);
      }
    });
}
signIn();
function contributorAccess() {}

contributorAccess();

module.exports = inquirer;
