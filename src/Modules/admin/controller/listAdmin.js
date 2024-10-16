const Admin = require("../model/adminSchema.js");

const listAdmin = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const list = await Admin.find()
      .skip((page - 1) * limit)
      .limit(limit);

    console.log(req.role)
    return res.status(200).json({
      status: true,
      message: "Admin listed successfully",
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/admin/controller/listAdmin",
    });
  }
};

module.exports = listAdmin;
