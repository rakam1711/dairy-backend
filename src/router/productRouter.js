const productRouter = require("express").Router();

const addProduct = require("../Modules/product/controller/newProjController/AddNewProduct.js");
const listProduct = require("../Modules/product/controller/newProjController/listproduct.js");



productRouter.post("/addProduct", addProduct);
productRouter.post("/listProduct", listProduct);

module.exports = productRouter;
