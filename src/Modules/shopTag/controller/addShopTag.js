const shopTag = require("../models/shopTagSchema.js");

const createshopTag = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;
    const value = await shopTag.findOne({ name: name });
    if (value) throw new Error("shopTag name already present");

    const data = await shopTag({
      name: name,
      category: categoryId,
    });
    await data.save();
    return res.status(201).json({
      status: true,
      message: "shopTag created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      location: " shopTag/addshopTag.js",
    });
  }
};

module.exports = createshopTag;
