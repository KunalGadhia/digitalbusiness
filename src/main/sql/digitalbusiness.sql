-- MySQL dump 10.13  Distrib 5.7.7-rc, for Linux (x86_64)
--
-- Host: localhost    Database: digitalbusiness
-- ------------------------------------------------------
-- Server version	5.7.7-rc

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.user.Role',
  `name` varchar(100) DEFAULT NULL,
  `name_of_company` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `mobile_no` varchar(100) DEFAULT '0',  
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','ROLE_ADMIN',NULL,NULL,NULL,NULL,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_master`
--

DROP TABLE IF EXISTS `party_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `party_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `dealer_code` varchar(100) DEFAULT NULL,
  `dealer_name` varchar(100) DEFAULT NULL,
  `gl_code` varchar(32) DEFAULT NULL,
  `billing_add1` varchar(100) NOT NULL,
  `billing_add2` varchar(100) DEFAULT NULL,
  `billing_add3` varchar(100) DEFAULT NULL,
  `billing_add4` varchar(100) DEFAULT NULL,
  `billing_email` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `billing_fax` varchar(100) DEFAULT NULL,
  `bill_board_tel` varchar(100) DEFAULT NULL,
  `direct_tel_no` varchar(100) DEFAULT NULL,
  `pan_number` varchar(30) DEFAULT NULL,
  `cst_number` varchar(100) DEFAULT NULL,
  `vat_number` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee_master`
--

DROP TABLE IF EXISTS `employee_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `emp_code` varchar(100) DEFAULT NULL,
  `emp_name` varchar(100) DEFAULT NULL,
  `emp_mailid` varchar(100) DEFAULT NULL,
  `emp_mobile_number` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `segment_master`
--

DROP TABLE IF EXISTS `segment_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `segment_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `segment` varchar(100) DEFAULT NULL,
  `segment_code` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sale_type_master`
--

DROP TABLE IF EXISTS `sale_type_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_type_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `sale_type` varchar(100) DEFAULT NULL,
  `sale_type_code` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `order_head`
--

DROP TABLE IF EXISTS `order_head`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_head` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_num` varchar(100) DEFAULT NULL,
  `segment` varchar(100) DEFAULT NULL,
  `sale_type` varchar(100) DEFAULT NULL,
  `entry_type` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.orderhead.EntryType',
  `order_type` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.orderhead.OrderType',
  `billing_party_id` int(11) DEFAULT NULL COMMENT 'REF party_master.id',
  `delivery_party_id` int(11) DEFAULT NULL COMMENT 'REF party_master.id',
  `postal_code` varchar(10) DEFAULT NULL,
  `bill_type` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.orderhead.BillType',
  `order_sub_type` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.orderhead.OrderSubType',
  `project_name` varchar(100) DEFAULT NULL,
  `po_num` varchar(100) DEFAULT NULL,
  `order_id` varchar(100) DEFAULT NULL,
  `po_date` datetime NOT NULL,
  `po_value` varchar(100) DEFAULT NULL,
  `marketing_head` varchar(100) DEFAULT NULL,
  `order_initiated_by` int(11) DEFAULT NULL COMMENT 'REF user_master.id',
  `rate_applicability` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.orderhead.RateApplicability',
  `rate_contract` varchar(300) DEFAULT NULL,
  `orc_per` varchar(100) DEFAULT NULL,  
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_head_billing_party_id_fk` (`billing_party_id`),
  KEY `order_head_delivery_party_id_fk` (`delivery_party_id`),
  KEY `order_head_order_initiated_by_fk` (`order_initiated_by`),
  CONSTRAINT `order_head_billing_party_id_fk` FOREIGN KEY (`billing_party_id`) REFERENCES `party_master` (`id`),
  CONSTRAINT `order_head_delivery_party_id_fk` FOREIGN KEY (`delivery_party_id`) REFERENCES `party_master` (`id`),
  CONSTRAINT `order_head_order_initiated_by_fk` FOREIGN KEY (`order_initiated_by`) REFERENCES `user_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-26 11:47:56
