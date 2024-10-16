const bannerSchema = require("../model/bannerSchema.js");
const BASE_URL = process.env.BASE_URL;
const upload = require("../../../Middleware/multer/multipleImageUpload.js");

const createBannerController = async (req, res, next) => {
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
      const categoryId = req.body.categoryId;
      const home = req.body.home;

      if (!req.files || req.files.length !== 3) {
        return res.status(400).json({
          statusText: "BAD REQUEST",
          status: 400,
          message: "You must upload exactly 3 images.",
          data: {},
        });
      }

      let images = req.files.map((file) => BASE_URL + file.path);
      console.log(home);
      const data = new bannerSchema({
        image: images,
        home: home || undefined,
        categoryId: categoryId || undefined,
      });

      await data.save();

      return res.status(201).json({
        status: true,
        message: "Banner successfully created",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/banner/controller/createBanner",
      });
    }
  });
};

module.exports = createBannerController;
