// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAtRelation = require('../../../app/service/atRelation');
import ExportBlog = require('../../../app/service/blog');
import ExportUser = require('../../../app/service/user');
import ExportUserRelation = require('../../../app/service/userRelation');

declare module 'egg' {
  interface IService {
    atRelation: AutoInstanceType<typeof ExportAtRelation>;
    blog: AutoInstanceType<typeof ExportBlog>;
    user: AutoInstanceType<typeof ExportUser>;
    userRelation: AutoInstanceType<typeof ExportUserRelation>;
  }
}
