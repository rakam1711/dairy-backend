const shopTag = require("../models/shopTagSchema.js");

const deleteshopTag = async (req, res, next) => {
  try {
    const id = req.body.id;
    if (!id) throw new Error("id required to delete");
    await shopTag.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: true,
      message: "successfully deleted shopTag",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = deleteshopTag;
