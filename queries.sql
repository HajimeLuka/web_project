
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

SELECT * FROM user WHERE username = ? AND password = ? AND is_admin = ?;

SELECT * FROM user WHERE username = ?;

INSERT INTO user (username, first_name, last_name, mobile, email, password, is_admin) VALUES (?, ?, ?, ?, ?, ?, 0);

UPDATE user SET is_admin = 1 WHERE ID = ?;

UPDATE user SET password = ? WHERE ID = ?;

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

INSERT INTO event_details (event, guests, date, time, location, category, color) VALUES (?, ?, ?, ?, ?, ?, ?);