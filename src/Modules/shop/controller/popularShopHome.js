const Shop = require("../model/shopSchema");
const mongoose = require("mongoose");

const popularShopHome = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;
    const isPopularShop = req.body.isPopularShop;
    const user = req.body.userId;

    const matchCondition = {
      isActive: true,
    };
    if (isPopularShop && isPopularShop != "") {
      matchCondition.isPopular = true;
    }
    const pipeline = [
      // Match shops by category ID
      { $match: matchCondition },

      // Pagination: Skip and limit
      { $skip: skip },
      { $limit: limit },

      // Lookup to join the followers collection by shopId
      {
        $lookup: {
          from: "followers", // Use actual collection name of Follower
          localField: "_id", // Match by shopId in the Shop collection
          foreignField: "shopId", // Match with the shopId in the Follower collection
          as: "followers", // Name of the joined field
        },
      },
      {
        $lookup: {
          from: "likes", // Use actual collection name of Likes
          localField: "_id", // Match by shopId in the Shop collection
          foreignField: "shopId", // Match with the shopId in the Likes collection
          as: "likes", // Name of the joined field
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
          createdAt: 1,
          updatedAt: 1,
          followerCount: { $size: "$followers" },

          likeCount: { $size: "$likes" },
          isFollowedByUser: {
            $in: [user, "$followers.userId"],
          },
          isLikedByUser: {
            $in: [user, "$likes.userId"],
          },
        },
      },
    ];

    const shopsWithFollowers = await Shop.aggregate(pipeline);
    const totalShops = await Shop.countDocuments();

    const pagination = {
      maxCount: Math.ceil(totalShops / limit),
      page: page,
      limit: limit,
    };

    return res
      .status(200)
      .json({ status: true, result: shopsWithFollowers, pagination });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "sec/Modules/shop/controller/popularShopHome",
    });
  }
};

module.exports = popularShopHome;
