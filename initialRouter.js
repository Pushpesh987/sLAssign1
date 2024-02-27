const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

function mountRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/blogs', blogRoutes);
}

module.exports = mountRoutes;
