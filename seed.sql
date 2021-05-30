-- Department data
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Art");

-- Employee data
INSERT INTO employee (
first_name, last_name, role_id, manager_id)
VALUES ("Hiyo", "Kaychan", 1, 1);

INSERT INTO employee (
first_name, last_name, role_id, manager_id)
VALUES ("Retina", "J. Artist", 2, 2);

-- Role data
INSERT INTO role (
title, salary, department_id)
VALUES ("Senior Game Developer",
100000.00, 1);

INSERT INTO role (
title, salary, department_id)
VALUES ("Art Lead",
90000.00, 2);
