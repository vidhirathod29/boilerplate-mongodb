var mongoose = require('mongoose');

const contact = new mongoose.Schema({
  contactName: { type: String },
  email: { type: String },
  contactNumber: { type: String },
  messages: { type: String },
  date: { type: String },
});
var contactModel = mongoose.model('Contact', contact);

module.exports = { contactModel };
