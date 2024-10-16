const subVarient = require("../model/subVarientSchema.js");

const listSubVarient = async (req, res, next) => {
  try {
    const varientId = req.body.varientId;
    const vendorId = req.vendorId;
    const pipeline = { varient: varientId };
    if (vendorId) {
      pipeline.role = "ADMIN";
    }
    const data = await subVarient.find(pipeline);
    let additionalData = [];
    if (vendorId) {
      additionalData = await subVarient.find({
        createdBy: vendorId,
        varient: varientId,
      });
    }
    const result = [...data, ...additionalData];

    return res.status(200).send({
      status: true,
      message: "subVarients successfully listed",
      data: result,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/subvarient/controller/listSubVarient",
    });
  }
};

module.exports = listSubVarient;
