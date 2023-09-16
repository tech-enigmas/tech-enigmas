const inquirer = require('inquirer');
const mongoose = require('mongoose');
const Post = require('../auth/schema-models/post');
require('dotenv').config();


function startServer() {
  mongoose.connect(process.env.MONGODB_URL);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', () => console.log('Mongoose is connected'));
}
function signIn() {
  inquirer
    .prompt([
      {
        name: 'user_name',
        type: 'input',
        message: 'What is your name?',
      },
    ])

    .then(async (answer) => {
      console.log(`Hello ${answer.user_name}. What would you like to do?`);
      await wait(2000);
      baseMenu();
    });
}
function createBlog() {
  inquirer
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

function baseMenu() {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'Welcome! Please pick an option. . .',
        choices: ['create a post', 'read somthing'],
      },
    ])

    .then((answer) => {
      // console.log(answer.menu);
      if (answer.menu === 'create a post') {
        createBlog();
      }
      if (answer.menu === 'read somthing') {
        // console.log("---------", answer.selectedPost);
        selectPostedBlog();
      }
    });
}

function selectPostedBlog() {
  Post.find()
    .exec()
    .then((posts) => {
      console.log(posts);
      const blogPosts = {
        type: 'list',
        name: 'selectedPost',
        message: 'Select a post',
        choices: posts.map(post => post.title)
      };

      return inquirer.prompt([blogPosts]);
    })
    .then((answers) => {
      const selectedPost = answers.selectedPost;
      console.log(`You selected: ${selectedPost}`);
      console.log(answers.map(post => post.title));
      return answers.map(post => post.title)
    })
    .catch((error) => {
      console.error('Error fetching data', error);
    });
}


function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startWait() {
  startServer();
  await wait(2000);
  signIn();
}
startWait();