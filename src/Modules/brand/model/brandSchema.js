const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    Name: { type: String, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const brand = mongoose.model("Brand", brandSchema);

module.exports = brand;
