const mongoose = require("mongoose");

const subCategoryModel = new mongoose.Schema(
  {
    image: {
      type: String,
      default: " ",
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

const subCategorySchema = mongoose.model("subCategory", subCategoryModel);

module.exports = subCategorySchema;
