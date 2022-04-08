const mongoose = require("mongoose");

const donation_record = new mongoose.Schema({
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
});

const requestTemplate = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  requester_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "United States",
  },
  category: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  target_amount: {
    type: Number,
    required: true,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  vendor_email: {
    type: String,
    required: true,
  },
  blockchainAddress: {
    type: String,
    default: "0xd8128c10Cc383797E875DBA2cD3405f07F83d26C", // test - vendor 1
  },

  date: {
    type: Date,
    default: Date.now,
  },
  current_amount: {
    type: Number,
    default: 0,
  },
  donation_history: {
    type: [donation_record],
  },
  imageUrl: {
    type: String,
    default:
      "https://storage.googleapis.com/proudcity/sanrafaelca/uploads/2020/04/donate-image.png",
  },
});

// SET DEFAULT AS AMOUNT
// requestTemplate.pre('save', function (next) {
//     this.currentAmount = this.get('amount');
//     next();
// });

module.exports = mongoose.model("requesttable", requestTemplate);
