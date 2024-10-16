const { ApiError } = require("../../../../errorHandler/index");
const Admin = require("../model/adminSchema.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const { encrypt } = require("../../../Middleware/encryption.js");

const loginAdmin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) throw new ApiError("Invalid credential", 403);

    const admin = await Admin.findOne({ email: email });
    if (!admin) throw new ApiError("Invalid credential", 403);

    const match = await bcryptjs.compare(password, admin.password);

    if (!match) throw new ApiError("Invalid password", 403);

    const newToken = jwt.sign({ id: admin._id, role: admin.role }, jwtSecret);
    const token = await encrypt(newToken);
    return res.status(200).json({
      status: true,
      message: "Admin login successfully",
      email: admin.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "src/Modules/admin/controller/loginAdmin",
    });
  }
};

module.exports = loginAdmin;
