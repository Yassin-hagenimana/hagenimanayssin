module.exports = (app) => {
  const Meters = require("../controllers/meter.controller.js");

  var router = require("express").Router();


  router.post("/", Meters.create);
  router.post("/loadToken", Meters.loadToken);
  router.get("/:number", Meters.findOne);
  router.get("/:number/details", Meters.getMeterDetails);
  router.put("/:number", Meters.update);
  router.delete("/:number", Meters.delete);
  app.use("/api/meters", router);
};
