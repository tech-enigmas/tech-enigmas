const inquirer = require('inquirer');
const { wait } = require('./utilities');
const Post = require('../auth/schema-models/post');

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
    .then(async (answer) => {
      if (!answer.blog_body || !answer.blog_title) {
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
        blogPost
          .save()
          .then((result) =>
            console.log(`Blog post ${result.title} was added successfully`)
          );
        // console.info('Answer:', answer.blog_title);
        await wait(1500);
        baseMenu();
      } catch (e) {
        console.log(e);
      }
    });
}

function baseMenu(actions) {
  inquirer
  .prompt([
    {
      name: 'menu',
      type: 'list',
      message: 'Welcome! Please pick an option. . .',
      choices: ['Create a post', 'Read something', 'Delete post'],
    },
  ])

  .then((answer) => {
    if (answer.menu === 'Create a post') {
      createBlogPost();
    }
    if (answer.menu === 'Read something') {
      selectPostedBlog();
    }
    if (answer.menu === 'Delete post') {
      deleteBlogPost();
    }
  });
}

function selectPostedBlog(Post) {
  Post.find()
  .exec()
  .then((posts) => {
    console.log(posts);
    const blogPosts = {
      type: 'list',
      name: 'selectedPost',
      message: 'Select a post',
      choices: posts.map((post) => post.title),
    };

    return inquirer.prompt([blogPosts]);
  })
  .then((answers) => {
    const selectedPost = answers.selectedPost;
    console.log(`You selected: ${selectedPost}`);
    Post.findOne({ title: selectedPost }).then((result) => {
      console.log(result.body);
    });
  })

  .catch((error) => {
    console.error('Error fetching data', error);
  });
}

function deleteBlogPost(Post) {
  Post.find({}, 'title')
  .exec()
  .then((posts) => {
    const postTitles = posts.map((post) => post.title);
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'post_title',
          message: 'Select a post to delete:',
          choices: postTitles,
        },
      ])
      .then(async (answer) => {
        try {
          const postToDelete = await Post.findOneAndDelete({
            title: answer.post_title,
          });
          if (postToDelete) {
            console.log(`Post '${postToDelete.title}' has been deleted.`);
          } else {
            console.log(`No post found with title '${answer.post_title}'.`);
          }
          await wait(1500);
          baseMenu(); // Return to the main menu
        } catch (e) {
          console.error('Error:', e);
        }
      });
  })
  .catch((error) => {
    console.error('Error fetching post titles', error);
  });
}

module.exports = {
  signIn,
  createBlogPost,
  baseMenu,
  selectPostedBlog,
  deleteBlogPost,
};