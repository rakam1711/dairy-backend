const Admin = require("../model/adminSchema.js");
const bcryptjs = require("bcryptjs");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const createAdmin = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const mustData = {
        number: req.body.number,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
        image: req.file ? req.file.path : undefined,
      };
      const salt = bcryptjs.genSaltSync(2);
      const hashedPassword = await bcryptjs.hash(mustData.password, salt);

      const admin = Admin({
        number: mustData.number,
        email: mustData.email,
        name: mustData.name,
        password: hashedPassword,
        role: mustData.role,
        image: BASE_URL + mustData.image,
        status: mustData.status,
      });

      await admin.save();
      return res.status(201).json({
        status: true,
        message: "admin created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/admin/controller/createAdmin",
      });
    }
  });
};

module.exports = createAdmin;
