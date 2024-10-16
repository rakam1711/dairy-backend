const Shop = require("../model/shopSchema.js");
const mongoose = require("mongoose");

const shopByShopId = async (req, res, next) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;
    const shopId = req.body.shopId;

    const sId = new mongoose.Types.ObjectId(shopId);
    ` `;
    const matchCondition = {
      _id: sId,
    };
    const pipeline = [
      { $match: matchCondition },

      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "shopId",
          as: "followers",
        },
      },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "shopId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "shop",
          as: "products",
        },
      },
      // Lookup for subCategories
      {
        $lookup: {
          from: "subcategories", // Name of the subcategory collection
          localField: "subCategories",
          foreignField: "_id",
          as: "subCategoryDetails",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          isActive: 1,
          owner: 1,
          street: 1,
          city: 1,
          state: 1,
          postalCode: 1,
          country: 1,
          phone: 1,
          email: 1,
          website: 1,
          logo: 1,
          rating: 1,
          numberOfRatings: 1,
          shopId: 1,
          subCategories: {
            $map: {
              input: "$subCategoryDetails",
              as: "subCategory",
              in: {
                _id: "$$subCategory._id",
                name: "$$subCategory.name", // Include subcategory name
              },
            },
          },
          createdAt: 1,
          updatedAt: 1,
          followerCount: { $size: "$followers" },
          likeCount: { $size: "$likes" },
          productCount: { $size: "$products" },
          isFollowedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$followers.userId"],
          },
          isLikedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$likes.userId"],
          },
        },
      },
    ];
    const result = await Shop.aggregate(pipeline);

    return res.status(200).json({
      status: true,
      message: "shop listed successfully",
      result: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "modules/shop/shopByShopId",
    });
  }
};

module.exports = shopByShopId;
