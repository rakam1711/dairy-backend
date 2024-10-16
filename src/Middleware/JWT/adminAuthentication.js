const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../../errorHandler/index.js");
const Admin = require("../../Modules/admin/model/adminSchema.js");

const JWTSECRET = process.env.JWTSECRET;

const secretKey = process.env.SECRETKEY;
const iv = process.env.IV;
const decrypt = async (encryptedToken) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedToken, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>adminAuthentication"
      );
    }
    const encryptedtoken = authHeader.split(" ")[1];
    const token = await decrypt(encryptedtoken);
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWTSECRET);
    } catch (err) {
      return new ApiError(
        "Please Login First.",
        401,
        "moddleware=>JWT=>adminAuthentication"
      );
    }
    if (!decodedToken) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>adminAuthentication"
      );
    }
    // ------------------------------------
    if (decodedToken.role == "ADMIN" || decodedToken.role == "SUBADMIN") {
      const admin = await Admin.findById(decodedToken?.id);
      if (!admin) {
        res
          .json({ success: false, message: "Admin does not exist " })
          .status(404);
      }
      req.adminId = decodedToken.id;
      req.role = decodedToken.role;
    }

    // ---------------------------------------------

    return next();
  } catch (err) {
    console.log(err.message, "src/Middleware/JWT/adminAuthentication");
  }
};

module.exports = authenticateAdmin;
