"use strict";
// 上传博中间件

const { ErrorModel } = require("../utils/resultModel");
const { jsonRulesFileInfo } = require("../utils/ErrorModel");

module.exports = () => {
  return async (ctx, next) => {
    // 获取前段传递的数据
    const data = ctx.request.body;

    // 校验数据格式
    await ctx
      // schema.blog 这个文件夹下的规则
      .validate("schema.blog", data)
      .then(async () => {
        // 校验成功 可以注册
        await next();
      })
      .catch(async (err) => {
        // 校验失败，打印错误信息
        console.log(err);
        // 给客户返回错误信息
        ctx.body = new ErrorModel(jsonRulesFileInfo);
        return;
      });
  };
};
