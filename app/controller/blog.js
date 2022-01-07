"use strict";

// 上传微博
const { createBlogFailInfo } = require("../utils/ErrorModel");
const { ErrorModel, SuccessModel } = require("../utils/resultmodel");

// 每页显示的条数
const PAGE_SIZE = 5;
module.exports = (app) => {
  class BlogController extends app.Controller {
    // 创建博客
    async createBlog () {
      const { ctx } = this;

      // 获取提交的数据
      const { content, image } = ctx.request.body;
      // 还需要userId
      // console.log(ctx.session.userInfo);
      const { id: userId } = ctx.session.userInfo;

      const REG_AT_WHO = /@(.+?)\s-\s(\w+?)\b/g;
      // 获取at 用户名列表
      const atUserNameList = [];

      content.replace(REG_AT_WHO, (matchStr, nickname, username) => {
        atUserNameList.push(username);
        return matchStr;
      });

      // 获取用户列表
      const atUserList = await Promise.all(
        atUserNameList.map(async (name) => {
          const result = await this.service.user.getUserInfo(name);
          return result;
        })
      );

      // 获取用户id列表
      const atUserIdList = atUserList.map((user) => user.id);

      // 先尝试发表
      try {
        // 将数据交给service处理 create
        const result = await this.service.blog.create({
          content,
          userId,
          image,
        });

        // 向atRelation表中写入数据

        atUserIdList.map(async (userId) => {
          await this.service.atRelation.createAtRelation(result.id, userId);
        });
        // 相应给前端
        ctx.body = new SuccessModel();
      } catch (err) {
        console.log(err);
        // 对应/utils/ErrorModel.js里面  创建微博失败  方法
        ctx.body = new ErrorModel(createBlogFailInfo);
      }
    }

    // post请求使用 request.body
    // get 请求使用 params
    // ctx.body 意思是响应   ctx是上下文对象  上是请求 下是响应
    // 加载更多
    async loadProfileMore () {
      // 设置参数
      let { username, pageIndex } = this.ctx.params;
      pageIndex = parseInt(pageIndex);
      // 定义userId 值是用户的id
      // const { username } = this.ctx.session.userInfo;
      const pagesize = PAGE_SIZE;

      // 获取博客信息 调用 service 中的方法
      const result = await this.service.blog.getProfileBlogList({
        // 用户id 每页的页码 每页的条数
        username,
        pageIndex,
        pagesize,
      });

      // 响应数据
      this.ctx.body = new SuccessModel({
        blogList: result.blogList, // blogList的值是上面的 result
        count: result.count,
        pageIndex: pageIndex + 1, // 页码数+1
        pagesize,
      });
    }

    // 加载广场页面
    async loadSquareMore () {
      // 设置参数
      let { pageIndex } = this.ctx.params;
      pageIndex = parseInt(pageIndex);

      // 每页显示的数量
      const pageSize = 10;

      // 获取博客信息 调用 service 中的方法
      const result = await this.service.blog.getSquareBlogList({
        // 用户id 每页的页码 每页的条数
        pageIndex,
        pageSize,
      });

      // 响应数据
      this.ctx.body = new SuccessModel({
        blogList: result.blogList, // blogList的值是上面的 result
        count: result.count,
        pageIndex: pageIndex + 1, // 页码数+1
        pageSize,
      });
    }

    // 首页加载更多
    async loadHomeBlogMore () {
      // 在 session 中获取用户Id
      const { id } = this.ctx.session.userInfo;
      // 获取 pageIndex
      let { pageIndex } = this.ctx.params;
      pageIndex = parseInt(pageIndex);

      // 获取关注人博客
      const result = await this.service.blog.getFollowerBlogList({
        userId: id,
        pageIndex,
      });

      this.ctx.body = new SuccessModel({
        blogList: result.blogList,
        count: result.count,
        pageIndex: pageIndex + 1,
        pageSize: 10,
      });
    }

    // @ 页面加载更多
    async loadAtMeBlogMore () {
      // userId 获取
      const { id: userId } = this.ctx.session.userInfo;
      // pageIndex
      const { pageIndex } = this.ctx.params;

      const result = await this.service.atRelation.getAtMeBlogList({
        userId,
        pageIndex,
      });
      this.ctx.body = new SuccessModel({
        blogList: result.blogList,
        count: result.count,
        pageIndex: pageIndex + 1,
        pageSize: 10,
      });
    }
  }
  return BlogController;
};
