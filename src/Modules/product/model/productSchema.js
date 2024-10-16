const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "vendorModel" },
    name: { type: String, required: true },
    description: { type: String, maxlength: 1000 },
    brand: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory" }],
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    images: [],
    productShipingDetails: {
      type: Array,
    },
    tag: [],
    minOrderQnt: { type: Number, default: 1 },
    maxOrderQnt: { type: Number, default: 5 },
    specialLabel: {
      type: String,
      default: "Latest",
    },
    availableForSubscription: { type: Boolean, default: true },
    frequency: {
      type: String,
      enum: ["Daily", "Alternative", "Weekly", "Monthly", "None"],
      default: "None",
    },
    subVarient: { type: mongoose.Schema.Types.ObjectId, ref: "subVarient" },

    deliveryTimeline: { type: String, default: "pickup up after 2 hr" },
    deliveryInstruction: { type: String, default: "be cautious from dogs" },

    rating: { type: Number, default: 0 },
    numRatings: { type: Number, default: 0 },
    isProduct: { type: Boolean, default: true },
    colorCode: { type: String },
    isActive: { type: Boolean, default: false },
    shopTag: [{ type: mongoose.Schema.Types.ObjectId, ref: "shopTag" }],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
