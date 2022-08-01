'use strict'

module.exports = (app) => {
  const { router, controller } = app

  // 关注
  router.post(
    '/api/profile/follow',
    app.middleware.loginChecks.loginCheck,
    controller.profile.follow
  )

  // 取消关注
  router.post(
    '/api/profile/notfollow',
    app.middleware.loginChecks.loginCheck,
    controller.profile.notfollow
  )
}
