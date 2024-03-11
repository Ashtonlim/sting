select * from application





DROP DATABASE IF EXISTS nodelogin;

CREATE DATABASE IF NOT EXISTS nodelogin DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use nodelogin;

CREATE TABLE IF NOT EXISTS accounts (
    id int(12) NOT NULL,
    username varchar(20) NOT NULL,
    password varchar(${maxHashLen}) NOT NULL,
    email varchar(${maxEmailLen}),
    isActive BOOLEAN DEFAULT TRUE,
    secGrp TEXT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO accounts (id, username, password, email, secGrp) VALUES (1, 'admin', '${adminPwdHash}', 'admin@st.co', 'admin');
ALTER TABLE accounts ADD PRIMARY KEY (id);
ALTER TABLE accounts MODIFY id int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

ALTER TABLE Plan MODIFY Plan_startDate DATE NOT NULL;
ALTER TABLE Plan MODIFY Plan_endDate DATE NOT NULL;


CREATE TABLE IF NOT EXISTS Application (
    App_Acronym VARCHAR(20) PRIMARY KEY,
    App_Description LONGTEXT,
    App_Rnumber INT DEFAULT 0,
    App_startDate DATE NOT NULL,
    App_endDate DATE NOT NULL,
    App_permit_Open VARCHAR(20),
    App_permit_toDoList VARCHAR(20),
    App_permit_Doing VARCHAR(20),
    App_permit_Done VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Plan (
    Plan_MVP_name VARCHAR(20),
    Plan_startDate DATE NOT NULL,
    Plan_endDate DATE NOT NULL,
    Plan_app_Acronym VARCHAR(20),
    CONSTRAINT ck_plan
    PRIMARY KEY (Plan_MVP_name, Plan_app_Acronym)
);

CREATE TABLE IF NOT EXISTS Task (
    Task_name VARCHAR(20),
    Task_description LONGTEXT,
    Task_notes LONGTEXT,
    Task_id VARCHAR(30) NOT NULL UNIQUE, -- <App_Acronym>_<App_Rnumber>
    Task_plan VARCHAR(20),
    Task_app_Acronym VARCHAR(20),
    Task_state ENUM ('open', 'todo', 'doing', 'done', 'closed') NOT NULL DEFAULT 'open',
    Task_creator VARCHAR(20),
    Task_owner VARCHAR(20),
    Task_createDate DATE,
    CONSTRAINT ck_task
    PRIMARY KEY (Task_id, Task_app_Acronym)
);


-- Table: Task 
-- Task_name 
-- Task_description 
-- Task_notes 
-- Task_id  <App_Acronym>_<App_Rnumber> 
-- Task_plan 
-- Task_app_Acronym 
-- Task_state 
-- Task_creator 
-- Task_owner 
-- Task_createDate 

CREATE TABLE IF NOT EXISTS secGroups (
    groupname VARCHAR(20) PRIMARY KEY
);

insert into secGroups (groupname) values ('admin'),('pl'),('pm'),('dev');


-- Table: Application 
-- App_Acronym
-- App_Description
-- App_Rnumber
-- App_startDate
-- App_endDate
-- App_permit_Open
-- App_permit_toDoList
-- App_permit_Doing
-- App_permit_Done

-- Table: Plan 
-- Plan_MVP_name
-- Plan_startDate
-- Plan_endDate
-- Plan_app_Acronym

-- Table: Task 
-- Task_name 
-- Task_description 
-- Task_notes 
-- Task_id  <App_Acronym>_<App_Rnumber> 
-- Task_plan 
-- Task_app_Acronym 
-- Task_state 
-- Task_creator 
-- Task_owner 
-- Task_createDate 
  
