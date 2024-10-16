const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const shop = require("../../shop/model/shopSchema.js");

const addProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const shop1 = await shop.findOne({ owner: req.vendorId });
      const mustData = {
        shop: shop1._id,
        vendor: req.vendorId,
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.categoryId,
        subCategory: JSON.parse(req.body.subCategoryId),
        price: req.body.price,
        stock: req.body.stock,
        productShipingDetails: JSON.parse(req.body.productShipingDetails),
        tag: JSON.parse(req.body.tagId),
        minOrderQnt: req.body.minOrderQnt,
        maxOrderQnt: req.body.minOrderQnt,
        specialLabel: req.body.specialLabel,
        availableForSubscription: req.body.availableForSubscription,
        frequency: req.body.frequency,
        varient: JSON.parse(req.body.varientId),
        subVarient: req.body.subVarient,
        deliveryTimeline: req.body.deliveryTimeline,
        deliveryInstruction: req.body.deliveryInstruction,
        isProduct: req.body.isProduct,
        colorCode: req.body.colorCode,
        shopTag: req.body.shopTag,
      };
      if (req.files) {
        mustData.images = req.files.map((file) => BASE_URL + file.path);
      }

      const product = Product({
        shop: mustData.shop,
        vendor: mustData.vendor,
        name: mustData.name,
        description: mustData.description,
        brand: mustData.brand,
        category: mustData.category,
        subCategory: mustData.subCategory,
        price: mustData.price,
        stock: mustData.stock,
        images: mustData.images,
        productShipingDetails: mustData.productShipingDetails,
        tag: mustData.tag,
        minOrderQnt: mustData.minOrderQnt,
        maxOrderQnt: mustData.minOrderQnt,
        specialLabel: mustData.specialLabel,
        availableForSubscription: mustData.availableForSubscription,
        frequency: mustData.frequency,
        varient: mustData.varient,
        subVarient: mustData.subVarient,
        deliveryTimeline: mustData.deliveryTimeline,
        deliveryInstruction: mustData.deliveryInstruction,
        isProduct: mustData.isProduct,
        colorCode: mustData.colorCode,
        shopTag: mustData.shopTag,
      });

      await product.save();
      return res.status(201).json({
        status: true,
        message: "Product created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/product/controller/addProductController.js",
      });
    }
  });
};

module.exports = addProduct;
