const mongoose = require('mongoose');

const artisanSchema = mongoose.Schema({
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
        // unique: true,
        require: true,
        match: /[a-zs0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: {
        type: Number,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    specialization: {
        type: String,
        require: true
    },
    imageID: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    guarantor1Name: {
        type: String,
        require: true
    },
    guarantor1Number: {
        type: Number,
        require: true
    },
    guarantor2Name: {
        type: String,
        require: true
    },
    guarantor2Number: {
        type: Number,
        require: true
    },
    verified: {
        type: Number,
        default: 0
    },
    requestNotifications: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }]
    }
});

module.exports = mongoose.model('Artisan', artisanSchema);