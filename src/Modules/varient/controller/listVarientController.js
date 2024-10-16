const Varient = require("../model/varientSchema.js");

const listVarient = async (req, res, next) => {
  try {
    const vendorId = req.vendorId;
    const pipeline = { };
    if (vendorId) {
      pipeline.role = "ADMIN";
    }
    const data = await Varient.find(pipeline);

    let additionalData = [];
    if (vendorId) {
      additionalData = await Varient.find({
        createdBy: vendorId,
      });
    }
    const result = [...data, ...additionalData];
    return res.status(200).send({
      status: true,
      message: "successfully listed",
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/varient/controller/listVarientController",
    });
  }
};

module.exports = listVarient;
