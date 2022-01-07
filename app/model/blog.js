"use strict";
// 博客外键

module.exports = (app) => {
  const { INTEGER, STRING, TEXT } = app.Sequelize;
  const Blog = app.model.define("blog", {
    userId: {
      // 数据类型
      type: INTEGER,
      // 可不可以为空
      allowNull: false,
      // 注释
      comment: "外键 userId -> users.id",
    },
    content: {
      type: STRING,
      allowNull: false,
      comment: "图片",
    },
    image: {
      type: TEXT,
      allowNull: true,
      comment: "微博内容",
    },
  });
  // 创建外键
  Blog.associate = () => {
    // 用户与博客是1对多的关系
    app.model.Blog.belongsTo(app.model.User, {
      foreignKey: "userId",
      targetKey: "id",
    });

    // 和userRelation 表关联
    app.model.Blog.belongsTo(app.model.UserRelation, {
      foreignKey: "userId",
      // 同一个字段,不可以设置两个外键 这样写只是在sequelize中做关联
      // 并不是真的设置了两个外键
      targetKey: "followerId",
    });

    app.model.Blog.hasMany(app.model.AtRelation, {
      foreignKey: "blogId",
    });
  };
  return Blog;
};
