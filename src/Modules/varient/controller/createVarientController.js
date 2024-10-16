const Varient = require("../model/varientSchema.js");

const createVarient = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) throw new Error("variet name not provided");
    const data = Varient({
      name: name,
      createdBy: req.vendorId || req.adminId,
      role: req.role,
    });

    await data.save();
    return res.status(200).send({
      status: true,
      message: "successfully created",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/varient/controller/createVarientController",
    });
  }
};

module.exports = createVarient;
