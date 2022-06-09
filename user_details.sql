USE user_details;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(63),
  email VARCHAR(127),
  password VARCHAR(255),
  phone VARCHAR(20),
  last_login DATETIME,
  login_ip CHAR(15),
  PRIMARY KEY (id)
)