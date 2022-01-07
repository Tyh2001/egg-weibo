"use strict";

// 上传图片
module.exports = (app) => {
  const { router, controller } = app;
  // 上传图片路由
  // 和前端调接口对应
  // controller.upload.uploadImg  和对应的文件夹和方法对应
  router.post("/api/uploadImg", controller.upload.uploadImg);
};
