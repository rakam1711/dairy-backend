const mongoose = require("mongoose");

const gSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  images: [],
});

const gallerySchema = mongoose.model("gallery", gSchema);

module.exports = gallerySchema;
