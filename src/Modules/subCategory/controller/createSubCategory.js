const subcategorySchema = require("../model/subcategorySchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const subcreateCategory = async (req, res, next) => {
  const adminId = req.userId;

  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const mustData = {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        image: req.file ? req.file.path : undefined,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }
      const subcategory = await subcategorySchema.findOne({
        name: mustData.name,
      });
      if (!subcategory) {
        const addCategory = new subcategorySchema({
          name: mustData.name,
          description: mustData.description,
          category: mustData.categoryId,
          image: BASE_URL + mustData.image,
        });
        const data = await addCategory.save();
        return res.status(201).json({
          status: true,
          message: "subcategory created successfully",
          data: data._id,
        });
      } else {
        throw new Error("subcategory already present");
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/subCategory/controller/createsubCategory",
      });
    }
  });
};

module.exports = subcreateCategory;
