-- DATABASE FOR LOGIN DETAILS FOR USERS

DROP DATABASE IF EXISTS `web_app`;
CREATE DATABASE web_app;
USE web_app;


-- TABLE STRUCTURE FOR USER DETAILS

CREATE TABLE user (
    ID int NOT NULL AUTO_INCREMENT,
    username varchar(50),
    first_name varchar(50),
    last_name varchar(50),
    mobile varchar(10),
    email varchar(100),
    password varchar(50),

    PRIMARY KEY(ID)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO user VALUES (1, 'HajimeLuka', 'Anne', 'Vu','0476226249','anneliese.vu@outlook.com', '123');

-- --------------THIS CODE DOES NOT WORK------------------
-- ADD TO USER TABLE WHEN NEW USER IS CREATED

-- CREATE USER username IDENTIFIED BY pass IDENTIFIED WITH auth_plugin;


-- -- Dumpting data for users
-- SET AUTOCOMMIT=0;
-- INSERT INTO user VALUES
-- ();
-- COMMIT;


DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
    `admin_id` varchar(4) NOT NULL,
    `username` varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    mobile varchar(10) DEFAULT NULL,
    email varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,

    PRIMARY KEY (`admin_id`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- dumpint data for admin details
LOCK TABLES `admin` WRITE;
INSERT INTO `admin` VALUES ('a001','AnnieVuvu','Anneliese','Vu','','anneliese.vu@outlook.com','pAssword'),
('a002','AryoJ','Aryo', 'Javanmard','','aryo.java@gmail.com','pAssword'),
('a003', 'newanimes', 'Kelly', 'Luc', '', 'newanimes@gmail.com', 'pAssword'),
('a004', 'smallbaguette', 'Tsam', 'Wong', '', 'smallbaguette@gmail.com', 'pAssword');
UNLOCK TABLES;


-- table structure for event details
DROP TABLE IF EXISTS `category`;

CREATE TABLE category (
    category_id SMALLINT UNSIGNED NOT NULL,
    categoryName varchar(50),

    PRIMARY KEY (category_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `event_details`;

CREATE TABLE event_details (
    ID int,
    eventID int NOT NULL AUTO_INCREMENT,
    eventName varchar(50) NOT NULL,
    guests SMALLINT UNSIGNED DEFAULT NULL,
    eventDate DATETIME NOT NULL,
    eventTime varchar(40) NOT NULL,
    eventLocation varchar(50) NOT NULL,
    eventCategory varchar(50) NOT NULL,
    eventColour int NOT NULL,

    PRIMARY KEY (eventID),
    FOREIGN KEY (ID) REFERENCES user(ID) ON DELETE CASCADE

)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET AUTOCOMMIT=0;

-- insert default values into category
LOCK TABLES category WRITE;
INSERT INTO category VALUES (1,'Birthday'),
(2,'Work'),
(3,'Casual'),
(4,'Dinner'),
(5,'Lunch'),
(6,'Drinks'),
(7,'Formal'),
(8,'Other');
COMMIT;

UNLOCK TABLES;

