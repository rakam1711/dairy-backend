const Cart = require("../model/cartSchema.js");
const Product = require("../../product/model/productSchema.js");

const listCartItems = async (req, res, next) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price")
      .populate("items.shopId", "name")
      .populate("items.varient", "name")
      .populate("items.subVarient", "name");

    // const product = await Product.find("id");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let totalAmount = 0;
    cart.items.forEach((item) => {
      const productPrice = item.price;
      totalAmount += productPrice * item.unit;
    });

    res.status(200).json({
      status: true,
      message: "successfully cart listed",
      cart,
      totalAmount,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/modules/cart/controller/listCartItem.js",
    });
  }
};

module.exports = listCartItems;
