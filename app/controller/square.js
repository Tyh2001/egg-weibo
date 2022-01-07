"use strict";

module.exports = (app) => {
  class SquareController extends app.Controller {
    async index () {
      // 获取博客列表
      const result = await this.service.blog.getSquareBlogList({
        // 每页的数据
        pageSize: 10,
      });

      await this.ctx.render("square.html", {
        blogList: result.blogList,
        count: result.count,
        pageSize: 10,
        pageIndex: 1,
      });
    }
  }
  return SquareController;
};
