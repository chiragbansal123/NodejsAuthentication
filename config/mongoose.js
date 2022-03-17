
const mongoose = require('mongoose');
const env=require('..//config/environment');
mongoose.connect(`mongodb://mongodb+srv://chiragb184:9pRkceZH9h1Mi9xScluster0.lne9m.mongodb.net/${env.db}`);

//creating connection with database
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to mongodb'));

db.once('open', function() {
  console.log("Successfully connected to the database");
});

//exporting db module for use in other places
module.exports = db;