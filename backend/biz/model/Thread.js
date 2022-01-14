const mongoose = require('mongoose');
const User = require('./User');

const ThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    posttime: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }
});

const Thread = mongoose.model('Thread', ThreadSchema);
module.exports = Thread;