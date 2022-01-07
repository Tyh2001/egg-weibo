"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", app.middleware.loginChecks.loginCheck, controller.home.index);

  // 引入页面
  require("./routes/pages/user")(app);
  require("./routes/pages/profile")(app);
  require("./routes/pages/square")(app);
  require("./routes/pages/atMe")(app);

  // 引入api
  require("./routes/apis/user")(app);
  require("./routes/apis/upload")(app);
  require("./routes/apis/blog")(app);
  require("./routes/apis/profile")(app);

  // 404
  router.get("*", controller.home.notFound);
};
