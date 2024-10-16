const Order = require("../model/productOrderSchema.js");
const mongoose = require("mongoose");

const Myorders = async (req, res) => {
  try {
    const shopId = req.body.shopId;
    const productStatus = req.body.ProductStatus || "pending";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({ status: false, result: [] });
    }

    const orders = await Order.aggregate([
      {
        $match: {
          "items.shopId": new mongoose.Types.ObjectId(shopId), // Match shopId in the items array
          "items.ProductStatus": productStatus,
        },
      },
      {
        $unwind: "$items", // Unwind the items array to process each item separately
      },
      {
        $match: {
          "items.shopId": new mongoose.Types.ObjectId(shopId), // Match shopId again for unwound items
        },
      },
      {
        $lookup: {
          from: "products", // Collection name should be lowercase
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails", // Unwind the productDetails array to get a single object
          preserveNullAndEmptyArrays: true, // To handle cases where productDetails might not exist
        },
      },
      {
        $group: {
          _id: "$_id", // Group back by orderId
          user: { $first: "$user" },
          totalAmount: { $first: "$totalAmount" },
          paymetStatus: { $first: "$paymetStatus" },
          items: {
            $push: {
              productId: "$items.productId",
              shopId: "$items.shopId",
              productDetails: "$productDetails", // Include the populated product details
              varient: "$items.varient",
              subVarient: "$items.subVarient",
              unit: "$items.unit",
              price: "$items.price",
              amount: "$items.amount",
              tag: "$items.tag",
            },
          },
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        status: false,
        result: [],
        message: "No orders found for the shop",
      });
    }

    return res.status(200).json({ status: true, result: orders });
  } catch (error) {
    console.error("Error in Myorders:", error);
    return res
      .status(400)
      .json({ status: false, result: [], message: error.message });
  }
};

module.exports = Myorders;
