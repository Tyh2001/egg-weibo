'use strict'
// 我的空间
module.exports = (app) => {
  const { router, controller } = app
  router.get(
    '/square',
    app.middleware.loginChecks.loginCheck,
    controller.square.index
  )
}
