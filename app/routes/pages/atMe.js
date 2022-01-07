"use strict";
// @ 页面
// async 是异步的意思  是 promise 的语法糖 写起来比较舒服的意思
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/atMe", controller.atMe.index);
};
