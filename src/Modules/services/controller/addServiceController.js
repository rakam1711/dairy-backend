const Service = require("../model/servicesSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const addService = async (req, res, next) => {
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
        description: req.body.name,
        image: req.file ? req.file.path : undefined,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }
      const serviceName = await Service.findOne({ name: mustData.name });
      if (serviceName) throw new Error("service Name already present");

      const service = Service({
        name: mustData.name,
        description: mustData.description,
        image: BASE_URL + mustData.image,
      });

      await service.save();
      return res.status(201).json({
        status: true,
        message: "service created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/services/controller/addServiceController.js",
      });
    }
  });
};

module.exports = addService;
