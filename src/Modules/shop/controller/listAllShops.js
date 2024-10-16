const Shop = require("../model/shopSchema");

const listAllShop = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;

 
    const shops = await Shop.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({ status: true, result: shops });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/listAllShop",
    });
  }
};

module.exports = listAllShop;
