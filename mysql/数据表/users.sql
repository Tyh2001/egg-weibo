/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : egg-weibo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-07-27 09:51:19
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin1', '468ef38f204be3603d31c1296e7b4c82', '星星', '2', '/uploads/images/1627349758119微信图片_20210721161509.jpg', '秦皇岛', '2021-07-27 01:29:39', '2021-07-27 01:36:52');
INSERT INTO `users` VALUES ('2', 'admin2', '468ef38f204be3603d31c1296e7b4c82', 'yours.', '1', '/uploads/images/1627349972332qq图片20210720110821.jpg', '杭州', '2021-07-27 01:39:05', '2021-07-27 01:40:36');
INSERT INTO `users` VALUES ('3', 'admin3', '468ef38f204be3603d31c1296e7b4c82', '起名真难~', '1', '/uploads/images/1627350183358微信图片_20210721161533.jpg', '郑州', '2021-07-27 01:42:40', '2021-07-27 01:43:17');
