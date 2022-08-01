'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true
  },

  // 启用模板引擎
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks'
  },

  // 启用redis
  redis: {
    enable: true,
    package: 'egg-redis'
  },

  // 启用session-redis
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis'
  },

  // 启用 数据库
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  // 启用ajv  格式校验
  ajv: {
    enable: true,
    package: 'egg-ajv'
  }
}
