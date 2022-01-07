/**
 * @description 封装的ajax
 */
"use strict";

// 立即执行函数
((window, $) => {
  // 将来的方法都暴露在window.ajax这个对象下面
  if (window.ajax != null) {
    console.log("window.ajax已经被占用");
    return;
  }
  window.ajax = {};

  // get 请求 获取数据
  window.ajax.get = function (url, callback) {
    ajaxFn("get", url, null, callback);
  };

  // post 请求 提交数据
  window.ajax.post = function (url, params, callback) {
    // 判断数据类型 typeof
    if (typeof params === "function") {
      callback = params;
      params = {};
    }
    ajaxFn("post", url, params, callback);
  };

  // 头像上传
  window.ajax.upload = function (url, file, callback) {
    const formData = new FormData();
    formData.append("file", file);
    $.ajax({
      type: "post",
      url,
      data: formData,
      contentType: false,
      processData: false,
      success (res) {
        if (res.errno !== 0) {
          callback(res.message);
          return;
        }
        callback(null, res.data);
      },
      error (err) {
        callback(err.message);
      },
    });
  };

  // 对ajax做统一的处理
  function ajaxFn (type, url, params, callback) {
    // callback 会接收两个参数
    $.ajax({
      type,
      url,
      // JSON.parse 将json格式的字符串转换为js对象
      /// JSON.stringify  将对象转换为json格式字符
      contentType: "application/json;charset=utf-8",
      data: params ? JSON.stringify(params) : "",
      success (res) {
        // console.log(res)
        if (res.errno !== 0) {
          // 返回错误信息 {errno:10001,message:"XXX"}
          callback(res.message);
          return;
        }
        // 正常的数据 {errno:0,data:{}}
        callback(null, res.data);
      },
      error (err) {
        // 发生错误的时候
        callback(err.message);
      },
    });
  }
})(window, jQuery);
