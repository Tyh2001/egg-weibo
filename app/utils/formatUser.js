"use strict";

// 加默认头像
function _formatUserAvatar (obj) {
  if (!obj.avatar) {
    obj.avatar = "/images/yonghu.jpg";
  }
  return obj;
}

// 格式化用户信息
function formatUser (list) {
  if (list == null) {
    // 如果什么都没传,直接退出,防止报错
    return;
  }

  // 判断list是否为数组
  if (list instanceof Array) {
    const newlist = list.map(_formatUserAvatar);
    return newlist;
  }
  // 如果是一个对象  直接返回
  return _formatUserAvatar(list);
}
module.exports = {
  formatUser,
};
