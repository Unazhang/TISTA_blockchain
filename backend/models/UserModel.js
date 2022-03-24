const mongoose = require('mongoose');

const userTemplate = new mongoose.Schema({
    displayName: String,
    uid: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    blockchainAddress:[String],
    donateTo: [String], // this is a series of uids
})

userTemplate.pre('save', function (next) {
    this.userId = this._id.toString();
    next();
});

module.exports = mongoose.model('users', userTemplate)