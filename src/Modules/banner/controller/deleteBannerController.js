const bannerSchema = require("../model/bannerSchema.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const deleteBanner = async (req, res) => {
  try {
    const id = req.body.bannerId;
    if (!id) throw new Error("bannerId is required");
    const data = await bannerSchema.findById({ _id: id });
    deleteImage(data.image);
    await bannerSchema.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "delted Sucessfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Banner/controller/deleteBanner",
    });
  }
};

module.exports = deleteBanner;
