const mongoose = require("mongoose");

const donation_record = new mongoose.Schema({
  title: {
    type: String,
  },
  donor_name: {
    type: String,
  },
  donated_on: {
    type: Date,
    default: Date.now,
  },
  donated_amount: {
    type: Number,
  },
  amountUSD: {
    type: Number,
  },
});

const userTemplate = new mongoose.Schema({
  displayName: String,
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  blockchainAddress: [String],
  donateTo: { type: [donation_record] },
  role: {
    type: String,
    default: "Donor",
  },
});

userTemplate.pre("save", function(next) {
  this.userId = this._id.toString();
  next();
});

module.exports = mongoose.model("users", userTemplate);
