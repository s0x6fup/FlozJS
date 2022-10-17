const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining schema for collection and documents
const postSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
},
{ // this is an options object
    timestamps: true
});

const post = mongoose.model('post', postSchema); // here we define the posts collection
module.exports = post; // we export this so the main script can utilize it
