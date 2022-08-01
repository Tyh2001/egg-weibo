// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBlogVslidate = require('../../../app/middleware/blogVslidate');
import ExportLoginChecks = require('../../../app/middleware/loginChecks');
import ExportValidate = require('../../../app/middleware/validate');

declare module 'egg' {
  interface IMiddleware {
    blogVslidate: typeof ExportBlogVslidate;
    loginChecks: typeof ExportLoginChecks;
    validate: typeof ExportValidate;
  }
}
