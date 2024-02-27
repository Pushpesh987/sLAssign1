const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mountRoutes = require('./initialRouter');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mountRoutes(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
