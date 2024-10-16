const { ApiError } = require("../../../../errorHandler");
const otpSchema = require("../model/otpSchema.js");
const User = require("../model/userSchema.js");
const jwt = require("../../../Middleware/JWT/userAuthentication.js");
const JWT = require("jsonwebtoken");
const { encrypt } = require("../../../Middleware/encryption.js");
const verifyotp = async (req, res) => {
  try {
    const number = req.body.number;
    const otp = req.body.otp;

    const time = new Date(Date.now()).getTime();
    const user = await otpSchema.findOne({ number: number });
    if (!user) {
      throw new Error("Please register with this number first");
    }
    if (user.wrong_attempt >= 3) {
      throw new Error(
        "you have exceed the limit of wrong attemt please resend OTP"
      );
    }
    if (user.expire_time < time) {
      throw new Error("OTP time expired");
      // return new ApiError("OTP time expired", 500, "src/Modules/user/controller/verifyOTP");
    }
    let code = process.env.STATICCODE;
    if (user.otp !== otp && code != otp) {
      const num = user.wrong_attempt + 1;
      const x = await otpSchema.findOneAndUpdate(
        { mobile_number: number },
        { wrong_attempt: num },
        { new: true }
      );
      throw new Error(`Wrong OTP, attempt failed ${x.wrong_attempt}`);
    }
    if (user.otp === otp || (code == otp && user.is_active === true)) {
      await otpSchema.findOneAndUpdate(
        { mobile_number: number },
        { $set: { is_active: false } },
        { new: true }
      );

      const newUser = await User.findOne({ number: number });
      if (!newUser) {
        return res
          .status(200)
          .json({ status: true, user: "new", token: "null" });
      }
      realToken = JWT.sign(
        { id: newUser._id, role: "USER" },
        process.env.JWTSECRET
      );
      const token = await encrypt(realToken);
      return res.status(200).json({ user: newUser, token });
    } else {
      throw new Error("OTP has been used");
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/user/controller/verifyOTP",
    });
  }
};

module.exports = verifyotp;
