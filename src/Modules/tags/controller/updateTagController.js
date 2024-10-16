const Tag = require("../models/tagSchema.js");

const updateTag = async (req, res, next) => {
  try {
    const { data, id } = req.body;
    await Tag.findByIdAndUpdate({ _id: id }, data);
    return res.status(200).json({
      message: "tag updated successfully",
      status: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      location: " tags/updatetags",
    });
  }
};
module.exports = updateTag;
