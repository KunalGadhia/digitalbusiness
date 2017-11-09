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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kitchen_component_master`
--

LOCK TABLES `kitchen_component_master` WRITE;
/*!40000 ALTER TABLE `kitchen_component_master` DISABLE KEYS */;
INSERT INTO `kitchen_component_master` VALUES (1,'Wall Carcase','WC','CARCASE','Carcass 250x250.jpg',0),(2,'Base Carcase','BC','CARCASE','Carcass 250x250.jpg',0),(3,'Tall Carcase','TU','CARCASE','Carcass 250x250.jpg',0),(4,'Base-Blind Carcase','BB','CARCASE','Carcass 250x250.jpg',0),(5,'Regular Profile Shutter - SH101','SH101','SHUTTER','SH 101.png',0),(6,'Regular Profile Shutter - SH102','SH102','SHUTTER','SH 102.png',0),(7,'Regular Profile Shutter - SH103','SH103','SHUTTER','SH 103.png',0),(8,'Regular Profile Shutter - SH105','SH105','SHUTTER','SH 105.png',0),(9,'Regular Profile Shutter - SH107','SH107','SHUTTER','SH 107.png',0),(10,'Regular Profile Shutter - SH108','SH108','SHUTTER','SH 108.png',0),(11,'Regular Profile Shutter - SH109','SH109','SHUTTER','SH 109.png',0),(12,'Regular Profile Shutter - SH110','SH110','SHUTTER','SH 110.png',0),(13,'Regular Profile Shutter - SH113','SH113','SHUTTER','SH 113.png',0),(14,'Regular Profile Shutter - SH114','SH114','SHUTTER','SH 114.png',0),(15,'Regular Profile Shutter - SH119','SH119','SHUTTER','SH 119.png',0),(16,'Regular Profile Shutter - SH121','SH121','SHUTTER','SH 121.png',0),(17,'Regular Profile Shutter - SH128','SH128','SHUTTER','SH 128.png',0),(18,'Regular Profile Shutter - SH129','SH129','SHUTTER','SH 129.png',0),(19,'Regular Profile Shutter - SH131','SH131','SHUTTER','SH 131.png',0),(20,'Regular Profile Shutter - SH115','SH115','SHUTTER','SH 115.png',0),(21,'Regular Profile Shutter - SH116','SH116','SHUTTER','SH 116.png',0),(22,'Regular Profile Shutter - SH118','SH118','SHUTTER','SH 118.png',0),(23,'Plain-Eco Profile Shutter - SH104','SH104','SHUTTER','SH 104.jpg',0),(24,'Plain-Eco Profile Shutter - SH106','SH106','SHUTTER','SH 106.jpg',0),(25,'Plain-Eco Profile Shutter - SH111','SH111','SHUTTER','SH 111.jpg',0),(26,'Plain-Eco Profile Shutter - SH123','SH123','SHUTTER','SH 123.jpg',0),(27,'HIGH GLOSS Shutter- SH133','SH133','SHUTTER','SH 123.png',0),(28,'Plain-Eco Profile Shutter - SH130 (2 Sides)','SH130','SHUTTER','SH 130.jpg',0),(29,'Plain-Eco Profile Shutter - SH46','SH146','SHUTTER','SH 146.jpg',0),(30,'Plain-Eco Profile Shutter - SH135 (2 Sides)','SH135','SHUTTER','SH 135.jpg',0),(31,'Regular Glass Shutter - SH118','SH118GL','SHUTTER','SH 121 GLASS.png',0),(32,'Mesh Glass Shutter - SH118','SH118MGL','SHUTTER','SH 118 MESH GLASS.png',0),(33,'Aluminium Glass Frame Shutter - G55','G55','SHUTTER','C55.png',0),(34,'Aluminium Glass Frame Shutter - G50','G50','SHUTTER','C55.png',0),(35,'Aluminium Glass Frame Shutter - G20','G20','SHUTTER','G20.png',0),(36,'Regular Drawer Front - DF201','DF201','DRAWER','DF 101.jpg',0),(37,'Regular Drawer Front - DF202','DF202','DRAWER','DF 102.jpg',0),(38,'Regular Drawer Front - DF203','DF203','DRAWER','DF 103.jpg',0),(39,'Regular Drawer Front - DF205','DF205','DRAWER','DF 105.jpg',0),(40,'Regular Drawer Front - DF207','DF207','DRAWER','DF 107.jpg',0),(41,'Regular Drawer Front - DF208','DF208','DRAWER','DF 208.jpg',0),(42,'Regular Drawer Front - DF209','DF209','DRAWER','DF 109.jpg',0),(43,'Regular Drawer Front - DF213','DF213','DRAWER','DF 213.jpg',0),(44,'Regular Drawer Front - DF214','DF214','DRAWER','DF 214.jpg',0),(45,'Regular Drawer Front - DF219','DF219','DRAWER','DF 219.jpg',0),(46,'Regular Drawer Front - DF221','DF221','DRAWER','DF 221.jpg',0),(47,'Regular Drawer Front - DF228','DF228','DRAWER','DF 228.jpg',0),(48,'Regular Drawer Front - DF229','DF229','DRAWER','DF 229.jpg',0),(49,'Regular Drawer Front - DF231','DF231','DRAWER','DF 231.jpg',0),(50,'Regular Drawer Front - DF215','DF215','DRAWER','DF 215.jpg',0),(51,'Regular Drawer Front - DF216','DF216','DRAWER','DF 216.jpg',0),(52,'Regular Drawer Front - DF218','DF218','DRAWER','DF 218.jpg',0),(53,'Plain-Eco Drawer Front - DF204','DF204','DRAWER','DF 204.jpg',0),(54,'Plain-Eco Drawer Front - DF206','DF206','DRAWER','DF 206.jpg',0),(55,'Plain-Eco Drawer Front - DF211','DF211','DRAWER','DF 211.jpg',0),(56,'Plain-Eco Drawer Front - DF223','DF223','DRAWER','DF 223.jpg',0),(57,'High-Gloss Drawer Front - DF233','DF233','DRAWER','DF 223.jpg',0),(58,'Plain-Eco Drawer Front - DF230','DF230','DRAWER','DF 230.jpg',0),(59,'Plain-Eco Drawer Front - DF246','DF246','DRAWER','DF 246.jpg',0),(60,'Filler','FILLER','FILLER','Ebony.jpg',0),(61,'Panel','PLT-PANEL','PANEL','Piombo.jpg',0),(62,'Pelmet - PL1','PL1','PELMET','Cornice PL1.jpg',0),(63,'Pelmet - PL2','PL2','PELMET','Cornice PL2.jpg',0),(64,'Cornice - CR1','CR1','CORNICE','Cornice CR1.jpg',0),(65,'Cornice - CR2','CR2','CORNICE','Cornice CR2.jpg',0),(66,'Cornice - CR3','CR3','CORNICE','Cornice CR3.jpg',0),(67,'Cornice - CR4','CR4','CORNICE','Cornice CR4.jpg',0),(68,'Profile Handles - H-01','HANDLEH01','HANDLE','1.jpg',0),(69,'Profile Handles - H-10','HANDLEH10','HANDLE','H10 CD 160 mm .jpg',0),(70,'Profile Handles - H-14','HANDLEH14','HANDLE','H14 CD 160 mm .jpg',0),(71,'Profile Handles - H-15','HANDLEH15','HANDLE','H15 CD 120,160,224mm .jpg',0),(72,'Profile Handles - H-17','HANDLEH17','HANDLE','H17 CD 224,320 mm .jpg',0),(73,'Profile Handles - EP-01','HANDLEEP01','HANDLE','Shutter EP 01.jpg',0),(74,'Profile Handles - H-31','HANDLEH31','HANDLE','H31 CD 228,320,400,500,800,1300mm.jpg',0),(75,'Profile Handles - H-33','HANDLEH33','HANDLE','H33 CD 297,447,497,597,797,897mm.jpg',0),(76,'Profile Handles - H-34','HANDLEH34','HANDLE','H34 CD 196,246,500mm .jpg',0),(77,'Profile Handles - H-35','HANDLEH35','HANDLE','H35 CD 32 mm .jpg',0),(78,'Profile Handles - H-36','HANDLEH36','HANDLE','H36 CD 160,320,480mm .jpg',0);
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
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code_UNIQUE` (`product_code`),
  KEY `order_details_order_head_id_fk` (`order_head_id`),
  CONSTRAINT `order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,3,'WC90603018PB-0600090018300','WC','PB',600,900,300,0),(2,3,'WC11603018PB-0600110018300','WC','PB',600,1100,300,0),(3,4,'BC90603018MDF-0600090018300','BC','MDF',600,900,300,0),(4,3,'PLT-PANEL-18PB-0564028018000','PLT-PANEL','PB',564,280,0,0),(5,3,'PLT-PANEL-18PB-0564005018000','PLT-PANEL','PB',564,50,0,0),(6,3,'SH133-18SHDFGLOS-0735039018000','SH133','SHDFGLOS',735,390,0,0),(7,3,'SH113-18SHDFGLOS-0923008118000','SH113','SHDFGLOS',923,81,0,0),(8,3,'SH133-18SHDFGLOS-0739044918000','SH133','SHDFGLOS',739,449,0,0),(9,3,'DF233-18SHDFGLOS-0160048018000','DF233','SHDFGLOS',160,480,0,0),(10,3,'FILLER-18SHDFGLOS-0735006518000','FILLER','SHDFGLOS',735,65,0,0),(11,3,'PL1-18SHDF-0325003518000','PL1','SHDF',325,35,0,0),(12,3,'CR1-18SHDF-0450005018000','CR1','SHDF',450,50,0,0),(13,3,'EP011000MM','EP01','',1000,0,0,0),(14,3,'HANDLEEP011000MM','HANDLEEP01','',1000,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_head`
