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
  avatarUrl: {
    type: String,
    default:
      "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
  },
});

userTemplate.pre("save", function(next) {
  this.userId = this._id.toString();
  next();
});

module.exports = mongoose.model("users", userTemplate);
