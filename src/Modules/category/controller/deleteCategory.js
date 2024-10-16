const categorySchema = require("../model/categorySchema");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js")
const deleteCategory = async (req, res) => {
  try {
    const id = req.body.categoryId;
    if (!id) throw new Error("CategoryId is required");
    const data = await categorySchema.findById({ _id: id });
    deleteImage(data.image);
    await categorySchema.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "delted Sucessfully" });
  } catch (err) {
    return res
      .status(500)
      .json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/deleteCategory",
      });
  }
};

module.exports = deleteCategory;
