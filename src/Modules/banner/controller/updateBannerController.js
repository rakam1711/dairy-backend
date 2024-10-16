const bannerSchema = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const updateBanner = async (req, res, next) => {
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
      const id = req.body.id;
      const banner = await bannerSchema.findById(id);
      if (!banner) {
        return res.status(404).json({
          status: false,
          message: "Banner not found",
        });
      }

      const mustData = {
        home: req.body.home,
        status: req.body.status,
        categoryId: req.body.categoryId,
      };

      for (let key in mustData) {
        if (mustData[key] !== undefined && mustData[key] !== "") {
          banner[key] = mustData[key];
        }
      }

      if (!req.body.imageIndex && req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => BASE_URL + file.path);
        banner.images = [...banner.images, ...newImages];
      } else if (
        req.body.imageIndex !== undefined &&
        req.files &&
        req.files.length > 0
      ) {
        const imageIndex = parseInt(req.body.imageIndex, 10);

        if (imageIndex >= 0 && imageIndex < banner.images.length) {
          banner.images[imageIndex] = BASE_URL + req.files[0].path;
        } else {
          return res.status(400).json({
            status: false,
            message: "Invalid image index.",
          });
        }
      }

      await banner.save();
      return res.status(200).json({
        status: true,
        message: "banner updated successfully",
        data: banner,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/banner/controller/updateBannerController.js",
      });
    }
  });
};

module.exports = updateBanner;
