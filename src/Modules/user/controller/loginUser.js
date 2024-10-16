const getOTP = require("../../../Middleware/OTP/otp.js");
const OTP = require("../../../Middleware/OTP/sendOTP.js");
const otpSchema = require("../model/otpSchema.js");
const loginUser = async (req, res) => {
  try {
    const body = {
      countryCode: req.body.countryCode,
      number: req.body.number,
    };
    body.otp = await getOTP();
    body.time = new Date(Date.now() + 60000 * 2).getTime();
    const user = await otpSchema.findOne({ number: body.number });
    if (!user) {
      let newUser = new otpSchema({
        number: body.number,
        otp: body.otp,
        expire_time: body.time,
      });
      const abc = await newUser.save();
    } else {
      await otpSchema.findOneAndUpdate(
        { _id: user._id, number: body.number },
        {
          $set: {
            otp: body.otp,
            expire_time: body.time,
            wrong_attempt: 0,
            is_active: true,
          },
        },
        { new: true }
      );
    }
    const data = await OTP.sendOTP(body.number, body.otp);
    return res
      .status(200)
      .json({ status: true, message: "OTP send Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({
        status: false,
        message: err.message,
        location: "src/Modules/user/controller/loginUser",
      });
  }
};
module.exports = loginUser;
