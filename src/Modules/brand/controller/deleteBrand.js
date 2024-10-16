const Brand = require("../model/brandSchema.js");

const deleteBrand = async (req, res, next) => {
  try {
    const id = req.body.id;
    if (!id) throw new Error("id required to delete");
    await Brand.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: true,
      message: "successfully deleted Brand",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
    });
  }
};

module.exports = deleteBrand;
