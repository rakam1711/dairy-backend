const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  image: { type: String, default: "" },
  description: String,
});
const Service = mongoose.model("service", serviceSchema);
module.exports = Service;
