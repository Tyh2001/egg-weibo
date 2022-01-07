"use strict";

module.exports = {
  // 将来可能会有别的错误信息，暂时只有这一个，后面在扩展
  // 用户名不存在
  registerUserNameNotExistInfo: {
    errno: 10001,
    message: "用户名未存在",
  },
  // 为了方便大家之后的操作，可以将以后用到的信息都写到这里， 这个不是一个技术活，体力活可以以课程中直接复制给学员
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10002,
    message: "用户名已存在",
  },
  // 注册失败
  registerFailInfo: {
    errno: 10003,
    message: "注册失败，请重试",
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: "登录失败，用户名或密码错误",
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: "您尚未登录",
  },
  // 修改密码失败
  changePasswordFailInfo: {
    errno: 10006,
    message: "修改密码失败，请重试",
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: "上传文件尺寸过大",
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    errno: 10008,
    message: "修改基本信息失败",
  },
  // json rules 校验失败
  jsonRulesFileInfo: {
    errno: 10009,
    message: "数据格式校验错误",
  },
  // 删除用户失败
  deleteUserFailInfo: {
    errno: 10010,
    message: "删除用户失败",
  },
  // 添加关注失败
  addFollowerFailInfo: {
    errno: 10011,
    message: "添加关注失败",
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    errno: 10012,
    message: "取消关注失败",
  },
  // 创建微博失败
  createBlogFailInfo: {
    errno: 11001,
    message: "创建微博失败，请重试",
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    errno: 11002,
    message: "删除微博失败，请重试",
  },
};
