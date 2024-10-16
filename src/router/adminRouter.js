const adminroutes = require("express").Router();

const authenticateAdmin = require("../Middleware/JWT/adminAuthentication.js");

const createAdmin = require("../Modules/admin/controller/createAdmin.js");
const loginAdmin = require("../Modules/admin/controller/loginAdmin");
const createCategory = require("../Modules/category/controller/createCategory.js");
const getAllCategory = require("../Modules/category/controller/getAllCategory.js");
const categoryByServiceId = require("../Modules/category/controller/categoryByServiceId.js");
const updateCategory = require("../Modules/category/controller/updateCategory.js");
const deleteCategory = require("../Modules/category/controller/deleteCategory.js");
const createSubCategory = require("../Modules/subCategory/controller/createSubCategory.js");
const deleteSubCategory = require("../Modules/subCategory/controller/deleteSubCategory.js");
const listSubCategory = require("../Modules/subCategory/controller/listSubCategory.js");
const updateSubCategory = require("../Modules/subCategory/controller/updateSubCategory.js");
const createBannerController = require("../Modules/banner/controller/createBannerController.js");
const createSubVarient = require("../Modules/subVarient/controller/createSubVarient.js");
const listSubVarient = require("../Modules/subVarient/controller/listSubVarient.js");
const updateShop = require("../Modules/shop/controller/updateShopByAdmin.js");
const listAdmin = require("../Modules/admin/controller/listAdmin.js");
const updateAdmin = require("../Modules/admin/controller/updateAdmin.js");
const createBrand = require("../Modules/brand/controller/addBrand.js");
const deleteBrand = require("../Modules/brand/controller/deleteBrand.js");
const nonActiveListShop = require("../Modules/shop/controller/listNonActiveShops.js");
const updateShopByAdmin = require("../Modules/shop/controller/updateShopByAdmin.js");
const listVendor = require("../Modules/vendor/controller/listVendor.js");
const listUser = require("../Modules/user/controller/listUser.js");
const createshopTag = require("../Modules/shopTag/controller/addShopTag.js");
const deleteshopTag = require("../Modules/shopTag/controller/deleteShopTag.js");
const listshopTag = require("../Modules/shopTag/controller/listShopTag.js");
const editProfile = require("../Modules/vendor/controller/editProfile.js");

adminroutes.post("/createadmin", authenticateAdmin, createAdmin);
adminroutes.post("/listadmin", authenticateAdmin, listAdmin);
adminroutes.post("/updateadmin", authenticateAdmin, updateAdmin);

adminroutes.post("/adminlogin", loginAdmin);

adminroutes.post("/createshopTag", authenticateAdmin, createshopTag);
adminroutes.post("/deleteshopTag", authenticateAdmin, deleteshopTag);
adminroutes.post("/listshopTag", listshopTag);

adminroutes.post("/createcategory", authenticateAdmin, createCategory);
adminroutes.post("/deletecategory", authenticateAdmin, deleteCategory);
adminroutes.post("/listcategory", getAllCategory);
adminroutes.post("/categorybyserviceid", categoryByServiceId);
adminroutes.post("/updatecategory", authenticateAdmin, updateCategory);

adminroutes.post("/createsubcategory", authenticateAdmin, createSubCategory);
adminroutes.post("/deletesubcategory", authenticateAdmin, deleteSubCategory);
adminroutes.post("/listsubcategory", listSubCategory);
adminroutes.post("/updatesubcategory", authenticateAdmin, updateSubCategory);

adminroutes.post("/createbanner", authenticateAdmin, createBannerController);

adminroutes.post("/createsubvarient", authenticateAdmin, createSubVarient);
adminroutes.post("/listsubvarient", authenticateAdmin, listSubVarient);

adminroutes.post("/updateShop", authenticateAdmin, updateShop);

adminroutes.post("/createbrand", authenticateAdmin, createBrand);
adminroutes.post("/deletebrand", authenticateAdmin, deleteBrand);

adminroutes.post("/updateShopByAdmin", authenticateAdmin, updateShopByAdmin);

adminroutes.post("/nonActiveListShop", authenticateAdmin, nonActiveListShop);

adminroutes.get("/listvendor", authenticateAdmin, listVendor);
adminroutes.get("/listuser", authenticateAdmin, listUser);

adminroutes.post("/updatevendor", editProfile);

module.exports = adminroutes;
