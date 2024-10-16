const shopTag = require("../models/shopTagSchema.js");

const listshopTag = async (req, res, next) => {
  try {
    const key = req.body.name;
    const shop = await shopTag.find({
      name: { $regex: `${key}`, $options: "i" },
    });
    return res.status(200).json({
      message: "successfully listed shopTags",
      status: true,
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/shopTag/listshopTag.js",
    });
  }
};

module.exports = listshopTag;
