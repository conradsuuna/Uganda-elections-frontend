const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    let url = 'mongodb://localhost:27017/presidential_elections';
    // mongoose.connect(url);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    //Get the default connection
    let db = mongoose.connection;
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
