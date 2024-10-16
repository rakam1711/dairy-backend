const Brand = require("../model/brandSchema.js");

const listBrand = async (req, res, next) => {
  try {
    const key = req.body.name;
    const brand = await Brand.find({
      Name: { $regex: `${key}`, $options: "i" },
    });
    return res.status(200).json({
      message: "successfully listed Brands",
      status: true,
      data: brand,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/brand/listBrand.js",
    });
  }
};

module.exports = listBrand;
