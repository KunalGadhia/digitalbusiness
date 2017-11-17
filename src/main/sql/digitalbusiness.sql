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
  CONSTRAINT `carcass_order_details_back_color_id_fk` FOREIGN KEY (`back_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_bottom_color_id_fk` FOREIGN KEY (`bottom_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_int_color_id_fk` FOREIGN KEY (`int_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_left_color_id_fk` FOREIGN KEY (`left_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_order_head_id_fk` FOREIGN KEY (`order_head_id`) REFERENCES `order_head` (`id`),
  CONSTRAINT `carcass_order_details_right_color_id_fk` FOREIGN KEY (`right_color_id`) REFERENCES `color_code_master` (`id`),
  CONSTRAINT `carcass_order_details_std_carcass_price_id_fk` FOREIGN KEY (`std_carcass_price_id`) REFERENCES `standard_carcass_price_master` (`id`),
  CONSTRAINT `carcass_order_details_top_color_id_fk` FOREIGN KEY (`top_color_id`) REFERENCES `color_code_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carcass_order_details`
--

LOCK TABLES `carcass_order_details` WRITE;
/*!40000 ALTER TABLE `carcass_order_details` DISABLE KEYS */;
INSERT INTO `carcass_order_details` VALUES (1,6,14,117,10,5,NULL,12,1,'WC45703018PB-0700045018300','WC','PB',700,450,300,0,1,1,0),(2,6,141,118,9,76,NULL,NULL,NULL,'BC40705618MDF-0650037518560','BC','MDF',650,375,560,1,0,0,0),(3,3,51,117,8,8,NULL,NULL,NULL,'TU451905618MDF-1900045018560','TU','MDF',1900,450,560,1,1,5,0);
/*!40000 ALTER TABLE `carcass_order_details` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_code_master`
--

LOCK TABLES `color_code_master` WRITE;
/*!40000 ALTER TABLE `color_code_master` DISABLE KEYS */;
INSERT INTO `color_code_master` VALUES (1,'AMCH','American Cherry','STANDARD_MEMBRANE','american cherry.jpg',0),(2,'ASHWD','Ashwood','STANDARD_MEMBRANE','Ashwood.jpg',0),(3,'BRTK','Burma Teak','STANDARD_MEMBRANE','burma teak.jpg',0),(4,'CASA','Casco Sapheli','STANDARD_MEMBRANE','casco sapheli.jpg',0),(5,'CHSTNT','Chestnut','STANDARD_MEMBRANE','Chestnut.jpg',0),(6,'LMNGRN1','Lemon Green 01','STANDARD_MEMBRANE','Lemon green 01.jpg',0),(7,'MTWNG','Matt Wenge','STANDARD_MEMBRANE','matt wenge.jpg',0),(8,'NTWNG','Natural Wenge','STANDARD_MEMBRANE','Natural Wenge.jpg',0),(9,'PSTWLNT','Prestige Walnut','STANDARD_MEMBRANE','Prestige Walnut.jpg',0),(10,'SF3004','SF 3004','STANDARD_MEMBRANE','SF 3004.jpg',0),(11,'SHOWP','Shadow Oak WP','STANDARD_MEMBRANE','Shadow Oak WP.jpg',0),(12,'SHNG','Shangrila','STANDARD_MEMBRANE','Shangrila.jpg',0),(13,'SM 95','SM 95','STANDARD_MEMBRANE','SM 95.jpg',0),(14,'SM931','SM 931','STANDARD_MEMBRANE','SM 931 - Copy.jpg',0),(15,'TMTRD','Tomato Red','STANDARD_MEMBRANE','tomato red.jpg',0),(16,'TRDRE','Trendy Recon','STANDARD_MEMBRANE','Trendy Recon.jpg',0),(17,'TROTK','Tropical Teak','STANDARD_MEMBRANE','Tropical Teak.jpg',0),(18,'WLNTBRNZ','Walnut Bronze','STANDARD_MEMBRANE','Walnut Bronze.jpg',0),(19,'WLNTRIGN','Walnut Rigato New','STANDARD_MEMBRANE','WALNUT RIGATO NEW.jpg',0),(20,'WOK','White Oak','STANDARD_MEMBRANE','White Oak.jpg',0),(21,'BLTMWLNT','Baltimore Walnut','DESIGNER_MEMBRANE','Baltimore Walnut.jpg',0),(22,'BLKSTR','Black Star','DESIGNER_MEMBRANE','black star.jpg',0),(23,'BRNZ','Bronze','DESIGNER_MEMBRANE','bronze.bmp',0),(24,'CNCRT','Concrete','DESIGNER_MEMBRANE','Concrete.jpg',0),(25,'DGL','Douglus Larch','DESIGNER_MEMBRANE','Douglas Larch.jpg',0),(26,'DRFWDWP','Drift Wood WP','DESIGNER_MEMBRANE','Drift Wood WP.jpg',0),(27,'ELMVER2','Elma Veralinga 2','DESIGNER_MEMBRANE','Elma Veralinga 2.jpg',0),(28,'GLDWV','Gold Wave','DESIGNER_MEMBRANE','Gold Wave.jpg',0),(29,'HRZOK','Horizon Oak','DESIGNER_MEMBRANE','Horizon Oak.jpg',0),(30,'KNTWLNT','Knotty Walnut','DESIGNER_MEMBRANE','knotty wallnut.jpg',0),(31,'KRKLTH','Kroko Leather','DESIGNER_MEMBRANE','kroko leather.jpg',0),(32,'LALA','Lauren Larch','DESIGNER_MEMBRANE','Lauren Larch.jpg',0),(33,'MORHW','Modo Rhine White','DESIGNER_MEMBRANE','Modo Rhine White.jpg',0),(34,'OLODLA','Olmo Odeon Lava','DESIGNER_MEMBRANE','Olmo Odeon Lava.jpg',0),(35,'PST','Pista','DESIGNER_MEMBRANE','Pista.jpg',0),(36,'PRKRTM','Purple Kroko TM','DESIGNER_MEMBRANE','Purple Kroko TM.jpg',0),(37,'RNDASH','Rainbow Ash','DESIGNER_MEMBRANE','Rainbow Ash.jpg',0),(38,'SNTOK','Santana Oak','DESIGNER_MEMBRANE','Santana Oak.jpg',0),(39,'SLTGR','Slate Gray','DESIGNER_MEMBRANE','slate grey.jpg',0),(40,'SNASH','Sonoma Ash','DESIGNER_MEMBRANE','Sonoma Ash.jpg',0),(41,'TSCH','Tuscan Cherry','DESIGNER_MEMBRANE','tuscan cherry.jpg',0),(42,'TSWNG','Tuscan Wenge','DESIGNER_MEMBRANE','Tuscan Wenge.jpg',0),(43,'VRMT','Vermount','DESIGNER_MEMBRANE','Vermount.jpg',0),(44,'WPFUOK','WP Fumed Oak','DESIGNER_MEMBRANE','wp fumed oak.jpg',0),(45,'BLKHG','Black High Gloss','HIGHGLOSS_MEMBRANE','BLACK HIGH GLOSS.jpg',0),(46,'HGBRDR','HG Bordeaux Red','HIGHGLOSS_MEMBRANE','HG Bordeaux Red.jpg',0),(47,'HGCAPP','HG Cappuccino','HIGHGLOSS_MEMBRANE','HG Cappuccino.jpg',0),(48,'HGKYPRL','HG Kyoto Pearl','HIGHGLOSS_MEMBRANE','HG Kyoto Pearl.jpg',0),(49,'HGMAGNL','HG Magnolia','HIGHGLOSS_MEMBRANE','HG Magnolia.jpg',0),(50,'HGPN','HG Pine','HIGHGLOSS_MEMBRANE','HG PINE.jpg',0),(51,'HGPRPL','HG Purple','HIGHGLOSS_MEMBRANE','HG Purple.jpg',0),(52,'HGSL','HG Silver','HIGHGLOSS_MEMBRANE','HG Silver.bmp',0),(53,'HGWT','HG White','HIGHGLOSS_MEMBRANE','HG White.jpg',0),(54,'HGYLAL','HG Yellow Alpha','HIGHGLOSS_MEMBRANE','HG Yellow Alpha.jpg',0),(55,'HGBLRD','HG Blood Red','HIGHGLOSS_MEMBRANE','HG-Blood-Red.jpg',0),(56,'HGPLPR','HG Plum Prunus','HIGHGLOSS_MEMBRANE','Plum Prunus.jpg',0),(57,'HGRST','HG Rosa Tea','HIGHGLOSS_MEMBRANE','Rosa Tea.jpg',0),(58,'HGSLTGR','HG Slate Grey','HIGHGLOSS_MEMBRANE','slate grey.jpg',0),(59,'ACAEX','Acacia Exodus','HPL','Acacia Exodus.jpg',0),(60,'ALPRL','Alumina Pearl','HPL','Alumina Pearl.jpg',0),(61,'ARZWLNT','Arizona Walnut','HPL','Arizona Walnut.jpg',0),(62,'AUBOK','Aubrum Oak','HPL','Aubrum Oak.jpg',0),(63,'AUTLF','Autumn Leaf','HPL','Autumn Leaf.jpg',0),(64,'BALOK','Balenese Oak','HPL','Balenese Oak.jpg',0),(65,'BRBNCH','Berry Bunch','HPL','Berry Bunch.jpg',0),(66,'BLKCRR','Black Current','HPL','Black Current.jpg',0),(67,'BLK','Black','HPL','black.jpg',0),(68,'BRNOK','Brown Oak','HPL','Brown Oak.jpg',0),(69,'CNWLNT','Canadian Walnut','HPL','Canadian Walnut.jpg',0),(70,'CRNL','Carnival','HPL','Carnival.jpg',0),(71,'CMHPG','Champagne','HPL','Champagne.jpg',0),(72,'DRKCT','Dark Citrus','HPL','Dark Citrus.jpg',0),(73,'DGPN','Douglas Pine','HPL','Douglas Pine.jpg',0),(74,'EB','Ebony','HPL','Ebony.jpg',0),(75,'ELWD','Elevated Wood','HPL','Elevated Wood.jpg',0),(76,'FRWH','Frosty Write','HPL','frosty white.jpg',0),(77,'GLOK','Golden Oak','HPL','Golden Oak.jpg',0),(78,'INTWH','Interior White','HPL','Interior White.jpg',0),(79,'MALWNG','Malagasy Wenge','HPL','Malagasy Wenge.jpg',0),(80,'MLCN','Malay Cane','HPL','Malay Cane.jpg',0),(81,'MLWNG','Mali Wenge','HPL','Mali Wenge.jpg',0),(82,'MRGL','Marigold','HPL','Marigold.jpg',0),(83,'MDTOK','Mediterranian Oak','HPL','Mediterranean Oak.jpg',0),(84,'MDNTOK','Midnight Oak','HPL','Midnight Oak.jpg',0),(85,'MSTOK','Misty Oak','HPL','Misty Oak.jpg',0),(86,'OCNRCN','Ocean Recon','HPL','Ocean Recon.jpg',0),(87,'ORCHDL','Orchid Delight','HPL','Orchid Delight.jpg',0),(88,'PRLBL','Pearl Black','HPL','Pearl Black.jpg',0),(89,'PPY','Poppy','HPL','Poppy.jpg',0),(90,'SFRN','Saffron','HPL','Saffaron.jpg',0),(91,'SNDRCN','Sandy Recon','HPL','Sandy Recon.jpg',0),(92,'SHNRGLMT','Shangrilla Matt','HPL','Shangrila - Matt.jpg',0),(93,'SHNGRLHPL','Shangrila HPL','HPL','Shangrila.jpg',0),(94,'SHR','Shore','HPL','Shore.jpg',0),(95,'SLGRHPL','Slate Gray HPL','HPL','slate grey.jpg',0),(96,'SLT','Slate','HPL','Slate.jpg',0),(97,'TN','Tan','HPL','Tan.jpg',0),(98,'TKEX','Teak Exotica','HPL','Teak Exotica.jpg',0),(99,'TNDFRST','Tundra Forest','HPL','Tundra Forest.jpg',0),(100,'TWIOK','Twilight Oak','HPL','Twilight Oak.jpg',0),(101,'VKTK','Viking Teak','HPL','Viking Teak.jpg',0),(102,'WLPLM','Wallis Plum','HPL','Wallis Plum.jpg',0),(103,'BRDRD','Bordeaux Red','READYMADE_ACRYLIC','Bordeaux Red.jpg',0),(104,'CF','Cafe','READYMADE_ACRYLIC','Cafe.jpg',0),(105,'EBAC','Ebony ACR','READYMADE_ACRYLIC','ebony.jpg',0),(106,'FL','Floral','READYMADE_ACRYLIC','Floral.jpg',0),(107,'GPH','Graphite','READYMADE_ACRYLIC','Graphite.jpg',0),(108,'MTHPRL','Mother Of Pearl','READYMADE_ACRYLIC','Mother of Pearl.jpg',0),(109,'OBRGN','Obergene','READYMADE_ACRYLIC','Obergene.jpg',0),(110,'OLV','Olive','READYMADE_ACRYLIC','olive.jpg',0),(111,'PMBO','PIOMBO','READYMADE_ACRYLIC','Piombo.jpg',0),(112,'STL','Steel','READYMADE_ACRYLIC','Steel.bmp',0),(113,'TROP','Tortora Opaco','READYMADE_ACRYLIC','Tortora Opaco.jpg',0),(114,'VNL','Vanilla','READYMADE_ACRYLIC','Vanilla.bmp',0),(115,'WHOP','White Opaco','READYMADE_ACRYLIC','White Opaco.jpg',0),(116,'WHAC','White Acrylic','READYMADE_ACRYLIC','White.jpg',0),(117,'KNGWHT','Kingston White','PRELAM','White Opaco.jpg',0),(118,'CSP','Caspani','PRELAM','Tortora Opaco.jpg',0),(119,'ABSWHT','Abstract White','PRELAM','White.jpg',0);
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
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_constraint_master`
--

LOCK TABLES `color_constraint_master` WRITE;
/*!40000 ALTER TABLE `color_constraint_master` DISABLE KEYS */;
INSERT INTO `color_constraint_master` VALUES (27,'CARCASE','PB','[117,118,60]',0),(28,'CARCASE','MDF','[117,60,118]',0),(29,'CARCASE','HDF','[117,60,118,119]',0),(30,'CARCASE','BW','[117,60]',0);
/*!40000 ALTER TABLE `color_constraint_master` ENABLE KEYS */;
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
INSERT INTO `kitchen_component_master` VALUES (1,'Wall Carcase','WC','CARCASE','Carcass 250x250.jpg',0),(2,'Base Carcase','BC','CARCASE','Carcass 250x250.jpg',0),(3,'Tall Carcase','TU','CARCASE','Carcass 250x250.jpg',0),(4,'Base-Blind Carcase','BB','CARCASE','Carcass 250x250.jpg',0),(5,'Regular Profile Shutter - SH101','SH101','SHUTTER','SH 101.png',0),(6,'Regular Profile Shutter - SH102','SH102','SHUTTER','SH 102.png',0),(7,'Regular Profile Shutter - SH103','SH103','SHUTTER','SH 103.png',0),(8,'Regular Profile Shutter - SH105','SH105','SHUTTER','SH 105.png',0),(9,'Regular Profile Shutter - SH107','SH107','SHUTTER','SH 107.png',0),(10,'Regular Profile Shutter - SH108','SH108','SHUTTER','SH 108.png',0),(11,'Regular Profile Shutter - SH109','SH109','SHUTTER','SH 109.png',0),(12,'Regular Profile Shutter - SH110','SH110','SHUTTER','SH 110.png',0),(13,'Regular Profile Shutter - SH113','SH113','SHUTTER','SH 113.png',0),(14,'Regular Profile Shutter - SH114','SH114','SHUTTER','SH 114.png',0),(15,'Regular Profile Shutter - SH119','SH119','SHUTTER','SH 119.png',0),(16,'Regular Profile Shutter - SH121','SH121','SHUTTER','SH 121.png',0),(17,'Regular Profile Shutter - SH128','SH128','SHUTTER','SH 128.png',0),(18,'Regular Profile Shutter - SH129','SH129','SHUTTER','SH 129.png',0),(19,'Regular Profile Shutter - SH131','SH131','SHUTTER','SH 131.png',0),(20,'Regular Profile Shutter - SH115','SH115','SHUTTER','SH 115.png',0),(21,'Regular Profile Shutter - SH116','SH116','SHUTTER','SH 116.png',0),(22,'Regular Profile Shutter - SH118','SH118','SHUTTER','SH 118.png',0),(23,'Plain-Eco Profile Shutter - SH104','SH104','SHUTTER','SH 104.jpg',0),(24,'Plain-Eco Profile Shutter - SH106','SH106','SHUTTER','SH 106.jpg',0),(25,'Plain-Eco Profile Shutter - SH111','SH111','SHUTTER','SH 111.jpg',0),(26,'Plain-Eco Profile Shutter - SH123','SH123','SHUTTER','SH 123.jpg',0),(27,'HIGH GLOSS Shutter- SH133','SH133','SHUTTER','SH 123.png',0),(28,'Plain-Eco Profile Shutter - SH130 (2 Sides)','SH130','SHUTTER','SH 130.jpg',0),(29,'Plain-Eco Profile Shutter - SH46','SH146','SHUTTER','SH 146.jpg',0),(30,'Plain-Eco Profile Shutter - SH135 (2 Sides)','SH135','SHUTTER','SH 135.jpg',0),(31,'Regular Glass Shutter - SH118','SH118GL','SHUTTER','SH 121 GLASS.png',0),(32,'Mesh Glass Shutter - SH118','SH118MGL','SHUTTER','SH 118 MESH GLASS.png',0),(33,'Aluminium Glass Frame Shutter - G55','G55','SHUTTER','C55.png',0),(34,'Aluminium Glass Frame Shutter - G50','G50','SHUTTER','C55.png',0),(35,'Aluminium Glass Frame Shutter - G20','G20','SHUTTER','G20.png',0),(36,'Regular Drawer Front - DF201','DF201','DRAWER','DF 101.jpg',0),(37,'Regular Drawer Front - DF202','DF202','DRAWER','DF 102.jpg',0),(38,'Regular Drawer Front - DF203','DF203','DRAWER','DF 103.jpg',0),(39,'Regular Drawer Front - DF205','DF205','DRAWER','DF 105.jpg',0),(40,'Regular Drawer Front - DF207','DF207','DRAWER','DF 107.jpg',0),(41,'Regular Drawer Front - DF208','DF208','DRAWER','DF 208.jpg',0),(42,'Regular Drawer Front - DF209','DF209','DRAWER','DF 109.jpg',0),(43,'Regular Drawer Front - DF213','DF213','DRAWER','DF 213.jpg',0),(44,'Regular Drawer Front - DF214','DF214','DRAWER','DF 214.jpg',0),(45,'Regular Drawer Front - DF219','DF219','DRAWER','DF 219.jpg',0),(46,'Regular Drawer Front - DF221','DF221','DRAWER','DF 221.jpg',0),(47,'Regular Drawer Front - DF228','DF228','DRAWER','DF 228.jpg',0),(48,'Regular Drawer Front - DF229','DF229','DRAWER','DF 229.jpg',0),(49,'Regular Drawer Front - DF231','DF231','DRAWER','DF 231.jpg',0),(50,'Regular Drawer Front - DF215','DF215','DRAWER','DF 215.jpg',0),(51,'Regular Drawer Front - DF216','DF216','DRAWER','DF 216.jpg',0),(52,'Regular Drawer Front - DF218','DF218','DRAWER','DF 218.jpg',0),(53,'Plain-Eco Drawer Front - DF204','DF204','DRAWER','DF 204.jpg',0),(54,'Plain-Eco Drawer Front - DF206','DF206','DRAWER','DF 206.jpg',0),(55,'Plain-Eco Drawer Front - DF211','DF211','DRAWER','DF 211.jpg',0),(56,'Plain-Eco Drawer Front - DF223','DF223','DRAWER','DF 223.jpg',0),(57,'High-Gloss Drawer Front - DF233','DF233','DRAWER','DF 223.jpg',0),(58,'Plain-Eco Drawer Front - DF230','DF230','DRAWER','DF 230.jpg',0),(59,'Plain-Eco Drawer Front - DF246','DF246','DRAWER','DF 246.jpg',0),(60,'Filler','FILLER','FILLER','Ebony.jpg',0),(61,'Panel','PLT-PANEL','PANEL','Piombo.jpg',0),(62,'Pelmet - PL1','PL1','PELMET','Cornice PL1.jpg',0),(63,'Pelmet - PL2','PL2','PELMET','Cornice PL2.jpg',0),(64,'Cornice - CR1','CR1','CORNICE','Cornice CR1.jpg',0),(65,'Cornice - CR2','CR2','CORNICE','Cornice CR2.jpg',0),(66,'Cornice - CR3','CR3','CORNICE','Cornice CR3.jpg',0),(67,'Cornice - CR4','CR4','CORNICE','Cornice CR4.jpg',0),(68,'Profile Handles - H-01','HANDLEH01','HANDLE','1.jpg',0),(69,'Profile Handles - H-10','HANDLEH10','HANDLE','H10 CD 160 mm .jpg',0),(70,'Profile Handles - H-14','HANDLEH14','HANDLE','H14 CD 160 mm .jpg',0),(71,'Profile Handles - H-15','HANDLEH15','HANDLE','H15 CD 120,160,224mm .jpg',0),(72,'Profile Handles - H-17','HANDLEH17','HANDLE','H17 CD 224,320 mm .jpg',0),(73,'Profile Handles - EP-01','HANDLEEP01','HANDLE','Shutter EP 01.jpg',0),(74,'Profile Handles - H-31','HANDLEH31','HANDLE','H31 CD 228,320,400,500,800,1300mm.jpg',0),(75,'Profile Handles - H-33','HANDLEH33','HANDLE','H33 CD 297,447,497,597,797,897mm.jpg',0),(76,'Profile Handles - H-34','HANDLEH34','HANDLE','H34 CD 196,246,500mm .jpg',0),(77,'Profile Handles - H-35','HANDLEH35','HANDLE','H35 CD 32 mm .jpg',0),(78,'Profile Handles - H-36','HANDLEH36','HANDLE','1big.jpg',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,3,'WC90603018PB-0600090018300','WC','PB',600,900,300,0,1,0),(2,3,'WC11603018PB-0600110018300','WC','PB',600,1100,300,0,1,0),(3,4,'BC90603018MDF-0600090018300','BC','MDF',600,900,300,0,1,0),(4,3,'PLT-PANEL-18PB-0564028018000','PLT-PANEL','PB',564,280,0,0,1,0),(5,3,'PLT-PANEL-18PB-0564005018000','PLT-PANEL','PB',564,50,0,0,1,0),(6,3,'SH133-18SHDFGLOS-0735039018000','SH133','SHDFGLOS',735,390,0,0,1,0),(7,3,'SH113-18SHDFGLOS-0923008118000','SH113','SHDFGLOS',923,81,0,0,1,0),(8,3,'SH133-18SHDFGLOS-0739044918000','SH133','SHDFGLOS',739,449,0,0,1,0),(9,3,'DF233-18SHDFGLOS-0160048018000','DF233','SHDFGLOS',160,480,0,0,1,0),(10,3,'FILLER-18SHDFGLOS-0735006518000','FILLER','SHDFGLOS',735,65,0,0,1,0),(11,3,'PL1-18SHDF-0325003518000','PL1','SHDF',325,35,0,0,1,0),(12,3,'CR1-18SHDF-0450005018000','CR1','SHDF',450,50,0,0,1,0),(13,3,'EP011000MM','EP01','',1000,0,0,0,1,0),(14,3,'HANDLEEP011000MM','HANDLEEP01','',1000,0,0,0,1,0),(15,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,1,0),(17,3,'WC90603018PB-0600090018300','WC','PB',600,900,300,0,NULL,0),(18,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,NULL,0),(19,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,1,0),(20,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,NULL,0),(21,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,NULL,0),(22,3,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,0,0),(23,3,'WC90603018PB-0600090018300','WC','PB',600,900,300,0,0,0),(24,5,'SH102-18PB-0600030018000','SH102','PB',600,300,0,0,0,0),(25,5,'WC105603018PB-0600110018300','WC','PB',600,1100,300,1,1,0),(26,5,'WC90603018PB-0600090018300','WC','PB',600,900,300,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_head`
--

LOCK TABLES `order_head` WRITE;
/*!40000 ALTER TABLE `order_head` DISABLE KEYS */;
INSERT INTO `order_head` VALUES (1,'OC1','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Pantaloons India','4654654','564654','2017-11-01 00:00:00','85000','E001',1,'C',NULL,'25',0),(2,'OC2','H','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'D','T','Edge Turnkey Kitchens','5897','8798','2017-11-01 00:00:00','175000','E002',1,'C',NULL,'12',0),(3,'OC3','SP','EH','NON_PROJECTS','COMPONENTS',2,2,NULL,'R','T','Edge Turnkey','397548','4654567','2017-11-01 00:00:00','95246','E001',1,'C',NULL,'12',0),(4,'OC4','H','EH','NON_PROJECTS','COMPONENTS',1,1,NULL,'T','T','Pantaloon India Interiors','78956','8795','2017-11-08 00:00:00','150000','E001',1,'C',NULL,'10',0),(5,'OC5','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Pantaloon Foundation','498198',NULL,'2017-11-11 00:00:00',NULL,'E001',1,'C',NULL,'10',0),(6,'OC6','H','ECH','NON_PROJECTS','COMPONENTS',1,1,NULL,'D','T','Trial Project','64654','65465465','2017-11-15 00:00:00',NULL,'E001',1,'C',NULL,'5',0);
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
  `gst_number` varchar(100) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_master`
--

LOCK TABLES `party_master` WRITE;
/*!40000 ALTER TABLE `party_master` DISABLE KEYS */;
INSERT INTO `party_master` VALUES (1,'PANT-HYD1','PANTALOON RETAIL INDIA LTD','14021872',NULL,'CDC-HYDERABAD-PUNJAGUTTA A DIVISION','OF P  6-3-676/A/1/A, PUNJAGUTTA','HYDERABAD-500029,Andhra Pradesh',NULL,'Sandeep.More@futuregroup.in','HYDERABAD','465565645','654353453','4534534534','45435345DFE5','28890126394',0),(2,'Edge Turnkey','Edge Turnkey solutions pvt ltd','14022472','MR RAYMOND PATEL :-9820090630','C 1 ,  3 & 4 , Contractor Baug,','Mori Road ,','opp Andhra Bank , Mahim west, Mumbai - 400016',NULL,'mailcarbonspace@gmail.com','MUMBAI','4564435','435345345','3453453453','4534534535','543534534534',0),(3,'ABS','bbhj','GL8756','Kunal','hkinki','jnkjnkj','njk','nkj','njk@gmail.com','njlk','8798798','98798798798','97987987987','98798798798jkbn','kjh87687687kjnbk',0);
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
INSERT INTO `raw_material_master` VALUES (1,'Particle Board','PB',0),(2,'Medium Density Fiber Board','MF',0),(3,'High Density Fiber Board','HF',0),(4,'Supertuff High Density Fiber Board','SHDF',0),(5,'Boiled Water Ply','BW',0),(6,'Supertuff High Density Fiber Board Glossy','SHDFGLOS',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard_carcass_dimension_master`
--

LOCK TABLES `standard_carcass_dimension_master` WRITE;
/*!40000 ALTER TABLE `standard_carcass_dimension_master` DISABLE KEYS */;
INSERT INTO `standard_carcass_dimension_master` VALUES (1,300,'WIDTH','WC',0),(2,400,'WIDTH','WC',0),(3,450,'WIDTH','WC',0),(4,500,'WIDTH','WC',0),(5,600,'WIDTH','WC',0),(6,750,'WIDTH','WC',0),(7,800,'WIDTH','WC',0),(8,900,'WIDTH','WC',0),(9,1050,'WIDTH','WC',0),(10,150,'WIDTH','BC',0),(11,170,'WIDTH','BC',0),(12,200,'WIDTH','BC',0),(13,300,'WIDTH','BC',0),(14,400,'WIDTH','BC',0),(15,450,'WIDTH','BC',0),(16,500,'WIDTH','BC',0),(17,600,'WIDTH','BC',0),(18,750,'WIDTH','BC',0),(19,800,'WIDTH','BC',0),(20,900,'WIDTH','BC',0),(21,1050,'WIDTH','BC',0),(22,1000,'WIDTH','BC',0),(23,450,'WIDTH','TU',0),(24,600,'WIDTH','TU',0),(25,1050,'WIDTH','BB',0),(26,720,'HEIGHT','WC',0),(27,600,'HEIGHT','WC',0),(28,340,'HEIGHT','WC',0),(29,700,'HEIGHT','WC',0),(30,360,'HEIGHT','WC',0),(31,400,'HEIGHT','WC',0),(32,1300,'HEIGHT','WC',0),(33,350,'HEIGHT','WC',0),(34,1120,'HEIGHT','WC',0),(35,300,'HEIGHT','WC',0),(36,1200,'HEIGHT','WC',0),(37,1300,'HEIGHT','WC',0),(38,720,'HEIGHT','BC',0),(39,700,'HEIGHT','BC',0),(40,1260,'HEIGHT','TU',0),(41,1320,'HEIGHT','TU',0),(42,1900,'HEIGHT','TU',0),(43,1920,'HEIGHT','TU',0),(44,2080,'HEIGHT','TU',0),(45,2020,'HEIGHT','TU',0),(46,1960,'HEIGHT','TU',0),(47,320,'DEPTH','WC',0),(48,300,'DEPTH','WC',0),(49,560,'DEPTH','BC',0),(50,400,'DEPTH','BC',0),(51,580,'DEPTH','TU',0),(52,560,'DEPTH','TU',0),(53,560,'DEPTH','BB',0),(54,700,'HEIGHT','BB',0);
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

-- Dump completed on 2017-11-16 13:59:03
