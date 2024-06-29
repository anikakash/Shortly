const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const shortnerRoute = require('./Routes/url.route.js');

const app = express();
app.use(express.json());

const mongoUri = 'mongodb+srv://anik:Map58yPvELVsnbO2@jobproject.t2xjchd.mongodb.net/Shortner';
const PORT = 8000;

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  // credentials: true
}));
// Defin routes.
app.use('/api', shortnerRoute);

// Build Connection with DB and run server.
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connect to database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("DB Connection faild!");
  });


  module.exports = app;