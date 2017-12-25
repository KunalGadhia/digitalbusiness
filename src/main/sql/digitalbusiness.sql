-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: digitalbusiness
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `carcass_order_details`
--

DROP TABLE IF EXISTS `carcass_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carcass_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `std_carcass_price_id` int(11) DEFAULT NULL COMMENT 'REF standard_carcass_price_master.id',
  `int_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `left_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `right_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `back_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `top_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `bottom_color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `depth` double NOT NULL,
  `non_standard_dimension` tinyint(1) NOT NULL DEFAULT '0',
  `shelf` tinyint(1) DEFAULT '1',
  `shelf_count` int(11) NOT NULL DEFAULT '0',
  `side_matching` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.carcassorderdetails.SideMatching',
  `side_selection` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.carcassorderdetails.SideSelection',
  `side_material` varchar(100) DEFAULT NULL,
  `side_finish` varchar(100) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `std_material_price` double DEFAULT NULL,
  `finish_price` double DEFAULT NULL,
  `section_profile_id` int(11) DEFAULT NULL COMMENT 'REF section_profile_master.id',
  `section_profile_price` double DEFAULT NULL,
  `carcass_sub_type` varchar(100) DEFAULT NULL,
  `grain_direction` varchar(100) DEFAULT NULL,
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `carcass_order_details_order_head_id_fk` (`order_head_id`),
  KEY `carcass_order_details_std_carcass_price_id_fk` (`std_carcass_price_id`),
  KEY `carcass_order_details_int_color_id_fk` (`int_color_id`),
  KEY `carcass_order_details_left_color_id_fk` (`left_color_id`),
  KEY `carcass_order_details_right_color_id_fk` (`right_color_id`),
  KEY `carcass_order_details_back_color_id_fk` (`back_color_id`),
  KEY `carcass_order_details_top_color_id_fk` (`top_color_id`),
  KEY `carcass_order_details_bottom_color_id_fk` (`bottom_color_id`),
  KEY `carcass_order_details_section_profile_id_fk` (`section_profile_id`),
  CONSTRAINT `carcass_order_details_back_color_id_fk` FOREIGN KEY (`back_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_bottom_color_id_fk` FOREIGN KEY (`bottom_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_int_color_id_fk` FOREIGN KEY (`int_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_left_color_id_fk` FOREIGN KEY (`left_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`),
  CONSTRAINT `carcass_order_details_right_color_id_fk` FOREIGN KEY (`right_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_section_profile_id_fk` FOREIGN KEY (`section_profile_id`) REFERENCES `section_profile_master` (`id`),
  CONSTRAINT `carcass_order_details_std_carcass_price_id_fk` FOREIGN KEY (`std_carcass_price_id`) REFERENCES `standard_carcass_price_master` (`id`),
  CONSTRAINT `carcass_order_details_top_color_id_fk` FOREIGN KEY (`top_color_id`) REFERENCES `color_code_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carcass_order_details`
--

LOCK TABLES `carcass_order_details` WRITE;
/*!40000 ALTER TABLE `carcass_order_details` DISABLE KEYS */;
INSERT INTO `carcass_order_details` VALUES (1,3,105,60,NULL,NULL,NULL,NULL,NULL,'WCBLINDX18PBXXXX-0720045018320','WC','PB',720,450,320,0,0,0,'NSM','NSS','0','0',1,1003,997,NULL,NULL,NULL,'BLINDX','NO_GRAIN','CARCASS',1),(2,3,108,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18MFXXXX-0720080018320','WC','MF',720,800,320,0,0,0,'NSM','NSS','0','0',1,1747,1365,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(3,3,140,60,55,55,NULL,NULL,NULL,'BCBLINDX18PBBXXD-0720030018560','BC','PB',720,300,560,0,0,0,'B','LRSM','HF','XXD',1,4554,997,4896,1,472,'BLINDX','NO_GRAIN','CARCASS',0),(4,3,NULL,60,82,50,NULL,NULL,NULL,'TUREGUXX18PBBXXA-0126045618351','TU','PB',126,456,351,1,0,0,'B','LRSM','MF','XXA',1,847,997,4344,2,865,'REGUXX','NO_GRAIN','CARCASS',0),(5,3,18,117,46,46,NULL,NULL,NULL,'WCLCPENT18MFBXXD-0700080018300','WC','MF',700,800,300,0,1,1,'B','LRSM','HF','XXD',1,3730,1365,4896,5,350,'LCPENT','NO_GRAIN','CARCASS',0),(6,3,NULL,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600090018300','WC','PB',600,900,300,1,0,0,'NSM','NSS','0','0',1,1219,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(7,3,10,60,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600110018300','WC','PB',600,1100,300,1,1,1,'NSM','NSS','0','0',1,1739,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(8,3,10,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600105018300','WC','PB',600,1050,300,0,1,1,'NSM','NSS','0','0',1,1726,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(9,3,49,118,56,56,NULL,NULL,NULL,'TUREGUXX18HFBXXD-1920045018560','TU','HF',1920,450,560,0,1,5,'B','LRSM','HF','XXD',5,78061,1581,4896,2,865,'REGUXX','NO_GRAIN','CARCASS',0),(10,8,59,117,30,NULL,NULL,NULL,NULL,'BCREGUXX18MFOXXB-0700045018560','BC','MF',700,450,560,0,0,0,'O','LSM','MF','XXB',1,2701,1365,3181,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(11,8,60,117,NULL,NULL,NULL,NULL,NULL,'BCBLINDX18MFXXXX-0700050018560','BC','MF',700,500,560,0,0,0,'NSM','NSS','0','0',1,2063,1365,NULL,NULL,NULL,'BLINDX','NO_GRAIN','CARCASS',0),(12,8,2,117,12,12,NULL,NULL,12,'WCLCRECT18MFTXXC-0600030018300','WC','MF',600,300,300,0,1,1,'T','LRBSM','MF','XXC',2,2817,1365,2290,NULL,NULL,'LCRECT','NO_GRAIN','CARCASS',0),(13,8,164,117,47,47,NULL,NULL,NULL,'TUREGUXX18HFBXXN-1900045018580','TU','HF',1900,450,580,0,1,5,'B','LRSM','MF','XXN',1,15858,1581,5600,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(14,8,47,60,47,NULL,NULL,NULL,NULL,'TUMWOVXX18HFOXXN-1320045018560','TU','HF',1320,450,560,0,1,4,'O','LSM','MF','XXN',1,8135,1581,5600,NULL,NULL,'MWOVXX','NO_GRAIN','CARCASS',0),(15,8,NULL,118,NULL,NULL,NULL,NULL,NULL,'BCSINKXX18HFXXXX-0700045018560','BC','HF',700,450,560,1,1,0,'NSM','NSS','0','0',1,2268,1581,NULL,NULL,NULL,'SINKXX','NO_GRAIN','CARCASS',0),(16,8,104,117,107,107,107,107,107,'WCGTPTXX18MFFXXN-0720040018320','WC','MF',720,400,320,0,0,0,'F','FSM','MF','XXN',2,11254,1365,5600,NULL,NULL,'GTPTXX','NO_GRAIN','CARCASS',0),(17,9,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0720045018300','WC','PB',720,450,300,1,1,0,'NSM','NSS','0','0',2,1786,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',1),(18,9,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0720090018300','WC','HF',720,900,300,1,0,0,'NSM','NSS','0','0',2,4025,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(19,9,NULL,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0720045018300','WC','HF',720,450,300,1,1,0,'NSM','NSS','0','0',2,2695,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(20,9,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0720071518300','WC','HF',720,715,300,1,1,0,'NSM','NSS','0','0',1,1739,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(21,9,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0720040018300','WC','HF',720,400,300,1,1,0,'NSM','NSS','0','0',1,1274,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(22,9,59,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700045018560','BC','HF',700,450,560,0,0,0,'NSM','NSS','0','0',1,2428,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(23,9,57,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700030018560','BC','HF',700,300,560,0,0,0,'NSM','NSS','0','0',1,2082,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(24,9,NULL,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700060018560','BC','HF',700,600,560,1,0,0,'NSM','NSS','0','0',2,5220,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(25,9,64,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700090018560','BC','HF',700,900,560,0,0,0,'NSM','NSS','0','0',1,3465,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(26,9,NULL,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700076018560','BC','HF',700,760,560,1,0,0,'NSM','NSS','0','0',1,2976,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(27,9,NULL,118,NULL,NULL,NULL,NULL,NULL,'BCSINKXX18HFXXXX-0700071518550','BC','HF',700,715,550,1,0,0,'NSM','NSS','0','0',1,2828,1581,NULL,NULL,NULL,'SINKXX','NO_GRAIN','CARCASS',0),(28,9,NULL,118,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700040018475','BC','HF',700,400,475,1,1,0,'NSM','NSS','0','0',1,1858,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(29,10,50,NULL,56,56,NULL,NULL,NULL,'TUREGUXX18HFBXXD-1920060018560','TU','HF',1920,600,560,0,1,5,'B','LRSM','HF','XXD',1,16753,1581,4896,2,865,'REGUXX','NO_GRAIN','CARCASS',0),(30,10,164,117,55,55,NULL,NULL,NULL,'TUREGUXX18HFBXXN-1900045018580','TU','HF',1900,450,580,0,1,5,'B','LRSM','MF','XXN',1,15858,1581,5600,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(31,11,15,60,51,NULL,NULL,NULL,NULL,'WCREGUXX18PBOXXA-0700050018300','WC','PB',700,500,300,0,1,1,'O','LSM','MF','XXA',1,1954,997,4344,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(32,1,NULL,117,47,NULL,NULL,NULL,NULL,'WCREGUXX18MFOXXA-0600060018300','WC','MF',600,600,300,1,1,0,'O','LSM','MF','XXA',1,1993,1365,4344,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(33,1,2,119,47,47,NULL,NULL,NULL,'WCREGUXX18HFBXXD-0600030018300','WC','HF',600,300,300,0,1,1,'B','LRSM','HF','XXD',1,2427,1581,4896,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(34,7,5,118,NULL,45,NULL,NULL,NULL,'WCBLINDX18PBOXXA-0600050018300','WC','PB',600,500,300,0,1,1,'O','RSM','MF','XXA',1,1764,997,4344,5,350,'BLINDX','HORIZONTAL','CARCASS',0),(35,7,8,60,47,47,NULL,NULL,NULL,'WCREGUXX18PBBXXA-0600080018300','WC','PB',600,800,300,0,1,1,'B','LRSM','MF','XXA',1,2848,997,4344,5,350,'REGUXX','VERTICAL','CARCASS',0),(36,1,2,119,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600046018300','WC','HF',600,460,300,1,1,1,'NSM','NSS','0','0',1,1426,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(37,1,NULL,60,NULL,NULL,NULL,NULL,NULL,'TUREGUXX18PBXXXX-0900065018300','TU','PB',900,650,300,1,1,5,'NSM','NSS','0','0',1,3026,997,NULL,2,865,'REGUXX','NO_GRAIN','CARCASS',1),(38,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18BWXXXX-0720060018300','WC','BW',720,600,300,1,0,0,'NSM','NSS','0','0',1,2103,2021,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(39,1,NULL,117,48,NULL,NULL,NULL,NULL,'TUMWXXXX18BWOXXA-1960060018550','TU','BW',1960,600,550,1,0,0,'O','LSM','MF','XXA',1,9562,2021,4344,NULL,NULL,'MWXXXX','VERTICAL','CARCASS',0),(40,1,NULL,117,107,NULL,NULL,NULL,NULL,'BCREGUXX18MFOXXN-0720060018560','BC','MF',720,600,560,1,0,0,'O','LSM','MF','XXN',1,4562,1365,5600,1,865,'REGUXX','VERTICAL','CARCASS',0),(41,1,NULL,118,46,46,NULL,NULL,49,'WCBLINDX18PBTXXD-0500045018250','WC','PB',500,450,250,1,0,0,'T','LRBSM','HF','XXD',4,8714,997,4896,5,350,'BLINDX','VERTICAL','CARCASS',0),(42,1,NULL,117,45,55,NULL,56,52,'WCGTPTXX18BWAXXA-0400030018200','WC','BW',400,300,200,1,0,0,'A','ASM','MF','XXA',5,7304,2021,4344,NULL,350,'GTPTXX','VERTICAL','CARCASS',0),(43,7,40,60,46,NULL,NULL,NULL,NULL,'BCREGUXX18HFOXXA-0700045018560','BC','HF',700,450,560,0,1,1,'O','LSM','MF','XXA',1,4138,1581,4344,1,865,'REGUXX','HORIZONTAL','CARCASS',0),(44,1,165,119,110,110,NULL,NULL,NULL,'TUREGUXX18HFBXXL-1900060018580','TU','HF',1900,600,580,0,1,5,'B','LRSM','BW','XXL',1,26910,1581,9337,2,865,'REGUXX','VERTICAL','CARCASS',0),(45,1,6,119,NULL,48,NULL,NULL,NULL,'WCREGUXX18HFOXXD-0600060018300','WC','HF',600,600,300,0,1,1,'O','RSM','HF','XXD',1,2494,1581,4896,5,350,'REGUXX','VERTICAL','CARCASS',0),(46,13,6,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600060018300','WC','PB',600,600,300,0,1,1,'NSM','NSS','0','0',1,1203,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(47,13,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600047018300','WC','PB',600,470,300,1,0,0,'NSM','NSS','0','0',1,808,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',1),(48,13,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600047018300','WC','PB',600,470,300,1,0,0,'NSM','NSS','0','0',2,1616,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(49,13,6,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600060018300','WC','PB',600,600,300,0,1,1,'NSM','NSS','0','0',3,3609,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(50,13,4,118,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600045018300','WC','PB',600,450,300,0,1,1,'NSM','NSS','0','0',3,3087,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(51,14,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0700075018560','WC','PB',700,750,560,1,1,1,'NSM','NSS','0','0',2,4702,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(52,14,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0700045018560','WC','PB',700,450,560,1,1,1,'NSM','NSS','0','0',2,3446,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(53,14,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0550060018300','WC','PB',550,600,300,1,1,1,'NSM','NSS','0','0',1,1064,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(54,14,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0300045018300','WC','PB',300,450,300,1,1,1,'NSM','NSS','0','0',2,1327,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(55,14,29,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0300060018300','WC','PB',300,600,300,0,1,1,'NSM','NSS','0','0',1,762,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(56,1,39,119,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700100018560','BC','HF',700,1000,560,1,1,1,'NSM','NSS','0','0',1,4409,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(57,1,2,119,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600060018300','WC','HF',600,600,300,1,1,1,'NSM','NSS','0','0',1,1687,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(58,1,6,119,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600060018300','WC','HF',600,600,300,0,1,1,'NSM','NSS','0','0',1,1890,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(59,1,2,119,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600031018300','WC','HF',600,310,300,1,1,1,'NSM','NSS','0','0',1,1147,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(60,1,40,119,NULL,82,NULL,NULL,NULL,'BCREGUXX18HFOXXA-0700045018560','BC','HF',700,450,560,0,1,1,'O','RSM','MF','XXA',1,3749,1581,4344,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',1),(61,1,40,119,45,NULL,NULL,NULL,NULL,'BCREGUXX18HFOXXD-0700045018560','BC','HF',700,450,560,0,1,1,'O','LSM','HF','XXD',1,3965,1581,4896,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(62,1,2,117,55,NULL,NULL,NULL,NULL,'WCREGUXX18HFOXXD-0600030018300','WC','HF',600,300,300,0,1,1,'O','LSM','HF','XXD',1,1725,1581,4896,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(63,15,55,117,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18MFXXXX-0700015018560','BC','MF',700,150,560,0,0,0,'NSM','NSS','0','0',2,3122,1365,NULL,1,865,'REGUXX','NO_GRAIN','CARCASS',0),(64,1,9,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600090018300','WC','PB',600,900,300,0,1,1,'NSM','NSS','0','0',1,1551,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(65,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600085018300','WC','PB',600,850,300,1,1,1,'NSM','NSS','0','0',2,2851,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(66,1,6,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600060018300','WC','PB',600,600,300,0,1,1,'NSM','NSS','0','0',1,1203,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(67,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600070018300','WC','PB',600,700,300,1,1,1,'NSM','NSS','0','0',1,1237,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(68,1,NULL,117,6,6,NULL,NULL,NULL,'WCREGUXX18MFBXXC-0600032018600','WC','MF',600,320,600,1,0,0,'B','LRSM','MF','XXC',1,2314,1365,2290,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(69,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0600065018300','WC','PB',600,650,300,1,1,1,'NSM','NSS','0','0',2,2349,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(70,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0450070018300','WC','PB',450,700,300,1,1,1,'NSM','NSS','0','0',1,1085,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(71,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18PBXXXX-0660060018560','BC','PB',660,600,560,1,0,0,'NSM','NSS','0','0',1,1643,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(72,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18PBXXXX-0660086018560','BC','PB',660,860,560,1,1,1,'NSM','NSS','0','0',1,2516,997,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(73,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'BCBLINDL18PBXXXX-0660105018560','BC','PB',660,1050,560,1,1,1,'NSM','NSS','0','0',1,2909,997,NULL,NULL,NULL,'BLINDL','NO_GRAIN','CARCASS',0),(74,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'BCSINKXX18PBXXXX-0660060018560','BC','PB',660,600,560,1,0,0,'NSM','NSS','0','0',1,1643,997,NULL,NULL,NULL,'SINKXX','NO_GRAIN','CARCASS',0),(75,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600075018300','WC','HF',600,750,300,1,0,0,'NSM','NSS','0','0',2,3747,1581,NULL,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(76,1,NULL,117,NULL,46,NULL,NULL,NULL,'WCLCRECT18HFOXXD-0600060018300','WC','HF',600,600,300,1,0,0,'O','RSM','HF','XXD',1,2209,1581,4896,5,350,'LCRECT','NO_GRAIN','CARCASS',0),(77,1,6,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0600060018300','WC','HF',600,600,300,0,1,1,'NSM','NSS','0','0',1,2100,1581,NULL,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(78,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCGTPTXX18HFBXXD-0600060018300','WC','HF',600,600,300,1,0,0,'B','LRSM','HF','XXD',1,2806,1581,4896,5,350,'GTPTXX','NO_GRAIN','CARCASS',0),(79,1,62,117,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700075018560','BC','HF',700,750,560,0,0,0,'NSM','NSS','0','0',1,3119,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(80,1,NULL,117,NULL,NULL,NULL,NULL,NULL,'BCREGUXX18HFXXXX-0700060018560','BC','HF',700,600,560,1,0,0,'NSM','NSS','0','0',2,5220,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(81,1,65,117,NULL,NULL,NULL,NULL,NULL,'BCBLINDL18HFXXXX-0700105018560','BC','HF',700,1050,560,0,0,0,'NSM','NSS','0','0',1,3810,1581,NULL,NULL,NULL,'BLINDL','NO_GRAIN','CARCASS',0),(82,1,4,119,NULL,47,NULL,NULL,NULL,'WCREGUXX18HFOXXD-0600045018300','WC','HF',600,450,300,0,1,1,'O','RSM','HF','XXD',1,2162,1581,4896,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(83,1,99,NULL,89,82,97,12,94,'WCREGUXX18HFFXXG-0720090018320','WC','HF',720,900,320,0,1,1,'F','FSM','BW','XXG',1,7516,1581,4461,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(84,23,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18PBXXXX-0550060018300','WC','PB',550,600,300,1,0,0,'NSM','NSS','0','0',2,2189,997,NULL,5,350,'REGUXX','NO_GRAIN','CARCASS',0),(85,23,NULL,117,NULL,NULL,NULL,NULL,NULL,'WCREGUXX18HFXXXX-0555089218425','WC','HF',555,892,425,1,0,0,'NSM','NSS','0','0',1,2308,1581,NULL,NULL,NULL,'REGUXX','NO_GRAIN','CARCASS',0),(86,24,NULL,117,51,51,NULL,NULL,NULL,'WCMWXXXX18MFBXXA-1960060018560','WC','MF',1960,600,560,1,0,0,'B','LRSM','MF','XXA',2,22633,1365,4344,NULL,NULL,'MWXXXX','NO_GRAIN','CARCASS',0),(87,27,14,60,4,4,NULL,NULL,NULL,'WCREGUXX18PBBXXC-0700045018300','WC','PB',700,450,300,0,1,1,'B','LRSM','MF','XXC',1,1711,997,2290,5,350,'REGUXX','HORIZONTAL','CARCASS',0),(88,26,8,60,NULL,NULL,NULL,NULL,NULL,'WCREGUX18PBXXXXS-0600080018300','WC','PB',600,800,300,0,1,1,'NSM','NSS','0','0',1,1436,997,NULL,NULL,NULL,'REGUX','NO_GRAIN','CARCASS',0),(89,26,NULL,117,26,26,NULL,NULL,NULL,'TUREGUX18MFBXXEX-1500060018360','TU','MF',1500,600,360,1,0,0,'B','LRSM','HF','XXE',1,6579,1365,3733,2,865,'REGUX','HORIZONTAL','CARCASS',0);
/*!40000 ALTER TABLE `carcass_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carcass_subtype_master`
--

DROP TABLE IF EXISTS `carcass_subtype_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carcass_subtype_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `sub_type` varchar(100) DEFAULT NULL,
  `parent_type` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `sub_type_code` varchar(8) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carcass_subtype_master`
--

LOCK TABLES `carcass_subtype_master` WRITE;
/*!40000 ALTER TABLE `carcass_subtype_master` DISABLE KEYS */;
INSERT INTO `carcass_subtype_master` VALUES (1,'Regular','WC','Regular Wall Carcass','REGUX',0),(2,'Right Blind','WC','Right Blind Wall Carcass','BLNDR',0),(3,'Luzy Corner Rectangular','WC','Luzy Corner Rectangular Wall Carcass','LCREC',0),(4,'Luzy Corner Pentagonal','WC','Luzy Corner Pentagonal Wall Carcass','LCPNT',0),(5,'Aquaguard Carcass','WC','Aquaguard Wall Carcass','AQUGD',0),(6,'Dish Rack / Glass Tray / Plate Tray','WC','Glass Tray / Plate Tray / Dish Rack Wall Carcass','GTPTX',0),(7,'Microwave','WC','Microwave Wall Carcass','MWXXX',0),(8,'Regular','BC','Base Carcass Regular','REGUX',0),(9,'Left Blind','BC','Left Blind Base Carcass','BLNDL',0),(10,'Luzy Corner Rectangular','BC','Luzy Corner Rectangular Base Carcass','LCREC',0),(11,'Luzy Corner Pentagonal','BC','Luzy Corner Pentagonal Base Carcass','LCPNT',0),(12,'Sink','BC','Sink Base Carcass','SINKX',0),(13,'Regular','TU','Regular Tall Unit','REGUX',0),(14,'Microwave','TU','Microwave Tall Unit','MWXX',0),(15,'Microwave & Oven','TU','Microwave & Oven Tall Unit','MWOV',0),(16,'Oven','TU','Oven Tall Unit','OVXXX',0),(17,'Right Blind','BC','Right Blind Base Carcass','BLNDR',0),(18,'Left Blind','WC','Left  Blind Wall Carcass','BLNDL',0);
/*!40000 ALTER TABLE `carcass_subtype_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color_code_master`
--

DROP TABLE IF EXISTS `color_code_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color_code_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `color_code` varchar(100) DEFAULT NULL,
  `color_name` varchar(300) DEFAULT NULL,
  `color_category` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.color.ColorCategory',
  `image` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_code_master`
--

LOCK TABLES `color_code_master` WRITE;
/*!40000 ALTER TABLE `color_code_master` DISABLE KEYS */;
INSERT INTO `color_code_master` VALUES (1,'AMCH','American Cherry','STANDARD_MEMBRANE','american cherry.jpg',0),(2,'ASHWD','Ashwood','STANDARD_MEMBRANE','Ashwood.jpg',0),(3,'BRTK','Burma Teak','STANDARD_MEMBRANE','burma teak.jpg',0),(4,'CASA','Casco Sapheli','STANDARD_MEMBRANE','casco sapheli.jpg',0),(5,'CHSTNT','Chestnut','STANDARD_MEMBRANE','Chestnut.jpg',0),(6,'LMNGRN1','Lemon Green 01','STANDARD_MEMBRANE','Lemon green 01.jpg',0),(7,'MTWNG','Matt Wenge','STANDARD_MEMBRANE','matt wenge.jpg',0),(8,'NTWNG','Natural Wenge','STANDARD_MEMBRANE','Natural Wenge.jpg',0),(9,'PSTWLNT','Prestige Walnut','STANDARD_MEMBRANE','Prestige Walnut.jpg',0),(10,'SF3004','SF 3004','STANDARD_MEMBRANE','SF 3004.jpg',0),(11,'SHOWP','Shadow Oak WP','STANDARD_MEMBRANE','Shadow Oak WP.jpg',0),(12,'SHNG','Shangrila','STANDARD_MEMBRANE','Shangrila.jpg',0),(13,'SM 95','SM 95','STANDARD_MEMBRANE','SM 95.jpg',0),(14,'SM931','SM 931','STANDARD_MEMBRANE','SM 931 - Copy.jpg',0),(15,'TMTRD','Tomato Red','STANDARD_MEMBRANE','tomato red.jpg',0),(16,'TRDRE','Trendy Recon','STANDARD_MEMBRANE','Trendy Recon.jpg',0),(17,'TROTK','Tropical Teak','STANDARD_MEMBRANE','Tropical Teak.jpg',0),(18,'WLNTBRNZ','Walnut Bronze','STANDARD_MEMBRANE','Walnut Bronze.jpg',0),(19,'WLNTRIGN','Walnut Rigato New','STANDARD_MEMBRANE','WALNUT RIGATO NEW.jpg',0),(20,'WOK','White Oak','STANDARD_MEMBRANE','White Oak.jpg',0),(21,'BLTMWLNT','Baltimore Walnut','DESIGNER_MEMBRANE','Baltimore Walnut.jpg',0),(22,'BLKSTR','Black Star','DESIGNER_MEMBRANE','black star.jpg',0),(23,'BRNZ','Bronze','DESIGNER_MEMBRANE','bronze.bmp',0),(24,'CNCRT','Concrete','DESIGNER_MEMBRANE','Concrete.jpg',0),(25,'DGL','Douglus Larch','DESIGNER_MEMBRANE','Douglas Larch.jpg',0),(26,'DRFWDWP','Drift Wood WP','DESIGNER_MEMBRANE','Drift Wood WP.jpg',0),(27,'ELMVER2','Elma Veralinga 2','DESIGNER_MEMBRANE','Elma Veralinga 2.jpg',0),(28,'GLDWV','Gold Wave','DESIGNER_MEMBRANE','Gold Wave.jpg',0),(29,'HRZOK','Horizon Oak','DESIGNER_MEMBRANE','Horizon Oak.jpg',0),(30,'KNTWLNT','Knotty Walnut','DESIGNER_MEMBRANE','knotty wallnut.jpg',0),(31,'KRKLTH','Kroko Leather','DESIGNER_MEMBRANE','kroko leather.jpg',0),(32,'LALA','Lauren Larch','DESIGNER_MEMBRANE','Lauren Larch.jpg',0),(33,'MORHW','Modo Rhine White','DESIGNER_MEMBRANE','Modo Rhine White.jpg',0),(34,'OLODLA','Olmo Odeon Lava','DESIGNER_MEMBRANE','Olmo Odeon Lava.jpg',0),(35,'PST','Pista','DESIGNER_MEMBRANE','Pista.jpg',0),(36,'PRKRTM','Purple Kroko TM','DESIGNER_MEMBRANE','Purple Kroko TM.jpg',0),(37,'RNDASH','Rainbow Ash','DESIGNER_MEMBRANE','Rainbow Ash.jpg',0),(38,'SNTOK','Santana Oak','DESIGNER_MEMBRANE','Santana Oak.jpg',0),(39,'SLTGR','Slate Gray','DESIGNER_MEMBRANE','slate grey.jpg',0),(40,'SNASH','Sonoma Ash','DESIGNER_MEMBRANE','Sonoma Ash.jpg',0),(41,'TSCH','Tuscan Cherry','DESIGNER_MEMBRANE','tuscan cherry.jpg',0),(42,'TSWNG','Tuscan Wenge','DESIGNER_MEMBRANE','Tuscan Wenge.jpg',0),(43,'VRMT','Vermount','DESIGNER_MEMBRANE','Vermount.jpg',0),(44,'WPFUOK','WP Fumed Oak','DESIGNER_MEMBRANE','wp fumed oak.jpg',0),(45,'BLKHG','Black High Gloss','HIGHGLOSS_MEMBRANE','BLACK HIGH GLOSS.jpg',0),(46,'HGBRDR','HG Bordeaux Red','HIGHGLOSS_MEMBRANE','HG Bordeaux Red.jpg',0),(47,'HGCAPP','HG Cappuccino','HIGHGLOSS_MEMBRANE','HG Cappuccino.jpg',0),(48,'HGKYPRL','HG Kyoto Pearl','HIGHGLOSS_MEMBRANE','HG Kyoto Pearl.jpg',0),(49,'HGMAGNL','HG Magnolia','HIGHGLOSS_MEMBRANE','HG Magnolia.jpg',0),(50,'HGPN','HG Pine','HIGHGLOSS_MEMBRANE','HG PINE.jpg',0),(51,'HGPRPL','HG Purple','HIGHGLOSS_MEMBRANE','HG Purple.jpg',0),(52,'HGSL','HG Silver','HIGHGLOSS_MEMBRANE','HG Silver.bmp',0),(53,'HGWT','HG White','HIGHGLOSS_MEMBRANE','HG White.jpg',0),(54,'HGYLAL','HG Yellow Alpha','HIGHGLOSS_MEMBRANE','HG Yellow Alpha.jpg',0),(55,'HGBLRD','HG Blood Red','HIGHGLOSS_MEMBRANE','HG-Blood-Red.jpg',0),(56,'HGPLPR','HG Plum Prunus','HIGHGLOSS_MEMBRANE','Plum Prunus.jpg',0),(57,'HGRST','HG Rosa Tea','HIGHGLOSS_MEMBRANE','Rosa Tea.jpg',0),(58,'HGSLTGR','HG Slate Grey','HIGHGLOSS_MEMBRANE','slate grey.jpg',0),(59,'ACAEX','Acacia Exodus','HPL','Acacia Exodus.jpg',0),(60,'ALPRL','Alumina Pearl','HPL','Alumina Pearl.jpg',0),(61,'ARZWLNT','Arizona Walnut','HPL','Arizona Walnut.jpg',0),(62,'AUBOK','Aubrum Oak','HPL','Aubrum Oak.jpg',0),(63,'AUTLF','Autumn Leaf','HPL','Autumn Leaf.jpg',0),(64,'BALOK','Balenese Oak','HPL','Balenese Oak.jpg',0),(65,'BRBNCH','Berry Bunch','HPL','Berry Bunch.jpg',0),(66,'BLKCRR','Black Current','HPL','Black Current.jpg',0),(67,'BLK','Black','HPL','black.jpg',0),(68,'BRNOK','Brown Oak','HPL','Brown Oak.jpg',0),(69,'CNWLNT','Canadian Walnut','HPL','Canadian Walnut.jpg',0),(70,'CRNL','Carnival','HPL','Carnival.jpg',0),(71,'CMHPG','Champagne','HPL','Champagne.jpg',0),(72,'DRKCT','Dark Citrus','HPL','Dark Citrus.jpg',0),(73,'DGPN','Douglas Pine','HPL','Douglas Pine.jpg',0),(74,'EB','Ebony','HPL','Ebony.jpg',0),(75,'ELWD','Elevated Wood','HPL','Elevated Wood.jpg',0),(76,'FRWH','Frosty Write','HPL','frosty white.jpg',0),(77,'GLOK','Golden Oak','HPL','Golden Oak.jpg',0),(78,'INTWH','Interior White','HPL','Interior White.jpg',0),(79,'MALWNG','Malagasy Wenge','HPL','Malagasy Wenge.jpg',0),(80,'MLCN','Malay Cane','HPL','Malay Cane.jpg',0),(81,'MLWNG','Mali Wenge','HPL','Mali Wenge.jpg',0),(82,'MRGL','Marigold','HPL','Marigold.jpg',0),(83,'MDTOK','Mediterranian Oak','HPL','Mediterranean Oak.jpg',0),(84,'MDNTOK','Midnight Oak','HPL','Midnight Oak.jpg',0),(85,'MSTOK','Misty Oak','HPL','Misty Oak.jpg',0),(86,'OCNRCN','Ocean Recon','HPL','Ocean Recon.jpg',0),(87,'ORCHDL','Orchid Delight','HPL','Orchid Delight.jpg',0),(88,'PRLBL','Pearl Black','HPL','Pearl Black.jpg',0),(89,'PPY','Poppy','HPL','Poppy.jpg',0),(90,'SFRN','Saffron','HPL','Saffaron.jpg',0),(91,'SNDRCN','Sandy Recon','HPL','Sandy Recon.jpg',0),(92,'SHNRGLMT','Shangrilla Matt','HPL','Shangrila - Matt.jpg',0),(93,'SHNGRLHPL','Shangrila HPL','HPL','Shangrila.jpg',0),(94,'SHR','Shore','HPL','Shore.jpg',0),(95,'SLGRHPL','Slate Gray HPL','HPL','slate grey.jpg',0),(96,'SLT','Slate','HPL','Slate.jpg',0),(97,'TN','Tan','HPL','Tan.jpg',0),(98,'TKEX','Teak Exotica','HPL','Teak Exotica.jpg',0),(99,'TNDFRST','Tundra Forest','HPL','Tundra Forest.jpg',0),(100,'TWIOK','Twilight Oak','HPL','Twilight Oak.jpg',0),(101,'VKTK','Viking Teak','HPL','Viking Teak.jpg',0),(102,'WLPLM','Wallis Plum','HPL','Wallis Plum.jpg',0),(103,'BRDRD','Bordeaux Red','READYMADE_ACRYLIC','Bordeaux Red.jpg',0),(104,'CF','Cafe','READYMADE_ACRYLIC','Cafe.jpg',0),(105,'EBAC','Ebony ACR','READYMADE_ACRYLIC','ebony.jpg',0),(106,'FL','Floral','READYMADE_ACRYLIC','Floral.jpg',0),(107,'GPH','Graphite','READYMADE_ACRYLIC','Graphite.jpg',0),(108,'MTHPRL','Mother Of Pearl','READYMADE_ACRYLIC','Mother of Pearl.jpg',0),(109,'OBRGN','Obergene','READYMADE_ACRYLIC','Obergene.jpg',0),(110,'OLV','Olive','READYMADE_ACRYLIC','olive.jpg',0),(111,'PMBO','PIOMBO','READYMADE_ACRYLIC','Piombo.jpg',0),(112,'STL','Steel','READYMADE_ACRYLIC','Steel.bmp',0),(113,'TROP','Tortora Opaco','READYMADE_ACRYLIC','Tortora Opaco.jpg',0),(114,'VNL','Vanilla','READYMADE_ACRYLIC','Vanilla.bmp',0),(115,'WHOP','White Opaco','READYMADE_ACRYLIC','White Opaco.jpg',0),(116,'WHAC','White Acrylic','READYMADE_ACRYLIC','White.jpg',0),(117,'KNGWHT','Kingston White','PRELAM','Paper kingston.jpg',0),(118,'CSP','Caspani','PRELAM','CASPANI FABRIC.jpg',0),(119,'ABSWHT','Abstract White','PRELAM','Abstract.jpg',0),(120,'LV','Lava','DESIGNER_MEMBRANE','Olmo Odeon Lava.jpg',0);
/*!40000 ALTER TABLE `color_code_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color_constraint_master`
--

DROP TABLE IF EXISTS `color_constraint_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color_constraint_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `component` varchar(100) NOT NULL,
  `material_code` varchar(100) NOT NULL,
  `colors` varchar(100) DEFAULT '[]' COMMENT 'JSON ARRAY String location_category.id',
  `finish_code` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_constraint_master`
--

LOCK TABLES `color_constraint_master` WRITE;
/*!40000 ALTER TABLE `color_constraint_master` DISABLE KEYS */;
INSERT INTO `color_constraint_master` VALUES (27,'CARCASE','PB','[117,118,60]',NULL,0),(28,'CARCASE','MF','[117,60,118]',NULL,0),(29,'CARCASE','HF','[117,60,118,119]',NULL,0),(30,'CARCASE','BW','[117,60]',NULL,0),(31,'MEMBRANE_GLOSSY_MDF','','[45,55,46,47,48,49,82,50,56,51,57,52,53,54]','XXA',0),(32,'MEMBRANE_DESIGNER_MDF','','[23,24,25,26,27,44,29,30,31,32,35,37,39,40,36,41,42,43]','XXB',0),(33,'MEMBRANE_STANDARD_MDF','','[4,7,8,6,9,11,12,14,13,15,16,17,18,19,3,1]','XXC',0),(34,'MEMBRANE_GLOSSY_HDF','','[45,55,46,47,48,49,82,50,56,51,57,53,54]','XXD',0),(35,'MEMBRANE_DESIGNER_HDF','','[23,24,25,26,27,44,29,30,31,32,33,35,37,39,40,36,41,42,43,120]','XXE',0),(36,'MEMBRANE_STANDARD_HDF','','[4,7,8,6,9,11,12,14,13,15,16,17,18,19,3,1]','XXF',0),(37,'HPL_MR_GLOSS_PLY','','[63,65,70,71,72,75,76,82,87,88,89,90,12,94,97]','XXG',0),(38,'HPL_HIGH_GLOSS_PLY','','[60,67,66,96]','XXH',0),(39,'HPL_MATT_PLY','','[59,60,61,62,64,66,68,69,73,74,77,78,79,80,81,82,83,84,85,86,91,98,99,100,101]','XXI',0),(40,'MILANO_ACRYLIC_STD_PLY','','[104,107,108,109,110,113,114,116,115]','XXL',0),(41,'MILANO_ACRYLIC_PREMIUM_PLY','','[106,111]','XXM',0),(42,'POLYMER_GLOSSY_MDF','','[67,55,47,74,107]','XXN',0);
/*!40000 ALTER TABLE `color_constraint_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cornice_order_details`
--

DROP TABLE IF EXISTS `cornice_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cornice_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `finish_price` double DEFAULT NULL,
  `finish` varchar(100) DEFAULT NULL,
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cornice_order_details_order_head_id_fk` (`order_head_id`),
  KEY `cornice_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `cornice_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `cornice_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cornice_order_details`
--

LOCK TABLES `cornice_order_details` WRITE;
/*!40000 ALTER TABLE `cornice_order_details` DISABLE KEYS */;
INSERT INTO `cornice_order_details` VALUES (40,7,40,'COR-CR2X18HFXXXE-0900012018000','COR-CR2X','HF',900,120,18,2,806,3733,'XXE','CORNICE',0),(41,7,48,'COR-CR3X18HFXXXD-0450012018000','COR-CR3X','HF',450,120,18,1,264,4896,'XXD','CORNICE',1);
/*!40000 ALTER TABLE `cornice_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_master`
--

DROP TABLE IF EXISTS `department_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_master`
--

LOCK TABLES `department_master` WRITE;
/*!40000 ALTER TABLE `department_master` DISABLE KEYS */;
INSERT INTO `department_master` VALUES (3,'Accounting','Accounting',0),(4,'Designing','Designing',0),(5,'ffdgdf','ggdfgdfg',1);
/*!40000 ALTER TABLE `department_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drawer_order_details`
--

DROP TABLE IF EXISTS `drawer_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drawer_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) DEFAULT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `std_one_side_price` double DEFAULT '0',
  `finish` varchar(100) DEFAULT NULL,
  `grain` varchar(100) DEFAULT NULL,
  `handle` varchar(100) DEFAULT NULL,
  `handle_length` double DEFAULT '0',
  `handle_finish` varchar(100) DEFAULT NULL,
  `handle_price` double DEFAULT '0',
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `drawer_order_details_order_head_id_fk` (`order_head_id`),
  KEY `drawer_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `drawer_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `drawer_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drawer_order_details`
