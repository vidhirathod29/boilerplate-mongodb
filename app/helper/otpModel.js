var mongoose = require('mongoose');

const otp = new mongoose.Schema({
  email: { type: String },
  token: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
  expiredAt: { type: Date, default: Date.now, expires: 60 * 5 },
  otp: { type: String },
});

var otpModel = mongoose.model('OTP', otp);

module.exports = { otpModel };
