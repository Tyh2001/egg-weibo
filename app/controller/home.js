'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this

    // 获取个人信息  在session中获取
    const { userInfo } = ctx.session

    // 获取粉丝列表
    const { userList: fansList, count: fansCount } =
      await this.service.userRelation.getUsersByFollowerId(userInfo.id)

    // 获取关注列表
    const { userList: followList, count: followCount } =
      await this.service.userRelation.getFollower(userInfo.id)

    // 获取关注人的博客列表
    const result = await this.service.blog.getFollowerBlogList({
      userId: userInfo.id,
      pageIndex: 0,
      pageSize: 10
    })
    const { count, blogList } = result

    // 获取@我的数量
    const atCount = await this.service.atRelation.getAtCount(userInfo.id)

    // 设置首页为 index.html 文件
    await ctx.render('index.html', {
      isNav: true,
      userData: {
        userInfo,
        fansData: {
          // 粉丝
          count: fansCount,
          fansList
        },
        followData: {
          // 关注
          count: followCount,
          followList
        },
        isMe: true,
        atCount
      },
      blogList,
      count,
      pageIndex: 1,
      pageSize: 10
    })
  }

  // 404
  async notFound() {
    await this.ctx.render('404.html')
  }
}

module.exports = HomeController
