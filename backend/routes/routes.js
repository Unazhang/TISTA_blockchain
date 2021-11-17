const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const requestTemplateCopy = require('../models/RequestModels')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const requesttable = mongoose.model('requesttable');

router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: securePassword
    })
    signedUpUser.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

router.post('/donate', async (req, res) => {
    requesttable.findOneAndUpdate({ blockchainAddress: req.body.receiver },
        { $inc: { currentAmount: req.body.amount } }, { overwrite: true },
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
})

router.post('/request', async (req, res) => {

    const request = new requestTemplateCopy({
        requestId: req.body.requestId,
        userId: req.body.userId,
        amount: req.body.amount,
        title: req.body.title,
        reason: req.body.reason,
        description: req.body.description,
        blockchainAddress: req.body.blockchainAddress
    })
    request.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

router.get('/donation', async (req, res) => {
    const requesttable = mongoose.model("requesttable");
    requesttable.find({}, (err, result) => { console.log('result', result); res.json(result) });
})

module.exports = router