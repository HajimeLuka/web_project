-- DATABASE FOR LOGIN DETAILS FOR USERS
DROP DATABASE IF EXISTS web_app;
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
    is_admin bool DEFAULT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO user VALUES (1, 'HajimeLuka', 'Anne', 'Vu','0476226249','anneliese.vu@outlook.com', '123',1);

-- --------------THIS CODE DOES NOT WORK------------------
-- ADD TO USER TABLE WHEN NEW USER IS CREATED

-- CREATE USER username IDENTIFIED BY pass IDENTIFIED WITH auth_plugin;


-- -- Dumpting data for users
-- SET AUTOCOMMIT=0;
-- INSERT INTO user VALUES
-- ();
-- COMMIT;

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
    event varchar(50) NOT NULL,
    guests SMALLINT UNSIGNED DEFAULT NULL,
    date DATETIME NOT NULL,
    time varchar(40) NOT NULL,
    location varchar(50) NOT NULL,
    category varchar(50) NOT NULL,
    color varchar(50) NOT NULL,

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

