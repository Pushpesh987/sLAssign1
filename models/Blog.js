// models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
