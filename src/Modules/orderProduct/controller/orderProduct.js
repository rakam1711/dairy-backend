const Cart = require("../../cart/model/cartSchema");
const orders = require("../model/productOrderSchema");

const addProduct = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) return res.status(404).json({ status: true, message: "No Produt in cart" })
        const result = new orders({
            user: cart.userId,
            items: cart.items,
            totalAmount: cart.totalAmount,
            paymetStatus: "pending"
        })

        await result.save();
        // await Cart.deleteOne({ _id: cart._id }); // farhan ==> uncomment after testing
        return res.status(200).json({ status: true, message: "nothing" })


    } catch (err) {
        return res.status(400).json({ status: false, message: err.message })
    }
}

module.exports = addProduct;