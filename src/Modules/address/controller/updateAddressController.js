const Address = require("../model/addressSchema");

const updateAddress = async (req, res, next) => {
  try {
    const data = {
      fullName: req.body.fullName,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      phoneNumber: req.body.phoneNumber,
      addressType: req.body.addressType,
      geolocation: req.body.geolocation,
      notes: req.body.notes,
    };
    for (let key in data) {
      if (data[key] == undefined || data[key] == "") {
        delete data[key];
      }
    }
    const id = req.userId;
    const updated = await Address.findOneAndUpdate({ user: id }, data, {
      new: true,
    });
    return res.status(200).json({
      status: true,
      message: "Address updated successfully.",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "src/Modules/Address/controller/updateAddress",
    });
  }
};

module.exports = updateAddress;
