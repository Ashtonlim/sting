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

select * FROM first_table

insert into first_table values 
(1, 'test', 'text', NOW()), (2, 'test2', 'text', NOW()), (3, 'test3', 'text', NOW()), 
(4, 'test1', 'text4', NOW()), (5, 'test22', 'text3', NOW()), (6, 'test3', 'text3', NOW())

delete * from first_table left join (SELECT MIN(ft_id) AS min_ft_id
    FROM first_table
    GROUP BY my_text) as min_ids on first_table.ft_id = min_ids.min_ft_id where min_ft_id is null

Select * from first_table where ft_id not in (select A.* from (select min(ft_id) from first_table group by my_text) as A
)

select A.* from (select min(ft_id) from first_table group by my_text) as A

select p1.* from first_table p1, first_table p2 where p1.my_text=p2.my_text and p1.ft_id < p2.ft_id

Truncate first_table

DELETE first_table.*
FROM first_table
LEFT JOIN (
    SELECT MIN(ft_id) AS min_ft_id
    FROM first_table
    GROUP BY my_text
) AS min_ids
ON first_table.ft_id = min_ids.min_ft_id
WHERE min_ids.min_ft_id IS NULL;



select min(ft_id) from first_table group by my_text

Select e1.name from employees e1 join employees e2 on e1.managerId = e2.id where e1.salary > e2.salary


use sakila

select * from customer having count(first_name) > 1

