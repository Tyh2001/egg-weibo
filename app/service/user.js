'use strict'

// 引入密码加密模块  crypto模块
const { doCrypto } = require('../utils/cryp')
const { formatUser } = require('../utils/formatUser')
const {
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo
} = require('../utils/ErrorModel')
const { SuccessModel, ErrorModel } = require('../utils/resultModel')

const Service = require('egg').Service

class UserService extends Service {
  // 新建用户
  async createUser({ username, password, gender = 1, nickname }) {
    const result = this.app.model.User.create({
      username,
      // 密码使用模块加密
      password: doCrypto(password),
      gender,
      // 如果昵称有值，就赋值  如果没有值，就把用户名赋值给昵称
      nickname: nickname ? nickname : (nickname = username)
    })
    return result
  }

  // 获取用户信息
  async getUserInfo(username, password) {
    const whereOption = { username }
    if (password) {
      Object.assign(whereOption, { password: doCrypto(password) })
    }
    // 查询
    const result = await this.app.model.User.findOne({
      attributes: ['id', 'username', 'nickname', 'city', 'gender', 'avatar'],
      where: whereOption
    })
    return formatUser(result)
  }

  // 登录
  async doLogin({ username, password }) {
    if (!password) {
      return new ErrorModel(loginFailInfo)
    }
    // 通过用户名和密码查找用户信息
    const result = await this.getUserInfo(username, password)

    if (result) {
      // 保存到session中userInfo
      if (!this.ctx.session.userInfo) {
        this.ctx.session.userInfo = result
      }
      return new SuccessModel(result)
    }
    return new ErrorModel(loginFailInfo)
  }

  // 删除当前用户
  async deleteUser(username) {
    // destroy
    const result = await this.app.model.User.destroy({
      where: {
        username
      }
    })
    if (result > 0) {
      // 删除成功返回成功的信息
      return new SuccessModel()
    }
    // return 后面就不用写else了
    // 删除失败
    return new ErrorModel(deleteUserFailInfo)
  }

  // js Doc 注释方法
  // 更新用户
  /**
   *
   * 更新用户
   * @param {object} param0 更新后的值 newnickname, newcity, newavatar, newpassword
   * @param {object} param1 查询条件 username, password
   */

  async updateUser(
    { newnickname, newcity, newavatar, newpassword },
    { username, password }
  ) {
    // 初始是一个空对象
    const updateData = {}
    if (newpassword) {
      updateData.password = doCrypto(newpassword)
    }
    if (newnickname) {
      updateData.nickname = newnickname
    }
    if (newcity) {
      updateData.city = newcity
    }
    if (newavatar) {
      updateData.avatar = newavatar
    }
    const whereData = { username }
    if (password) {
      whereData.password = doCrypto(password)
    }
    const result = await this.app.model.User.update(updateData, {
      where: whereData
    })
    return result > 0 //返回结果  true false
  }
}
module.exports = UserService
