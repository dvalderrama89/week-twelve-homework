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

connection.connect(async (err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    await optionMenu();
    connection.end();
});

async function optionMenu() {
    const data = await inquirer
    .prompt(
    {
        type: 'list',
        message: 'What would you like to do? (User arrow keys)',
        name: 'actionType',
        choices: ['Add Department', 'Add Role', 'Add Employee', 'View All Departments', 'View All Employees', 'Exit'],
    });

    switch(data.actionType) {
        case 'Add Department' : await addDepartment(); break;
        case 'Add Role': await addRole(); break;
        case 'Add Employee': await addEmployee(); break;
        case 'View All Departments': await displayDepartments(); break;
        case 'View All Employees': await displayEmployees(); break;
        case 'Exit': connection.end(); process.exit(0); break;
        default: break;
    }

    await optionMenu();
}

async function addDepartment() {
    const data = await inquirer
    .prompt(
        {
            type: 'input',
            message: 'Input the Department name',
            name: 'deptartmentName'
        }
    );
    connection.query(`INSERT INTO department (name) VALUES ("${data.deptartmentName}")`);
}

async function addRole() {

}

async function addEmployee() {

}

async function displayDepartments() {
    connection.query(`SELECT * FROM department`,
    (err, res) => {
        console.log('\n');
        console.table(res);
    });
}

async function displayEmployees() {
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