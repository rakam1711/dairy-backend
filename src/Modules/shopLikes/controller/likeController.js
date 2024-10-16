const likeSchema = require("../model/likeSchema.js");

const like = async (req, res, next) => {
  try {
    if (!req.userId) throw new Error("userId is not provided ");
    if (!req.body.shopId) throw new Error("shopId is not provided in req.body");
    const result = await likeSchema.findOne({
      userId: req.userId,
      shopId: req.body.shopId,
    });
    if (!result) {
      const data = await likeSchema({
        userId: req.userId,
        shopId: req.body.shopId,
      });
      await data.save();
      return res.status(200).json({
        status: true,
        message: "like successfully",
      });
    } else {
      await likeSchema.findOneAndDelete({
        userId: req.userId,
        shopId: req.body.shopId,
      });
      return res.status(200).json({
        status: true,
        message: "unlike Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/shopLike/controller/likeController",
    });
  }
};

module.exports = like;
