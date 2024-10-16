const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const shopSchema = new mongoose.Schema(
  {
    shopId: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendorModel",
      required: true,
    },
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: "india" },
    phone: { type: String, required: true },
    email: { type: String },
    website: { type: String },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "service" },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    followers: { type: mongoose.Schema.Types.ObjectId, ref: "Follower" },

    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    gallerySchema: [],
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    logo: { type: String },
    rating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    shopTag: [{ type: mongoose.Schema.Types.ObjectId, ref: "shopTag" }],
  },
  {
    timestamps: true,
    strict: false,
  }
);

const Shop = mongoose.model("shop", shopSchema);

module.exports = Shop;
