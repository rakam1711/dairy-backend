const Cart = require("../model/cartSchema.js");

const updateCartItems = async (req, res, next) => {
  try {
    const { productId, itemId, varient, subVarient, unit, price, amount } =
      req.body;
    const cart = await Cart.findOne({
      userId: req.userId,
      productId: productId,
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found for this user and product" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }
    if (varient) cart.items[itemIndex].varient = varient;
    if (subVarient) cart.items[itemIndex].subVarient = subVarient;
    if (unit) cart.items[itemIndex].unit = unit;
    if (price) cart.items[itemIndex].price = price;
    if (amount) cart.items[itemIndex].amount = amount;

    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.amount, 0);

    const updatedCart = await cart.save();

    res.status(200).json({
      status: true,
      message: "successfully cart updated",
      updatedCart: updatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/modules/cart/controller/updateCartItem.js",
    });
  }
};

module.exports = updateCartItems;
