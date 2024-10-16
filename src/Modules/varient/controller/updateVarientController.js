const Varient = require("../model/varientSchema.js");

const updateVarient = async (req, res, next) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const data = Varient.findByIdAndUpdate({ _id: id }, name, { new: true });
    return res.status(200).send({
      status: true,
      message: "successfully updated",
      data: data,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message,
      location: "src/Modules/varient/controller/listVarientController",
    });
  }
};

module.exports = updateVarient;
