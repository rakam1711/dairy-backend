const Orders = require("../model/productOrderSchema");
const mongoose = require("mongoose");

const getMyOrder = async (req, res) => {
    try {
        // const user =  new mongoose.Types.ObjectId(req.userId);
        const result = await Orders.find({ user: req.userId }).populate("items.productId");
        return res.status(200).json({ status: true, result: result })
    } catch (err) {
        return res.status(400).json({ status: false, message: err.message })
    }
}

module.exports = getMyOrder;