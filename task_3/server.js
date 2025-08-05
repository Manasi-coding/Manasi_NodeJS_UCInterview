const express = require('express');
const mongoose = require('mongoose');
const Episode = require('./models/Episode');

const app = express();
app.use(express.json());

mongoose.connect('your_mongodb_connection_string_here', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection failed:", err));
