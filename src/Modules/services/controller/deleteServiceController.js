const Service = require("../model/servicesSchema.js");
const deleteImage = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const deleteService = async (req, res) => {
  try {
    const id = req.body.serviceId;
    if (!id) throw new Error("ServiceId is required");
    const data = await Service.findById({ _id: id });
    deleteImage(data.image);
    await Service.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ status: true, message: "delted Sucessfully" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Service/controller/deleteService",
    });
  }
};

module.exports = deleteService;
