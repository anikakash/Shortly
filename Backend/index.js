const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const shortnerRoute = require('./Routes/url.route.js');

const app = express();
app.use(express.json());


app.use(cors());

// Define routes
app.use('/api', shortnerRoute);

// Build Connection with DB and run server.
mongoose
  .connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB Connection failed!', err);
  });

module.exports = app;
