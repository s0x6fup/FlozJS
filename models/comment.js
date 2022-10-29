const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Dorris, please update the comments schema to what we discussed in the weekly meeting! :) 
const commentSchema = new Schema({
    post_id: { // BTW we did not mention it, but we should look into document referencing in MongoDB.
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
