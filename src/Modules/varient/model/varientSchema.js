const mongoose = require("mongoose");

const varientSchema = new mongoose.Schema({
  name: String,
  role: String,
  createdBy: String,
});

const varient = mongoose.model("Varientt", varientSchema);

module.exports = varient;
