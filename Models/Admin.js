const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    artisanRequest: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Artisan'
    }],
    userRequest: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Request'
    }],
    confirmRequest: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    rejectedRequest: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    flag: {
        type: Number,
        default: 2
    }
});

module.exports = mongoose.model('Admin', adminSchema);