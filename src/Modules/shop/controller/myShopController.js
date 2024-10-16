const Shop = require("../model/shopSchema.js");
const myShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    let shop = "";
    if (req.role == "VENDOR") {
      shop = await Shop.find({ owner: req.vendorId })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("categories", { name: 1 })
        .populate("subCategories", { name: 1 })
        .populate("shopTag", { name: 1 });
    }
    if (shop.length > 0) {
      if (!shop[0].isActive)
        return res.status(200).json({
          message: "data listed successfully",
          isVerify: {
            status: false,
            message:
              "Your verification is pending. Please contact to 9311620027",
          },
          status: true,
          isShop: shop.length > 0 ? true : false,
          data: shop ? shop : [],
        });
    }
    return res.status(200).json({
      message: "data listed successfully",
      isVerify: {
        status: true,
        message: "shop verified",
      },
      status: true,
      isShop: shop.length > 0 ? true : false,
      data: shop ? shop : [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
      location: "src/Modules/shop/controller/myShopController",
    });
  }
};

module.exports = myShop;
