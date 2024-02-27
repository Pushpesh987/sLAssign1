// controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password, role } = req.body; 
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestingUserId = req.user ? req.user._id : null;

    const isAdmin = req.user && req.user.role === 'admin';
    const isOwner = req.user && req.user._id.toString() === userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const isAdmin = req.user && req.user.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { register, login, getAllUsers, getUserById, deleteUser};
