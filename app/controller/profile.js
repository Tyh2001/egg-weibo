"use strict";

const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require("../utils/ErrorModel");
const { SuccessModel, ErrorModel } = require("../utils/resultmodel");

const Controller = require("egg").Controller;
class ProfileController extends Controller {
  async index () {
    // 在session中获取用户名
    const { username } = this.ctx.session.userInfo;
    // 重定向
    await this.ctx.redirect(`/profile/${username}`);
  }

  // 重定向个人主页

  // 个人主页
  async profileUser () {
    // 获取当前用户名
    const { username: curusername } = this.ctx.params;
    // 获取登录人的用户名
    const { username, id: userId } = this.ctx.session.userInfo;
    let isMe = true;
    let curUserInfo = {};
    if (curusername !== username) {
      // 如果不相等，说明查看的不是本人信息
      isMe = false;
      // 获取当前用户信息前，先判断这个用户是否存在
      const result = await this.service.user.getUserInfo(curusername);
      if (result) {
        curUserInfo = result;
      } else {
        await this.ctx.render("404.html");
        return;
      }
    } else {
      curUserInfo = this.ctx.session.userInfo;
    }
    // 获取博客信息 service
    const result = await this.ctx.service.blog.getProfileBlogList({
      username: curusername,
      pagesize: 5,
    });

    // 获取粉丝列表
    const {
      userList: fansList,
      count: fansCount,
    } = await this.service.userRelation.getUsersByFollowerId(curUserInfo.id);

    // 获取关注列表
    const {
      userList: followList,
      count: followCount,
    } = await this.service.userRelation.getFollower(curUserInfo.id);

    // 是否已经关注此人
    // some es6新的数组方法
    const isMeFollow = fansList.some((item) => {
      return item.username === username;
    });

    // 获取atme属性
    const atCount = await this.service.atRelation.getAtCount(userId);

    // 最终返回的数据包含 博客信息 用户基本信息
    await this.ctx.render("profile.html", {
      userData: {
        userInfo: curUserInfo,
        fansData: {
          // 粉丝
          count: fansCount,
          fansList,
        },
        followData: {
          // 关注
          count: followCount,
          followList,
        },
        isMe,
        isMeFollow,
        atCount,
      },
      blogList: result.blogList,
      pageIndex: 1, // 当前页码
      pageSize: 5, // 每页显示数量
      count: result.count, // 微博的总数量
    });
  }

  // 关注
  async follow () {
    // 获取id  获取本人id  在session中获取到
    const { id: myuserid } = this.ctx.session.userInfo;

    // 获取follower id  前端传递过来的被关注人的id
    // post 方式提交的数据使用request 获取数据
    const { followerId } = this.ctx.request.body;
    try {
      // 调用service
      const result = await this.service.userRelation.addfollower(
        myuserid,
        followerId
      );
      this.ctx.body = new SuccessModel(result);
    } catch (err) {
      this.ctx.body = new ErrorModel(addFollowerFailInfo);
    }
  }

  // 取消关注
  async notfollow () {
    // 获取id  获取本人id  在session中获取到
    const { id: myuserId } = this.ctx.session.userInfo;
    const { followerId } = this.ctx.request.body;

    // 调用service
    const result = await this.service.userRelation.deletefollower(
      myuserId,
      followerId
    );
    if (result) {
      this.ctx.body = new SuccessModel();
      return;
    }
    this.ctx.body = new ErrorModel(deleteFollowerFailInfo);
  }
}

module.exports = ProfileController;
