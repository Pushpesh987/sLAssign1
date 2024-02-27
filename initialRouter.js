// initialRouter.js

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

function mountRoutes(app) {

  const router = express.Router();

  router.get('/ping', (_req, res) => {
    res.send('Pong! Your server is running.');
  });

  router.use('/auth', authRoutes);
  router.use('/blogs', blogRoutes);
  router.use('/users', blogRoutes);


  app.use(router);
}

module.exports = mountRoutes;
