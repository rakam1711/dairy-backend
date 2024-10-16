const Brand = require("../model/brandSchema.js");

const createBrand = async (req, res, next) => {
  try {
    const { Name, description } = req.body;
    const value = await Brand.findOne({ Name: Name });
    if (value) throw new Error("brand name already present");
    const data = await Brand({
      Name: Name,
      description: description,
    });
    await data.save();
    return res.status(201).json({
      status: true,
      message: "brand created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      location: " Brand/addBrand.js",
    });
  }
};

module.exports = createBrand;
