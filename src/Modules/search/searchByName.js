const Product = require("../product/model/productSchema.js");

const aggregatedSearch = async (req, res, next) => {
  try {
    const name = req.body.name;
    const results = await Product.aggregate([
      {
        $lookup: {
          from: "subCategory",
          localField: "subcategoryId",
          foreignField: "_id",
          as: "subcategory",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "subcategory.categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: name, $options: "i" } },
            { "subcategory.name": { $regex: name, $options: "i" } },
            { "category.name": { $regex: name, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          "subcategory.name": 1,
          "category.name": 1,
        },
      },
    ]);

    return results;
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      location: "src/Modules/search/searchByName",
    });
  }
};

module.exports = aggregatedSearch;
