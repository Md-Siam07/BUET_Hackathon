const mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    userID: String,
    note: String,
    lastUpdated: String
});


mongoose.model('Note', noteSchema);