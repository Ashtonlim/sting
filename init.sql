CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;
CREATE TABLE IF NOT EXISTS `accounts` (
    `id` int(11) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`username`, `password`, `email`) VALUES ('test', 'test', 'test@test.com');


INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

INSERT INTO accounts (username, password, email) values ('admin', 'qwe', 'admin@g.com');


IF(EXISTS nodelogin, DROP SCHEMA nodelogin,CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci);


IF(SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'nodelogin', DROP SCHEMA nodelogin)

IF EXISTS (SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'nodelogin')

DROP DATABASE IF EXISTS nodelogin



use testdb

create table Employees (
    id int not null,
    name VARCHAR(25) not null,
    salary int not null,
    managerId int,
    primary key (id)
)

insert into employees (id, name, salary, managerId) values 
(1, 'Joe', 70000, 3), (2, 'Henry', 80000, 4), (3, 'Sam', 60000, NULL), (4, 'Max', 90000, NULL);



use testdb

Select e1.name from employees e1 join employees e2 on e1.managerId = e2.id where e1.salary > e2.salary


use sakila

