const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    jobCategory: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Specialization',
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
    },
    status: {
        type: Number,
        default: 0
    },
    lat: {
        type: String,
        default: null
    },
    long: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Request', requestSchema);