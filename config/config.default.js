"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + "_1600074257370_610";

  config.middleware = [];

  const userConfig = {};

  // 禁用csrf防御
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 配置nunjucks模板
  config.view = {
    // 默认的模板扩展名 html文件
    defaultExtension: ".html",
    // 默认的模板引擎
    defaultViewEngine: "nunjucks",
  };

  // 配置session
  config.session = {
    key: "weibo-sess", // session 加密后的值的前缀
    maxAge: 1000 * 6 * 60 * 30, // session 过期时间 单位毫秒 1000毫秒=1秒
    httpOnly: true, // 前段不能修改 默认是true
    encrypt: true, // 传输过程中加密
  };

  // 配置redis
  config.redis = {
    client: {
      host: "127.0.0.1", //主机
      port: 6379, //端口号
      password: "", // 密码
      db: "0", // 数据库
    },
    agent: true,
  };

  // 设置静态文件目录
  config.static = {
    prefix: "/",
    // 将app/public 文件设置为静态文件目录
    //    /   可直接代表app/public/
    dir: appInfo.baseDir + "/app/public",
  };

  // 配置mysql 数据库
  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: "root",
    // 数据库名字
    database: "egg-weibo",
  };

  // 配置ajv  格式校验
  config.ajv = {
    keyword: "schema", //使用配置的路径
    allErrors: true, // 是否返回错误信息
    jsonPointers: true, // 是否可以自定义错误信息
  };

  // 配置文件上传
  config.multipart = {
    // 上传文件的类型
    mode: "file",
    // 上传文件的大小
    fileSize: "5mb",
  };

  return {
    ...config,
    ...userConfig,
  };
};
