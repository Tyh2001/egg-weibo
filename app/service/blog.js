"use strict";

const formatDate = require("../utils/formatDate");
const { formatBlog } = require("../utils/formatBlog");
// 对象的解构赋值
const { formatUser } = require("../utils/formatUser");

module.exports = (app) => {
  class BlogService extends app.Service {
    // 5.创建微博  接收三个参数  内容、地址、userId
    async create ({ content, userId, image }) {
      // 写入到数据库中
      // 创建
      const result = await this.app.model.Blog.create({
        content,
        userId,
        image,
      });
      return result;
    }

    /**
     * 获取博客数据
     * @param {string} userId 用户id
     * @param {string} pageIndex 页码
     * @param {string} pagesize 每页的条数
     */
    // 获取博客信息 (多条)  --个人空间页  pageIndex = 0设置默认值
    async getProfileBlogList ({ username, pageIndex = 0, pagesize }) {
      const result = await this.app.model.Blog.findAndCountAll({
        order: [["id", "desc"]], // desc:降序排列  通过id来排序
        // limit: 10, //限制显示的条数  10条
        limit: pagesize, // 限制的条数
        offset: pageIndex * pagesize,
        // 多表联查
        include: {
          model: this.app.model.User, // 联查的表
          // 规定users表显示的字段  这里显示昵称 头像 用户名
          attributes: ["nickname", "avatar", "username"],
          where: {
            // 联查的条件  通过相同的id去查询
            username,
          },
        },
      });

      // map方法  返回一个数组
      // 格式化用户信息
      const count = result.count;
      const blogList = result.rows.map((item) => {
        // 格式化博客数据
        item = formatBlog(item.dataValues);
        // 格式化用户信息 放头像
        item.user = formatUser(item.user.dataValues);
        return item;
      });
      return { blogList, count };
    }

    // 获取所有人的博客
    async getSquareBlogList ({ pageIndex = 0, pageSize }) {
      // 数据库中查询数据 findAndCountAll()=>{count:number,rows:[]}
      const result = await this.app.model.Blog.findAndCountAll({
        order: [["createdAt", "desc"]],
        limit: pageSize,
        offset: pageSize * pageIndex,
        include: {
          model: this.app.model.User,
          attributes: ["nickname", "avatar", "username"],
        },
      });

      // 获取博客的总量
      const count = result.count;
      // 获取博客列表
      const blogList = result.rows.map((item) => {
        item = formatBlog(item.dataValues); // 格式化博客
        item.user = formatUser(item.user.dataValues); // 格式化用户
        return item;
      });
      return {
        blogList, // 博客列表
        count, // 博客总量
      };
    }

    // 获取关注人的博客
    async getFollowerBlogList ({ userId, pageIndex = 0, pageSize = 10 }) {
      const result = await this.app.model.Blog.findAndCountAll({
        order: [["createdAt", "desc"]],
        limit: pageSize,
        offset: pageIndex * pageSize,
        include: [
          {
            // 博客与用户对应
            model: this.app.model.User,
            attributes: ["id", "username", "nickname", "avatar"],
          },
          {
            // 被关注人与博客相对应
            model: this.app.model.UserRelation,
            attributes: ["userId", "followerId"],
            where: {
              userId,
            },
          },
        ],
      });
      const count = result.count;
      // 博客列表
      let blogList = result.rows.map((row) => row.dataValues);
      blogList = blogList.map((item) => {
        item.user = formatUser(item.user.dataValues);
        item = formatBlog(item);
        return item;
      });

      return {
        count,
        blogList,
      };
    }
  }
  return BlogService;
};
