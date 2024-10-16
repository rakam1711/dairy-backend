const Service = require("../model/servicesSchema.js");

const getAllServices = async (req, res) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const max = await Service.countDocuments();
    const data = await Service.find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data)
      return res.status(200).json({ status: true, message: "No data found" });
    const maxPage = Math.ceil(max / limit);
    return res.status(200).json({
      status: true,
      message: "successfully listing",
      data,
      maxPage: maxPage,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Service/controller/getAllService",
    });
  }
};

module.exports = getAllServices;
