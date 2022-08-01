// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAtMe = require('../../../app/controller/atMe');
import ExportBlog = require('../../../app/controller/blog');
import ExportHome = require('../../../app/controller/home');
import ExportProfile = require('../../../app/controller/profile');
import ExportSquare = require('../../../app/controller/square');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    atMe: ExportAtMe;
    blog: ExportBlog;
    home: ExportHome;
    profile: ExportProfile;
    square: ExportSquare;
    upload: ExportUpload;
    user: ExportUser;
  }
}
