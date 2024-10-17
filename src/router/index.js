const express = require("express");
const unspecifiedRoutesHandler = require("./unspecifiedRoute");
const { finalErrorHandler } = require("../../errorHandler/index.js");
const userRoute = require("./userRouter.js");
const adminroutes = require("./adminRouter.js");
const productRouter = require("./productRouter.js");

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
  app.use("/api", productRouter);

  app.use(unspecifiedRoutesHandler);
  app.use(finalErrorHandler);
};

module.exports = appRoutes;
