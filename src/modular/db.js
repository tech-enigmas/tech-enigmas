const mongoose = require('mongoose');
require('dotenv').config();



const blogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

function connectToDatabase() {
  mongoose.connect(process.env.MONGODB_URL);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', () => console.log('Mongoose is connected'));
}

module.exports = {
  connectToDatabase,
  BlogPost,
};