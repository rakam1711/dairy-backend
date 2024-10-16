const User = require("../model/userSchema.js");

const listUser = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const list = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "User listed successfully",
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/User/controller/listUser",
    });
  }
};

module.exports = listUser;
