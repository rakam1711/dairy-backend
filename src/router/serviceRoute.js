const addService = require("../Modules/services/controller/addServiceController");
const deleteService = require("../Modules/services/controller/deleteServiceController");
const getAllServices = require("../Modules/services/controller/listServiceController");
const updateService = require("../Modules/services/controller/updateServiceController");
const auth = require("../Middleware/JWT/adminAuthentication");

const serviceRoute = require("express").Router();

serviceRoute.post("/addservice", auth, addService);
serviceRoute.post("/deleteservice", auth, deleteService);
serviceRoute.post("/updateservice", auth, updateService);
serviceRoute.post("/listservice", getAllServices);
module.exports = serviceRoute;
