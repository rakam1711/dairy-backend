const Shop = require("../model/shopSchema.js");

const deleteShop = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    if (!shopId) throw new Error("shopId is required");
    const data = await Shop.findById({ _id: shopId });
    deleteImage(data.logo);
    await Shop.findOneAndDelete(
      { _id: shopId },
      { isActive: false },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "shop deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Shop/controller/deleteShopController.js",
    });
  }
};

module.exports = deleteShop;
