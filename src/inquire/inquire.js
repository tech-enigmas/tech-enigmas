const inquirer = require('inquirer');
const mongoose = require('mongoose');
const Post = require('../auth/schema-models/post');
require('dotenv').config();


const blogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
});

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
      await wait(1500);
      baseMenu();
    });
}

const BlogPosts = mongoose.model('BlogPost', blogPostSchema);
function createBlogPost() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'blog_title',
        message: 'What is the name of your blog?',
      },
      {
        type: 'input',
        name: 'blog_body',
        message: 'What is your blog about?',
      },
    ])
    .then(async(answer) => {
      if(!answer.blog_body || !answer.blog_title){
        return;
      }
      try {
        const blogPost = new Post({
          title: answer.blog_title,
          body: answer.blog_body,
          id: 100,
          status: true,
          userId: 100,
          keyWord: [],
          likes: 1000,
          comments: [],
        });
        // const newAnswer = new Post({ body: answer.blog_post });
        blogPost.save().then((result) => console.log(`Blog post ${result.title} was added successfully`));
        // console.info('Answer:', answer.blog_title);
        await wait(1500);
        baseMenu();
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
        choices: ['Create a post', 'Read something'],
      },
    ])

    .then((answer) => {
      if (answer.menu === 'Create a post') {
        createBlogPost();
      }
      if (answer.menu === 'Read something') {
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
      Post.findOne({title: selectedPost})
        .then((result)=> {
          console.log(result.body);
        });
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
  await wait(1500);
  signIn();
}
startWait();