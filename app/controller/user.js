"use strict";

const {
  registerUserNameNotExistInfo,
  registerFailInfo,
  changeInfoFailInfo,
} = require("../utils/ErrorModel");
const { SuccessModel, ErrorModel } = require("../utils/resultModel");

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 获取登录信息
  getUserInfo () {
    let data = {
      isLogin: false, // 默认是登录状态
    };

    // 如果用户已经登录
    const userInfo = this.ctx.session.userInfo;
    if (userInfo) {
      data = {
        isLogin: true,
        username: userInfo.username,
      };
    }
    return data;
  }

  // 登录页面
  async loginPage () {
    await this.ctx.render("login.html", this.getUserInfo());
  }

  // 注册页面
  async loginsterPage () {
    await this.ctx.render("loginster.html", this.getUserInfo());
  }

  // 基本信息页面
  async setting () {
    // 设置默认信息
    const userInfo = this.ctx.session.userInfo;
    await this.ctx.render("setting.html", {
      // 导航栏是否显示
      isNav: true,
      userInfo,
    });
  }

  // 注册
  async register () {
    // 获取到数据  用户名 密码 性别
    const { username, password, gender } = this.ctx.request.body;
    // 在service中做业务处理
    // try --catch 当语法错误时，会抛出异常(catch)  而不是终止服务
    try {
      const result = await this.service.user.createUser({
        username,
        password,
        gender,
      });
      if (result) {
        // 注册成功要自己关注自己 方便首页获取关注人的博客内容
        await this.service.userRelation.addfollower(result.id, result.id);
      }

      // 当注册成功时 可以什么都不返回
      this.ctx.body = new SuccessModel();
    } catch (err) {
      // 打印错误信息 错误栈
      console.log(err.message, err.stack);
      return new ErrorModel(registerFailInfo);
    }

    // 响应  response
    // 请求  request
    // this.ctx.body = result;
  }

  // 用户名是否存在
  async isExist () {
    const { username } = this.ctx.request.body;
    // 交给server处理
    const getUserInfo = await this.service.user.getUserInfo(username);

    // 等待 server 处理完成来进行判断
    if (getUserInfo) {
      // 成功直接返回 不需要传递信息 {errno:0,data:{}}
      this.ctx.body = new SuccessModel();
    } else {
      // 失败返回错误信息
      this.ctx.body = new ErrorModel(registerUserNameNotExistInfo);
    }
  }

  // 登录
  async login () {
    // 获取前段请求的用户名和密码
    const { username, password } = this.ctx.request.body;
    const userInfo = await this.service.user.doLogin({ username, password });

    this.ctx.body = userInfo;
  }

  // 删除当前用户
  async deleteUser () {
    // 在单元测试的情况下执行删除
    if (this.app.config.env === "unittest") {
      // 在session获取用户信息
      // 先判断是否登录
      if (this.ctx.session && this.ctx.session.userInfo) {
        const { username } = this.ctx.session.userInfo;
        // 在service中删除用户信息
        const result = await this.service.user.deleteUser(username);
        this.ctx.body = result;
      }
    }
  }

  // 更改用户基本信息
  async changeUserInfo () {
    // 获取传递过来的数据  昵称  城市  图片地址
    const { nickname, city, avatar } = this.ctx.request.body;
    // 获取用户名 被更改为
    const { username } = this.ctx.session.userInfo;
    // 调用service 中的updateUser方法
    const result = await this.service.user.updateUser(
      {
        newnickname: nickname,
        newcity: city,
        newavatar: avatar,
      },
      { username }
    );
    // this.ctx.body = result;
    if (result) {
      Object.assign(this.ctx.session.userInfo, {
        nickname,
        city,
        avatar,
      });
      this.ctx.body = new SuccessModel();
    } else {
      this.ctx.body = new ErrorModel(changeInfoFailInfo);
    }
  }

  // 更改 密码
  async chengepassword () {
    // 获取密码 用户名
    const { username } = this.ctx.session.userInfo;
    const { newpassword, oldpassword } = this.ctx.request.body;

    // 将数据交给service 处理
    const result = await this.service.user.updateUser(
      {
        newpassword,
      },
      {
        username,
        password: oldpassword,
      }
    );
    // 更改密码
    if (result) {
      this.ctx.body = new SuccessModel();
    } else {
      this.ctx.body = new ErrorModel(changeInfoFailInfo);
    }
  }

  // 获取 @列表
  async getAtList () {
    const { id } = this.ctx.session.userInfo;

    // 获取关注人列表
    const result = await this.service.userRelation.getFollower(id);

    const atList = result.userList.map((user) => {
      return `${user.nickname} - ${user.username}`;
    });
    this.ctx.body = atList;
  }

  // 注销账号
  async logout () {
    // 删除session中的用户信息
    delete this.ctx.session.userInfo;
    this.ctx.body = new SuccessModel();
  }

  // 个人空间
  async profile () {
    await this.ctx.render("profile.html");
  }
}

module.exports = UserController;
