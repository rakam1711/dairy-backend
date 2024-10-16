
const mongoose = require("mongoose");
const newProductSchema = new mongoose.Schema({
    status: { type: Boolean, default: true },
}, { strict: false });

const newProduct = mongoose.model("ProductSchema", newProductSchema);

module.exports = newProduct;
