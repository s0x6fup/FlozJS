const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: true
    },
    bgimage: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
