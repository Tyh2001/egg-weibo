'use strict'

const { formatUser } = require('../utils/formatUser')

module.exports = (app) => {
  class UserRelationService extends app.Service {
    // 通过followerId 查询用户
    async getUsersByFollowerId(followerId) {
      const result = await this.app.model.User.findAndCountAll({
        attributes: ['id', 'username', 'nickname', 'avatar'],
        limit: 50,
        offset: 0,
        order: [['id', 'desc']],
        include: {
          model: this.app.model.UserRelation,
          where: {
            followerId,
            userId: {
              // sequelize 中的不等于的意思
              [app.Sequelize.Op.ne]: followerId
            }
          }
        }
      })
      const userList = formatUser(result.rows.map((item) => item.dataValues))
      return {
        count: result.count,
        userList
      }
    }

    // 获取关注人列表
    async getFollower(userId) {
      const result = await this.app.model.UserRelation.findAndCountAll({
        limit: 50,
        offset: 0,
        order: [['id', 'desc']],
        include: {
          model: this.app.model.User,
          attributes: ['id', 'username', 'nickname', 'avatar']
        },
        where: {
          userId,
          followerId: {
            [app.Sequelize.Op.ne]: userId
          }
        }
      })
      let userList = result.rows.map((item) => item.dataValues)

      userList = userList.map((item) => {
        let user = item.user.dataValues
        return formatUser(user)
      })
      return {
        count: result.count,
        userList
      }
    }

    // 添加关注
    async addfollower(userId, followerId) {
      // 向数据库中添加数控
      const result = await this.app.model.UserRelation.create({
        userId,
        followerId
      })
      return result
    }

    // 取消关注
    async deletefollower(userId, followerId) {
      // 在数据库中删除
      const result = await this.app.model.UserRelation.destroy({
        where: {
          userId,
          followerId
        }
      })
      return result > 0
    }
  }
  return UserRelationService
}
