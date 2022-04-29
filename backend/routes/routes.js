const { request } = require("express");
const express = require("express");
const router = express.Router();
const userTemplate = require("../models/UserModel");
const requestTemplateCopy = require("../models/RequestModels");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const requesttable = mongoose.model("requesttable");
// const mytable = mongoose.model("mytable");
const users = mongoose.model("users");
// const validation_records = mongoose.model("validation_records");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // 3 days to expire
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const moment = require("moment");
const { findById } = require("../models/UserModel");

router.post("/signup", async (req, res) => {
  console.log("inside /signup...");
  console.log("signup request body", req.body);

  // create new user in MongoDB database
  const signedUpUser = new userTemplate({
    displayName: req.body.displayName,
    uid: req.body.uid,
    email: req.body.email,
    blockchainAddress: req.body.blockchainAddress,
    role: req.body.role,
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

router.post("/uploadImage", async (req, res) => {
  console.log("inside upload image", req.body);
});

//TODO change according to new user schema
router.post("/make-a-donation", async (req, res) => {
  console.log("inside make-a-donation", req.body);
  requesttable.findOneAndUpdate(
    { _id: req.body.request_id },
    { $inc: { current_amount: req.body.amount } },
    { overwrite: true },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("Current Amount Updated+++++++++++", result);
      }
    }
  );
  requesttable.findOneAndUpdate(
    { _id: req.body.request_id },
    {
      $push: {
        donation_history: {
          donor_name:
            req.body.donor_name == "" ? "Anonymous" : req.body.donor_name,
          donated_amount: req.body.amount,
        },
      },
    },
    { overwrite: false },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("Current Amount Updated+++++++++++2222", result);
      }
    }
  );
  users.findOneAndUpdate(
    { email: req.body.email },
    {
      $push: {
        donateTo: {
          donor_name:
            req.body.donor_name == "" ? "Anonymous" : req.body.donor_name,
          donated_amount: req.body.amount,
          title: req.body.title,
          amountUSD: req.body.amount * 0.25,
        },
      },
    },
    { overwrite: false },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
        console.log("User Donation Record Updated================");
      }
    }
  );
});

// router.post("/login", async (req, res) => {
//   console.log("login", req.body);
//   mytable.findOne({ userName: req.body.userName }, function(err, result) {
//     if (err) {
//       console.log("error");
//       res.send(err);
//     } else {
//       if (result && bcrypt.compareSync(req.body.password, result.password)) {
//         // create jwt token based on db user _id
//         const jwt_token = createToken(result._id);
//         res.send({
//           userName: req.body.userName,
//           verified: true,
//           jwtToken: jwt_token,
//         });
//       } else {
//         console.log("unable");
//         res.send("Unable to verify");
//       }
//     }
//   });
// });

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
    imageUrl: req.body.imageUrl,
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

router.get("/find-donations-by-user", async (req, res) => {
  const user_email = req.query.email;
  console.log("inside find-donations-by-user", user_email);
  users.findOne({ email: user_email }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log("my donations", result.donateTo);
      res.send(result.donateTo);
    }
  });
});

router.post("/userdata", async (req, res) => {
  // console.log("query role");
  // users.find({ uid: req.body.uid })
  users.findOne({ uid: req.body.uid }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.send(result);
      } else {
        res.send("No user found.");
      }
    }
  });
});

router.get("/user", async (req, res) => {
  console.log("inside /user", req.query);
  users.findOne({ email: req.query.user_email }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result.avatarUrl);
    }
  });
});

router.post("/change-avatar", async (req, res) => {
  console.log("inside change avatar", req.body);
  users.findOneAndUpdate(
    { email: req.body.user_email },
    { $set: { avatarUrl: req.body.avatarUrl } },
    { overwrite: true },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("success", result);
      }
    }
  );
});

router.post("/update-blockchain-address", async (req, res) => {
  console.log("update-blockchain-address", req.body);
  requesttable.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { blockchainAddress: req.body.blockchainAddress } },
    { overwrite: true },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log("success++", result);
      }
    }
  );
});
//TODO: change role to an array and reflect it on pages
//TODO: if phone number exist, don't substitute
//TODO: only add validation when that validation for that role doesn't exist
router.post("/validation", async (req, res) => {
  console.log("inside /validate...");
  console.log("validate request body", req.body);

  users.findOneAndUpdate(
    { uid: req.body.uid },
    {
      phoneNumber: req.body.phoneNumber,
      $push: {
        validations: {
          description: req.body.description,
          role: req.body.role,
        },
      },
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
        console.log("User Validation Updated================");
        console.log(result);
      }
    }
  );
});

/** Get all existing validations */
router.get("/validation", async (req, res) => {
  users.findOne({ uid: req.body.uid }, (err, result)=>{
    if (err) {
      res.send(err);
    } else {
      console.log("my validations", result.validations);
      res.send(result.validations);
    }
  });

});

module.exports = router;
