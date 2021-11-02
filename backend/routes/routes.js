const { request } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const donateTemplateCopy = require('../models/DonateModels')
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName: req.body.fullName,
        username: req.body.username,
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

    const donate = new donateTemplateCopy({
        receiver: req.body.receiver,
        amount: req.body.amount,
        frequency: req.body.frequency,
        payAccount: req.body.payAccount
    })
    donate.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

module.exports = router