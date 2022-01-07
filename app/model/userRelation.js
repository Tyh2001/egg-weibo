"use strict";
// 关注外键

module.exports = (app) => {
  const { INTEGER } = app.Sequelize;
  const UserRelation = app.model.define("UserRelation", {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: "用户id",
    },
    followerId: {
      type: INTEGER,
      allowNull: false,
      comment: "被关注人id",
    },
  });
  // 创建外键
  UserRelation.associate = () => {
    // 用户可以关注多个人
    app.model.UserRelation.belongsTo(app.model.User, {
      foreignKey: "followerId",
    });
  };
  return UserRelation;
};
