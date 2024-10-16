const Address = require("../model/addressSchema.js");

const addAddress = async (req, res, next) => {
  try {
    const mustData = {
      fullName: req.body.fullName,
      street: req.body.street,
      apartment: req.body.apartment,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      addressType: req.body.addressType,
      geolocation: req.body.geolocation,
      notes: req.body.notes,
    };
    for (let key in mustData) {
      if (mustData[key] == undefined || mustData[key] == "") {
        throw new Error(`invalid field ${key}`);
      }
    }

    const address = Address({
      user: req.userId,
      fullName: mustData.fullName,
      street: mustData.street,
      apartment: mustData.apartment,
      city: mustData.city,
      state: mustData.state,
      pinCode: mustData.pinCode,
      country: mustData.country,
      phoneNumber: mustData.phoneNumber,
      addressType: mustData.addressType,
      geolocation: mustData.geolocation,
      notes: mustData.notes,
    });

    const data = await address.save();
    return res.status(201).json({
      status: true,
      message: "address added successfully",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/address/controller/addaddress",
    });
  }
};

module.exports = addAddress;
