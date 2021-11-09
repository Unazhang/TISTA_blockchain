const mongoose = require('mongoose');

const donateTemplate = new mongoose.Schema({
    receiver: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    payAccount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('donatetable', donateTemplate)