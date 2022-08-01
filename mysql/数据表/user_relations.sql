/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : egg-weibo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-07-27 09:51:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_relations
-- ----------------------------
DROP TABLE IF EXISTS `user_relations`;
CREATE TABLE `user_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `follower_id` int(11) NOT NULL COMMENT '微被关注人id',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `follower_id` (`follower_id`),
  CONSTRAINT `user_relations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_relations_ibfk_2` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_relations
-- ----------------------------
INSERT INTO `user_relations` VALUES ('1', '1', '1', '2021-07-27 01:29:39', '2021-07-27 01:29:39');
INSERT INTO `user_relations` VALUES ('2', '2', '2', '2021-07-27 01:39:05', '2021-07-27 01:39:05');
INSERT INTO `user_relations` VALUES ('3', '2', '1', '2021-07-27 01:40:57', '2021-07-27 01:40:57');
INSERT INTO `user_relations` VALUES ('4', '1', '2', '2021-07-27 01:41:58', '2021-07-27 01:41:58');
INSERT INTO `user_relations` VALUES ('5', '3', '3', '2021-07-27 01:42:40', '2021-07-27 01:42:40');
INSERT INTO `user_relations` VALUES ('6', '3', '2', '2021-07-27 01:43:28', '2021-07-27 01:43:28');
INSERT INTO `user_relations` VALUES ('7', '3', '1', '2021-07-27 01:43:35', '2021-07-27 01:43:35');
INSERT INTO `user_relations` VALUES ('8', '1', '3', '2021-07-27 01:45:51', '2021-07-27 01:45:51');
