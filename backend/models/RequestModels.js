const mongoose = require("mongoose");

const requestTemplate = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  requestor_name: {
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
  // blockchainAddress: String,
  //   userId: String,
  //   requestId: String,

  date: {
    type: Date,
    default: Date.now,
  },
  current_amount: {
    type: Number,
    default: 0,
  },
});

// SET DEFAULT AS AMOUNT
// requestTemplate.pre('save', function (next) {
//     this.currentAmount = this.get('amount');
//     next();
// });

module.exports = mongoose.model("requesttable", requestTemplate);
