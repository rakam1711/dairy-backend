const Product = require("../model/productSchema.js");

const listProduct = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const product = await Product.find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "product listed successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductController.js",
    });
  }
};

module.exports = listProduct;
