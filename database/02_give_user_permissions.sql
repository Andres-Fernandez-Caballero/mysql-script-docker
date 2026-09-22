CREATE USER IF NOT EXISTS 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

SELECT User, Host FROM mysql.user WHERE User = 'myuser';
SHOW GRANTS FOR 'myuser'@'%';