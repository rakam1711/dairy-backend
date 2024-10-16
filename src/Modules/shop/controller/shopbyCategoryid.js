const Shop = require("../model/shopSchema");
const mongoose = require("mongoose");

const shopbyCategoryid = async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;

    const catId = req.body.Categoryid;
    const isPopularShop = req.body.isPopularShop;
    const subCategoryId = req.body.subCategoryId;
    const shopTag = req.body.shopTag;

    if (!mongoose.Types.ObjectId.isValid(catId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Category ID" });
    }

    const categoryId = new mongoose.Types.ObjectId(catId);

    const matchCondition = {
      categories: categoryId,
      isActive: true,
    };

    if (isPopularShop && isPopularShop !== "") {
      matchCondition.isPopular = true;
    }

    if (subCategoryId) {
      matchCondition.subCategories = {
        $in: [new mongoose.Types.ObjectId(subCategoryId)],
      };
    }

    if (shopTag) {
      matchCondition.shopTag = {
        $in: [new mongoose.Types.ObjectId(shopTag)],
      };
    }

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
            $in: [new mongoose.Types.ObjectId(req.userId), "$followers.userId"],
          },
          isLikedByUser: {
            $in: [new mongoose.Types.ObjectId(req.userId), "$likes.userId"],
          },
        },
      },
    ];

    const shopsWithFollowers = await Shop.aggregate(pipeline);

    const totalMatchCondition = { categories: categoryId };
    if (subCategoryId) {
      totalMatchCondition.subCategories = {
        $in: [new mongoose.Types.ObjectId(subCategoryId)],
      };
    }
    if (shopTag) {
      totalMatchCondition.shopTag = {
        $in: [new mongoose.Types.ObjectId(shopTag)],
      };
    }

    const totalShops = await Shop.countDocuments(totalMatchCondition);

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
      location: "sec/Modules/shop/controller/shopbycategoryid",
    });
  }
};

module.exports = shopbyCategoryid;
