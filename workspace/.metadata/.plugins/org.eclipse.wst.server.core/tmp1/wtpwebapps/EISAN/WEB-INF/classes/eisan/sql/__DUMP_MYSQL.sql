CREATE DATABASE  IF NOT EXISTS `we` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `we`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 192.168.1.200    Database: we
-- ------------------------------------------------------
-- Server version	5.6.21-log

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
-- Table structure for table `d_service`
--

DROP TABLE IF EXISTS `d_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `d_service` (
  `id` varchar(30) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `detail` varchar(1000) DEFAULT NULL,
  `strdt` date DEFAULT NULL,
  `enddt` date DEFAULT NULL,
  `wasserverid` varchar(30) DEFAULT NULL,
  `dbserverid` varchar(30) DEFAULT NULL,
  `maxdbsize` int(11) DEFAULT NULL,
  `maxusercnt` int(11) DEFAULT NULL,
  `sesstime` int(11) DEFAULT NULL,
  `trnstime` int(11) DEFAULT NULL,
  `ajaxtime` int(11) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1' COMMENT '1:有効 9:無効',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `d_service`
--

LOCK TABLES `d_service` WRITE;
/*!40000 ALTER TABLE `d_service` DISABLE KEYS */;
INSERT INTO `d_service` VALUES ('svctest','テストサービス','このサービスは、テストのためのサービスです。','2014-10-01','2015-12-31','was1','db1',1,100,60,15,15,'1','2014-10-30 10:00:00','we');
/*!40000 ALTER TABLE `d_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_server`
--

DROP TABLE IF EXISTS `m_server`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_server` (
  `id` varchar(30) NOT NULL,
  `kind` char(1) NOT NULL COMMENT '1:WAS\n2:DB',
  `server` varchar(200) NOT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1' COMMENT '1:有効 9:無効',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_server`
--

LOCK TABLES `m_server` WRITE;
/*!40000 ALTER TABLE `m_server` DISABLE KEYS */;
INSERT INTO `m_server` VALUES ('db1','2','192.168.1.200:3333','1','2014-10-30 00:00:00','we'),('db2','2','192.168.1.201','1','2014-10-30 00:00:00','we'),('was1','1','192.168.1.200','1','2014-10-30 00:00:00','we'),('was2','1','192.168.1.201','1','2014-10-30 00:00:00','we');
/*!40000 ALTER TABLE `m_server` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_auth`
--

DROP TABLE IF EXISTS `tm_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_auth` (
  `id` varchar(30) NOT NULL,
  `kind` char(2) DEFAULT NULL COMMENT '00:プラットフォーム管理者\n10:サービス管理者\n11:画面開発\n12:帳票開発\n20:一般ユーザ\n\n',
  `detail` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_auth`
--

LOCK TABLES `tm_auth` WRITE;
/*!40000 ALTER TABLE `tm_auth` DISABLE KEYS */;
INSERT INTO `tm_auth` VALUES ('サービス管理者','10','サービス管理権限','1','2015-01-01 00:00:00','we'),('プラットフォーム管理者','00','プラットフォーム管理権限','1','2015-01-01 00:00:00','we'),('一般ユーザ','20','一般ユーザ','1','2015-01-01 00:00:00','we'),('帳票開発','12','帳票開発権限','1','2015-01-01 00:00:00','we'),('画面開発','11','画面開発権限','1','2015-01-01 00:00:00','we');
/*!40000 ALTER TABLE `tm_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_calendar`
--

DROP TABLE IF EXISTS `tm_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_calendar` (
  `yyyymmdd` date NOT NULL,
  `kind` char(1) DEFAULT NULL,
  `dayname` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`yyyymmdd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_calendar`
--

LOCK TABLES `tm_calendar` WRITE;
/*!40000 ALTER TABLE `tm_calendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_code`
--

DROP TABLE IF EXISTS `tm_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_code` (
  `group` varchar(30) NOT NULL,
  `kind` varchar(200) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `detail` varchar(300) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`group`,`kind`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_code`
--

LOCK TABLES `tm_code` WRITE;
/*!40000 ALTER TABLE `tm_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_deadline`
--

DROP TABLE IF EXISTS `tm_deadline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_deadline` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `deadlinedttm` datetime DEFAULT NULL,
  `deadlinedispoffset` int(11) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_deadline`
--

LOCK TABLES `tm_deadline` WRITE;
/*!40000 ALTER TABLE `tm_deadline` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_deadline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_menu`
--

DROP TABLE IF EXISTS `tm_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_menu` (
  `id` varchar(30) NOT NULL,
  `kind` char(1) NOT NULL COMMENT '0:Platform',
  `upperid` varchar(30) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `menudispname` varchar(50) DEFAULT NULL,
  `menulevel` int(11) DEFAULT NULL,
  `disporder` int(11) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `authidlist` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_menu`
--

LOCK TABLES `tm_menu` WRITE;
/*!40000 ALTER TABLE `tm_menu` DISABLE KEYS */;
INSERT INTO `tm_menu` VALUES ('D01','0',NULL,'※※画面開発※※','※※画面開発※※',1,100201,NULL,'プラットフォーム管理者;画面開発者','1','2015-01-01 00:00:00','we'),('D0101','0','D01','画面','画面',2,10020101,'_D0101','プラットフォーム管理者;画面開発者','1','2015-01-01 00:00:00','we'),('D0103','0','D01','ロジック','ロジック',2,10020103,'_D0103','プラットフォーム管理者;画面開発者','1','2015-01-01 00:00:00','we'),('D0105','0','D01','SQL','SQL',2,10020105,'_D0105','プラットフォーム管理者;画面開発者','1','2015-01-01 00:00:00','we'),('D0107','0','D01','メッセージ','メッセージ',2,10020107,'_D0107','プラットフォーム管理者;画面開発者','1','2015-01-01 00:00:00','we'),('D02','0',NULL,'※※帳票開発※※','※※帳票開発※※',1,100402,NULL,'プラットフォーム管理者;帳票開発者','1','2015-01-01 00:00:00','we'),('D0201','0','D02','帳票','帳票',2,10040201,'D_000011','プラットフォーム管理者;帳票開発者','1','2015-01-01 00:00:00','we'),('P01','0',NULL,'※※プラットフォーム※※','※※プラットフォーム※※',1,100001,NULL,'プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('P0101','0','P01','サービス管理','サービス管理',2,10000101,NULL,'プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('P010101','0','P0101','サービス運用状況','運用状況',3,1000010101,'P010101','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('P010102','0','P0101','サービス生成','生成',3,1000010102,'P010102','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('P010103','0','P0101','サービス管理','管理',3,1000010103,'P010103','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('R01','3','','帳票一覧','帳票一覧',1,200201,'','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('R0101','3','R01','帳票テスト01','帳票テスト01',2,20020101,'R0101','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S01','1',NULL,'','システム管理',1,300001,NULL,'プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S0101','1','S01','ユーザー管理','ユーザー管理',2,30000101,'S0101','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S0102','1','S01','権限管理','権限管理',2,30000102,'S0102','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S0103','1','S01','画面管理','画面管理',2,30000103,'S0103','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S0104','1','S01','帳票管理','帳票管理',2,30000104,'S0104','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('S0105','1','S01','システムログ','システムログ',2,30000105,'S0105','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('T01','1',NULL,'※※テスト※※','※※テスト※※',1,100601,NULL,'プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('T0101','1','T01','部品テスト','部品テスト',2,10060101,'T0101','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('T0102','1','T02','テーブルテスト','テーブルテスト',2,10060102,'T0102','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('V01','2',NULL,'メニュー一覧','メニュー一覧',1,200001,'','プラットフォーム管理者','1','2015-01-01 00:00:00','we'),('V0101','2','V01','画面テスト01','画面テスト01',2,20000101,'V0101','プラットフォーム管理者','1','2015-01-01 00:00:00','we');
/*!40000 ALTER TABLE `tm_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_message`
--

DROP TABLE IF EXISTS `tm_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_message` (
  `id` varchar(30) NOT NULL,
  `kind` char(1) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_message`
--

LOCK TABLES `tm_message` WRITE;
/*!40000 ALTER TABLE `tm_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_org`
--

DROP TABLE IF EXISTS `tm_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_org` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `strdt` date DEFAULT NULL,
  `enddt` date DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1' COMMENT '1:有効 9:無効',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_org`
--

LOCK TABLES `tm_org` WRITE;
/*!40000 ALTER TABLE `tm_org` DISABLE KEYS */;
INSERT INTO `tm_org` VALUES ('etc','その他','2014-01-01',NULL,'1','2015-01-01 00:00:00','we'),('s001','プラットフォーム管理','2014-01-01',NULL,'1','2015-01-01 00:00:00','we'),('s002','サービス管理','2014-01-01',NULL,'1','2015-01-01 00:00:00','we');
/*!40000 ALTER TABLE `tm_org` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_postnumber`
--

DROP TABLE IF EXISTS `tm_postnumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_postnumber` (
  `postnumber` varchar(20) NOT NULL,
  `addr1_type1` varchar(200) DEFAULT NULL,
  `addr2_type1` varchar(200) DEFAULT NULL,
  `addr3_type1` varchar(200) DEFAULT NULL,
  `addr1_type2` varchar(200) DEFAULT NULL,
  `addr2_type2` varchar(200) DEFAULT NULL,
  `addr3_type2` varchar(200) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`postnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_postnumber`
--

LOCK TABLES `tm_postnumber` WRITE;
/*!40000 ALTER TABLE `tm_postnumber` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_postnumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_reporttblinfo`
--

DROP TABLE IF EXISTS `tm_reporttblinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_reporttblinfo` (
  `tblname` varchar(100) NOT NULL,
  `colname` varchar(200) NOT NULL,
  `colkey` char(1) DEFAULT NULL COMMENT '1:Primary Key',
  `isnull` varchar(3) DEFAULT NULL COMMENT 'YES:NULL OK\nNO:NULL NG',
  `datatype` varchar(30) DEFAULT NULL,
  `maxlength` int(11) DEFAULT NULL,
  `authidlist` varchar(1000) DEFAULT NULL,
  `tbldispname` varchar(100) DEFAULT NULL,
  `coldispname` varchar(200) DEFAULT NULL,
  `disporder` int(11) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`tblname`,`colname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_reporttblinfo`
--

LOCK TABLES `tm_reporttblinfo` WRITE;
/*!40000 ALTER TABLE `tm_reporttblinfo` DISABLE KEYS */;
INSERT INTO `tm_reporttblinfo` VALUES ('d_service','ajaxtime','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','AJAXタイム',NULL,'1',NULL,NULL),('d_service','dbserverid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','WEサービス情報','DBサーバーID',NULL,'1',NULL,NULL),('d_service','delfg','','NO','char',1,'プラットフォーム管理者;帳票開発者','WEサービス情報','削除フラグ',NULL,'1',NULL,NULL),('d_service','detail','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','WEサービス情報','詳細',NULL,'1',NULL,NULL),('d_service','enddt','','YES','date',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','終了日付',NULL,'1',NULL,NULL),('d_service','id','1','NO','varchar',30,'プラットフォーム管理者;帳票開発者','WEサービス情報','ID',NULL,'1',NULL,NULL),('d_service','maxdbsize','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','DB最大サイズ',NULL,'1',NULL,NULL),('d_service','maxusercnt','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','ユーザー最大数',NULL,'1',NULL,NULL),('d_service','name','','YES','varchar',100,'プラットフォーム管理者;帳票開発者','WEサービス情報','名称',NULL,'1',NULL,NULL),('d_service','sesstime','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','セッションタイム',NULL,'1',NULL,NULL),('d_service','strdt','','YES','date',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','開始日付',NULL,'1',NULL,NULL),('d_service','trnstime','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','TRANSATIONタイム',NULL,'1',NULL,NULL),('d_service','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','WEサービス情報','更新日時',NULL,'1',NULL,NULL),('d_service','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','WEサービス情報','更新者ID',NULL,'1',NULL,NULL),('d_service','wasserverid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','WEサービス情報','WASサーバーID',NULL,'1',NULL,NULL),('m_server','delfg','','NO','char',1,'プラットフォーム管理者;帳票開発者','WEサーバー情報','削除フラグ',NULL,'1',NULL,NULL),('m_server','id','1','NO','varchar',30,'プラットフォーム管理者;帳票開発者','WEサーバー情報','ID',NULL,'1',NULL,NULL),('m_server','kind','','NO','char',1,'プラットフォーム管理者;帳票開発者','WEサーバー情報','種類',NULL,'1',NULL,NULL),('m_server','server','','NO','varchar',200,'プラットフォーム管理者;帳票開発者','WEサーバー情報','サーバー',NULL,'1',NULL,NULL),('m_server','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','WEサーバー情報','更新日時',NULL,'1',NULL,NULL),('m_server','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','WEサーバー情報','更新者ID',NULL,'1',NULL,NULL),('tm_auth','delfg','','NO','char',1,'プラットフォーム管理者;帳票開発者','権限マスター','削除フラグ',NULL,'1',NULL,NULL),('tm_auth','detail','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','権限マスター','詳細',NULL,'1',NULL,NULL),('tm_auth','id','1','NO','varchar',30,'プラットフォーム管理者;帳票開発者','権限マスター','ID',NULL,'1',NULL,NULL),('tm_auth','kind','','YES','char',2,'プラットフォーム管理者;帳票開発者','権限マスター','種類',NULL,'1',NULL,NULL),('tm_auth','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','権限マスター','更新日時',NULL,'1',NULL,NULL),('tm_auth','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','権限マスター','更新者ID',NULL,'1',NULL,NULL),('tm_menu','authidlist','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','メニューマスター','権限IDリスト',NULL,'1',NULL,NULL),('tm_menu','delfg','','NO','char',1,'プラットフォーム管理者;帳票開発者','メニューマスター','削除フラグ',NULL,'1',NULL,NULL),('tm_menu','disporder','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','メニューマスター','表示順',NULL,'1',NULL,NULL),('tm_menu','id','1','NO','varchar',30,'プラットフォーム管理者;帳票開発者','メニューマスター','ID',NULL,'1',NULL,NULL),('tm_menu','kind','','NO','char',1,'プラットフォーム管理者;帳票開発者','メニューマスター','種類',NULL,'1',NULL,NULL),('tm_menu','menudispname','','YES','varchar',50,'プラットフォーム管理者;帳票開発者','メニューマスター','メニュー表示名',NULL,'1',NULL,NULL),('tm_menu','menulevel','','YES','int',NULL,'プラットフォーム管理者;帳票開発者','メニューマスター','メニューレベル',NULL,'1',NULL,NULL),('tm_menu','name','','YES','varchar',50,'プラットフォーム管理者;帳票開発者','メニューマスター','名称',NULL,'1',NULL,NULL),('tm_menu','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','メニューマスター','更新日時',NULL,'1',NULL,NULL),('tm_menu','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','メニューマスター','更新者ID',NULL,'1',NULL,NULL),('tm_menu','upperid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','メニューマスター','上位メニューID',NULL,'1',NULL,NULL),('tm_menu','url','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','メニューマスター','URL',NULL,'1',NULL,NULL),('tm_user','authidlist','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','ユーザーマスター','権限IDリスト',NULL,'1',NULL,NULL),('tm_user','delfg','','NO','char',1,'プラットフォーム管理者;帳票開発者','ユーザーマスター','削除フラグ',NULL,'1',NULL,NULL),('tm_user','enddt','','YES','date',NULL,'プラットフォーム管理者;帳票開発者','ユーザーマスター','終了日付',NULL,'1',NULL,NULL),('tm_user','id','1','NO','varchar',30,'プラットフォーム管理者;帳票開発者','ユーザーマスター','ID',NULL,'1',NULL,NULL),('tm_user','mailaddr','','YES','varchar',100,'プラットフォーム管理者;帳票開発者','ユーザーマスター','メールアドレス',NULL,'1',NULL,NULL),('tm_user','name','','YES','varchar',50,'プラットフォーム管理者;帳票開発者','ユーザーマスター','名前',NULL,'1',NULL,NULL),('tm_user','orgid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','ユーザーマスター','組織ID',NULL,'1',NULL,NULL),('tm_user','password','','YES','varchar',20,'プラットフォーム管理者;帳票開発者','ユーザーマスター','パスワード',NULL,'1',NULL,NULL),('tm_user','strdt','','YES','date',NULL,'プラットフォーム管理者;帳票開発者','ユーザーマスター','開始日付',NULL,'1',NULL,NULL),('tm_user','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','ユーザーマスター','更新日時',NULL,'1',NULL,NULL),('tm_user','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','ユーザーマスター','更新者ID',NULL,'1',NULL,NULL),('ts_log','kind','','YES','char',1,'プラットフォーム管理者;帳票開発者','システムログ','ログ種類',NULL,'1',NULL,NULL),('ts_log','log','','YES','varchar',1000,'プラットフォーム管理者;帳票開発者','システムログ','ログ情報',NULL,'1',NULL,NULL),('ts_log','seq','1','NO','int',NULL,'プラットフォーム管理者;帳票開発者','システムログ','SEQ',NULL,'1',NULL,NULL),('ts_log','upddttm','','YES','datetime',NULL,'プラットフォーム管理者;帳票開発者','システムログ','更新日時',NULL,'1',NULL,NULL),('ts_log','updid','','YES','varchar',30,'プラットフォーム管理者;帳票開発者','システムログ','更新者ID',NULL,'1',NULL,NULL);
/*!40000 ALTER TABLE `tm_reporttblinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_user`
--

DROP TABLE IF EXISTS `tm_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_user` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `orgid` varchar(30) DEFAULT NULL COMMENT 'tm_org.id',
  `mailaddr` varchar(100) DEFAULT NULL,
  `strdt` date DEFAULT NULL,
  `enddt` date DEFAULT NULL,
  `authidlist` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1' COMMENT '1:有効 9:無効',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_user`
--

LOCK TABLES `tm_user` WRITE;
/*!40000 ALTER TABLE `tm_user` DISABLE KEYS */;
INSERT INTO `tm_user` VALUES ('dvpreport1','帳票開発者','dvpreport1','s002','dvpreport1.we@gmail.com','2014-01-01',NULL,'帳票開発;一般ユーザ','1','2015-01-01 00:00:00','we'),('dvpview1','画面開発者','dvpview1','s002','dvpview1.we@gmail.com','2014-01-01',NULL,'画面開発;一般ユーザ','1','2015-01-01 00:00:00','we'),('svcadmin1','サービス管理者','svcadmin1','s002','svcadmin1.we@gmail.com','2014-01-01',NULL,'サービス管理者;画面開発;帳票開発;一般ユーザ','1','2015-01-01 00:00:00','we'),('svcuser1','一般ユーザ','svcuser1','etc','svcuser1.we@gmail.com','2014-01-01','2014-12-31','一般ユーザ','1','2015-01-01 00:00:00','we'),('we','プラットフォーム管理者','we','s001','we.we@gmail.com','2014-01-01',NULL,'プラットフォーム管理者;サービス管理者;画面開発;帳票開発;一般ユーザ','1','2015-01-01 00:00:00','we');
/*!40000 ALTER TABLE `tm_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_usergroup`
--

DROP TABLE IF EXISTS `tm_usergroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_usergroup` (
  `id` varchar(30) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `kind` char(1) DEFAULT NULL,
  `disporder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_usergroup`
--

LOCK TABLES `tm_usergroup` WRITE;
/*!40000 ALTER TABLE `tm_usergroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_usergroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_usergroupmember`
--

DROP TABLE IF EXISTS `tm_usergroupmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_usergroupmember` (
  `usergroupid` varchar(30) NOT NULL,
  `userid` varchar(30) NOT NULL,
  PRIMARY KEY (`usergroupid`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_usergroupmember`
--

LOCK TABLES `tm_usergroupmember` WRITE;
/*!40000 ALTER TABLE `tm_usergroupmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_usergroupmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_board`
--

DROP TABLE IF EXISTS `tp_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_board` (
  `seq` int(11) NOT NULL,
  `kind` char(1) DEFAULT NULL,
  `openstrdt` date DEFAULT NULL,
  `openenddt` date DEFAULT NULL,
  `orgid` varchar(30) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `contents` varchar(4000) DEFAULT NULL,
  `attachfile01` varchar(300) DEFAULT NULL,
  `attachfile02` varchar(300) DEFAULT NULL,
  `attachfile03` varchar(300) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_board`
--

LOCK TABLES `tp_board` WRITE;
/*!40000 ALTER TABLE `tp_board` DISABLE KEYS */;
INSERT INTO `tp_board` VALUES (1,NULL,NULL,NULL,NULL,'123456798','hjhfjfhjfhjfhj',NULL,NULL,NULL,'1',NULL,NULL),(3,NULL,NULL,NULL,'123','fwewegergfsgsfdgsdfgsdfgsdfs','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(4,NULL,NULL,NULL,NULL,'123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(5,NULL,NULL,NULL,'111','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(6,NULL,NULL,NULL,NULL,'123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(7,NULL,NULL,NULL,'222','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(8,NULL,NULL,NULL,'eee','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(9,NULL,NULL,NULL,'ooo','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(10,NULL,NULL,NULL,'99','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(11,NULL,NULL,NULL,'99','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(12,NULL,NULL,NULL,'99','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(13,NULL,NULL,NULL,'99','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(14,NULL,NULL,NULL,'aaa','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(15,NULL,NULL,NULL,'aaa','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(16,NULL,NULL,NULL,'aaa','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(17,NULL,NULL,NULL,'qqq','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(18,NULL,NULL,NULL,'ccc','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(19,NULL,NULL,NULL,'ccc','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(20,NULL,NULL,NULL,'ccc','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(21,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(22,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(23,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(24,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(25,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(26,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(27,NULL,NULL,NULL,'hhh','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(28,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(29,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(30,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(31,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(32,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(33,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(34,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(35,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(36,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(37,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(38,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(39,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(40,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(41,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(42,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(43,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(44,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(45,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(46,NULL,NULL,NULL,'nnn','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(47,NULL,NULL,NULL,'dada','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(48,NULL,NULL,NULL,'dada','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(49,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(50,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(51,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(52,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(53,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(54,NULL,NULL,NULL,'ggg','123456798','2354352gfsgsfd',NULL,NULL,NULL,'1',NULL,NULL),(55,NULL,NULL,NULL,'www','235234234234234','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(56,NULL,NULL,NULL,'www','adfadfadfadfadfdgg3334343','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(57,NULL,NULL,NULL,'www','adfadfadfadfadfdgg3334343','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(58,NULL,NULL,NULL,'www','adfadfadfadfadfdgg3334343','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(59,NULL,NULL,NULL,'www','adfadfadfadfadfdgg3334343','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(60,NULL,NULL,NULL,'김광일','adfadfadfadfadfdgg3334343','34235t33g3g3',NULL,NULL,NULL,'1',NULL,NULL),(61,NULL,NULL,NULL,'金光一','おはよう','おはよう。よろしくね。\n',NULL,NULL,NULL,'1',NULL,NULL),(62,NULL,NULL,NULL,'金光一','ありがとう','ありがとう。',NULL,NULL,NULL,'1',NULL,NULL),(63,NULL,NULL,NULL,'2323423','errqerqewr','dfagaeafefadfadfa',NULL,NULL,NULL,'1',NULL,NULL),(64,NULL,NULL,NULL,'김광일','ㅇㅁㄻㅎㅎ','78453132132',NULL,NULL,NULL,'1',NULL,NULL);
/*!40000 ALTER TABLE `tp_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_boardcomment`
--

DROP TABLE IF EXISTS `tp_boardcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_boardcomment` (
  `boardseq` int(11) NOT NULL COMMENT 'tp_board.seq',
  `commentseq` int(11) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`boardseq`,`commentseq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_boardcomment`
--

LOCK TABLES `tp_boardcomment` WRITE;
/*!40000 ALTER TABLE `tp_boardcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_boardcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_boardread`
--

DROP TABLE IF EXISTS `tp_boardread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_boardread` (
  `boardseq` int(11) NOT NULL,
  `readuserid` varchar(30) NOT NULL,
  `readdttm` datetime DEFAULT NULL,
  PRIMARY KEY (`boardseq`,`readuserid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_boardread`
--

LOCK TABLES `tp_boardread` WRITE;
/*!40000 ALTER TABLE `tp_boardread` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_boardread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_chat`
--

DROP TABLE IF EXISTS `tp_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_chat` (
  `seq` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `curcontentsseq` int(11) DEFAULT NULL,
  `makedttm` datetime DEFAULT NULL,
  `makeuserid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_chat`
--

LOCK TABLES `tp_chat` WRITE;
/*!40000 ALTER TABLE `tp_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_chatcontents`
--

DROP TABLE IF EXISTS `tp_chatcontents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_chatcontents` (
  `chatseq` int(11) NOT NULL,
  `contentsseq` int(11) NOT NULL,
  `contents` varchar(300) DEFAULT NULL,
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`chatseq`,`contentsseq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_chatcontents`
--

LOCK TABLES `tp_chatcontents` WRITE;
/*!40000 ALTER TABLE `tp_chatcontents` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_chatcontents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_chatmember`
--

DROP TABLE IF EXISTS `tp_chatmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_chatmember` (
  `chatseq` int(11) NOT NULL,
  `userid` varchar(30) NOT NULL,
  `readendcontentsseq` int(11) DEFAULT NULL,
  PRIMARY KEY (`chatseq`,`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_chatmember`
--

LOCK TABLES `tp_chatmember` WRITE;
/*!40000 ALTER TABLE `tp_chatmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_chatmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_mail`
--

DROP TABLE IF EXISTS `tp_mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_mail` (
  `seq` int(11) NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `contents` mediumtext,
  `senddttm` datetime DEFAULT NULL,
  `senduserid` varchar(30) DEFAULT NULL,
  `attachfile01` varchar(300) DEFAULT NULL,
  `attachfile02` varchar(300) DEFAULT NULL,
  `attachfile03` varchar(300) DEFAULT NULL,
  `attachfile04` varchar(300) DEFAULT NULL,
  `attachfile05` varchar(300) DEFAULT NULL,
  `attachfile06` varchar(300) DEFAULT NULL,
  `attachfile07` varchar(300) DEFAULT NULL,
  `attachfile08` varchar(300) DEFAULT NULL,
  `attachfile09` varchar(300) DEFAULT NULL,
  `attachfile10` varchar(300) DEFAULT NULL,
  `uppermailseq` int(11) DEFAULT NULL,
  `dispst` char(1) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_mail`
--

LOCK TABLES `tp_mail` WRITE;
/*!40000 ALTER TABLE `tp_mail` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_maildest`
--

DROP TABLE IF EXISTS `tp_maildest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_maildest` (
  `mailseq` int(11) NOT NULL,
  `destuserid` varchar(30) NOT NULL,
  `destkind` char(1) NOT NULL COMMENT '1:宛先 2:CC 3:BCC',
  `readst` char(1) DEFAULT NULL COMMENT '1:閲覧前 2:閲覧済',
  `readdttm` datetime DEFAULT NULL,
  `dispst` char(1) DEFAULT NULL COMMENT '1:表示 9:非表示',
  PRIMARY KEY (`mailseq`,`destuserid`,`destkind`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_maildest`
--

LOCK TABLES `tp_maildest` WRITE;
/*!40000 ALTER TABLE `tp_maildest` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_maildest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_wf`
--

DROP TABLE IF EXISTS `tp_wf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_wf` (
  `seq` int(11) NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `wfdefid` varchar(30) DEFAULT NULL,
  `contents` varchar(4000) DEFAULT NULL,
  `makedttm` datetime DEFAULT NULL,
  `makeuserid` varchar(30) DEFAULT NULL,
  `prcsdttm` datetime DEFAULT NULL,
  `prcsuserid` varchar(30) DEFAULT NULL,
  `attachfile01` varchar(300) DEFAULT NULL,
  `attachfile02` varchar(300) DEFAULT NULL,
  `attachfile03` varchar(300) DEFAULT NULL,
  `curapprvcnt` int(11) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_wf`
--

LOCK TABLES `tp_wf` WRITE;
/*!40000 ALTER TABLE `tp_wf` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_wf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_wfdef`
--

DROP TABLE IF EXISTS `tp_wfdef`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_wfdef` (
  `id` varchar(30) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `htmlname` varchar(100) DEFAULT NULL,
  `apprvmax` int(11) DEFAULT NULL,
  `prcsuserid` varchar(30) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_wfdef`
--

LOCK TABLES `tp_wfdef` WRITE;
/*!40000 ALTER TABLE `tp_wfdef` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_wfdef` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_wfdefapprv`
--

DROP TABLE IF EXISTS `tp_wfdefapprv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_wfdefapprv` (
  `wfdefid` varchar(30) NOT NULL,
  `apprvlevel` int(11) NOT NULL,
  `apprvuserkind` char(1) DEFAULT NULL,
  `apprvuserid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`wfdefid`,`apprvlevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_wfdefapprv`
--

LOCK TABLES `tp_wfdefapprv` WRITE;
/*!40000 ALTER TABLE `tp_wfdefapprv` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_wfdefapprv` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tp_wfst`
--

DROP TABLE IF EXISTS `tp_wfst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tp_wfst` (
  `wfseq` int(11) NOT NULL,
  `apprvcnt` int(11) NOT NULL,
  `apprvst` char(1) DEFAULT NULL,
  `apprvuserid` varchar(30) DEFAULT NULL,
  `apprvdttm` datetime DEFAULT NULL,
  `apprvcomments` varchar(300) DEFAULT NULL,
  `defapprvuserid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`wfseq`,`apprvcnt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tp_wfst`
--

LOCK TABLES `tp_wfst` WRITE;
/*!40000 ALTER TABLE `tp_wfst` DISABLE KEYS */;
/*!40000 ALTER TABLE `tp_wfst` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ts_log`
--

DROP TABLE IF EXISTS `ts_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ts_log` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `kind` char(1) DEFAULT NULL,
  `log` varchar(1000) DEFAULT NULL,
  `menuid` varchar(30) DEFAULT NULL,
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_log`
--

LOCK TABLES `ts_log` WRITE;
/*!40000 ALTER TABLE `ts_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `ts_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ts_schedule`
--

DROP TABLE IF EXISTS `ts_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ts_schedule` (
  `yyyymmdd` date NOT NULL,
  `prcstm` char(4) NOT NULL,
  `prcskind` char(1) NOT NULL,
  `prcsst` char(1) DEFAULT NULL,
  `prcslog` varchar(1000) DEFAULT NULL,
  `delfg` char(1) NOT NULL DEFAULT '1',
  `upddttm` datetime DEFAULT NULL,
  `updid` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`yyyymmdd`,`prcstm`,`prcskind`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ts_schedule`
--

LOCK TABLES `ts_schedule` WRITE;
/*!40000 ALTER TABLE `ts_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `ts_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'we'
--
/*!50003 DROP FUNCTION IF EXISTS `chkAuth` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`we`@`%` FUNCTION `chkAuth`(
    prmUserId varchar(30)
    ,prmAuthIdList varchar(1000)
) RETURNS varchar(1) CHARSET utf8
BEGIN

    /*
    --  ユーザー権限とパラメータ権限リストチェック関数
    -- Copyright(C) SmartERP by WE
    -- 【PARAM】
    --  (varchar)prmUserId：ユーザーID
    --  (varchar)prmAuthIdList：権限IDリスト
    -- 【RETURN】
    --  (varchar)権限有無('0':権限なし '1'：権限あり)
    --  [変更履歴]
    --  Rev.1.0 2015/01/08 HJ.Kong 初版
    */

    -- 変数宣言
    DECLARE rtn varchar(1);                -- 戻り値
    DECLARE userAuthIdList varchar(1000);  -- ユーザー権限IDリスト
    DECLARE cntChkRsltAuth int;            -- 権限INTERSECT結果数
    DECLARE temp int;
    
    -- 変数初期化
    SET rtn = '1';                         -- 権限あり
    
    -- ユーザー権限IDリスト取得
    SET userAuthIdList = (select authidlist from tm_user where id = prmUserId and delfg = '1');
    
    -- パラメータがNULL又はユーザー権限IDリストの場合、権限なし
    IF prmUserId is null OR prmUserId = '' OR prmAuthIdList is null OR prmAuthIdList = '' OR userAuthIdList is null THEN
        SET rtn = '0';
	ELSE
        -- ユーザー権限リストとパラメータ権限リストが一致する数取得（0：一致するものがない）
        SET temp = utilSplit1(userAuthIdList, ';');
        SET temp = utilSplit2(prmAuthIdList, ';');
        SET cntChkRsltAuth = (
            select count(*) from temp_utilSplit_table1 a
            where exists(select 1 from temp_utilSplit_table2 b where b.splitString <=> a.splitString)
        );
        IF cntChkRsltAuth = 0 THEN
            SET rtn = '0';
		ELSE
            SET rtn = '1';
		END IF;
    END IF;

RETURN rtn;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `utilSplit1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`we`@`%` FUNCTION `utilSplit1`(
    prmStringList varchar(8000)
    ,prmStringPunc varchar(1)
) RETURNS int(11)
BEGIN

    /*
    --  文字列Split関数
    -- Copyright(C) SmartERP by WE
    -- 【PARAM】
    --  (varchar)prmStringList：分割対象の文字列
    --  (varchar)prmStringPunc：区切り文字列
    -- 【RETURN】
    --  temp_utilSplit_table1(コネクションで有効)
    --  (TABLE int)    行番号
    --  (TABLE varchar)分割した文字列
    --  [変更履歴]
    --  Rev.1.0 2015/01/08 HJ.Kong 初版
    */

    -- 変数宣言
    DECLARE end_flg int;             -- 終了フラグ
    DECLARE sel_value varchar(8000); -- 作業中文字列
    DECLARE i int;                   -- インデックス
    DECLARE j int;                   -- インデックス
    DECLARE rownum int;              -- 行番号

    -- 変数初期化
    SET end_flg = 0;
    SET i = 0;
    SET j = 0;
    SET rownum = 1;

    -- temp_utilSplit_table1 DROP CREATE
    DROP TEMPORARY TABLE IF EXISTS temp_utilSplit_table1;
    CREATE TEMPORARY TABLE temp_utilSplit_table1(
        rowNum INT
        ,splitString VARCHAR(100)
    ) ENGINE=Memory;

    -- データ設定
    SET sel_value = prmStringList;
    WHILE end_flg = 0 do
        SET sel_value = substring(sel_value, i + 1, length(sel_value) - i);
        SET i = locate(prmStringPunc, sel_value);
        IF i = 0 THEN
            SET end_flg = 1;
        ELSE
            insert into temp_utilSplit_table1(rowNum, splitString)
                select rownum, substring(sel_value, 1, i-1) as splitString;
            SET j = j + 1;
            SET rownum = rownum + 1;
        END IF;
    END WHILE;

    -- 最後のデータ設定
    IF sel_value != '' THEN
        insert into temp_utilSplit_table1(rowNum, splitString)
            select rownum, sel_value as splitString;
    END IF;

RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `utilSplit2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`we`@`%` FUNCTION `utilSplit2`(
    prmStringList varchar(8000)
    ,prmStringPunc varchar(1)
) RETURNS int(11)
BEGIN

    /*
    --  文字列Split関数
    -- Copyright(C) SmartERP by WE
    -- 【PARAM】
    --  (varchar)prmStringList：分割対象の文字列
    --  (varchar)prmStringPunc：区切り文字列
    -- 【RETURN】
    --  temp_utilSplit_table2(コネクションで有効)
    --  (TABLE int)    行番号
    --  (TABLE varchar)分割した文字列
    --  [変更履歴]
    --  Rev.1.0 2015/01/08 HJ.Kong 初版
    */

    -- 変数宣言
    DECLARE end_flg int;             -- 終了フラグ
    DECLARE sel_value varchar(8000); -- 作業中文字列
    DECLARE i int;                   -- インデックス
    DECLARE j int;                   -- インデックス
    DECLARE rownum int;              -- 行番号

    -- 変数初期化
    SET end_flg = 0;
    SET i = 0;
    SET j = 0;
    SET rownum = 1;

    -- temp_utilSplit_table2 DROP CREATE
    DROP TEMPORARY TABLE IF EXISTS temp_utilSplit_table2;
    CREATE TEMPORARY TABLE temp_utilSplit_table2(
        rowNum INT
        ,splitString VARCHAR(100)
    ) ENGINE=Memory;

    -- データ設定
    SET sel_value = prmStringList;
    WHILE end_flg = 0 do
        SET sel_value = substring(sel_value, i + 1, length(sel_value) - i);
        SET i = locate(prmStringPunc, sel_value);
        IF i = 0 THEN
            SET end_flg = 1;
        ELSE
            insert into temp_utilSplit_table2(rowNum, splitString)
                select rownum, substring(sel_value, 1, i-1) as splitString;
            SET j = j + 1;
            SET rownum = rownum + 1;
        END IF;
    END WHILE;

    -- 最後のデータ設定
    IF sel_value != '' THEN
        insert into temp_utilSplit_table2(rowNum, splitString)
            select rownum, sel_value as splitString;
    END IF;

RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-16 14:58:11
