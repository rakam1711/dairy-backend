const subVarient = require("../model/subVarientSchema.js");

const createSubVarient = async (req, res, next) => {
  try {
    const { name, varientId, code } = req.body;
    if (!name) throw new Error("sub variet name not provided");
    const data = subVarient({
      name: name,
      varient: varientId,
      createdBy: req.vendorId || req.adminId,
      role: req.role,
      code: code || undefined,
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
      location: "src/Modules/Subvarient/controller/createsubVarient",
    });
  }
};

module.exports = createSubVarient;
