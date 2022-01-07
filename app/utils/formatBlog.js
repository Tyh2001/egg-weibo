"use strict";
const { formatDate } = require("./formatDate");

/**
 * 格式化日期
 */

// _代表一个工具
function _formatBlogTime (obj) {
  obj.createdAtFormat = formatDate(obj.createdAt);
  obj.updatedAtFormat = formatDate(obj.updatedAt);
  return obj;
}

// 格式化内容
function _formatBlogContent (obj) {
  // 不更改原始数据
  obj.formatContent = obj.content;
  // const REG_AT_WHO = /@(.+?)\s-\s(\w+?)\b/g;
  const REG_AT_WHO = /@(.+?)\s-\s(\w+?)\b/g;
  obj.formatContent = obj.formatContent.replace(
    REG_AT_WHO,
    (matchStr, nickname, username) => {
      return `<a href="/profile/${username}">@${nickname}</a>`;
    }
  );
  return obj;
}

function formatBlog (list) {
  // 如果没有传博客信息  将空对象赋值给博客
  if (list == null) {
    list = {}; //list 就是博客
    return;
  }
  // 如果传入的是数组
  if (list instanceof Array) {
    // 对每一项的时间做处理
    return list.map(_formatBlogTime).map(_formatBlogContent);
  }

  let result = list;

  // 格式日期
  result = _formatBlogTime(result);
  // 格式化内容
  result = _formatBlogContent(result);

  return result;
}

module.exports = {
  formatBlog,
};
