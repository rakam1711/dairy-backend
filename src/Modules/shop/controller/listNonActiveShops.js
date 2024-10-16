const Shop = require("../model/shopSchema.js");
const nonActiveListShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    if (req.role == "ADMIN" || req.role == "SUBADMIN") {
      const shop = await Shop.find({ isActive: false })
        .skip((page - 1) * limit)
        .limit(limit);

      return res.status(200).json({
        message: "Non active shops listed successfully",
        status: true,
        data: shop,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
      location: "src/Modules/shop/controller/ListNonActiveShop",
    });
  }
};

module.exports = nonActiveListShop;