--

LOCK TABLES `order_head` WRITE;
/*!40000 ALTER TABLE `order_head` DISABLE KEYS */;
INSERT INTO `order_head` VALUES (1,'OC1','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Pantaloons India','4654654','564654','2017-11-01 00:00:00','85000','E001',1,'C',NULL,'25',0),(2,'OC2','H','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'D','T','Edge Turnkey Kitchens','5897','8798','2017-11-01 00:00:00','175000','E002',1,'C',NULL,'12',0),(3,'OC3','SP','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'R','T','Edge Turnkey','397548','4654567','2017-11-01 00:00:00','95246','E001',1,'C',NULL,'12',0),(4,'OC4','H','EH','NON_PROJECTS','COMPONENTS',1,1,NULL,'T','T','Pantaloon India Interiors','78956','8795','2017-11-08 00:00:00','150000','E001',1,'C',NULL,'10',0);
/*!40000 ALTER TABLE `order_head` ENABLE KEYS */;
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
  `cst_number` varchar(100) DEFAULT NULL,
  `vat_number` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_master`
--

LOCK TABLES `party_master` WRITE;
/*!40000 ALTER TABLE `party_master` DISABLE KEYS */;
INSERT INTO `party_master` VALUES (1,'PANT-HYD1','PANTALOON RETAIL INDIA LTD','14021872',NULL,'CDC-HYDERABAD-PUNJAGUTTA A DIVISION','OF P  6-3-676/A/1/A, PUNJAGUTTA','HYDERABAD-500029,Andhra Pradesh',NULL,'Sandeep.More@futuregroup.in','HYDERABAD','465565645','654353453','4534534534','45435345DFE5','28890126394','28890126394',0),(2,'Edge Turnkey','Edge Turnkey solutions pvt ltd','14022472','MR RAYMOND PATEL :-9820090630','C 1 ,  3 & 4 , Contractor Baug,','Mori Road ,','opp Andhra Bank , Mahim west, Mumbai - 400016',NULL,'mailcarbonspace@gmail.com','MUMBAI','4564435','435345345','3453453453','4534534535','45345534','543534534534',0);
/*!40000 ALTER TABLE `party_master` ENABLE KEYS */;
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
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raw_material_master`
--

