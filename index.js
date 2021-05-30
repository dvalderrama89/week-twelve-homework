const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    optionMenu();
});

function optionMenu() {
    inquirer
    .prompt(
    {
        type: 'list',
        message: 'What would you like to do? (User arrow keys)',
        name: 'actionType',
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'],
    })
    .then((data) => {
        switch(data.actionType) {
            case 'View All Employees': logEmployees();
            default: break;
        }
        connection.end();
    });
}

function logEmployees() {
    connection.query(`SELECT employee.id, first_name, last_name, title, department.name AS department, role.salary FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department 
    ON role.department_id = department.id
    GROUP BY employee.id;`,
    (err, res) => {
        console.table(res);
    });
}