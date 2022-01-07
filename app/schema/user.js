"use strict";

/**
 * schema
 * @description user 数据格式校验
 */

//  用户名 密码 性别 昵称 头像 城市 格式校验
// 配置规则
module.exports = {
  type: "object",
  // 对象里面有哪些属性
  properties: {
    username: {
      type: "string",
      // 最小长度和最大长度
      minLength: 5,
      maxLength: 15,
      pattern: "^[a-zA-Z0-9][a-zA-Z0-9_]+$",
    },
    password: {
      // 数据类型 字符串
      type: "string",
      // 最小长度和最大长度
      minLength: 3,
      maxLength: 15,
      // pattern: '^\.$',
    },
    gender: {
      type: "number",
      minimum: 1,
      maximum: 3,
    },
    nickname: {
      type: "string",
      minimum: 3,
      minimum: 10,
    },
    avatar: {
      type: "string",
      maxLength: 255,
    },
    city: {
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
  },
  $async: true, //异步
};
