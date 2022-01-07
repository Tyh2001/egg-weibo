"use strict";

// 把时间变成想要的格式

function formatDate (d) {
  // 把d转换成时间对象
  const date = new Date(d);
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  return `${M}-${D} ${h}:${m}`;
}
module.exports = {
  formatDate,
};
