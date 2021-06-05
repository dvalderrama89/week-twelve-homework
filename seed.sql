DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- Department data
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

-- Role data
CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT
);

INSERT INTO role (
title, salary, department_id)
VALUES ("Senior Game Developer",
100000.00, 1);

INSERT INTO role (
title, salary, department_id)
VALUES ("Art Lead",
90000.00, 2);

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Art");

-- Employee data
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);

INSERT INTO employee (
first_name, last_name, role_id, manager_id)
VALUES ("David", "Test", 1, 1);

INSERT INTO employee (
first_name, last_name, role_id, manager_id)
VALUES ("James", "J. Artist", 2, 2);
