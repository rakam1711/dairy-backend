const Product = require("../model/productSchema.js");
const mongoose = require("mongoose");

const listProducts = async (req, res, next) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let page = parseInt(req.body.page) || 1;
    const skip = (page - 1) * limit;

    let shopId = req.body.shopId;
    let subCategoryId = req.body.subCategoryId;

    const matchCondition = { isActive: true };

    if (shopId) {
      matchCondition.shop = new mongoose.Types.ObjectId(shopId);
    }

    if (subCategoryId) {
      matchCondition.subCategory = new mongoose.Types.ObjectId(subCategoryId);
    }

    const pipeline = [
      { $match: matchCondition },
      {
        $lookup: {
          from: "shops",
          localField: "shop",
          foreignField: "_id",
          as: "shopDetails",
        },
      },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryDetails",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          vendor: 1,
          description: 1,
          isActive: 1,
          brand: 1,
          category: 1,
          subCategory: {
            $map: {
              input: "$subCategoryDetails",
              as: "subCategory",
              in: {
                _id: "$$subCategory._id",
                name: "$$subCategory.name",
              },
            },
          },
          price: 1,
          stock: 1,
          rating: 1,
          numRatings: 1,
          colorCode: 1,
          images: 1,
          productShipingDetails: 1,
          deliveryTimeline: 1,
          deliveryInstruction: 1,
          availableForSubscription: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const products = await Product.aggregate(pipeline);

    // Respond with the fetched products
    return res.status(200).json({
      status: true,
      message: "Products listed successfully",
      data: products,
    });
  } catch (err) {
    // Error handling
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProducts.js",
    });
  }
};

module.exports = listProducts;
