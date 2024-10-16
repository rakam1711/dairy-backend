const express = require("express");
const unspecifiedRoutesHandler = require("./unspecifiedRoute");
const { finalErrorHandler } = require("../../errorHandler/index.js");
const userRoute = require("./userRouter.js");
const vendorRoute = require("./vendorRoute.js");

const limitter1 = require("../../apiRateLimitter/limitter1.js");
const limitter2 = require("../../apiRateLimitter/limmiter2.js");
const adminroutes = require("./adminRouter.js");
const productRouter = require("./productRouter.js");
const varientRouter = require("./varientRouter.js");

const serviceRoute = require("./serviceRoute.js");

const appRoutes = (app) => {
  app.get("/api/ping", limitter1, (_, res) =>
    res.status(200).json({
      status: true,
      message: `${process.env.PROJECT} Ping Successfully.`,
      timestamp: new Date(),
    })
  );
  app.use("/image", express.static("image"));

  app.use("/admin", adminroutes);
  app.use("/user", userRoute);
  app.use("/vendor", vendorRoute);
  app.use("/services", serviceRoute);
  app.use("/api", productRouter);
  app.use("/varient", varientRouter);

  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;
