"use strict";

// 上传头像

const Controller = require("egg").Controller;

const fs = require("fs");

const path = require("path");

const pump = require("mz-modules/pump");

const { SuccessModel } = require("../utils/resultmodel");

class UploadController extends Controller {
  async uploadImg () {
    const file = this.ctx.request.files[0];
    const filename =
      Date.now() +
      Math.ceil(Math.random() * 10000) +
      file.filename.toLowerCase();
    try {
      const targetPath = path.join(
        this.config.baseDir,
        "app/public/uploads/images",
        filename
      ); // 不会自动创建文件夹
      const source = fs.createReadStream(file.filepath);
      const target = fs.createWriteStream(targetPath);
      await pump(source, target);
      this.ctx.logger.warn("save %s to %s ", file.filepath, targetPath);
    } finally {
      await this.ctx.cleanupRequestFiles();
    }
    const url = "/uploads/images/" + filename;
    this.ctx.body = new SuccessModel({ url });
  }
}
module.exports = UploadController;