LOCK TABLES `raw_material_master` WRITE;
/*!40000 ALTER TABLE `raw_material_master` DISABLE KEYS */;
INSERT INTO `raw_material_master` VALUES (1,'Particle Board','PB',0),(2,'Medium Density Fiber Board','MDF',0),(3,'High Density Fiber Board','HDF',0),(4,'Supertuff High Density Fiber Board','SHDF',0),(5,'Boiled Water Ply','BW',0),(6,'Supertuff High Density Fiber Board Glossy','SHDFGLOS',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_type_master`
--

LOCK TABLES `sale_type_master` WRITE;
/*!40000 ALTER TABLE `sale_type_master` DISABLE KEYS */;
INSERT INTO `sale_type_master` VALUES (1,'E-COMMMERCE HOME','ECH','For E-Commerce Home',0),(2,'EXPORT HOME','EH','EXPORT HOME',0),(3,'HOME DEALER TRADE','HDT','HOME DEALER TRADE',0),(4,'HOME O.E.M SALE','HOS','HOME O.E.M SALE',0),(5,'HOME PROJECTS','HP','HOME PROJECTS',0),(6,'HOME SALE TO INDIVIDUAL','HSTI','HOME SALE TO INDIVIDUAL',0),(7,'HOME SALE TO SW OR SOS','HSTSWSOS','HOME SALE TO SW OR SOS',0),(8,'MODERN LIVING HOME','MLH','MODERN LIVING HOME',0),(9,'SHOWROOM HOME','SH','SHOWROOM HOME',0);
/*!40000 ALTER TABLE `sale_type_master` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `segment_master`
--

LOCK TABLES `segment_master` WRITE;
/*!40000 ALTER TABLE `segment_master` DISABLE KEYS */;
INSERT INTO `segment_master` VALUES (1,'HOME','H','Home Segment',0),(2,'SPECIAL PROJECTS','SP','Special Projects',0),(3,'OFFICE','O','Office Segment',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard_carcass_dimension_master`
--

LOCK TABLES `standard_carcass_dimension_master` WRITE;
/*!40000 ALTER TABLE `standard_carcass_dimension_master` DISABLE KEYS */;
INSERT INTO `standard_carcass_dimension_master` VALUES (1,300,'WIDTH','WC',0),(2,400,'WIDTH','WC',0),(3,450,'WIDTH','WC',0),(4,500,'WIDTH','WC',0),(5,600,'WIDTH','WC',0),(6,750,'WIDTH','WC',0),(7,800,'WIDTH','WC',0),(8,900,'WIDTH','WC',0),(9,1050,'WIDTH','WC',0),(10,150,'WIDTH','BC',0),(11,170,'WIDTH','BC',0),(12,200,'WIDTH','BC',0),(13,300,'WIDTH','BC',0),(14,400,'WIDTH','BC',0),(15,450,'WIDTH','BC',0),(16,500,'WIDTH','BC',0),(17,600,'WIDTH','BC',0),(18,750,'WIDTH','BC',0),(19,800,'WIDTH','BC',0),(20,900,'WIDTH','BC',0),(21,1050,'WIDTH','BC',0),(22,1000,'WIDTH','BC',0),(23,450,'WIDTH','TU',0),(24,600,'WIDTH','TU',0),(25,1050,'WIDTH','BB',0),(26,720,'HEIGHT','WC',0),(27,600,'HEIGHT','WC',0),(28,340,'HEIGHT','WC',0),(29,700,'HEIGHT','WC',0),(30,360,'HEIGHT','WC',0),(31,400,'HEIGHT','WC',0),(32,1300,'HEIGHT','WC',0),(33,350,'HEIGHT','WC',0),(34,1120,'HEIGHT','WC',0),(35,300,'HEIGHT','WC',0),(36,1200,'HEIGHT','WC',0),(37,1300,'HEIGHT','WC',0),(38,720,'HEIGHT','BC',0),(39,700,'HEIGHT','BC',0),(40,1260,'HEIGHT','TU',0),(41,1320,'HEIGHT','TU',0),(42,1900,'HEIGHT','TU',0),(43,1920,'HEIGHT','TU',0),(44,2080,'HEIGHT','TU',0),(45,2020,'HEIGHT','TU',0),(46,1960,'HEIGHT','TU',0),(47,320,'DEPTH','WC',0),(48,300,'DEPTH','WC',0),(49,560,'DEPTH','BC',0),(50,400,'DEPTH','BC',0),(51,580,'DEPTH','TU',0),(52,560,'DEPTH','TU',0),(53,560,'DEPTH','BB',0);
/*!40000 ALTER TABLE `standard_carcass_dimension_master` ENABLE KEYS */;
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
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','ROLE_ADMIN',NULL,NULL,NULL,NULL,1,0);
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

-- Dump completed on 2017-11-09 18:38:30
