const Product = require("../model/productSchema.js");

const productById = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const id = req.body.productId;
    const product = await Product.findById({ _id: id })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "productById listed successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/productById.js",
    });
  }
};

module.exports = productById;
