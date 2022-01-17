const mongoose = require('mongoose');
const Thread = require('../model/Thread')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: String, 
    description: {
        type: String,
        trim: true,
    },
    token: String,
    threads: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Thread',
    }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;