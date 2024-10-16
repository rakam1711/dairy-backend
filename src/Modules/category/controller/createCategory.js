const categorySchema = require("../model/categorySchema");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const createCategory = async (req, res, next) => {
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
        image: req.file ? req.file.path : undefined,  // Include the image path
        service: req.body.serviceId,
      };

      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }

      const category = await categorySchema.findOne({ name: mustData.name });
      if (!category) {
        const addCategory = new categorySchema({
          name: mustData.name,
          description: mustData.description,
          image: BASE_URL + mustData.image,  // Save the image path
          createdBy: req.adminId,
          service: mustData.service,
        });
        await addCategory.save();
        return res.status(201).json({
          status: true,
          message: "category created successfully",
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "category already present",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/category/controller/createCategory",
      });
    }
  });
};

module.exports = createCategory;
