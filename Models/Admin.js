const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    userRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
    confirmRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    rejectedRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Admin', adminSchema);