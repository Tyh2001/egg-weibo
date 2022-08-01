// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAtRelation = require('../../../app/model/atRelation');
import ExportBlog = require('../../../app/model/blog');
import ExportUser = require('../../../app/model/user');
import ExportUserRelation = require('../../../app/model/userRelation');

declare module 'egg' {
  interface IModel {
    AtRelation: ReturnType<typeof ExportAtRelation>;
    Blog: ReturnType<typeof ExportBlog>;
    User: ReturnType<typeof ExportUser>;
    UserRelation: ReturnType<typeof ExportUserRelation>;
  }
}
