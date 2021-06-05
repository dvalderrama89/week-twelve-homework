DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- departments data
CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

-- roles data
CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT
);

INSERT INTO roles (
title, salary, department_id)
VALUES ("Senior Game Developer",
100000.00, 1);

INSERT INTO roles (
title, salary, department_id)
VALUES ("Art Lead",
90000.00, 2);

INSERT INTO departments (name) VALUES ("Engineering");
INSERT INTO departments (name) VALUES ("Art");

-- employees data
CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
roles_id INT,
manager_id INT
);

INSERT INTO employees (
first_name, last_name, roles_id, manager_id)
VALUES ("David", "Test", 1, 1);

INSERT INTO employees (
first_name, last_name, roles_id, manager_id)
VALUES ("James", "J. Artist", 2, 2);