--

LOCK TABLES `drawer_order_details` WRITE;
/*!40000 ALTER TABLE `drawer_order_details` DISABLE KEYS */;
INSERT INTO `drawer_order_details` VALUES (1,7,30,'DF228X-18HFXXXE-0920060018000','DF228','HF',920,600,18,2,4121,3733,'XXE','NO_GRAIN',NULL,NULL,NULL,NULL,'DRAWER',0),(2,7,70,'DRAWERX-18BWXXXG-0800070018000',NULL,'BW',800,700,18,1,2817,4461,'XXG','VERTICAL','HAN-EP01',800,'Silver Anodised (Chrome)',399,'DRAWER',0),(3,7,23,'DF203X-18HFXXXE-0900060018000','DF203','HF',900,600,18,2,4978,3733,'XXE','VERTICAL','HAN-H17X',320,'BSN (Brushed Satin Nickel)',473,'DRAWER',1),(4,14,120,'DF223X-18HFXXXE-0175075018000','DF223','HF',175,750,18,2,980,3733,'XXE','NO_GRAIN',NULL,NULL,NULL,NULL,'DRAWER',0),(5,1,NULL,'DRAWERX-18MFXXXA-0396019818000',NULL,'MF',396,198,18,3,1022,4344,'XXA','NO_GRAIN',NULL,NULL,NULL,NULL,'DRAWER',0),(6,16,59,'DRAWERX-18BWXXXI-0200030018000',NULL,'BW',200,300,18,1,315,3338,'XXI','VERTICAL','HAN-H10X',160,'CP(Chrome)',115,'DRAWER',0),(7,1,NULL,'DRAWERX-18HFXXXD-0148059818000',NULL,'HF',148,598,18,2,1271,4896,'XXD','NO_GRAIN','HAN-EP01',598,'Silver Anodised (Aluminum)',338,'DRAWER',0),(8,1,46,'DF233X-18HFXXXD-0148059818000','DF233','HF',148,598,18,4,2542,4896,'XXD','NO_GRAIN','HAN-EP01',598,'Silver Anodised (Aluminum)',338,'DRAWER',0),(9,1,46,'DRAWERX-18HFXXXD-0198059818000',NULL,'HF',198,598,18,2,1564,4896,'XXD','NO_GRAIN','HAN-EP01',598,'Silver Anodised (Aluminum)',338,'DRAWER',0),(10,1,46,'DF233X-18HFXXXD-0348059818000','DF233','HF',348,598,18,2,2442,4896,'XXD','NO_GRAIN','HAN-EP01',598,'Silver Anodised (Aluminum)',338,'DRAWER',0),(11,1,46,'DF233X-18HFXXXD-0148074818000','DF233','HF',148,748,18,1,795,4896,'XXD','NO_GRAIN','HAN-EP01',748,'Silver Anodised (Aluminum)',338,'DRAWER',0),(12,1,46,'DF233X-18HFXXXD-0198074818000','DF233','HF',198,748,18,1,978,4896,'XXD','NO_GRAIN','HAN-EP01',748,'Silver Anodised (Aluminum)',338,'DRAWER',0),(13,1,46,'DF233X-18HFXXXD-0348074818000','DF233','HF',348,748,18,1,1527,4896,'XXD','NO_GRAIN','HAN-EP01',748,'Silver Anodised (Aluminum)',338,'DRAWER',0),(14,24,9,'DF201X-18MFXXXC-0800025018000','DF201','MF',800,250,18,5,2290,2290,'XXC','VERTICAL',NULL,NULL,NULL,NULL,'DRAWER',0);
/*!40000 ALTER TABLE `drawer_order_details` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_master`
--

LOCK TABLES `employee_master` WRITE;
/*!40000 ALTER TABLE `employee_master` DISABLE KEYS */;
INSERT INTO `employee_master` VALUES (1,'E001','Rahul Sharma','rs@xyz.com','8567891596',0),(2,'E002','Salman Niyazi','sn@xyz.com','7893541698',0);
/*!40000 ALTER TABLE `employee_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filler_order_details`
--

DROP TABLE IF EXISTS `filler_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filler_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `finish_price` double DEFAULT NULL,
  `finish` varchar(100) DEFAULT NULL,
  `bsm` tinyint(1) NOT NULL DEFAULT '0',
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `filler_order_details_order_head_id_fk` (`order_head_id`),
  KEY `filler_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `filler_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `filler_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filler_order_details`
--

LOCK TABLES `filler_order_details` WRITE;
/*!40000 ALTER TABLE `filler_order_details` DISABLE KEYS */;
INSERT INTO `filler_order_details` VALUES (1,7,26,'FILLERXX12MFXXXB-0600090012000','FILLERXX','MF',600,900,12,2,3435,3181,'XXB',0,'FILLER',0),(2,7,9,'FILLERXX18HFXXXF-0750090018000','FILLERXX','HF',750,900,18,1,3838,2843,'XXF',1,'FILLER',0),(3,1,6,'FILLERXX18MFXXXC-0100060018000','FILLERXX','MF',100,600,18,2,275,2290,'XXC',0,'FILLER',0),(4,1,6,'FILLERXX18MFXXXC-0100018018000','FILLERXX','MF',100,180,18,1,41,2290,'XXC',0,'FILLER',0),(5,1,6,'FILLERXX18MFXXXC-0100070018000','FILLERXX','MF',100,700,18,2,321,2290,'XXC',0,'FILLER',0),(6,1,6,'FILLERXX18MFXXXC-0100032018000','FILLERXX','MF',100,320,18,1,73,2290,'XXC',0,'FILLER',0),(7,1,6,'FILLERXX18MFXXXC-0100040018000','FILLERXX','MF',100,400,18,1,92,2290,'XXC',0,'FILLER',0),(8,1,6,'FILLERXX18MFXXXC-0100160018000','FILLERXX','MF',100,1600,18,1,366,2290,'XXC',0,'FILLER',0),(9,1,6,'FILLERXX18MFXXXC-0100120018000','FILLERXX','MF',100,1200,18,1,275,2290,'XXC',0,'FILLER',0),(10,1,45,'FILLERXX18MFXXXA-0400032518000','FILLERXX','MF',400,325,18,1,565,4344,'XXA',0,'FILLER',0),(11,1,45,'FILLERXX18MFXXXA-0400010018000','FILLERXX','MF',400,100,18,1,174,4344,'XXA',0,'FILLER',0),(12,1,46,'FILLERXX18HFXXXD-0120070018000','FILLERXX','HF',120,700,18,1,411,4896,'XXD',0,'FILLER',0),(13,1,46,'FILLERXX18HFXXXD-0100070018000','FILLERXX','HF',100,700,18,3,1028,4896,'XXD',0,'FILLER',0),(14,17,4,'FILLERXX18HFXXXF-0100071818000','FILLERXX','HF',100,718,18,3,612,2843,'XXF',0,'FILLER',0),(15,20,4,'FILLERXX18HFXXXF-0700010018000','FILLERXX','HF',700,100,18,3,597,2843,'XXF',0,'FILLER',0),(16,23,23,'FILLERXX18MFXXXB-0500050018000','FILLERXX','MF',500,500,18,1,795,3181,'XXB',0,'FILLER',0),(17,24,48,'FILLERXX18MFXXXA-1200020018000','FILLERXX','MF',1200,200,18,1,2085,4344,'XXA',1,'FILLER',0),(18,24,27,'FILLERXX18MFXXXB-0500060018000','FILLERXX','MF',500,600,18,2,3817,3181,'XXB',1,'FILLER',0),(19,24,NULL,'FILLERXX18BWXXXQ-0500060018000','FILLERXX','BW',500,600,18,5,17004,5668,'XXQ',1,'FILLER',0),(20,26,27,'FILLERXX18HFXXXE-0900060018000','FILLERXX','HF',900,600,18,1,4032,3733,'XXE',1,'FILLER',0);
/*!40000 ALTER TABLE `filler_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finish_price`
--

DROP TABLE IF EXISTS `finish_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `finish_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `material_id` int(11) DEFAULT NULL COMMENT 'REF raw_material_master.id',
  `finish_name` varchar(100) NOT NULL,
  `finish_code` varchar(100) DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  `for_carcass` tinyint(1) DEFAULT '0',
  `for_shutter` tinyint(1) DEFAULT '0',
  `category` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `finish_code_UNIQUE` (`finish_code`),
  KEY `finish_price_material_id_fk` (`material_id`),
  CONSTRAINT `finish_price_material_id_fk` FOREIGN KEY (`material_id`) REFERENCES `raw_material_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finish_price`
--

LOCK TABLES `finish_price` WRITE;
/*!40000 ALTER TABLE `finish_price` DISABLE KEYS */;
INSERT INTO `finish_price` VALUES (1,2,'Membrane Glossy MDF','XXA',4344,1,0,'MEMBRANE',0),(2,2,'Membrane Designer MDF','XXB',3181,1,0,'MEMBRANE',0),(3,2,'Membrane Standard MDF','XXC',2290,1,0,'MEMBRANE',0),(4,3,'Membrane Glossy HDF','XXD',4896,1,0,'MEMBRANE',0),(5,3,'Membrane Designer HDF','XXE',3733,1,0,'MEMBRANE',0),(6,3,'Membrane Standard HDF','XXF',2843,1,0,'MEMBRANE',0),(7,5,'HPL MR + Gloss Ply','XXG',4461,1,0,'HPL',0),(8,5,'HPL High Gloss Ply','XXH',3675,1,0,'HPL',0),(9,5,'HPL Matt Ply','XXI',3338,1,0,'HPL',0),(10,3,'Oriental Acrylic Solid HDF','XXJ',6765,1,0,'ACRYLIC',0),(11,3,'Oriental Acrylic Woodgrain HDF','XXK',7618,1,0,'ACRYLIC',0),(12,5,'Milano Acrylic Standard Ply','XXL',9337,1,0,'ACRYLIC',0),(13,5,'Milano Acrylic Premium Ply','XXM',12204,1,0,'ACRYLIC',0),(14,2,'Polymer Glossy MDF','XXN',5600,1,0,'POLYMER',0),(15,3,'PU Lacqured Solid HDF','XXO',5210,1,0,'PU',0),(16,3,'PU Lacqured Metallic HDF','XXP',6126,1,0,'PU',0),(17,5,'PU Lacqured Solid Ply','XXQ',5668,1,0,'PU',0),(18,5,'PU Lacqured Metallic Ply','XXR',6583,1,0,'PU',0),(19,2,'PU Lacqured Solid MDF','XXS',4745,1,0,'PU',0),(20,2,'PU Lacqured Metallic MDF','XXT',5660,1,1,'PU',0),(22,1,'gfgbfg','bfgbfgb',111,0,0,NULL,1),(23,2,'PU Lacqured Solid MDF with J Profile','XXU',6999,0,1,'PU',0),(24,2,'PU Lacqured Metallic MDF with J Profile','XXV',7368,NULL,1,'PU',0),(25,NULL,'G-20 Aluminium Finish','XXW',295,NULL,1,'ALUMINIUM',0),(26,NULL,'G-50 Aluminium Finish','XXX',412,NULL,1,'ALUMINIUM',0),(27,NULL,'G-50 Mirror Finish','XXY',620,NULL,1,'ALUMINIUM',0),(28,NULL,'G-55 Aluminium Finish','XXZ',760,NULL,1,'ALUMINIUM',0),(29,NULL,'GL-16 Glass Shutter Frame','XAA',610,NULL,1,'ALUMINIUM',0);
/*!40000 ALTER TABLE `finish_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handle_order_details`
--

DROP TABLE IF EXISTS `handle_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handle_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `finish` varchar(100) DEFAULT NULL,
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `handle_order_details_order_head_id_fk` (`order_head_id`),
  CONSTRAINT `handle_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handle_order_details`
--

LOCK TABLES `handle_order_details` WRITE;
/*!40000 ALTER TABLE `handle_order_details` DISABLE KEYS */;
INSERT INTO `handle_order_details` VALUES (44,7,'HAN-H10XXXXXXXXX-0160MM','HAN-H10X',160,2,230,'CP(Chrome)','HANDLE',1),(45,7,'HAN-EP01XXXXXXXX-1200MM','HAN-EP01',1200,1,479,'Silver Anodised (Chrome)','HANDLE',0),(46,23,'HAN-H01XXXXXXXXX-0160MM','HAN-H01X',160,5,825,'CP(Chrome)','HANDLE',0),(47,24,'HAN-H31XXXXXXXXX-0228MM','HAN-H31X',228,5,1485,'Low Bright Mirror','HANDLE',0);
/*!40000 ALTER TABLE `handle_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handle_price`
--

DROP TABLE IF EXISTS `handle_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `handle_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `kitchen_component` varchar(100) DEFAULT NULL,
  `finish` varchar(100) NOT NULL,
  `cd` double DEFAULT NULL,
  `price` double NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handle_price`
--

LOCK TABLES `handle_price` WRITE;
/*!40000 ALTER TABLE `handle_price` DISABLE KEYS */;
INSERT INTO `handle_price` VALUES (19,'HAN-H01X','CP(Chrome)',160,165,0),(20,'HAN-H10X','CP(Chrome)',160,115,0),(21,'HAN-H14X','SC (Satin Chrome)',160,209,0),(22,'HAN-H15X','CP/OS (Sanded)',128,131,0),(23,'HAN-H15X','CP/OS (Sanded)',160,189,0),(24,'HAN-H17X','BSN (Brushed Satin Nickel)',224,191,0),(25,'HAN-H17X','BSN (Brushed Satin Nickel)',320,473,0),(26,'HAN-H20X','SC (Satin Chrome)',320,371,0),(27,'HAN-H31X','Low Bright Mirror',228,297,0),(28,'HAN-H31X','Low Bright Mirror',320,331,0),(29,'HAN-H31X','Low Bright Mirror',500,475,0),(30,'HAN-H31X','Low Bright Mirror',800,732,0),(31,'HAN-H31X','Low Bright Mirror',1300,1098,0),(32,'HAN-H33X','Bright Mirror',297,218,0),(33,'HAN-H33X','Bright Mirror',447,289,0),(34,'HAN-H33X','Bright Mirror',497,313,0),(35,'HAN-H33X','Bright Mirror',597,368,0),(36,'HAN-H33X','Bright Mirror',797,442,0),(37,'HAN-H33X','Bright Mirror',897,459,0),(38,'HAN-H34X','Bright Mirror',196,242,0),(39,'HAN-H34X','Bright Mirror',246,363,0),(40,'HAN-H35X','Silver Anodised',32,95,0),(41,'HAN-H36X','Bright Mirror',160,197,0),(42,'HAN-H36X','Bright Mirror',320,300,0),(43,'HAN-H38X','Silver Anodised',188,257,0),(44,'HAN-H38X','Silver Anodised',338,371,0),(45,'HAN-H38X','Silver Anodised',488,448,0),(46,'HAN-H38X','Silver Anodised',788,599,0),(47,'HAN-H380','Matt Brush Khaki',297,235,0),(48,'HAN-H380','Matt Brush Khaki',447,312,0),(49,'HAN-H380','Matt Brush Khaki',497,335,0),(50,'HAN-H380','Matt Brush Khaki',597,388,0),(51,'HAN-H380','Matt Brush Khaki',797,497,0),(52,'HAN-H380','Matt Brush Khaki',897,548,0),(53,'HAN-EP01','Silver Anodised (Aluminum)',0,338,0),(54,'HAN-EP01','Silver Anodised (Chrome)',0,399,0);
/*!40000 ALTER TABLE `handle_price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kitchen_component_master`
--

DROP TABLE IF EXISTS `kitchen_component_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kitchen_component_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `component` varchar(100) DEFAULT NULL,
  `component_code` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.kitchencomponent.KitchenComponentCategory',
  `image` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchen_component_master`
--

LOCK TABLES `kitchen_component_master` WRITE;
/*!40000 ALTER TABLE `kitchen_component_master` DISABLE KEYS */;
INSERT INTO `kitchen_component_master` VALUES (1,'Wall Carcass','WC','CARCASS','view 3 up.jpg',0),(2,'Base Carcass','BC','CARCASS','view 5.jpg',0),(3,'Tall Carcass','TU','CARCASS','view 4.jpg',0),(4,'Base-Blind Carcase','BB','CARCASS','Carcass 250x250.jpg',1),(5,'Regular Profile Shutter - SH101','SH101','SHUTTER','SH 101.png',0),(6,'Regular Profile Shutter - SH102','SH102','SHUTTER','SH 102.png',0),(7,'Regular Profile Shutter - SH103','SH103','SHUTTER','SH 103.png',0),(8,'Regular Profile Shutter - SH105','SH105','SHUTTER','SH 105.png',0),(9,'Regular Profile Shutter - SH107','SH107','SHUTTER','SH 107.png',0),(10,'Regular Profile Shutter - SH108','SH108','SHUTTER','SH 108.png',0),(11,'Regular Profile Shutter - SH109','SH109','SHUTTER','SH 109.png',0),(12,'Regular Profile Shutter - SH110','SH110','SHUTTER','SH 110.png',0),(13,'Regular Profile Shutter - SH113','SH113','SHUTTER','SH 113.png',0),(14,'Regular Profile Shutter - SH114','SH114','SHUTTER','SH 114.png',0),(15,'Regular Profile Shutter - SH119','SH119','SHUTTER','SH 119.png',0),(16,'Regular Profile Shutter - SH121','SH121','SHUTTER','SH 121.png',0),(17,'Regular Profile Shutter - SH128','SH128','SHUTTER','SH 128.png',0),(18,'Regular Profile Shutter - SH129','SH129','SHUTTER','SH 129.png',0),(19,'Regular Profile Shutter - SH131','SH131','SHUTTER','SH 131.png',0),(20,'Regular Profile Shutter - SH115','SH115','SHUTTER','SH 115.png',0),(21,'Regular Profile Shutter - SH116','SH116','SHUTTER','SH 116.png',0),(22,'Regular Profile Shutter - SH118','SH118','SHUTTER','SH 118.png',0),(23,'Plain-Eco Profile Shutter - SH104','SH104','SHUTTER','SH 104.jpg',0),(24,'Plain-Eco Profile Shutter - SH106','SH106','SHUTTER','SH 106.jpg',0),(25,'Plain-Eco Profile Shutter - SH111','SH111','SHUTTER','SH 111.jpg',0),(26,'Plain-Eco Profile Shutter - SH123','SH123','SHUTTER','SH 123.jpg',0),(27,'HIGH GLOSS Shutter- SH133','SH133','SHUTTER','SH 123.png',0),(28,'Plain-Eco Profile Shutter - SH130 (2 Sides)','SH130','SHUTTER','SH 130.jpg',0),(29,'Plain-Eco Profile Shutter - SH46','SH146','SHUTTER','SH 146.jpg',0),(30,'Plain-Eco Profile Shutter - SH135 (2 Sides)','SH135','SHUTTER','SH 135.jpg',0),(31,'Regular Glass Shutter - SH118','SH118GL','SHUTTER','SH 121 GLASS.png',1),(32,'Mesh Glass Shutter - SH118','SH118MGL','SHUTTER','SH 118 MESH GLASS.png',1),(33,'Aluminium Glass Frame Shutter - G55','G55','SHUTTER','C55.png',0),(34,'Aluminium Glass Frame Shutter - G50','G50','SHUTTER','C55.png',0),(35,'Aluminium Glass Frame Shutter - G20','G20','SHUTTER','G20.png',0),(36,'Regular Drawer Front - DF201','DF201','DRAWER','DF 101.jpg',0),(37,'Regular Drawer Front - DF202','DF202','DRAWER','DF 102.jpg',0),(38,'Regular Drawer Front - DF203','DF203','DRAWER','DF 103.jpg',0),(39,'Regular Drawer Front - DF205','DF205','DRAWER','DF 105.jpg',0),(40,'Regular Drawer Front - DF207','DF207','DRAWER','DF 107.jpg',0),(41,'Regular Drawer Front - DF208','DF208','DRAWER','DF 208.jpg',0),(42,'Regular Drawer Front - DF209','DF209','DRAWER','DF 109.jpg',0),(43,'Regular Drawer Front - DF213','DF213','DRAWER','DF 213.jpg',0),(44,'Regular Drawer Front - DF214','DF214','DRAWER','DF 214.jpg',0),(45,'Regular Drawer Front - DF219','DF219','DRAWER','DF 219.jpg',0),(46,'Regular Drawer Front - DF221','DF221','DRAWER','DF 221.jpg',0),(47,'Regular Drawer Front - DF228','DF228','DRAWER','DF 228.jpg',0),(48,'Regular Drawer Front - DF229','DF229','DRAWER','DF 229.jpg',0),(49,'Regular Drawer Front - DF231','DF231','DRAWER','DF 231.jpg',0),(50,'Regular Drawer Front - DF215','DF215','DRAWER','DF 215.jpg',0),(51,'Regular Drawer Front - DF216','DF216','DRAWER','DF 216.jpg',0),(52,'Regular Drawer Front - DF218','DF218','DRAWER','DF 218.jpg',0),(53,'Plain-Eco Drawer Front - DF204','DF204','DRAWER','DF 204.jpg',0),(54,'Plain-Eco Drawer Front - DF206','DF206','DRAWER','DF 206.jpg',0),(55,'Plain-Eco Drawer Front - DF211','DF211','DRAWER','DF 211.jpg',0),(56,'Plain-Eco Drawer Front - DF223','DF223','DRAWER','DF 223.jpg',0),(57,'High-Gloss Drawer Front - DF233','DF233','DRAWER','DF 223.jpg',0),(58,'Plain-Eco Drawer Front - DF230','DF230','DRAWER','DF 230.jpg',0),(59,'Plain-Eco Drawer Front - DF246','DF246','DRAWER','DF 246.jpg',0),(60,'Filler','FILLERXX','FILLER','Ebony.jpg',0),(61,'Panel','PLTPANEL','PANEL','Piombo.jpg',0),(62,'Pelmet - PL1','PEL-PL1X','PELMET','Cornice PL1.jpg',0),(63,'Pelmet - PL2','PEL-PL2X','PELMET','Cornice PL2.jpg',0),(64,'Cornice - CR1','COR-CR1X','CORNICE','Cornice CR1.jpg',0),(65,'Cornice - CR2','COR-CR2X','CORNICE','Cornice CR2.jpg',0),(66,'Cornice - CR3','COR-CR3X','CORNICE','Cornice CR3.jpg',1),(67,'Cornice - CR4','COR-CR4X','CORNICE','Cornice CR4.jpg',0),(68,'Profile Handles - H-01','HAN-H01X','HANDLE','1.jpg',0),(69,'Profile Handles - H-10','HAN-H10X','HANDLE','H10 CD 160 mm .jpg',0),(70,'Profile Handles - H-14','HAN-H14X','HANDLE','H14 CD 160 mm .jpg',0),(71,'Profile Handles - H-15','HAN-H15X','HANDLE','H15 CD 120,160,224mm .jpg',0),(72,'Profile Handles - H-17','HAN-H17X','HANDLE','H17 CD 224,320 mm .jpg',0),(73,'Profile Handles - EP-01','HAN-EP01','HANDLE','Shutter EP 01.jpg',0),(74,'Profile Handles - H-31','HAN-H31X','HANDLE','H31 CD 228,320,400,500,800,1300mm.jpg',0),(75,'Profile Handles - H-33','HAN-H33X','HANDLE','H33 CD 297,447,497,597,797,897mm.jpg',0),(76,'Profile Handles - H-34','HAN-H34X','HANDLE','H34 CD 196,246,500mm .jpg',0),(77,'Profile Handles - H-35','HAN-H35X','HANDLE','H35 CD 32 mm .jpg',0),(78,'Profile Handles - H-36','HAN-H36X','HANDLE','1big.jpg',0),(79,'Drawer','DF2451','DRAWER','PhotoScan 2.jpg',1),(80,'Shutter SH1192','SH1333','SHUTTER','PhotoScan 2.jpg',1),(81,'Shutter SH345','SH345','SHUTTER','butterfly.jpg',1),(82,'Profile Handles - H-20','HAN-H20X','HANDLE','H20-0.jpg',0),(83,'Profile Handles - H-38','HAN-H38X','HANDLE','H38-1.jpg',0),(84,'Profile Handles - H-380','HAN-H380','HANDLE','H380 (1).jpg',0);
/*!40000 ALTER TABLE `kitchen_component_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `depth` double NOT NULL,
  `non_standard_dimension` tinyint(1) NOT NULL DEFAULT '0',
  `shelf` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `order_details_order_head_id_fk` (`order_head_id`),
  CONSTRAINT `order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,'PLT-PANEL-18MF-0600030018000','PLT-PANEL','MF',600,300,0,0,0,0),(2,7,'PLTPANEL16PBXXXX-2400120016000','PLTPANEL','PB',2400,1200,0,0,0,0),(3,7,'PLTPANEL25MFXXXX-1200060025000','PLTPANEL','MF',1200,600,0,0,0,0);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

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
  `po_date` datetime DEFAULT NULL,
  `po_value` varchar(100) DEFAULT NULL,
  `marketing_head` varchar(100) DEFAULT NULL,
  `order_initiated_by` int(11) DEFAULT NULL COMMENT 'REF user.id',
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
  CONSTRAINT `order_head_order_initiated_by_fk` FOREIGN KEY (`order_initiated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_head`
--

LOCK TABLES `order_head` WRITE;
/*!40000 ALTER TABLE `order_head` DISABLE KEYS */;
INSERT INTO `order_head` VALUES (1,'OC1','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Pantaloons India','4654654','564654','2017-11-01 00:00:00','85000','E001',1,'C',NULL,'25',0),(2,'OC2','H','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'D','T','Edge Turnkey Kitchens','5897','8798','2017-11-01 00:00:00','175000','E002',1,'C',NULL,'12',0),(3,'OC3','SP','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'R','T','Edge Turnkey','397548','4654567','2017-11-01 00:00:00','95246','E001',1,'C',NULL,'12',0),(4,'OC4','H','EH','NON_PROJECTS','COMPONENTS',1,1,NULL,'T','T','Pantaloon India Interiors','78956','8795','2017-11-08 00:00:00','150000','E001',1,'C',NULL,'10',0),(5,'OC5','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Pantaloon Foundation','498198',NULL,'2017-11-11 00:00:00',NULL,'E001',1,'C',NULL,'10',0),(6,'OC6','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Trial Project','64654','65465465','2017-11-15 00:00:00',NULL,'E001',1,'C',NULL,'5',0),(7,'OC7','K','EH','NON_PROJECTS','COMPONENTS',1,1,'440033','D','N','Pantaloons Interior','687687','78786','2017-11-21 00:00:00',NULL,'E001',1,'C',NULL,'2',0),(8,'OC8','K','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'T','T',NULL,NULL,NULL,'2017-11-07 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(9,'OC9','K','ECH','NON_PROJECTS','COMPONENTS',2,2,NULL,'T','T',NULL,NULL,NULL,'2017-11-22 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(10,'OC10','K','ECH','NON_PROJECTS','COMPONENTS',2,2,NULL,'D','N',NULL,NULL,NULL,NULL,NULL,'E001',1,'C',NULL,NULL,0),(11,'OC11','K','SH','NON_PROJECTS','COMPONENTS',1,1,'440033','D','N','Pantaloon India','456546','54564','2017-11-27 00:00:00',NULL,'E001',1,'C',NULL,'2',0),(12,'OC12','K','ECH','NON_PROJECTS','COMPONENTS',4,4,'440033','D','N','Shutter Orders','1721(704)',NULL,'2017-12-15 00:00:00',NULL,'E001',1,'C',NULL,'10',0),(13,'OC13','K','EH','NON_PROJECTS','COMPONENTS',5,5,'440033','D','N','Home Interiors',NULL,NULL,'2017-12-16 00:00:00',NULL,'E001',1,'C',NULL,'2',0),(14,'OC14','K','HP','NON_PROJECTS','COMPONENTS',6,6,'781005','D','N','Sanitary Emporium Pvt Ltd','SEPL/SWF/16-17/06','2','2017-08-14 00:00:00',NULL,'E002',1,'C',NULL,'2',0),(15,'OC15','K','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'T','T',NULL,NULL,NULL,'2017-12-15 00:00:00',NULL,'E002',1,'C',NULL,'trersf',0),(16,'OC16','K','SH','NON_PROJECTS','COMPONENTS',4,4,NULL,'D','N','Winners Group','1','1','2017-12-19 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(17,'OC17','K',NULL,'NON_PROJECTS','COMPONENTS',7,7,NULL,'D','N','1','1',NULL,'2017-12-21 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(18,'OC18','K','SH','NON_PROJECTS','COMPONENTS',6,6,NULL,'D','N','1',NULL,'1','2017-12-21 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(19,'OC19','K','HDT','NON_PROJECTS','COMPONENTS',4,4,NULL,'D','D','1',NULL,'1','2017-12-21 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(20,'OC20','K',NULL,'NON_PROJECTS','COMPONENTS',7,7,NULL,'D','N','1','1','1','2017-12-21 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(21,'OC21','K','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'D','N','jnnn','9879898',NULL,'2017-12-22 00:00:00',NULL,'E001',1,'C',NULL,NULL,0),(22,'OC22','H','EH','NON_PROJECTS','COMPONENTS',2,2,'440033','D','N','jhbjkbjhb','y87y876',NULL,'2017-12-22 00:00:00',NULL,'E002',1,'NA','N/A',NULL,0),(23,'OC23','K','EH','NON_PROJECTS','COMPONENTS',4,4,NULL,'D','N','1',NULL,'1','2017-12-22 00:00:00',NULL,'E001',1,'C','N/A',NULL,0),(24,'OC24','K','KC','NON_PROJECTS','COMPONENTS',7,7,NULL,'D','N','1',NULL,'1','2017-12-22 00:00:00',NULL,'E001',1,'NA','N/A',NULL,0),(25,'OC25','K','KC','NON_PROJECTS','COMPONENTS',1,2,'442263','D','N','Hello Dealer','416546',NULL,'2017-12-22 00:00:00',NULL,'E002',2,'NA','N/A',NULL,0),(26,'OC26','K','KC','NON_PROJECTS','COMPONENTS',4,6,NULL,'D','N','This is Admin Entry','65463213',NULL,'2017-12-22 00:00:00',NULL,'E001',1,'NA','N/A',NULL,0),(27,'OC27','K','KC','NON_PROJECTS','COMPONENTS',7,7,NULL,'D','N','Interiors','56165165',NULL,'2017-12-23 00:00:00',NULL,'E002',1,'NA','N/A',NULL,0);
/*!40000 ALTER TABLE `order_head` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panel_material_thickness_master`
--

DROP TABLE IF EXISTS `panel_material_thickness_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panel_material_thickness_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `material` varchar(100) DEFAULT NULL,
  `thickness` double NOT NULL,
  `price` double NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panel_material_thickness_master`
--

LOCK TABLES `panel_material_thickness_master` WRITE;
/*!40000 ALTER TABLE `panel_material_thickness_master` DISABLE KEYS */;
INSERT INTO `panel_material_thickness_master` VALUES (17,'PB',11,11,1),(18,'PB',9,596,0),(19,'PB',16,884,0),(20,'PB',18,1018,0),(21,'PB',25,1692,0),(22,'MF',8,734,0),(23,'MF',12,1150,0),(24,'MF',16,1109,0),(25,'MF',18,1471,0),(26,'MF',25,2245,0),(27,'HF',18,2108,0),(28,'BW',5.5,1162,0),(29,'BW',18,2695,0);
/*!40000 ALTER TABLE `panel_material_thickness_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panel_order_details`
--

DROP TABLE IF EXISTS `panel_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panel_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `material_price` double DEFAULT NULL,
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `panel_order_details_order_head_id_fk` (`order_head_id`),
  KEY `panel_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `panel_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `panel_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panel_order_details`
--

LOCK TABLES `panel_order_details` WRITE;
/*!40000 ALTER TABLE `panel_order_details` DISABLE KEYS */;
INSERT INTO `panel_order_details` VALUES (38,7,60,'PLTPANEL16PBXXXX-0900060016000','PLTPANEL','PB',900,600,16,2,955,884,'PANEL',1),(39,7,119,'PLTPANEL18HFXXXX-0600030018000','PLTPANEL','HF',600,300,18,1,379,2108,'PANEL',0),(40,7,26,'FILLERXX12MFXXXB-0600090012000','FILLERXX','MF',600,900,12,2,3435,NULL,'PANEL',1),(41,13,117,'PLTPANEL18BWXXXX-0300054018000','PLTPANEL','BW',300,540,18,2,873,2695,'PANEL',0),(42,13,117,'PLTPANEL18BWXXXX-0100060018000','PLTPANEL','BW',100,600,18,8,1294,2695,'PANEL',0),(43,1,117,'PLTPANEL18MFXXXX-0450045018000','PLTPANEL','MF',450,450,18,1,298,1471,'PANEL',0),(44,1,117,'PLTPANEL18PBXXXX-0660010018000','PLTPANEL','PB',660,100,18,2,134,1018,'PANEL',0),(45,1,117,'PLTPANEL18PBXXXX-0414010018000','PLTPANEL','PB',414,100,18,1,42,1018,'PANEL',0),(46,1,NULL,'PLTPANEL18HFXXXX-2100007518000','PLTPANEL','HF',2100,75,18,4,1328,2108,'PANEL',0),(47,1,NULL,'PLTPANEL16MFXXXX-0480064216000','PLTPANEL','MF',480,642,16,3,1025,1109,'PANEL',0),(48,24,117,'PLTPANEL18HFXXXX-0150010018000','PLTPANEL','HF',150,100,18,1,32,2108,'PANEL',0),(49,24,117,'PLTPANEL25MFXXXX-0600045025000','PLTPANEL','MF',600,450,25,6,3637,2245,'PANEL',0);
/*!40000 ALTER TABLE `panel_order_details` ENABLE KEYS */;
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
  `contact_person` varchar(100) DEFAULT NULL,
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
  `gst_number` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_master`
--

LOCK TABLES `party_master` WRITE;
/*!40000 ALTER TABLE `party_master` DISABLE KEYS */;
INSERT INTO `party_master` VALUES (1,'PANT-HYD1','PANTALOON RETAIL INDIA LTD','14021872',NULL,'CDC-HYDERABAD-PUNJAGUTTA A DIVISION','OF P  6-3-676/A/1/A, PUNJAGUTTA','HYDERABAD-500029,Andhra Pradesh',NULL,'Sandeep.More@futuregroup.in','HYDERABAD','465565645','654353453','4534534534','45435345DFE5','28890126394','OMS',0),(2,'Edge Turnkey','Edge Turnkey solutions pvt ltd','14022472','MR RAYMOND PATEL :-9820090630','C 1 ,  3 & 4 , Contractor Baug,','Mori Road ,','opp Andhra Bank , Mahim west, Mumbai - 400016',NULL,'mailcarbonspace@gmail.com','MUMBAI','4564435','435345345','3453453453','4534534535','543534534534','MS',0),(3,'ABS','bbhj','GL8756','Kunal','hkinki','jnkjnkj','njk','nkj','njk@gmail.com','njlk','8798798','98798798798','97987987987','98798798798jkbn','kjh87687687kjnbk','MS',0),(4,'Winners Group','Winners Group','4652513','Kunal','Hello','Ngp','NGP','Nagpur','ab@xyz.com','Nagpur','8767868','98687678687','87678678687','87876876876','87687687687','OMS',0),(5,'Mukta Dey','Mukta Dey','686513','Mukta Dey','lksnvkjfdnvkj','njbbjbjb','bjhbjbjhbjh','bjkbjhbjhblhbjh','ab@xyz.com','Nagpur','8758','87576576576','576567','878787687','8768768768','OMS',0),(6,'Sanitary Emporium Pvt Ltd','Sanitary Emporium Pvt Ltd','139864','Mr. Barack Obama','Sanitary Emporium Pvt Ltd','G.N.B Road, Silpukhuri','Guwahati',NULL,'sanitaryemp@gmail.com','Guwahati','656303232','09864627280','03612666373','DBU675Y87','JHBhj7866bZ','MS',0),(7,'I3 SPACE KITCHEN PVT LTD','MR. MANISH WELANKAR','12054','MR. MANISH WELANKAR','NAGPUR','NAGPUR',NULL,NULL,'abc@gmail.com','nagpur','1205468','7764251201','7764251201','ACAYH2411N','55000254620122','MS',0);
/*!40000 ALTER TABLE `party_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelmet_order_details`
--

DROP TABLE IF EXISTS `pelmet_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pelmet_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `finish_price` double DEFAULT NULL,
  `finish` varchar(100) DEFAULT NULL,
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `pelmet_order_details_order_head_id_fk` (`order_head_id`),
  KEY `pelmet_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `pelmet_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `pelmet_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelmet_order_details`
--

LOCK TABLES `pelmet_order_details` WRITE;
/*!40000 ALTER TABLE `pelmet_order_details` DISABLE KEYS */;
INSERT INTO `pelmet_order_details` VALUES (40,7,44,'PEL-PL1X12MFXXXB-0900005512000','PEL-PL1X','MF',900,55,12,2,315,3181,'XXB','PELMET',1),(41,7,48,'PEL-PL2X18HFXXXD-0900030018000','PEL-PL2X','HF',900,300,18,1,1322,4896,'XXD','PELMET',0),(42,7,6,'COR-CR1X12MFXXXC-0900012012000','COR-CR1X','MF',900,120,12,1,247,2290,'XXC','PELMET',1),(43,1,55,'PEL-PL1X25MFXXXA-1100225025000','PEL-PL1X','MF',1100,2250,25,1,10751,4344,'XXA','PELMET',0),(44,19,49,'PEL-PL2X25MFXXXA-1100010025000','PEL-PL2X','MF',1100,100,25,1,478,4344,'XXA','PELMET',0),(45,23,55,'PEL-PL1X18MFXXXA-1100010018000','PEL-PL1X','MF',1100,100,18,1,478,4344,'XXA','PELMET',0);
/*!40000 ALTER TABLE `pelmet_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raw_material_master`
--

DROP TABLE IF EXISTS `raw_material_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `raw_material_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `material` varchar(100) DEFAULT NULL,
  `material_code` varchar(100) DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  `back_panel_price` double DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raw_material_master`
--

LOCK TABLES `raw_material_master` WRITE;
/*!40000 ALTER TABLE `raw_material_master` DISABLE KEYS */;
INSERT INTO `raw_material_master` VALUES (1,'Particle Board','PB',997,596,0),(2,'MDF','MF',1365,734,0),(3,'HDF','HF',1581,734,0),(4,'Supertuff High Density Fiber Board','SHDF',0,0,1),(5,'Boiled Water Ply (BWR)','BW',2021,1162,0),(6,'Supertuff High Density Fiber Board Glossy','SHDFGLOS',0,0,1),(7,'Aluminium','AL',0,0,1);
/*!40000 ALTER TABLE `raw_material_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reason_master`
--

DROP TABLE IF EXISTS `reason_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reason_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `reason` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reason_master`
--

LOCK TABLES `reason_master` WRITE;
/*!40000 ALTER TABLE `reason_master` DISABLE KEYS */;
INSERT INTO `reason_master` VALUES (3,'aaaaaaaaaaaa1','aaaaaaaaaaaaaaaaaa1',1),(4,'dsssdg','fsdfdsfsdf',1);
/*!40000 ALTER TABLE `reason_master` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `sale_type_code_UNIQUE` (`sale_type_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_type_master`
--

LOCK TABLES `sale_type_master` WRITE;
/*!40000 ALTER TABLE `sale_type_master` DISABLE KEYS */;
INSERT INTO `sale_type_master` VALUES (1,'E-COMMMERCE HOME','ECH','For E-Commerce Home',0),(2,'EXPORT HOME','EH','EXPORT HOME',0),(3,'HOME DEALER TRADE','HDT','HOME DEALER TRADE',0),(4,'HOME O.E.M SALE','HOS','HOME O.E.M SALE',0),(5,'HOME PROJECTS','HP','HOME PROJECTS',0),(6,'HOME SALE TO INDIVIDUAL','HSTI','HOME SALE TO INDIVIDUAL',0),(7,'HOME SALE TO SW OR SOS','HSTSWSOS','HOME SALE TO SW OR SOS',0),(8,'MODERN LIVING HOME','MLH','MODERN LIVING HOME',0),(9,'SHOWROOM HOME','SH','SHOWROOM HOME',0),(10,'KITCHEN COMPONENT','KC','KITCHEN COMPONENT',0);
/*!40000 ALTER TABLE `sale_type_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_profile_master`
--

DROP TABLE IF EXISTS `section_profile_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_profile_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `name` varchar(100) DEFAULT NULL,
  `direction` varchar(300) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.sectionprofile.Direction',
  `carcass_type` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.sectionprofile.CarcassType',
  `price` double NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_profile_master`
--

LOCK TABLES `section_profile_master` WRITE;
/*!40000 ALTER TABLE `section_profile_master` DISABLE KEYS */;
INSERT INTO `section_profile_master` VALUES (1,'C & J -Horizontal for Base Carcass','HORIZONTAL','BASE_CARCASS',865,0),(2,'C-Vertical for Tall Carcass','VERTICAL','TALL_UNIT',865,0),(3,'J-Horizontal for Base Carcass','HORIZONTAL','BASE_CARCASS',393,0),(4,'J-Vertical for Tall Carcass','VERTICAL','TALL_UNIT',755,0),(5,'Bottom Profile','HORIZONTAL','WALL_CARCASS',350,0);
/*!40000 ALTER TABLE `section_profile_master` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `segment_code_UNIQUE` (`segment_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segment_master`
--

LOCK TABLES `segment_master` WRITE;
/*!40000 ALTER TABLE `segment_master` DISABLE KEYS */;
INSERT INTO `segment_master` VALUES (1,'HOME','H','Home Segment',0),(2,'SPECIAL PROJECTS','SP','Special Projects',0),(3,'OFFICE','O','Office Segment',0),(4,'KITCHEN','K','Kitchen',0);
/*!40000 ALTER TABLE `segment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `setting_key` varchar(100) NOT NULL COMMENT 'JAVA ENUM com.vsquaresystem.safedeals.setting.SettingKey',
  `setting_value` varchar(100) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_setting_key_unique` (`setting_key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'ATTACHMENT_ROOT_PATH','D:\\digitalbusiness','attachments',0),(2,'DOWNLOAD_ROOT_PATH','C:\\Users\\webdesign\\Downloads','attachments',0);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shutter_finish_price_master`
--

DROP TABLE IF EXISTS `shutter_finish_price_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shutter_finish_price_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `finish` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `thickness` double DEFAULT NULL,
  `one_side_price` double NOT NULL,
  `both_side_price` double NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shutter_finish_price_master`
--

LOCK TABLES `shutter_finish_price_master` WRITE;
/*!40000 ALTER TABLE `shutter_finish_price_master` DISABLE KEYS */;
INSERT INTO `shutter_finish_price_master` VALUES (1,'XXL','BW',20.5,9937,0,0),(2,'XXM','BW',20.5,12204,0,0),(3,'XXI','BW',18,3338,0,0),(4,'XXH','BW',18,3675,0,0),(5,'XXG','BW',18,4461,0,0),(6,'XXN','MF',19,5600,0,0),(7,'XXC','MF',18,2290,3065,0),(8,'XXB','MF',18,3181,4846,0),(9,'XXA','MF',18,4344,7172,0),(10,'XXF','HF',18,2843,3618,0),(11,'XXE','HF',18,3733,5399,0),(12,'XXD','HF',18,4896,7725,0),(13,'XXS','MF',18,4745,8273,0),(14,'XXT','MF',18,5660,10101,0),(15,'XXO','HF',18,5210,8739,0),(16,'XXP','HF',18,6126,10566,0),(17,'XXQ','BW',18,5668,9196,0),(18,'XXR','BW',18,6583,11024,0),(19,'XXS','MF',25,5205,8731,0),(20,'XXT','MF',25,6118,10562,0),(21,'XXJ','HF',18,6765,0,0),(22,'XXK','HF',18,7618,0,0),(23,'XXU','MF',22,6999,12116,0),(24,'XXV','MF',22,7368,12852,0),(25,'XXW',NULL,18,295,0,0),(26,'XXX',NULL,18,412,0,0),(27,'XXY',NULL,18,620,0,0),(28,'XXZ',NULL,18,760,0,0),(29,'XAA',NULL,18,610,0,0);
/*!40000 ALTER TABLE `shutter_finish_price_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shutter_handle_mapping_master`
--

DROP TABLE IF EXISTS `shutter_handle_mapping_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shutter_handle_mapping_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `finish_code` varchar(100) DEFAULT NULL,
  `shutter_code` varchar(100) DEFAULT NULL,
  `handles` varchar(100) DEFAULT '[]',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `finish_code_UNIQUE` (`finish_code`),
  UNIQUE KEY `shutter_code_UNIQUE` (`shutter_code`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shutter_handle_mapping_master`
--

LOCK TABLES `shutter_handle_mapping_master` WRITE;
/*!40000 ALTER TABLE `shutter_handle_mapping_master` DISABLE KEYS */;
INSERT INTO `shutter_handle_mapping_master` VALUES (4,'XXE',NULL,'[71,77]',1),(5,'XXL',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(6,'XXM',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(7,'XXI',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(8,'XXH',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(9,'XXG',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(10,'XXN',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(11,'XXS',NULL,'[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0),(12,'XXT',NULL,'[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0),(13,'XXO',NULL,'[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0),(14,'XXP',NULL,'[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0),(15,'XXQ',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(16,'XXR',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(17,'XXJ',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(18,'XXK',NULL,'[70,71,72,73,82,74,76,75,77,78,83,84]',0),(19,NULL,'SH123','[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0),(20,NULL,'SH133','[68,69,70,71,72,73,82,74,76,75,77,78,83,84]',0);
/*!40000 ALTER TABLE `shutter_handle_mapping_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shutter_order_details`
--

DROP TABLE IF EXISTS `shutter_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shutter_order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `order_head_id` int(11) DEFAULT NULL COMMENT 'REF order_head.id',
  `color_id` int(11) DEFAULT NULL COMMENT 'REF color_code_master.id',
  `product_code` varchar(100) DEFAULT NULL,
  `component` varchar(100) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `length` double NOT NULL,
  `width` double NOT NULL,
  `thickness` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` double NOT NULL DEFAULT '0',
  `std_one_side_price` double DEFAULT '0',
  `std_both_side_price` double DEFAULT '0',
  `finish` varchar(100) DEFAULT NULL,
  `bsm` tinyint(1) NOT NULL DEFAULT '0',
  `grain` varchar(100) DEFAULT NULL,
  `handle` varchar(100) DEFAULT NULL,
  `handle_length` double DEFAULT '0',
  `handle_finish` varchar(100) DEFAULT NULL,
  `handle_price` double DEFAULT '0',
  `hinge_position` varchar(100) NOT NULL,
  `glass` varchar(100) DEFAULT NULL,
  `step` tinyint(1) DEFAULT '0',
  `jali` tinyint(1) DEFAULT '0',
  `order_for` varchar(100) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `shutter_order_details_order_head_id_fk` (`order_head_id`),
  KEY `shutter_order_details_color_id_fk` (`color_id`),
  CONSTRAINT `shutter_order_details_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `shutter_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shutter_order_details`
--

LOCK TABLES `shutter_order_details` WRITE;
/*!40000 ALTER TABLE `shutter_order_details` DISABLE KEYS */;
INSERT INTO `shutter_order_details` VALUES (1,12,8,'SH102X-18HFXXXF-0760014018000','SH102','HF',760,140,18,1,302,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(2,12,8,'SH108X-18HFXXXF-0760049518000','SH108','HF',760,495,18,1,1070,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(3,12,8,'SH102X-18HFXXXF-0760029918000','SH102','HF',760,299,18,2,1292,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(4,12,8,'SH103X-18HFXXXF-0760026518000','SH103','HF',760,265,18,1,573,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(5,12,8,'SH110X-18HFXXXF-0760018018000','SH110','HF',760,180,18,1,389,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(6,12,8,'SH119X-18HFXXXF-0760040018000','SH119','HF',760,400,18,1,864,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(7,12,8,'SH101X-18HFXXXF-0760020518000','SH101','HF',760,205,18,1,443,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(8,12,8,'SH102X-18HFXXXF-0760032418000','SH102','HF',760,324,18,2,1400,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(9,12,8,'SH102X-18HFXXXF-0760014518000','SH102','HF',760,145,18,1,313,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(10,12,14,'SH101X-18HFXXXF-0190049518000','SH101','HF',190,495,18,1,267,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(11,12,14,'SH102X-18HFXXXF-0200049518000','SH102','HF',200,495,18,1,281,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(12,12,14,'SH101X-18HFXXXF-0366049518000','SH101','HF',366,495,18,1,515,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(13,12,14,'SH102X-18HFXXXF-0760059518000','SH102','HF',760,595,18,1,1286,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(14,12,14,'SH102X-18HFXXXF-0190066518000','SH102','HF',190,665,18,1,359,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(15,12,14,'SH102X-18HFXXXF-0200066518000','SH102','HF',200,665,18,1,378,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(16,12,14,'SH103X-18HFXXXF-0366066518000','SH103','HF',366,665,18,1,692,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(17,14,120,'SH123X-18HFXXXE-0525037518000','SH123','HF',525,375,18,2,1470,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(18,14,120,'SH118GLX-18HFXXXE-0800045018000','SH118GL','HF',800,450,18,1,1344,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',1),(19,14,120,'SH118GLX-18HFXXXE-0550030018000','SH118GL','HF',550,300,18,1,616,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',1),(20,14,120,'SH118GLX-18HFXXXE-0800045018000','SH118GL','HF',800,450,18,2,2688,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(21,14,120,'SH118GLX-18HFXXXE-0550030018000','SH118GL','HF',550,300,18,2,1232,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(22,14,120,'SH118GLX-18HFXXXE-0300045018000','SH118GL','HF',300,450,18,2,1008,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(23,14,120,'SH118GLX-18HFXXXE-0300030018000','SH118GL','HF',300,300,18,2,672,3733,5399,'XXE',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE',NULL,0,0,'SHUTTER',0),(24,7,15,'SH102X-18MFXXXC-0900060018000','SH102','MF',900,600,18,1,1655,2290,3065,'XXC',1,'NO_GRAIN',NULL,NULL,NULL,NULL,'LH',NULL,0,0,'SHUTTER',0),(25,7,8,'SH123X-18MFXXXC-0900060018000','SH123','MF',900,600,18,1,1402,2290,3065,'XXC',0,'NO_GRAIN','HAN-H01X',160,'CP(Chrome)',165,'LH',NULL,0,0,'SHUTTER',0),(26,7,14,'SH102X-18MFXXXC-0600040018000','SH102','MF',600,400,18,1,736,2290,3065,'XXC',1,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','REGULAR_GLASS',1,1,'SHUTTER',0),(27,7,12,'SH113X-18MFXXXC-0500030018000','SH113','MF',500,300,18,1,604,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'LH','MESH_GLASS',NULL,1,'SHUTTER',0),(28,7,51,'SH102X-18HFXXXD-0600060018000','SH102','HF',600,600,18,1,1763,4896,7725,'XXD',0,'VERTICAL',NULL,NULL,NULL,NULL,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(29,1,107,'SHUTTER-21BWXXXL-0500050021000',NULL,'BW',500,500,20.5,1,2484,9937,0,'XXL',0,'HORIZONTAL',NULL,NULL,NULL,NULL,'LH','NO_GLASS',NULL,NULL,'SHUTTER',1),(30,1,7,'SH101X-18MFXXXC-0700030018000','SH101','MF',700,300,18,1,596,2290,3065,'XXC',0,'VERTICAL','HAN-H10X',160,'CP(Chrome)',115,'LH','REGULAR_GLASS',NULL,NULL,'SHUTTER',0),(31,15,113,'SHUTTER-21BWXXXL-0900045021000',NULL,'BW',900,450,20.5,4,17974,9937,0,'XXL',0,'HORIZONTAL','HAN-H14X',160,'SC (Satin Chrome)',209,'LH','NO_GLASS',NULL,1,'SHUTTER',0),(32,1,6,'SH123X-18MFXXXC-0448060018000','SH123','MF',448,600,18,2,1231,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(33,1,6,'SH123X-18MFXXXC-0423060018000','SH123','MF',423,600,18,4,2325,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(34,1,6,'SH123X-18MFXXXC-0598060018000','SH123','MF',598,600,18,1,822,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(35,1,6,'SHUTTER-18MFXXXC-0318060018000',NULL,'MF',318,600,18,1,437,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(36,1,6,'SHUTTER-18MFXXXC-0300060018000',NULL,'MF',300,600,18,1,412,2290,3065,'XXC',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(37,1,6,'SH123X-18MFXXXC-0600044818000','SH123','MF',600,448,18,2,1231,2290,3065,'XXC',0,'NO_GRAIN','HAN-EP01',NULL,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(38,1,6,'SH123X-18MFXXXC-0600042318000','SH123','MF',600,423,18,4,2897,2290,3065,'XXC',0,'NO_GRAIN','HAN-EP01',423,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(39,1,46,'SH133X-18HFXXXD-0598037318000','SH133','HF',598,373,18,4,4368,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','REGULAR_GLASS',NULL,NULL,'SHUTTER',0),(40,1,46,'SH133X-18HFXXXD-0598029818000','SH133','HF',598,298,18,4,3490,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(41,1,46,'SH133X-18HFXXXD-0598027818000','SH133','HF',598,278,18,2,1628,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(42,1,46,'SH133X-18HFXXXD-0698044818000','SH133','HF',698,448,18,2,3365,4896,7725,'XXD',0,'NO_GRAIN','HAN-EP01',448,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(43,1,46,'SH133X-18HFXXXD-0698037318000','SH133','HF',698,373,18,2,2802,4896,7725,'XXD',0,'NO_GRAIN','HAN-EP01',373,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(44,1,47,'SH133X-18HFXXXD-0100070018000','SH133','HF',100,700,18,1,431,5668,9196,'XXD',0,'NO_GRAIN','HAN-EP01',100,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(45,17,47,'SHUTTER-19MFXXXN-0371060819000',NULL,'MF',371,608,19,3,4285,5600,0,'XXN',0,'NO_GRAIN','HAN-H01X',160,'CP(Chrome)',165,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(46,17,67,'SHUTTER-19MFXXXN-0370060819000',NULL,'MF',370,608,19,1,1260,5600,0,'XXN',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'RH','NO_GLASS',NULL,NULL,'SHUTTER',0),(47,17,67,'SHUTTER-19MFXXXN-0738030019000',NULL,'MF',738,300,19,1,1240,5600,0,'XXN',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(48,17,7,'SH123X-18HFXXXF-0300030018000','SH123','HF',300,300,18,4,1023,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(49,17,55,'SH133X-18HFXXXD-0448071818000','SH133','HF',448,718,18,1,1575,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(50,17,55,'SH133X-18HFXXXD-0218071818000','SH133','HF',218,718,18,2,1533,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(51,17,7,'SH123X-18HFXXXF-0448110018000','SH123','HF',448,1100,18,1,1764,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(52,17,4,'SH123X-18HFXXXF-2058044818000','SH123','HF',2058,448,18,1,2621,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(53,17,4,'SH123X-18HFXXXF-2058044818000','SH123','HF',2058,448,18,1,2621,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(54,17,4,'SH123X-18HFXXXF-0718059818000','SH123','HF',718,598,18,1,1221,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',1),(55,17,4,'SH123X-18HFXXXF-0718059818000','SH123','HF',718,598,18,2,3167,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(56,17,4,'SH123X-18HFXXXF-0448071818000','SH123','HF',448,718,18,1,1277,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(57,17,4,'SH123X-18HFXXXF-0450071818000','SH123','HF',450,718,18,1,1282,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(58,17,4,'SH123X-18HFXXXF-0450071818000','SH123','HF',450,718,18,1,1282,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(59,20,4,'SH123X-18HFXXXF-0300030018000','SH123','HF',300,300,18,1,256,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(60,20,4,'SH123X-18HFXXXF-0718044818000','SH123','HF',718,448,18,4,3658,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(61,20,4,'SH123X-18HFXXXF-0718021818000','SH123','HF',718,218,18,2,890,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(62,20,4,'SH123X-18HFXXXF-2058044818000','SH123','HF',2058,448,18,1,2621,2843,3618,'XXF',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'RH','NO_GLASS',NULL,NULL,'SHUTTER',0),(63,20,4,'SH123X-18HFXXXF-0598071818000','SH123','HF',598,718,18,1,1584,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(64,20,4,'SH123X-18HFXXXF-0718044818000','SH123','HF',718,448,18,1,1277,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(65,20,4,'SH123X-18HFXXXF-0718045018000','SH123','HF',718,450,18,1,1282,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(66,20,4,'SH123X-18HFXXXF-0718045018000','SH123','HF',718,450,18,1,1282,2843,3618,'XXF',0,'NO_GRAIN','HAN-H34X',246,'Bright Mirror',363,'RH','NO_GLASS',NULL,NULL,'SHUTTER',0),(67,22,6,'SH102X-18HFXXXF-0900060018000','SH102','HF',900,600,18,3,5861,2843,3618,'XXF',1,'HORIZONTAL',NULL,NULL,NULL,NULL,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(68,23,NULL,'SH133X-18HFXXXD-0600055018000','SH133','HF',600,550,18,2,3231,4896,7725,'XXD',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(69,24,107,'SHUTTER-21BWXXXL-0500060021000',NULL,'BW',500,600,20.5,5,16206,9937,0,'XXL',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,1,'SHUTTER',0),(70,27,26,'SH102X-18HFXXXE-0900060018000','SH102','HF',900,600,18,1,2016,3733,5399,'XXE',0,'HORIZONTAL',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(71,7,7,'SH102X-18MFXXXC-0900060018000','SH102','MF',900,600,18,1,1497,2290,3065,'XXC',0,'HORIZONTAL',NULL,NULL,'',NULL,'NO_HINGE','NO_GLASS',NULL,1,'SHUTTER',0),(72,7,8,'SH123X-18MFXXXC-0920062018000','SH123','MF',920,620,18,1,1421,2290,3065,'XXC',0,'HORIZONTAL','HAN-H10X',160,'CP(Chrome)',115,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0),(73,7,65,'SHUTTER-18BWXXXG-0900060018000',NULL,'BW',900,600,18,1,2973,4461,0,'XXG',0,'HORIZONTAL','HAN-EP01',900,'Silver Anodised (Aluminum)',338,'NO_HINGE','NO_GLASS',NULL,1,'SHUTTER',0),(74,7,NULL,'SHUTTER-18undefinedXXXY-0900030018000',NULL,NULL,900,300,18,1,167,620,0,'XXY',0,'NO_GRAIN',NULL,NULL,'',NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(75,25,NULL,'SHUTTER-18XXXXXX-0900060018000',NULL,NULL,900,600,18,1,222,412,0,'XXX',0,'NO_GRAIN','',NULL,'',NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(76,25,NULL,'SHUTTER-18XXXXXY-0900060018000',NULL,NULL,900,600,18,1,335,620,0,'XXY',0,'NO_GRAIN','',NULL,'',NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(77,25,NULL,'SHUTTER-18XXXXXZ-0500030018000',NULL,NULL,500,300,18,1,114,760,0,'XXZ',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(78,25,8,'SH110X-18MFXXXC-0900060018000','SH110','MF',900,600,18,1,1915,2290,3065,'XXC',1,'HORIZONTAL',NULL,NULL,NULL,NULL,'NO_HINGE','REGULAR_GLASS',1,1,'SHUTTER',0),(79,25,NULL,'SHUTTER-18XXXXXZ-0900060018000',NULL,NULL,900,600,18,1,2280,760,0,'XXZ',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(80,25,NULL,'SHUTTER-18HFXXXW-0900060018000',NULL,'HF',900,600,18,1,1236,412,0,'XXW',0,'HORIZONTAL',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(81,25,NULL,'SHUTTER-18XXXXXW-0900060018000',NULL,NULL,900,600,18,1,885,295,0,'XXW',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(82,25,NULL,'SHUTTER-18XXXXXY-0900060018000',NULL,NULL,900,600,18,1,1860,620,0,'XXY',0,'NO_GRAIN',NULL,NULL,NULL,NULL,'NO_HINGE','NO_GLASS',NULL,NULL,'SHUTTER',0),(83,25,111,'SHUTTER-21BWXXXM-0900060021000',NULL,'BW',900,600,20.5,2,13922,12204,0,'XXM',0,'HORIZONTAL','HAN-H20X',320,'SC (Satin Chrome)',371,'LH','NO_GLASS',NULL,NULL,'SHUTTER',0);
/*!40000 ALTER TABLE `shutter_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standard_carcass_dimension_master`
--

DROP TABLE IF EXISTS `standard_carcass_dimension_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `standard_carcass_dimension_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY',
  `std_value` double DEFAULT NULL,
  `dimension_attribute` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.standardcarcassdimension.DimensionAttribute',
  `carcass_category` varchar(100) DEFAULT NULL COMMENT 'JAVA ENUM com.spacewood.digitalbusiness.standardcarcassdimension.CarcassCategory',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard_carcass_dimension_master`
--

LOCK TABLES `standard_carcass_dimension_master` WRITE;
/*!40000 ALTER TABLE `standard_carcass_dimension_master` DISABLE KEYS */;
INSERT INTO `standard_carcass_dimension_master` VALUES (1,300,'WIDTH','WC',0),(2,400,'WIDTH','WC',0),(3,450,'WIDTH','WC',0),(4,500,'WIDTH','WC',0),(5,600,'WIDTH','WC',0),(6,750,'WIDTH','WC',0),(7,800,'WIDTH','WC',0),(8,900,'WIDTH','WC',0),(9,1050,'WIDTH','WC',0),(10,150,'WIDTH','BC',0),(11,170,'WIDTH','BC',0),(12,200,'WIDTH','BC',0),(13,300,'WIDTH','BC',0),(14,400,'WIDTH','BC',0),(15,450,'WIDTH','BC',0),(16,500,'WIDTH','BC',0),(17,600,'WIDTH','BC',0),(18,750,'WIDTH','BC',0),(19,800,'WIDTH','BC',0),(20,900,'WIDTH','BC',0),(21,1050,'WIDTH','BC',0),(22,1000,'WIDTH','BC',0),(23,450,'WIDTH','TU',0),(24,600,'WIDTH','TU',0),(25,1050,'WIDTH','BB',0),(26,720,'HEIGHT','WC',0),(27,600,'HEIGHT','WC',0),(28,340,'HEIGHT','WC',0),(29,700,'HEIGHT','WC',0),(30,360,'HEIGHT','WC',0),(31,400,'HEIGHT','WC',0),(32,1300,'HEIGHT','WC',0),(33,350,'HEIGHT','WC',0),(34,1120,'HEIGHT','WC',0),(35,300,'HEIGHT','WC',0),(36,1200,'HEIGHT','WC',0),(37,1300,'HEIGHT','WC',0),(38,720,'HEIGHT','BC',0),(39,700,'HEIGHT','BC',0),(40,1260,'HEIGHT','TU',0),(41,1320,'HEIGHT','TU',0),(42,1900,'HEIGHT','TU',0),(43,1920,'HEIGHT','TU',0),(44,2080,'HEIGHT','TU',0),(45,2020,'HEIGHT','TU',0),(46,1960,'HEIGHT','TU',0),(47,320,'DEPTH','WC',0),(48,300,'DEPTH','WC',0),(49,560,'DEPTH','BC',0),(50,400,'DEPTH','BC',0),(51,580,'DEPTH','TU',0),(52,560,'DEPTH','TU',0),(53,560,'DEPTH','BB',0),(54,700,'HEIGHT','BB',0),(55,540,'HEIGHT','WC',0),(56,1000,'WIDTH','WC',0);
/*!40000 ALTER TABLE `standard_carcass_dimension_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standard_carcass_price_master`
--

DROP TABLE IF EXISTS `standard_carcass_price_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `standard_carcass_price_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `width` double NOT NULL,
  `length` double NOT NULL,
  `depth` double NOT NULL,
  `shelf` int(11) DEFAULT '0',
  `pb_price` double NOT NULL,
  `mdf_price` double NOT NULL,
  `hdf_price` double NOT NULL,
  `ply_price` double NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard_carcass_price_master`
--

LOCK TABLES `standard_carcass_price_master` WRITE;
/*!40000 ALTER TABLE `standard_carcass_price_master` DISABLE KEYS */;
INSERT INTO `standard_carcass_price_master` VALUES (1,'WC','Wall Carcass 700 X 900 x 300',700,900,300,1,1254,1567,1993,2436,1),(2,'W30-6030 S','Wall Shelf Carcass 300 x 600 x300',300,600,300,1,855,1090,1308,1734,0),(3,'W40-6030 S','Wall Shelf Carcass 400 x 600 x 300',400,600,300,1,971,1244,1501,1992,0),(4,'W45-6030 S','Wall Shelf Carcass 450 x 600 x 300',450,600,300,1,1029,1321,1599,2121,0),(5,'W50-6030 S','Wall shelf carcass 500 x 600 x 300',500,600,300,1,1087,1397,1696,2250,0),(6,'W60-6030 S','Wall shelf carcass 600 x 600 x 300',600,600,300,1,1203,1551,1890,2508,0),(7,'W75-6030 S','Wall shelf carcass - 750 x 600 x 300',750,600,300,1,1377,1781,2180,2896,0),(8,'W80-6030 S','Wall shelf carcass 800 x 600 x 300',800,600,300,1,1436,1859,2277,3025,0),(9,'W90-6030 S','Wall shelf carcass 900 x 600 x 300',900,600,300,1,1551,2012,2471,3283,0),(10,'W105-6030 S','Wall shelf carcass 1050 x 600 x 300',1050,600,300,1,1726,2243,2762,3670,0),(11,'WC60-6030 S','Wall Luzy Corner shelf',600,600,300,1,1793,2367,2957,3951,0),(12,'W30-7030 S','Wall shelf carcass 300 x 700 x 300',300,700,300,1,923,1181,1425,1892,0),(13,'W40-7030 S','Wall shelf carcass 400 x 700 x 300',400,700,300,1,1044,1341,1627,2159,0),(14,'W45-7030 S','Wall shelf carcass 450 x 700 x 300',450,700,300,1,1104,1421,1728,2294,0),(15,'W50-7030 S','Wall shelf carcass 500 x 700 x 300',500,700,300,1,1165,1502,1829,2428,0),(16,'W60-7030 S','Wall shelf carcass 600 x 700 x 300',600,700,300,1,1286,1661,2031,2696,0),(17,'W75-7030 S','Wall shelf carcass 750 x 700 x 300',750,700,300,1,1468,1901,2334,3098,0),(18,'W80-7030 S','Wall shelf carcass 800 x 700 x 300',800,700,300,1,1529,1981,2435,3232,0),(19,'W90-7030 S','Wall shelf carcass 900 x 700 x 300',900,700,300,1,1649,2141,2638,3500,0),(20,'W105-7030 S','Wall shelf carcass 1050 x 700 x 300',1050,700,300,1,1832,2381,2941,3902,0),(21,'WC60-7030 S','Wall luzy corner shelf',600,700,300,1,1907,2514,3148,4198,0),(22,'W60-4030','Wall carcass 600 x 400 x 300',600,400,300,1,845,1077,1299,1715,0),(23,'W75-4030','Wall Carcass 750 x 400 x 300',750,400,300,1,965,1234,1495,1977,0),(24,'W90-4030','Wall carcass 900 x 400 x 300',900,400,300,1,1084,1391,1693,2239,0),(25,'W60-3530','Wall carcass 600 x 350 x 300',600,350,300,1,803,1022,1227,1622,0),(26,'W75-3530','Wall carcass 750 x 350 x 300',750,350,300,1,920,1174,1418,1876,0),(27,'W90-3530','Wall carcass 900 x 350 x 300',900,350,300,1,1035,1327,1610,2130,0),(28,'W45-3030','Wall carcass 450 x 300 x 300',450,300,300,1,650,819,972,1281,0),(29,'W60-3030','Wall carcass 600 x 300 x  300',600,300,300,1,762,967,1157,1528,0),(30,'W75-3030','Wall carcass 750 x 300 x 300',750,300,300,1,874,1115,1342,1775,0),(31,'W90-3030','Wall carcass',900,300,300,0,986,1262,1527,2021,0),(32,'W45-12030','Wall carcass w/o shelf 450 x 1200 x 300',450,1200,300,0,1327,1727,2135,2832,0),(33,'W60-12030','Wall carcass w/o shelf 600 x 1200 x 300',600,1200,300,0,1508,1958,2430,3212,0),(34,'W45-13030','Wall carcass w/o shelf 450 x 1300 x 300',450,1300,300,0,1402,1827,2264,3005,0),(35,'W60-13030','Wall carcass w/o shelf 600 x 1300 x 300',600,1300,300,0,1590,2069,2572,3400,0),(36,'B15-7056 S','Base shelf carcass 150 x 700 x 560',150,700,560,1,1209,1573,1902,2562,0),(37,'B20-7056 S','Base shelf carcass 200 x 700 x 560',200,700,560,1,1299,1696,2059,2775,0),(38,'B30-7056 S','Base shelf carcass 300 x 700 x 560',300,700,560,1,1479,1941,2372,3200,0),(39,'B40-7056 S','Base shelf carcass 400 x 700 x 560',400,700,560,1,1659,2186,2685,3625,0),(40,'B45-7056 S','Base shelf carcass 450 x 700 x 560',450,700,560,1,1749,2309,2842,3837,0),(41,'B50-7056 S','Base shelf carcass 500 x 700 x 560',500,700,560,1,1839,2432,2999,4049,0),(42,'B60-7056 S','Base shelf carcass 600 x 700 x 560',600,700,560,1,2019,2677,3312,4475,0),(43,'B75-7056 S','Base shelf carcass 750 x 700 x 560',750,700,560,1,2289,3044,3782,5112,0),(44,'B80-7056 S','Base Shelf Carcass 800 x 700 x 560',800,700,560,1,2379,3167,3939,5324,0),(45,'B90-7056 S','Base shelf carcass',900,700,560,1,2559,3413,4252,5750,0),(46,'B105-7056 S','Base shelf carcass 1050 x 700 x 560',1050,700,560,1,2829,3780,4722,6387,0),(47,'TU45-13256 S','Tall Unit with 4 shelf 450 x 1320 x 560',450,1320,560,4,3211,4296,5345,7258,0),(48,'TU60-13256 S','Tall Unit with 4 shelf 600 x 1320 x 560',600,1320,560,4,3734,5014,6266,8510,0),(49,'TU45-19256 S','Tall Unit with 5 shelf 450 x 1920 x 560',450,1920,560,5,4148,5579,6978,9487,0),(50,'TU60-19256 S','Tall Unit with 5 shelf 600 x 1920 x 560',600,1920,560,5,4786,6450,8097,11003,0),(51,'TU45-20256 S','Tall Unit with 5 shelf  450 x 2020 x 560',450,2020,560,5,4263,5737,7181,9764,0),(52,'TU60-20256 S','Tall Unit with 5 shelf 600 x 2020 x 560',600,2020,560,5,4908,6617,8313,11295,0),(53,'BL 90-7056 S','Base Luzy shelf carcass 900 x 700 X 560',900,700,560,1,3572,4811,6081,8220,0),(54,'BB 105-7056 S','Base Blind shelf carcass 1050 x 700 x 560',1050,700,560,1,3125,4209,5281,7176,0),(55,'B15-7056','Base carcass w/o shelf 150 x 700 x 560',150,700,560,0,1095,1431,1737,2343,0),(56,'B20-7056','Base Carcass w/o shelf 200 x 700 x 560',200,700,560,0,1163,1521,1852,2498,0),(57,'B30-7056','Base Carcass w/o shelf 300 x 700 x 560',300,700,560,0,1297,1702,2082,2807,0),(58,'B40-7056','Base Carcass w/o shelf 400 x 700 x 560',400,700,560,0,1431,1882,2313,3115,0),(59,'B45-7056','Base Carcass w/o shelf 450 x 700 x 560',450,700,560,0,1498,1973,2428,3269,0),(60,'B50-7056','Base Carcass w/o shelf 500 x 700 x 560',500,700,560,0,1565,2063,2543,3424,0),(61,'B60-7056','Base Carcass w/o shelf',600,700,560,0,1700,2243,2773,3733,0),(62,'B75-7056','Base Carcass w/o shelf 750 x 700 x 560',750,700,560,0,1901,2513,3119,4196,0),(63,'B80-7056','Base Carcass w/o shelf 800 x 700 x 560',800,700,560,0,1968,2604,3234,4350,0),(64,'B90-7056','Base Carcass w/o shelf 900 x 700 x 560',900,700,560,0,2102,2784,3465,4659,0),(65,'B105-7056','Base Carcass w/o shelf 1050 x 700 x 560',1050,700,560,0,2303,3055,3810,5122,0),(66,'TU45-13256','Tall Unit w/o shelf 450 x 1320 x 560',450,1320,560,0,2207,2950,3688,4987,0),(67,'TU60-13256','Tall Unit w/o shelf 600 x 1320 x 560',600,1320,560,10,2456,3279,4110,5542,0),(68,'TU45-19256','Tall Unit w/o shelf 450 X 1920 x 560',450,1920,560,0,2894,3896,4908,6648,0),(69,'TU60-19256','Tall Unit w/o shelf 600 x 1920 x 560',600,1920,560,0,3188,4282,5404,7292,0),(70,'TU45-20256','Tall Unit w/o shelf 450 x 2020 x 560',450,2020,560,0,3008,4055,5110,6926,0),(71,'TU60-20256','Tall Unit w/o shelf 600 x 2020 x 560',600,2020,560,0,3311,4449,5620,7584,0),(75,'BL 90-7056','Base Luzy w/o shelf 900 x 700 x 560',900,700,560,0,2884,3848,4857,6514,0),(76,'BB 105-7056','Base Blind w/o shelf',1050,700,560,0,2599,3484,4368,5911,0),(77,'B15-7040','Base shelf carcass 170 x 700 x 400',170,700,400,1,998,1271,1514,2015,0),(78,'B20-7040','Base shelf carcass 200 x 700 x 400',200,700,400,1,1040,1328,1587,2114,0),(79,'B30-7040','Base shelf carcass 300 x 700 x 400',300,700,400,1,1184,1521,1832,2442,0),(80,'B40-7040','Base shelf carcass 400 x 700 x 400',400,700,400,1,1328,1714,2077,2771,0),(81,'B45-7040','Base shelf carcass 450 x 700 x 400',450,700,400,1,1400,1811,2200,2935,0),(82,'B50-7040','Base shelf carcass 500 x 700 x 400',500,700,400,1,1472,1907,2322,3099,0),(83,'B60-7040','Base Shelf carcass 600 x 700 x 400',600,700,400,1,1616,2099,2567,3428,0),(84,'B75-7040','Base Shelf carcass 750 x 700 x 400',750,700,400,1,1832,2389,2934,3920,0),(85,'B80-7040','Base shelf carcass 800 x 700 x 400',800,700,400,1,1903,2485,3057,4085,0),(86,'B90-7040','Base shelf carcass 900 x 700 x 400',900,700,400,1,2047,2678,3302,4413,0),(87,'B105-7040','Base shelf carcass 1050 x 700 x 400',1050,700,400,1,2263,2966,3669,4905,0),(88,'BS45-7056','Sink carcass 450 x 700 x 560',450,700,560,0,0,0,1905,2587,0),(89,'BS60-7056','Sink Carcass 600 x 700 x 560',600,700,560,0,0,0,2076,2822,0),(90,'BS75-7056','Sink Carcass 750 x 700 x 560',750,700,560,0,0,0,2247,3058,0),(91,'BS90-7056','Sink carcass 900 x 700 x 560',900,700,560,0,0,0,2418,3293,0),(92,'BS105-7056','Sink carcass 1050 x 700 x 560',1050,700,560,0,0,0,2589,3529,0),(93,'W30-7232 S','Wall shelf carcass 300 x 720 x 320',300,720,320,1,974,1253,1516,2019,0),(94,'W40-7232 S','Wall shelf carcass 400 x 720 x 320',400,720,320,1,1100,1421,1729,2301,0),(95,'W45-7232 S','Wall shelf carcass 450 x 720 x 320',450,720,320,1,1163,1505,1835,2442,0),(96,'W50-7232 S','Wall shelf carcass 500 x 720 x 320',500,720,320,1,1227,1589,1941,2583,0),(97,'W60-7232 S','Wall shelf carcass 600 x 720 x 320',600,720,320,1,1354,1757,2154,2866,0),(98,'W80-7232 S','Wall shelf carcass 800 x 720 x 320',800,720,320,1,1607,2092,2579,3430,0),(99,'W90-7232 S','Wall shelf carcass 900 x 720 x 320',900,720,320,1,1734,2259,2791,3712,0),(100,'W100-7232 S','Wall shelf carcass 1000 x 720 x 320',1000,720,320,1,1860,2427,3003,3994,0),(101,'WC60-7232 S','Wall Luzy corner shelf',600,720,320,1,1953,2578,3229,4307,0),(102,'W60-7232 MIC','Wall Microwave carcass 600 x 720 x 320',600,720,320,1,1354,1757,2154,2866,0),(103,'W30-7232','Wall carcass w/o shelf 300 x 720 x 320',300,720,320,0,854,1101,1337,1779,0),(104,'W40-7232','Wall carcass w/o shelf 400 x 720 x 320',400,720,320,0,953,1230,1501,1994,0),(105,'W45-7232','Wall carcass w/o shelf 450 x 720 x 320',450,720,320,0,1003,1295,1582,2100,0),(106,'W50-7232','Wall Carcass w/o shelf 500 x 720 x 320',500,720,320,0,1052,1360,1665,2207,0),(107,'W60-7232','Wall carcass w/o shelf 600 x 720 x 320',600,720,320,0,1151,1489,1828,2422,0),(108,'W80-7232','Wall carcass w/o shelf 800 x 720 x 320',800,720,320,0,1349,1747,2155,2850,0),(109,'W90-7232','Wall carcass w/o shelf 900 x 720 x 320',900,720,320,0,1448,1876,2319,3064,0),(110,'W100-7232','Wall carcass w/o shelf 1000 x 720 x 320',1000,720,320,0,1547,2006,2482,3278,0),(111,'W30-5432 S','Wall shelf carcass 300 x 540 x 320',300,540,320,1,846,1081,1296,1721,0),(112,'W40-5432 S','Wall shelf carcass 400 x 540 x 320',400,540,320,1,964,1237,1494,1985,0),(113,'W45-5432 S','Wall shelf carcass 450 x 540 x 320',450,540,320,1,1023,1316,1593,2117,0),(114,'W50-5432 S','Wall shelf carcass 500 x 540 x 320',500,540,320,1,1082,1394,1691,2250,0),(115,'W60-5432 S','Wall shelf carcass 600 x 540 x 320',600,540,320,1,1199,1550,1888,2514,0),(116,'W80-5432 S','Wall shelf carcass 800 x 540 x 320',800,540,320,1,1434,1863,2283,3043,0),(117,'W90-5432 S','Wall shelf carcass 900 x 540 x 320',900,540,320,1,1552,2019,2481,3307,0),(118,'W100-5432 S','Wall shelf carcass 1000 x 540 x 320',1000,540,320,1,1670,2176,2679,3572,0),(119,'WC60-5432 S','Wall Luzy corner shelf 600 x 540 x 320',600,540,320,1,1744,2304,2874,3849,0),(120,'W30-5432','Wall carcass w/o shelf 300 x 540 x 320',300,540,320,0,727,929,1117,1481,0),(121,'W40-5432','Wall carcass w/o shelf 400 x 540 x 320',400,540,320,0,817,1046,1265,1678,0),(122,'W45-5432','Wall carcass w/o shelf 450 x 540 x 320',450,540,320,0,862,1106,1340,1776,0),(123,'W50-5432','Wall carcass w/o shelf 500 x 540 x 320',500,540,320,0,907,1165,1414,1874,0),(124,'W60-5432','Wall carcass w/o shelf 600 x 540 x 320',600,540,320,0,997,1283,1563,2070,0),(125,'W80-5432','Wall carcass w/o shelf 800 x 540 x 320',800,540,320,0,1176,1518,1860,2463,0),(126,'W90-5432','Wall carcass w/o shelf 900 x 540 x 320',900,540,320,0,1266,1636,2009,2660,0),(127,'W100-5432','Wall carcass w/o shelf 1000 x 540 x 320',1000,540,320,0,1356,1754,2158,2856,0),(128,'W45-3632','Wall carcass w/o shelf 450 x 360 x 320',450,360,320,0,721,916,1098,1451,0),(129,'W50-3632','Wall carcass w/o shelf 500 x 360 x 320',500,360,320,0,761,969,1164,1541,0),(130,'W60-3632','Wall carcass w/o shelf 600 x 360 x 320',600,360,320,0,842,1076,1298,1719,0),(131,'W80-3632','Wall carcass w/o shelf',800,360,320,0,1004,1289,1565,2076,0),(132,'W90-3632','Wall carcass w/o shelf 900 x 360 x 320',900,360,320,0,1085,1396,1699,2255,0),(133,'W100-3632','Wall carcass w/o shelf 1000 x 360 x 320',1000,360,320,0,1165,1503,1833,2433,0),(134,'W45-13032','Wall carcass w/o shelf 450 x 1300 x 320',450,1300,320,0,1457,1905,2364,3146,0),(135,'W60-13032','Wall Carcass w/o shelf 600 x 1300 x 320',600,1300,320,0,1649,2153,2682,3554,0),(136,'W45-11232','Wall Carcass w/o shelf 450 x 1120 x 320',450,1120,320,0,1316,1716,2122,2822,0),(137,'W60-11232','Wall carcass w/o shelf 600 x 1120 x 320',600,1120,320,0,1495,1947,2417,3203,0),(138,'B15-7256','Base carcass w/o shelf 150 x 720 x 560',150,720,560,0,1115,1459,1773,2393,0),(139,'B20-7256','Base carcass w/o shelf 200 x 720 x 560',200,720,560,0,1183,1550,1888,2548,0),(140,'B30-7256','Base carcass w/o shelf 300 x 720 x560',300,720,560,0,1318,1731,2121,2858,0),(141,'B40-7256','Base carcass w/o shelf 400 x 720 x 560',400,720,560,0,1454,1913,2353,3170,0),(142,'B45-7256','Base carcass w/o shelf 450 x 720 x 560',450,720,560,0,1521,2004,2468,3325,0),(143,'B50-7256','Base carcass w/o shelf 500 x 720 x 560',500,720,560,0,1589,2095,2585,3480,0),(144,'B60-7256','Base carcass w/o shelf 600 x 720 x 560',600,720,560,0,1724,2276,2817,3791,0),(145,'B80-7256','Base carcass w/o shelf 800 x 720 x 560',800,720,560,0,1994,2639,3280,4412,0),(146,'B90-7256','Base carcass w/o shelf 900 x 720 x 560',900,720,560,0,2129,2822,3512,4724,0),(147,'B100-7256','Base carcass w/o shelf 1000 x 720 x 560',1000,720,560,0,2264,3003,3744,5034,0),(148,'B30-7256 S','Base shelf carcass 300 x 720 x 560',300,720,560,1,1500,1970,2411,3252,0),(149,'B40-7256 S','Base shelf carcass 400 x 720 x 560',400,720,560,1,1682,2217,2725,3679,0),(150,'B45-7256 S','Base shelf carcass 450 x 720 x 560',450,720,560,1,1772,2340,2883,3893,0),(151,'B50-7256 S','Base shelf carcass 500 x 720 x 560',500,720,560,1,1862,2463,3040,4106,0),(152,'B60-7256 S','Base shelf carcass 600 x 720 x 560',600,720,560,1,2043,2710,3355,4533,0),(153,'B80-7256 S','Base shelf carcass 800 x 720 x 560',800,720,560,1,2405,3203,3985,5387,0),(154,'B90-7256 S','Base shelf carcass 900 x 720 x 560',900,720,560,1,2586,3449,4300,5814,0),(155,'B100-7256 S','Base shelf carcass 1000 x 720 x 560',1000,720,560,1,2768,3696,4615,6241,0),(156,'BL 90-7256 S','Base Luzy Shelf carcass 900 x 720 x 560',900,720,560,1,3530,4781,6074,8225,0),(157,'BL 90-7256','Base Luzy carcass w/o shelf 900 x 720 x 560',900,720,560,0,2843,3818,4850,6518,0),(158,'BB 105-7256 S *','Base Blind shelf carcass 1050 x 720 x 560',1050,720,560,1,3162,4260,5348,7265,0),(159,'BB 105-7256','Base blind carcass w/o shelf 1050 x 720 x 560',1050,720,560,0,2636,3535,4435,6001,0),(160,'MTU45-12658 S','Medium Tall unit with 4 shelf 450 x 1260 x 580',450,1260,580,4,3225,4320,5375,7306,0),(161,'MTU60-12658 S','Medium tall unit with 4 shelf 600 x 1260 x 580',600,1260,580,4,3758,5051,6314,8585,0),(162,'MTU45-12658','Medium tall unit w/o shelf 450 x 1260 x 580',450,1260,580,0,2192,2932,3665,4959,0),(163,'MTU60-12658','Medium tall unit w/o shelf 600 x 1260 x 580',600,1260,580,0,2441,3262,488,5518,0),(164,'TU45-19058 S','Tall unit with 5 shelf 450 x 1900 x 580',450,1900,580,5,4235,5705,7140,9716,0),(165,'TU60-19058 S','Tall unit with 5 shelf 600 x 1900 x 580',600,1900,580,5,4887,6596,8287,11272,0),(166,'TU45-20858 S','Tall Unit with 5 shelf 450 x 2080 x 580',450,2080,580,5,4447,5996,7516,10229,0),(167,'TU60-20858 S','Tall unit with 5 shelf 600 x 2080  x 580',600,2080,580,5,5113,6905,8686,11811,0),(168,'TU60-19658-MIC','Tall microwave unit with 4 shelf 600 x 1960 x 580',600,1960,580,4,4633,6252,7864,10685,0),(169,'TU60-20858-MIC','Tall Microwave unit with 4 shelf 600 x 2080 x 580',600,2080,580,4,4784,6458,8129,11045,0),(170,'TU45-19058','Tall unit w/o shelf 450 x 1900 x 580',450,1900,580,0,2944,3969,5002,6784,0),(171,'TU60-19058','Tall unit w/o shelf 600 x 1900 x 580',600,1900,580,0,3241,4359,5505,7437,0),(172,'TU45-20858','Tall unit w/o shelf 450 x 2080 x 580',450,2080,580,0,3155,4261,5378,7927,0),(173,'TU60-20858','Tall unit w/o shelf 600 x 2080 x 580',600,2080,580,0,3466,4668,5903,7976,0),(174,'BS45-7256','Sink carcass 450 x 720 x 560',450,720,560,0,0,0,1938,2633,0),(175,'BS60-7256','Sink carcass 600 x 720 x 560',600,720,560,0,0,0,2109,2869,0),(176,'BS90-7256','Sink carcass 900 x 720 x 560',900,720,560,0,0,0,2451,3340,0),(177,'BS120-7256','Sink carcass 1200 x 720 x 560',1200,720,560,0,0,0,2793,3811,0);
/*!40000 ALTER TABLE `standard_carcass_price_master` ENABLE KEYS */;
UNLOCK TABLES;

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
  `parties` varchar(100) DEFAULT '[]',
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','ROLE_ADMIN',NULL,NULL,NULL,NULL,'[]',1,0),(2,'kunal','kunal','ROLE_DEALER','Kunal Gadhia','ASK Solutions Pvt Ltd','vikvijfviunvknv,NGP','9726497826','[1,2]',1,0),(3,'kg','kg','ROLE_DEALER','kg','kg','kg','9874561236','[2]',1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-25 14:07:53
