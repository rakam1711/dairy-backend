const subVarient = require("../model/subVarientSchema.js");

const deleteSubVarient = async (req, res, next) => {
  try {
    const id = req.body.id;
    await subVarient.findByIdAndDelete(id);
    return res.status(200).send({
      status: true,
      message: "successfully deleted",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/subvarient/controller/deletesubVarient",
    });
  }
};

module.exports = deleteSubVarient;
