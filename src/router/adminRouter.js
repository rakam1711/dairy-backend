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

const listAdmin = require("../Modules/admin/controller/listAdmin.js");
const updateAdmin = require("../Modules/admin/controller/updateAdmin.js");

const listUser = require("../Modules/user/controller/listUser.js");

adminroutes.post("/createadmin", authenticateAdmin, createAdmin);
adminroutes.post("/listadmin", authenticateAdmin, listAdmin);
adminroutes.post("/updateadmin", authenticateAdmin, updateAdmin);

adminroutes.post("/adminlogin", loginAdmin);

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

adminroutes.get("/listuser", authenticateAdmin, listUser);

module.exports = adminroutes;
