const Product = require("../../product/model/productSchema.js");

const vendorSubCategoryByCategoryId = async (req, res) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const products = await Product.find({
      vendor: req.vendorId,
    })
      .populate("category", "name image")
      .skip((page - 1) * limit)
      .limit(limit);

    const uniqueCategories = [];

    products.forEach((product) => {
      const category = product.category;

      if (
        !uniqueCategories.some(
          (cat) => cat._id.toString() === category._id.toString()
        )
      ) {
        uniqueCategories.push({
          _id: category._id.toString(),
        });
      }
    });

    return res.status(200).json({
      status: true,
      message: "Successfully listing vendorSubCategoryByCategoryId",
      data: uniqueCategories,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location:
        "src/Modules/subCategory/controller/vendorSubCategoryByCategoryId",
    });
  }
};

module.exports = vendorSubCategoryByCategoryId;
