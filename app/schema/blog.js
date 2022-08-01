'use strict'
/**
 * schema
 * @description blog 数据格式校验
 */

// 博客校验  content image
module.exports = {
  type: 'object',
  properties: {
    content: {
      // 数据类型为：文本
      type: 'string',
      minLength: 1,
      maxLength: 500
    },
    image: {
      type: 'string',
      minLength: 5,
      maxLength: 500
    }
  },
  $async: true
}
