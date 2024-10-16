const Product = require("../../product/model/productSchema");
const mongoose = require("mongoose");

const searchdynamic = async (req, res) => {
  try {
    const item = req.body.searchItem;
    const tags = req.body.tags;
    const category = req.body.categories;
    const service = req.body.service; // Service from the request body
    const shop = req.body.shopId; // shop from the request body
    const priceRange = req.body.priceRange; // 200-2000 or 3000 - 5000
    const priceLowtoHigh = req.body.priceLowtoHigh; // "HighToLow" or "LowToHigh"

    const pipeline = await getPipeline(
      item,
      category,
      tags,
      service,
      shop,
      priceRange,
      priceLowtoHigh
    ); // Pass service to the pipeline

    // Aggregate the products using the pipeline
    const products = await Product.aggregate(pipeline);

    // Extract categories and shops from the result
    const categories = products.flatMap((p) => p.categoryData);
    const shops = products.flatMap((p) => p.shopData);

    // Remove duplicate categories based on _id
    const uniqueCategories = categories.filter(
      (category, index, self) =>
        index ===
        self.findIndex((c) => c._id.toString() === category._id.toString())
    );

    // Remove duplicate shops based on _id
    const uniqueShops = shops.filter(
      (shop, index, self) =>
        index ===
        self.findIndex((s) => s._id.toString() === shop._id.toString())
    );

    return res.status(200).json({
      status: true,
      products,
      categories: uniqueCategories,
      shops: uniqueShops,
    });
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: e.message,
      location: "src/Modules/search/controller/searchdynamic",
    });
  }
};

module.exports = searchdynamic;

const getPipeline = async (
  item,
  category,
  tags,
  service,
  shop,
  priceRange,
  priceLowtoHigh
) => {
  try {
    // Create a base match object
    let matchConditions = [];

    // If search item is provided, add search-related match conditions
    if (item) {
      matchConditions.push({
        $or: [
          { name: { $regex: item, $options: "i" } }, // Case-insensitive search on product name
          { description: { $regex: item, $options: "i" } }, // Case-insensitive search on product description
          { "categoryData.name": { $regex: item, $options: "i" } }, // Search in category name
          { "subCategoryData.name": { $regex: item, $options: "i" } }, // Search in subcategory name
          { "shopData.name": { $regex: item, $options: "i" } }, // Search in shop name
        ],
      });
    }

    // If category is provided, add category match condition
    if (category && category.length > 0) {
      matchConditions.push({
        category: {
          $in: category.map((id) => new mongoose.Types.ObjectId(id)),
        },
      });
    }

    if (shop) {
      matchConditions.push({
        shop: shop,
      });
    }
    // If tags are provided, add tag match condition
    if (tags && tags.length > 0) {
      matchConditions.push({
        tag: { $in: tags.map((id) => new mongoose.Types.ObjectId(id)) },
      });
    }

    if (priceRange && priceRange.length === 2) {
      const [minPrice, maxPrice] = priceRange;
      matchConditions.push({
        price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
      });
    }

    // Combine all match conditions
    const pipeline = [
      { $match: { isActive: true } },
      // Lookup for categories in product pipeline
      {
        $lookup: {
          from: "categories", // Join the Category collection
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      // Lookup for subcategories in product pipeline
      {
        $lookup: {
          from: "subcategories", // Join the SubCategory collection
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryData",
        },
      },
      // Lookup for shops related to the products
      {
        $lookup: {
          from: "shops", // Join the Shop collection
          localField: "shop",
          foreignField: "_id",
          as: "shopData",
        },
      },
      // Lookup for service related to categories
      {
        $lookup: {
          from: "services", // Join the Service collection
          localField: "categoryData.service",
          foreignField: "_id",
          as: "serviceData",
        },
      },
      // If service is provided, match only products where the category belongs to the given service
      ...(service
        ? [
            {
              $match: {
                "serviceData._id": new mongoose.Types.ObjectId(service),
              },
            },
          ]
        : []),
      // Match to search in name, description, categories, and subcategories
      {
        $match: {
          $and: matchConditions.length > 0 ? matchConditions : [{}],
        },
      },
      // Project the necessary fields
      {
        $project: {
          __v: 0,
          updatedAt: 0,
          createdAt: 0,
        },
      },
    ];

    if (priceLowtoHigh) {
      const sortOrder = priceLowtoHigh === "LowToHigh" ? 1 : -1;
      pipeline.push({
        $sort: { price: sortOrder },
      });
    }

    return pipeline;
  } catch (e) {
    throw e;
  }
};
