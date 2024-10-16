const Tag = require("../models/tagSchema.js");

const createTag = async (req, res, next) => {
  try {
    const { tagName, description } = req.body;
    const value =await Tag.findOne({ tagName: tagName });
    if (value) throw new Error("tag name already present");
    const data = Tag({
      tagName: tagName,
      description: description,
    });
    await data.save();
    return res.status(201).json({
      status: true,
      message: "shop created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      location: " tags/createTagController",
    });
  }
};

module.exports = createTag;
