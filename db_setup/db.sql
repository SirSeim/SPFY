DROP TABLE IF EXISTS spfy.client;


CREATE TABLE spfy.client (id INT NOT NULL AUTO_INCREMENT, firstName VARCHAR(45), lastName VARCHAR(45), email VARCHAR(45), PRIMARY KEY(id));
INSERT INTO spfy.client (firstName, lastName, email) VALUES ("Bob", "Stevens", "email@email.com");

SELECT * FROM spfy.client;

