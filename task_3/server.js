const mongoose = require('mongoose');

const epSchema = new mongoose.Schema({
    id: Number,
    name: String,
    season: Number,
    number: Number,
    airdate: String,
    summary: String,
});

module.exports = mongoose.model('Episode', epSchema);
// module - Episode.js
//.model(name, schema) => Export a Mongoose model named 'Episode' using the schema epSchema to use it in other files.