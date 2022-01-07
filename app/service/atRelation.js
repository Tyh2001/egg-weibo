"use strict";
const { formatBlog } = require("../utils/formatBlog");
const { formatUser } = require("../utils/formatUser");

module.exports = (app) => {
  class AtRelationService extends app.Service {
    async createAtRelation (blogId, userId) {
      const result = await app.model.AtRelation.create({
        blogId,
        userId,
      });
      return result;
    }

    // 获取@我的数量
    async getAtCount (userId) {
      const result = await app.model.AtRelation.findAndCountAll({
        where: {
          userId,
          isRead: false,
        },
      });
      return result.count;
    }

    // 获取 at 我的微博列表
    async getAtMeBlogList ({ userId, pageIndex = 0, pageSize = 5 }) {
      const result = await app.model.Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [["id", "desc"]],
        include: [
          {
            model: this.app.model.AtRelation,
            attributes: ["userId", "blogId"],
            where: {
              userId,
            },
          },
          {
            model: app.model.User,
            attributes: ["userName", "nickName", "avatar"],
          },
        ],
        distinct: true,
      });

      // 获取微博数量
      const count = result.count;

      // 格式化微博信息
      let blogList = formatBlog(result.rows.map((row) => row.dataValues));

      // 格式化用户信息
      blogList = blogList.map((blog) => {
        blog.user = formatUser(blog.user.dataValues);
        return blog;
      });

      return {
        count,
        blogList,
      };
    }

    // 更新@列表
    async update ({ newIsRead }, { userId, isRead }) {
      const updateData = {};
      const whereData = {};
      if (newIsRead) {
        updateData.isRead = newIsRead;
      }
      if (userId === this.ctx.session.userInfo.id) {
        whereData.userId = userId;
      }
      if (isRead == false) {
        whereData.isRead = isRead;
      }
      const result = await app.model.AtRelation.update(updateData, {
        where: whereData,
      });

      return result > 0;
    }
  }
  return AtRelationService;
};
