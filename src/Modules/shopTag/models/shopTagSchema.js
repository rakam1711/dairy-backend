const mongoose = require("mongoose");

const shopTagSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const shopTag = mongoose.model("shopTag", shopTagSchema);

module.exports = shopTag;
