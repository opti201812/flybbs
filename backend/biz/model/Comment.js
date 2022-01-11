const mongoose = require('mongoose');
const User = require('./User');

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    posttime: {
        type: Date,
        default: Date.now(),
    },
    target: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Thread',
        required: true,
    }
});

const Comment = mongoose.model('User', CommentSchema);
module.exports = Comment;