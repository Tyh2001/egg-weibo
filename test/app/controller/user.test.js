/* eslint-disable eol-last */
/* eslint-disable no-undef */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable semi */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable quotes */
'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('user test', () => {
  // 用户信息
  const username = `u_${Date.now()}`
  const password = `u_${Date.now()}`
  const testUser = {
    username,
    password,
    gender: 2
  }

  let cookie = ''

  // 注册用户
  it('注册一个用户,应该成功:', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/register')
      .send(testUser)
    // assert 断定
    assert(result.body.errno === 0)
  })

  // 重复注册用户
  it('重复注册一个用户,应该失败:', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/register')
      .send(testUser)
    // assert 断定
    assert(result.body.errno !== 0)
  })

  // 判断用户是否存在
  it('判断用户是否存在,应该存在', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/isExist')
      .send({ username })
    // assert 断定
    assert(result.body.errno === 0)
  })

  // 格式校验
  it('数据格式校验,应该不通过', async () => {
    const result = await app.httpRequest().post('/api/user/register').send({
      username: '^123您好',
      password: '9q',
      gender: '其他'
    })
    // assert 断定
    assert(result.body.errno !== 0)
  })

  // 登录
  it('用户登录,应该通过', async () => {
    const result = await app.httpRequest().post('/api/user/login').send({
      username,
      password
    })
    // assert 断定
    assert(result.body.errno === 0)
    // 获取cookie
    cookie = result.headers['set-cookie'].join()
  })

  // 更新基本信息
  it('更新基本信息,应该成功', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/changeUserInfo')
      .send({
        newnickname: '测试昵称',
        newcity: '测试城市',
        newavatat: '/test.jpg'
      })
      .set('cookie', cookie)
    assert(result.body.errno === 0)
  })

  // 更改密码
  it('更改密码,应该成功', async () => {
    // eslint-disable-next-line no-unused-vars
    const result = await app
      .httpRequest()
      .post('/api/user/changepassword')
      .oldpassword({
        oldpassword: password,
        newpassword: `p_${date.now()}`
      })
      .set('cookie', cookie)
    assert(result.body.errno === 0)
  })

  // 删除
  it('删除用户,应该成功:', async () => {
    const result = await app
      .httpRequest()
      .delete('/api/user/delete')
      .set('cookie', cookie)
    // assert 断定
    assert(result.body.errno === 0)
  })

  // 退出登录
  it('退出登录,应该成功', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/logout')
      .set('cookie', cookie)
    assert(result.body.errno === 0)
  })

  // 判断用户是否存在
  it('删除后判断用户是否存在,应该不存在', async () => {
    const result = await app
      .httpRequest()
      .post('/api/user/isExist')
      .send({ username })
    // assert 断定
    assert(result.body.errno !== 0)
  })
})
