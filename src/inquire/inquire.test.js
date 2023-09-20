const { editBlogPost } = require('./inquire.js'); // Replace with your module path
const Post = require('../auth/schema-models/post');
require('dotenv').config();
const mongoose = require('mongoose');
// Mock the mongoose.connect method

// Mock the mongoose findOne and save functions
jest.mock('mongoose');
mongoose.connect.mockResolvedValue();
describe('editBlogPost', () => {
  it('should edit a blog post', async () => {
    // Mock the findOne method
    const findOneMock = jest.spyOn(Post, 'findOne');
    findOneMock.mockResolvedValueOnce({
      title: 'PostToEdit',
      body: 'Original body',
    });
    // Mock the save method
    const saveMock = jest.spyOn(Post.prototype, 'save');
    saveMock.mockResolvedValueOnce();
    const answer = {
      post_title: 'PostToEdit',
      editedBody: 'Edited body',
    };
    const result = await editBlogPost(answer);
    expect(result).toBe("Post 'PostToEdit' has been edited.");
    // Restore the original methods
    findOneMock.mockRestore();
    saveMock.mockRestore();
  });
  it('should handle no post found', async () => {
    // Mock the findOne method
    const findOneMock = jest.spyOn(Post, 'findOne');
    findOneMock.mockResolvedValueOnce(null);
    const answer = {
      post_title: 'NonExistentPost',
      editedBody: 'Edited body',
    };
    const result = await editBlogPost(answer);
    expect(result).toBe("No post found with title 'NonExistentPost'.");
    // Restore the original method
    findOneMock.mockRestore();
  });
  it('should handle returning to the main menu', async () => {
    const answer = {
      post_title: 'Return to main menu',
    };
    const result = await editBlogPost(answer);
    expect(result).toBe('Back to Main Menu');
  });
});