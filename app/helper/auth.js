const { binary } = require("joi");
var mongoose = require("mongoose");

var auth = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  hobby: { type: Array },
  city: { type: String },
  mobile: { type: String },
  email: { type: String },
  password: { type: String },
  image: { type: String},
});
var authModel = mongoose.model("Auth", auth);
module.exports = { authModel };
