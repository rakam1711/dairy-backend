const Varient = require("../model/varientSchema.js");

const deleteVarient = async (req, res, next) => {
  try {
    const id = req.body.id;
    await Varient.findByIdAndDelete(id);
    return res.status(200).send({
      status: true,
      message: "successfully deleted",
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/varient/controller/deleteVarientController",
    });
  }
};

module.exports = deleteVarient;
