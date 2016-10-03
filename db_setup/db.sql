/* 
How to use this file:
Make sure you have mysql in terminal first . . . 

brew install mysql

(You will probably have to google how to set up root password and all that stuff)

after installing and configuring mysql through brew . . .
(brew should have told you how to start your mysql server by now)

$ mysql -u <username> -p        --logging into the server,   <username> here is usually root unless you changed it
$ Enter password: <password>

Should open the mysql repl . . .

mysql> show databases;          --Shows all databases
mysql> use [database_name];     --Selects and switches to that database
mysql> show tables;             --Shows all tables in this database only
mysql> describe [table_name];   --Shows table structure (col names, types, nulls allowed, . . .)


How to run the code in this file . . . use "source"
(for some reason I had to provide the absolute path, which means starting from user (~))
(my SPFY repo is on my desktop)

mysql> source ~/Desktop/ComputerScience/SPFY/db_setup/db.sql

To see what changes were made . . .

mysql> SELECT * FROM [table_name];      --need to actually run code from the repl

To exit . . .

mysql> \q
[or]
mysql> exit


Here's a sample runthrough . . .

$ mysql -u root -p
$ Enter password: <password>
mysql> use spfy
mysql> source ~/Desktop/ComputerScience/SPFY/db_setup/db.sql
mysql> SELECT * FROM client;
+----+-----------+----------+-----------------+
| id | firstName | lastName | email           |
+----+-----------+----------+-----------------+
|  1 | Bob       | Stevens  | email@email.com |
+----+-----------+----------+-----------------+
1 row in set (0.00 sec)

mysql>

*/

DROP TABLE IF EXISTS spfy.client;


CREATE TABLE spfy.client (id INT NOT NULL AUTO_INCREMENT, firstName VARCHAR(45), lastName VARCHAR(45), email VARCHAR(45), PRIMARY KEY(id));
INSERT INTO spfy.client (firstName, lastName, email) VALUES ("Bob", "Stevens", "email@email.com");


