const followerSchema = require("../model/followerSchema.js");

const follow = async (req, res, next) => {
  try {
    if (!req.body.shopId) throw new Error("shopId is not provided in req.body");
    const result = await followerSchema.findOne({
      shopId: req.body.shopId,
    });
    
      return res.status(200).json({
        status: true,
        message: " successfully counted follower count",
      });
    }
  catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/shopFollowers/controller/countShopFollower",
    });
  }
}


module.exports = follow;
