const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../../errorHandler/index.js");
const User = require("../../Modules/user/model/userSchema.js");
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

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>userAuthentication"
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
        "moddleware=>JWT=>userAuthentication"
      );
    }
    if (!decodedToken) {
      return new ApiError(
        "Not authenticated.",
        401,
        "moddleware=>JWT=>userAuthentication"
      );
    }

    if (decodedToken.role === "USER") {
      const user = await User.findById(decodedToken?.id);
      if (!user) {
        res
          .json({ success: false, message: "User does not exist " })
          .status(404);
      }
      req.userId = decodedToken.id;
      req.role = "USER";
    }

    return next();
  } catch (err) {
    console.log(err.message, "src/Middleware/JWT/userAuthentication");
  }
};

module.exports = authenticateUser;
