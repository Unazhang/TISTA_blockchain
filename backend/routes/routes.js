const { request } = require("express");
const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const userTemplate = require("../models/UserModel");
const requestTemplateCopy = require("../models/RequestModels");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const requesttable = mongoose.model("requesttable");
const mytable = mongoose.model("mytable");
const users = mongoose.model("users");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days to expire
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

// router.post("/signup", async (req, res) => {
//   console.log("inside /signup...");
//   console.log("signup request body", req.body);
//   const saltPassword = await bcrypt.genSalt(10);
//   const securePassword = await bcrypt.hash(req.body.password, saltPassword);

//   // create new user in MongoDB database
//   const signedUpUser = new signUpTemplateCopy({
//     fullName: req.body.fullName,
//     userName: req.body.userName,
//     donationAddress: req.body.donationAddress,
//     donateTo: req.body.donateTo,
//     donateAddress: req.body.donateAddress,
//     email: req.body.email,
//     password: securePassword,
//   });

//   signedUpUser
//     .save()
//     .then((data) => {
//       console.log("data", data);
//       res.json({
//         data,
//         success: true,
//       });
//       // console.log("signedUpUser resp", res.json);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });
router.post("/signup", async (req, res) => {
  console.log("inside /signup...");
  console.log("signup request body", req.body);

  // create new user in MongoDB database
  const signedUpUser = new userTemplate({
    displayName: req.body.displayName,
    uid: req.body.uid,
    email: req.body.email,
    blockchainAddress: req.body.blockchainAddress,
    role: req.body.role
  });

  signedUpUser
    .save()
    .then((data) => {
      console.log("data", data);
      res.json({
        data,
        success: true,
      });
      // console.log("signedUpUser resp", res.json);
    })
    .catch((error) => {
      res.json(error);
    });
});

//TODO change according to new user schema
router.post("/donate", async (req, res) => {
  requesttable.findOneAndUpdate(
    { blockchainAddress: req.body.receiver },
    { $inc: { currentAmount: req.body.amount } },
    { overwrite: true },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("Current Amount Updated", result);
      }
    }
  );
  mytable.findOneAndUpdate(
    { userName: req.body.userName },
    { $addToSet: { donateTo: req.body.receiver } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
        console.log("User Donation Record Updated");
      }
    }
  );
});

router.post("/login", async (req, res) => {
  console.log("login", req.body);
  mytable.findOne({ userName: req.body.userName }, function(err, result) {
    if (err) {
      console.log("error");
      res.send(err);
    } else {
      if (result && bcrypt.compareSync(req.body.password, result.password)) {
        // create jwt token based on db user _id
        const jwt_token = createToken(result._id);
        res.send({
          userName: req.body.userName,
          verified: true,
          jwtToken: jwt_token,
        });
      } else {
        console.log("unable");
        res.send("Unable to verify");
      }
    }
  });
});

router.post("/request", async (req, res) => {
  console.log("inside /request", req.body);
  const request = new requestTemplateCopy({
    user_email: req.body.user_email,
    requester_name: req.body.requester_name,
    country: req.body.country,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    target_amount: req.body.target_amount,
    vendor_name: req.body.vendor_name,
    vendor_email: req.body.vendor_email,
  });
  request
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error", error);
      res.json(error);
    });
});

router.get("/donation", async (req, res) => {
  const requesttable = mongoose.model("requesttable");
  requesttable.find({}, (err, result) => {
    console.log("result", result);
    res.json(result);
  });
});

router.post("/donatedAddress", async (req, res) => {
  console.log("donatedAdd", req);
  mytable.findOne({ userName: req.body.userName }, function(err, result) {
    console.log("donated address", err, result, req.body);
    if (err) {
      res.send(err);
    } else if (result == null) {
      res.send("User not found");
    } else if (!("donateAddress" in result)) {
      res.send("Don't have any donation address");
    } else {
      res.send(result.donateTo);
    }
  });
});

router.get("/addresses", async (req, res) => {
  mytable.findOne({ userId: req.body.userId }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result.donationAddress);
    }
  });
});

router.post("/role", async (req, res) => {
  users.findOne({ uid: req.body.uid }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result.role);
    }
  });
});

module.exports = router;
