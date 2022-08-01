'use strict'

// 个人信息外键
module.exports = (app) => {
  // 获取数据类型  字符串 数字
  const { STRING, INTEGER } = app.Sequelize
  // 建模 自动创建的表 users 自动加的s
  const User = app.model.define('user', {
    username: {
      //用户名
      type: STRING, // 类型：字符串
      unique: true, // 昵称是唯一的
      allowNull: false, // 不能为空
      comment: '用户名,唯一,不能为空' //数据库注释
    },
    nickname: {
      //昵称
      type: STRING, // 类型：字符串
      comment: '用户名,唯一,不能为空' //数据库注释
    },
    password: {
      //密码
      type: STRING,
      allowNull: false,
      comment: '密码'
    },
    gender: {
      //性别
      type: STRING,
      allowNull: false,
      defaultValue: 1,
      comment: '性别 1->男 2->女 3->保密'
    },
    avatar: {
      // 头像
      type: STRING,
      comment: '头像 图片地址'
    },
    city: {
      //城市
      type: STRING,
      allowNull: false,
      defaultValue: '秦皇岛',
      comment: '城市'
    }
  })
  // 创建连接关系
  User.associate = () => {
    app.model.User.hasMany(app.model.Blog, {
      foreignKey: 'userId',
      targetKey: 'id'
    })
    // UserRelation 加外键
    app.model.User.hasMany(app.model.UserRelation, {
      foreignKey: 'userId'
    })
  }

  return User
}
