// 加密工具
'use strict'
// 密码加密

// 引入核心模块 crypto
const crypto = require('crypto')

const SECRET_KEY = 'u*h^KB_%jb#Hj+gf>k-_l'

function _md5(str) {
  // 使用md5方式加密  加hash值  加盐
  const md5 = crypto.createHash('md5')
  // 将内容加密成16进制的字符串
  return md5.update(str).digest('hex')
}

function doCrypto(content) {
  // content是我们传过来的密码
  // 入伙content传过来的值是123
  // 那么下面输出的str是下面一段内容
  // 再通过return _md5(str);实现加密
  // content = 123;
  const str = `password = ${content}&key = ${SECRET_KEY}`
  // str = `password = 123&key = u*h^KB_%jb#Hj+gf>k-_l`
  return _md5(str)
}

module.exports = {
  doCrypto
}
