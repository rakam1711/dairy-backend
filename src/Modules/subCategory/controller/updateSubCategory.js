const subCategorySchema = require("../model/subcategorySchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const BASE_URL = process.env.BASE_URL;
const updateSubCategory = async (req, res) => {
  upload(req, res, async () => {
    try {
      const id = req.body.subCategoryId;
      const result = await subCategorySchema.findById({ _id: id });
      const data = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.categoryId,
      };
      for (let key in data) {
        if (data[key] == undefined || data[key] == "") {
          delete data[key];
        }
      }
      if (req.file) {
        deleteImage(result.image);
        data.image = BASE_URL + req.file.path;
      }

      const Rdata = await subCategorySchema.findByIdAndUpdate(
        { _id: id },
        data,
        {
          new: true,
        }
      );

      return res.status(200).json({
        status: true,
        message: "updated Sucessfully",
        updatedData: Rdata,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/subCategory/controller/updateSubCategory",
      });
    }
  });
};

module.exports = updateSubCategory;
