"use strict";
/** 
*处理相应结果 对成功和失败的信息统一处理  注册时检测用户名是否存在
jsdoc 形式注释
*@author tyh
*/

// 返回结果 errno 代表错误码
// 0代表没有错误
// data是数据
// message是错误信息

// 声明基类
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

// 成功 Successmodel
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    });
  }
}
// 失败 Errormodel
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({
      errno,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
