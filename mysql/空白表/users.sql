/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : egg-weibo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-07-27 09:24:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名,唯一,不能为空',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `gender` varchar(255) NOT NULL DEFAULT '1' COMMENT '性别 1->男 2->女 3->保密',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像 图片地址',
  `city` varchar(255) NOT NULL DEFAULT '秦皇岛' COMMENT '城市',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
