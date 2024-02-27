// Import the Blog model
const Blog = require('../models/Blog');

const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    // Create a new blog document
    const newBlog = new Blog({ title, content, authorId: req.authorId });
    
    // Save the new blog document to the database
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBlogByAuthorId = async (req, res) => {
  const authorId = parseInt(req.params.authorId);
  try {
    // Fetch blogs by authorId from the database
    const authorBlogs = await Blog.find({ authorId });
    res.json(authorBlogs);
  } catch (error) {
    console.error('Error fetching blogs by authorId:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateBlog = async (req, res) => {
  const blogId = parseInt(req.params.id);
  const { title, content } = req.body;
  try {
    // Find the blog by ID and update it
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true });
    
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = parseInt(req.params.id);
  try {
    // Find the blog by ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllBlogs, createBlog, getBlogByAuthorId, updateBlog, deleteBlog };
