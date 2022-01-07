"use strict";
// 登录检查 检测是否登录

async function loginCheck (ctx, next) {
  // 判断用户是否登录
  if (ctx.session.userInfo) {
    await next();
    return;
  }
  // 对url做URI处理 encodeURIComponent() 函数可把字符串转换为
  // URI 组件进行编码  比如对 /;?@……编译成16进制的字符串
  const currentUrl = ctx.url;
  // 对url做URI处理
  const redirectUrl = "/login?url=" + encodeURIComponent(currentUrl);
  await ctx.redirect(redirectUrl);
}
module.exports = {
  loginCheck,
};
