const subCategorySchema = require("../model/subcategorySchema");
const deleteImgae = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const deleteSubCategory = async (req, res) => {
  try {
    const id = req.body.subCategoryId;
    if (!id) throw new Error("CategoryId is required");
    const data = await subCategorySchema.findById({ _id: id });
    deleteImgae(data.image);
    await subCategorySchema.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "deleted Sucessfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/subCategory/controller/deleteSubCategory",
    });
  }
};

module.exports = deleteSubCategory;
