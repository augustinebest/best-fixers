const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        default: 'User'
    },
    requestlogs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
    }
});

module.exports = mongoose.model('User', userSchema);