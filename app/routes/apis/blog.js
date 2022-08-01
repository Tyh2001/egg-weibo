// 上传图片
'use strict'

module.exports = (app) => {
  const { router, controller } = app
  // 上传图片路由
  // 和前端调接口对应
  // controller.upload.uploadImg  和对应的文件夹和方法对应
  router.post(
    '/api/blog/createBlog',
    app.middleware.blogVslidate(),
    controller.blog.createBlog
  )

  // 我的空间加载更多  :username和:pageIndex 是一个变量
  router.get(
    '/api/blog/loadProfileMore/:username/:pageIndex',
    app.middleware.loginChecks.loginCheck,
    controller.blog.loadProfileMore
  )

  // 广场页加载多
  router.get(
    '/api/blog/loadSquareMore/:pageIndex',
    app.middleware.loginChecks.loginCheck,
    controller.blog.loadSquareMore
  )

  // 首页加载更多
  router.get(
    '/api/blog/loadHomeBlogMore/:pageIndex',
    app.middleware.loginChecks.loginCheck,
    controller.blog.loadHomeBlogMore
  )

  // @ 页面加载更多
  // app.middleware.loginChecks.loginCheck检测是否登录
  router.get(
    '/api/blog/loadAtMeBlogMore/:pageIndex',
    app.middleware.loginChecks.loginCheck,
    controller.blog.loadAtMeBlogMore
  )
}
