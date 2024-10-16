const Cart = require("../model/cartSchema.js");

const addToCart = async (req, res, next) => {
  try {
    const { items, totalAmount } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });
    if (cart) {
      cart.items.push(items);
      cart.totalAmount += totalAmount;
    } else {
      cart = new Cart({
        userId: req.userId,

        items: items,
        totalAmount: totalAmount,
      });
    }

    await cart.save();
    return res
      .status(200)
      .json({ status: true, message: "successfully added to cart" });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "module/cart/controller/addToCart",
    });
  }
};

module.exports = addToCart;
