const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },
    date: {
        type: String,
        default: Date.now
    },
    comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentUser: {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            }
        },
    }]
});

mongoose.model('posts', postSchema, 'posts');
