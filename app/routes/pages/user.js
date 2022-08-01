'use strict'

module.exports = (app) => {
  const { router, controller } = app

  // 登录
  router.get('/login', controller.user.loginPage)

  // 注册
  router.get('/loginster', controller.user.loginsterPage)

  // 基本信息
  router.get(
    '/setting',
    app.middleware.loginChecks.loginCheck,
    controller.user.setting
  )
}
