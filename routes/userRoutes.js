//routes/userRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',authController.getAllUsers);
router.get('/:userId', authMiddleware.authenticate, authController.getUserById);
router.delete('/:userId', authMiddleware.authenticate, authController.deleteUser);

module.exports = router;
