const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const mountRoutes = require('./initialRouter');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mountRoutes(app);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
