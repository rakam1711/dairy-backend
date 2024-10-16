const User = require("../model/userSchema.js");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../../../Middleware/encryption.js");
const register = async (req, res) => {
  try {
    const mustData = {
      fullName: req.body.fullName,
      number: req.body.number,
      email: req.body.email,
      gender: req.body.gender,
    };
    for (let key in mustData) {
      if (mustData[key] == undefined || mustData[key] == "") {
        throw new Error(`Invalid feild ${key}`);
      }
    }

    const user = await User.findOne({ number: mustData.number });
    if (!user) {
      const addUser = new User({
        name: mustData.fullName,
        number: mustData.number,
        email: mustData.email,
        gender: mustData.gender,
      });

      await addUser.save();
      const tokenwa = jwt.sign(
        { id: addUser._id, role: "USER" },
        process.env.JWTSECRET
      );
      const token = await encrypt(tokenwa);
      return res.status(201).json({
        status: true,
        message: "Created Successfully",
        token,
        user: addUser,
      });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "already register user" });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/use/controller/register",
    });
  }
};

module.exports = register;
