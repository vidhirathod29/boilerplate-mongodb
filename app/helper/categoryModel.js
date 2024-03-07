var mongoose = require("mongoose");

const category = new mongoose.Schema({
  categoryName: { type: String },
});

var categoryModel = mongoose.model("Category", category);
module.exports = { categoryModel };
