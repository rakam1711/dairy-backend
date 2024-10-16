const mongoose = require("mongoose");
const Product = require("../model/productSchema.js");

const productByProductId = async (req, res, next) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.body.id);
    const pipeline = [
      {
        $match: { _id: productId },
      },

      // {
      //   $lookup: {
      //     from: "shops",
      //     localField: "shop",
      //     foreignField: "_id",
      //     as: "shopDetails",
      //   },
      // },

      {
        $lookup: {
          from: "vendormodels",
          localField: "vendor",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
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
        $lookup: {
          from: "subvarients",
          localField: "subVarient",
          foreignField: "_id",
          as: "subVarientDetails",
        },
      },

      {
        $lookup: {
          from: "shoptags",
          localField: "shopTag",
          foreignField: "_id",
          as: "shopTagDetails",
        },
      },

      {
        $project: {
          name: 1,
          description: 1,
          vendorDetails: 1,
          price: 1,
          stock: 1,
          images: 1,
          productShipingDetails: 1,
          tag: 1,
          minOrderQnt: 1,
          maxOrderQnt: 1,
          specialLabel: 1,
          availableForSubscription: 1,
          frequency: 1,
          deliveryTimeline: 1,
          deliveryInstruction: 1,
          rating: 1,
          numRatings: 1,
          isProduct: 1,
          colorCode: 1,
          isActive: 1,
          // shopDetails: { $arrayElemAt: ["$shopDetails", 0] },
          vendorDetails: { $arrayElemAt: ["$vendorDetails", 0] },
          // categoryDetails: { $arrayElemAt: ["$categoryDetails", 0] },
          subCategories: {
            $map: {
              input: "$subCategoryDetails",
              as: "subCategory",
              in: {
                _id: "$$subCategory._id",
                name: "$$subCategory.name",
              },
            },
          },
          // subVarientDetails: { $arrayElemAt: ["$subVarientDetails", 0] },
          // shopTagDetails: 1,
        },
      },
    ];
    const product = await Product.aggregate(pipeline);

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = productByProductId;
