const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    jobCategory: {
        type: String,
        require: true
    },
    jobDescription: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    dateDone: {
        type: String,
        require: true
    },
    dateOfRequest: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Request', requestSchema);