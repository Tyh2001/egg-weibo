'use strict'

module.exports = (app) => {
  class AtMeController extends app.Controller {
    // @页面

    async index() {
      // 获取session
      const { id: userId } = this.ctx.session.userInfo

      // 获取@我未读的数量
      const atCount = await this.service.atRelation.getAtCount(userId)

      // 获取微博
      const result = await this.service.atRelation.getAtMeBlogList({
        userId,
        pageIndex: 0,
        pageSize: 10
      })

      await this.ctx.render('atMe.html', {
        blogList: result.blogList,
        count: result.count,
        pageIndex: 1,
        pageSize: 10,
        atCount
      })

      // 将@我的变成已读
      await this.service.atRelation.update(
        { newIsRead: true },
        { userId, isRead: false }
      )
    }
  }
  return AtMeController
}
