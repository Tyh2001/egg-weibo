"use strict";
// 我的空间
module.exports = (app) => {
  // 获取router和controller
  const { router, controller } = app;
  // 我的空间
  // app.middleware.loginChecks 中间件 判断用户是否登录
  router.get(
    "/profile",
    app.middleware.loginChecks.loginCheck,
    controller.profile.index
  );

  router.get(
    "/profile/:username",
    app.middleware.loginChecks.loginCheck,
    controller.profile.profileUser
  );
};
