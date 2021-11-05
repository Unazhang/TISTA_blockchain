const mongoose = require('mongoose');

const requestTemplate = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('requesttable', requestTemplate)