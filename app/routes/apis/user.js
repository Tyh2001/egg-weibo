"use strict";

module.exports = (app) => {
  const { router, controller } = app;
  const loginCheck = app.middleware.loginChecks.loginCheck;
  // api
  router.post(
    "/api/user/register",
    app.middleware.validate(),
    controller.user.register
  );

  // 用户是否存在的路由  isExist
  router.post("/api/user/isExist", controller.user.isExist);

  // 登录
  router.post("/api/user/login", controller.user.login);

  // 删除当前用户 不能删除别人
  router.delete("/api/user/delete", loginCheck, controller.user.deleteUser);

  // 更改用户信息
  // 保证用户登录状态
  // 更改信心的格式校验
  router.post(
    "/api/user/changeUserInfo",
    loginCheck,
    app.middleware.validate(),
    controller.user.changeUserInfo
  );

  // 更改密码
  router.post(
    "/api/user/chengepassword",
    loginCheck,
    app.middleware.validate(),
    controller.user.chengepassword
  );

  // 注销账号
  router.post("/api/user/logout", loginCheck, controller.user.logout);

  // 获取@人列表
  router.get("/api/user/getAtList", loginCheck, controller.user.getAtList);
};
