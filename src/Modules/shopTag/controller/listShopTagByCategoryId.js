const shopTag = require("../models/shopTagSchema.js");

const listshopTagByCategoryId = async (req, res, next) => {
  try {
    const categoryId = req.body.categoryId;
    const shop = await shopTag.find({ category: categoryId });
    return res.status(200).json({
      message: "successfully listed shopTags By CategoryId",
      status: true,
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/shopTag/listshopTagByCategoryId.js",
    });
  }
};

module.exports = listshopTagByCategoryId;
