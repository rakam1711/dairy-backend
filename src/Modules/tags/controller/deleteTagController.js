const Tag = require("../models/tagSchema.js");

const deleteTag = async (req, res, next) => {
  try {
    const id = req.body.id;
    if (!id) throw new Error("id required to delete");
    await Tag.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = deleteTag;
