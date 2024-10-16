const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    image: {
      type: String,
      default: " ",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service",
    },
  },
  { timestamps: true }
);

const categorySchema = mongoose.model("Category", categoryModel);

module.exports = categorySchema;
