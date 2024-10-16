const { ApiError } = require("../../../../errorHandler/index");
const Admin = require("../model/adminSchema");
const bcryptjs = require("bcryptjs");
const deleteImageHandler = require("../../../Middleware/DeleteImage/deleteImgaeHandler.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const updateAdmin = async (req, res, next) => {
  upload(req, res, async () => {
    try {
      const id = req.body.id;
      const admin = await Admin.findById({ _id: id });
      if (!admin) throw new ApiError("Invalid credential", 403);
      const obj = {};
      if (req.body.number) obj.number = req.body.number;
      if (req.body.email) obj.email = req.body.email;
      if (req.body.name) obj.name = req.body.name;
      if (req.body.status) obj.status = req.body.status;
      if (req.body.role) obj.role = req.body.role;
      if (req.body.password) {
        const salt = bcryptjs.genSaltSync(2);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        obj.password = hashedPassword;
      }
      if (req?.file?.path) {
        deleteImageHandler(admin?.image);
        obj.image = BASE_URL + req.file.path;
      }

      await Admin.findByIdAndUpdate(
        {
          _id: admin._id,
        },
        obj,
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: "Admin updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
        location: "src/Modules/admin/controller/updateAdmin",
      });
    }
  });
};

module.exports = updateAdmin;
