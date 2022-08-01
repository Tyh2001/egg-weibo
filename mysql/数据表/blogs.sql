/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : egg-weibo

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-07-27 09:50:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '外键 userId -> users.id',
  `content` varchar(255) NOT NULL COMMENT '图片',
  `image` text COMMENT '微博内容',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES ('1', '1', '哈哈哈', '/uploads/images/16273497754025a89ab9f33adb4a51dda991b6a76409.jpg', '2021-07-27 01:36:23', '2021-07-27 01:36:23');
INSERT INTO `blogs` VALUES ('2', '1', '这是 iphone 11', '/uploads/images/1627349843809iphone11-green-select-2019.jpg', '2021-07-27 01:37:25', '2021-07-27 01:37:25');
INSERT INTO `blogs` VALUES ('3', '1', '今天真开心~~~~', null, '2021-07-27 01:38:17', '2021-07-27 01:38:17');
INSERT INTO `blogs` VALUES ('4', '2', '你渴望力量吗', '/uploads/images/16273500452021605690241060保存的图 (1).jpg', '2021-07-27 01:40:49', '2021-07-27 01:40:49');
INSERT INTO `blogs` VALUES ('5', '2', '@星星 - admin1 你在干什么？', null, '2021-07-27 01:41:15', '2021-07-27 01:41:15');
INSERT INTO `blogs` VALUES ('6', '3', '无聊中', '/uploads/images/162735024399716056604911381646268-20190807151203983-873040918.jpg', '2021-07-27 01:43:59', '2021-07-27 01:43:59');
INSERT INTO `blogs` VALUES ('7', '3', 'win 11 新系统，哈哈哈 @星星 - admin1  @yours. - admin2 ', '/uploads/images/1627350260540a4db39803cc67ad7aa9639bed65fbdc.png', '2021-07-27 01:44:32', '2021-07-27 01:44:32');
INSERT INTO `blogs` VALUES ('8', '3', '杭州', '/uploads/images/1627350323762love杭州.jpg', '2021-07-27 01:45:22', '2021-07-27 01:45:22');
INSERT INTO `blogs` VALUES ('9', '1', '玫瑰花', '/uploads/images/1627350372825壁纸玫瑰花.jpg', '2021-07-27 01:46:17', '2021-07-27 01:46:17');
INSERT INTO `blogs` VALUES ('10', '1', '无聊中', null, '2021-07-27 01:46:28', '2021-07-27 01:46:28');
INSERT INTO `blogs` VALUES ('11', '1', 'love~~~~', '/uploads/images/16273504021891604458967848love.jpg', '2021-07-27 01:46:49', '2021-07-27 01:46:49');
