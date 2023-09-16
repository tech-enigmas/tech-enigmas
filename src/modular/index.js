const { connectToDatabase, BlogPost } = require('./db');
const {
  signIn,
  createBlogPost,
  baseMenu,
  selectPostedBlog,
  deleteBlogPost,
} = require('./inquirerFunctions');
const { wait } = require('./utilities');

async function startWait() {
  connectToDatabase();
  await wait(1500);
  signIn(() => baseMenu(actions));
}

const actions = {
  createBlogPost: () => createBlogPost(BlogPost, () => baseMenu(actions)),
  readSomething: () => selectPostedBlog(BlogPost),
  deletePost: () => deleteBlogPost(BlogPost, () => baseMenu(actions)),
};

startWait();