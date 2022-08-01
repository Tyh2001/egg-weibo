/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : egg-weibo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-07-27 09:24:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for at_relations
-- ----------------------------
DROP TABLE IF EXISTS `at_relations`;
CREATE TABLE `at_relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `blog_id` int(11) NOT NULL COMMENT '博客id',
  `is_read` tinyint(1) DEFAULT '0' COMMENT '是否已读',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_id` (`blog_id`),
  CONSTRAINT `at_relations_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
