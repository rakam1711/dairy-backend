const Cart = require("../model/cartSchema.js");

const deleteCartItems = async (req, res, next) => {
  try {
    const { itemId } = req.body;

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (itemId) {
      cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);

      await cart.save();
      res.status(200).json({
        status: true,
        message: "successfully cart deleted",
        cart,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/modules/cart/controller/deleteCartItems.js",
    });
  }
};

module.exports = deleteCartItems;
