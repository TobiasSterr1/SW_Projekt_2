CREATE DATABASE  IF NOT EXISTS `swiftboarddb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `swiftboarddb`;

-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: swiftboarddb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `points` int NOT NULL,
  `person_id` int NOT NULL,
  `project_id` int NOT NULL,
  `phase_id` int NOT NULL,
  `starts_at` date DEFAULT NULL,
  `ends_at` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `project_id` (`project_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`),
  CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `cards_ibfk_3` FOREIGN KEY (`phase_id`) REFERENCES `phases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `card_id` int NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `google_id` (`google_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'linaül268','lina','müller','linamüller668@swiftboard.de','9EXJSTBAUZQ8APIUG2TPW6DEBA','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(2,'linach969','lina','schmidt','linaschmidt488@swiftboard.de','3NDTTJ8QS3B7H3LG2S49QCU3IN','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(3,'linach256','lina','schneider','linaschneider503@swiftboard.de','Z5BF5MWBB0J1W3ULNWR3KNFB0U','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(4,'linais185','lina','fischer','linafischer389@swiftboard.de','O6T185Q3S34MRWJ6O5S9Z2Z7BY','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(5,'emmaül796','emma','müller','emmamüller441@swiftboard.de','J0MUVE9VHHHS83ML4V7GO7TV2B','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(6,'emmach566','emma','schmidt','emmaschmidt85@swiftboard.de','R4LYLPNLZH3C7MU5KAYH8NZGQ7','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(7,'emmach925','emma','schneider','emmaschneider893@swiftboard.de','B9GQS8LJ8ECALFFKHEPWY7QTUW','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(8,'emmais232','emma','fischer','emmafischer481@swiftboard.de','APAIOSR25THSGXPRE5DXLCOD72','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(9,'emiliaül958','emilia','müller','emiliamüller348@swiftboard.de','AEGNLGUINCYJXTS7XJXCRVPJX5','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(10,'emiliach574','emilia','schmidt','emiliaschmidt346@swiftboard.de','5KNVJCE5YB4AUHTAZVTV9PTAWP','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(11,'emiliach663','emilia','schneider','emiliaschneider96@swiftboard.de','PPPMN8PC5528RHET5DYFU78Q3W','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(12,'emiliais337','emilia','fischer','emiliafischer178@swiftboard.de','D1HHGE09ZG0PNCX8J2T2N6AEQY','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(13,'lauraül724','laura','müller','lauramüller827@swiftboard.de','PNQG6Y7GVREAMBNLC1HGLTQVTI','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(14,'laurach75','laura','schmidt','lauraschmidt605@swiftboard.de','VXR7AW73BVUS1RSMGHLZMXIJS9','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(15,'laurach533','laura','schneider','lauraschneider493@swiftboard.de','LXFYZPAPT8HVIBI1K9NF0R8AXR','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(16,'laurais773','laura','fischer','laurafischer205@swiftboard.de','D7NK8WCS5XMKN9RJULCXATRX09','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(17,'leaül23','lea','müller','leamüller891@swiftboard.de','QZ9B75C6M21Q0015V7EG5DL9V1','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(18,'leach330','lea','schmidt','leaschmidt858@swiftboard.de','PTN6NB1V8XHSKKZ1HGLA2W4OTF','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(19,'leach128','lea','schneider','leaschneider370@swiftboard.de','BMPNYLJR3WPGVMK76A736NCCJR','','2024-01-02 18:39:35','2024-01-02 18:39:35'),(20,'leais246','lea','fischer','leafischer587@swiftboard.de','39Q5P78CTCIIVC1XUQEUG324JM','','2024-01-02 18:39:35','2024-01-02 18:39:35');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phases`
--

DROP TABLE IF EXISTS `phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `last_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phases`
--

LOCK TABLES `phases` WRITE;
/*!40000 ALTER TABLE `phases` DISABLE KEYS */;
INSERT INTO `phases` VALUES (1,'Todo','Aufgaben, die noch angefangen wurde.','2024-01-02 18:39:35','2024-01-02 18:39:35'),(2,'Doing','Aufgaben, die gerade bearbeitet werden.','2024-01-02 18:39:35','2024-01-02 18:39:35'),(3,'Done','Aufgaben, die schon erledigt wurden.','2024-01-02 18:39:35','2024-01-02 18:39:35');
/*!40000 ALTER TABLE `phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_persons`
--

DROP TABLE IF EXISTS `project_persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_persons` (
  `project_id` int NOT NULL,
  `person_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`person_id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `project_persons_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_persons_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_persons`
--

LOCK TABLES `project_persons` WRITE;
/*!40000 ALTER TABLE `project_persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_phases`
--

DROP TABLE IF EXISTS `project_phases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_phases` (
  `project_id` int NOT NULL,
  `phase_id` int NOT NULL,
  `rank` int NOT NULL,
  PRIMARY KEY (`project_id`,`phase_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `project_phases_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `project_phases_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phases` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_phases`
--

LOCK TABLES `project_phases` WRITE;
/*!40000 ALTER TABLE `project_phases` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_phases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `person_id` int NOT NULL,
  `starts_at` date NOT NULL,
  `ends_at` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-02 19:41:53