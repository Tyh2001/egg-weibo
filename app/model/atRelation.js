'use strict'
// @外键

module.exports = (app) => {
  // BOOLEAN是布尔值
  const { INTEGER, BOOLEAN } = app.Sequelize
  const atRelation = app.model.define('atRelation', {
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '用户id'
    },
    blogId: {
      type: INTEGER,
      allowNull: false,
      comment: '博客id'
    },
    isRead: {
      type: BOOLEAN,
      // 默认值 是false
      defaultValue: false,
      comment: '是否已读'
    }
  })
  return atRelation
}
