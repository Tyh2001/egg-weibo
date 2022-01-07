## 盛邦微博项目说明

### 说明

向用户提供丰富应用和完善服务的开放平台 内容: 首页、登陆/注册、广场页、用户管理（关注、粉丝）、评论、发表等

实现功能：登录注册、发布博客、关注取关、更改密码、更改用户信息、更换头像、@功能、加载更多、日期格式化等等



### 技术栈

Egg.js、Node.js、Nunjucks、jQuery、Ajax、Bootstrap、MySQL、Session、Redis、Npm、Gitee



### 启动

1. 启动 PhpStudy

PhpStudy 下载地址：https://www.xp.cn/



2. 启动 redis

redis 仓库地址：https://github.com/Tyh2001/egg-weibo-redis

redis 启动命令：（在 redis 目录下启动 cmd 命令行输入）

```shell
redis-server
```



3. 配置数据库

数据库建表，表名为 egg-weibo

字符集选择：utf8 -- UTF-8 Unicode

排序规则选择：utf8_general_ci

导入 sql 文件，文件地址：https://github.com/Tyh2001/egg-weibo-mysql



4. 安装依赖

在项目根目录执行命令来安装依赖：

```shell
npm i
```



5. 启动命令：

```shell
npm run dev
```



6. 访问端口（默认）：

```shell
http://localhost:7001
```



### 账号

账号列表

- tyhtyh
- duidui
- qiqi666
- tyh123

- 12345
- admin
- admin1

```
密码统一为：12345
```



### 其他说明

该项目仅用作学习使用！！！
