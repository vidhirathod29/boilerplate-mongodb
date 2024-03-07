var mongoose = require("mongoose");

const portfolio = new mongoose.Schema({
  projectCategory: { type: String },
  projectName: { type: String },
  projectImage: { type: Array },
  projectTitle: { type: String },
  date: { type: String },
  projectDescription: { type: String },
});
var portfolioModel = mongoose.model("Portfolio", portfolio);
module.exports = { portfolioModel };
