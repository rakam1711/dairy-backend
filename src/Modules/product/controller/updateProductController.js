const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const shop = require("../../shop/model/shopSchema.js");

const                                                                                                                                                      updateProduct = async (req, res, next) => {
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
      const productId = req.body.productId;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }

      const shop1 = await shop.findOne({ owner: req.vendorId });

      const mustData = {
        shop: shop1 ? shop1._id : product.shop,
        vendor: req.vendorId || product.vendor,
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.categoryId,
        subCategory: req.body.subCategoryId,
        price: req.body.price,
        stock: req.body.stock,
        productShipingDetails: req.body.productShipingDetails,
        tag: req.body.tagId,
        minOrderQnt: req.body.minOrderQnt,
        maxOrderQnt: req.body.maxOrderQnt,
        specialLabel: req.body.specialLabel,
        availableForSubscription: req.body.availableForSubscription,
        frequency: req.body.frequency,
        varient: req.body.varientId,
        subVarient: req.body.subVarient,
        deliveryTimeline: req.body.deliveryTimeline,
        deliveryInstruction: req.body.deliveryInstruction,
        isProduct: req.body.isProduct,
        colorCode: req.body.colorCode,
        rating: req.body.rating,
        numRatings: req.body.numRatings,
      };

      for (let key in mustData) {
        if (mustData[key] !== undefined && mustData[key] !== "") {
          product[key] = mustData[key];
        }
      }

      if (!req.body.imageIndex && req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => BASE_URL + file.path);
        product.images = [...product.images, ...newImages];
      } else if (
        req.body.imageIndex !== undefined &&
        req.files &&
        req.files.length > 0
      ) {
        const imageIndex = parseInt(req.body.imageIndex, 10);
        if (imageIndex >= 0 && imageIndex < product.images.length) {
          product.images[imageIndex] = BASE_URL + req.files[0].path;
        } else {
          return res.status(400).json({
            status: false,
            message: "Invalid image index.",
          });
        }
      }

      if (mustData.productShipingDetails) {
        product.productShipingDetails = JSON.parse(
          mustData.productShipingDetails
        );
      }

      await product.save();
      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/product/controller/updateProductController.js",
      });
    }
  });
};

module.exports = updateProduct;
