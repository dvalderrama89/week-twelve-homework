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
        choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'View All Departments', 'View All Roles', 'View All Employees', 'Exit'],
    });

    switch(data.actionType) {
        case 'Add Department' : await addDepartment(); break;
        case 'Add Role': await addRole(); break;
        case 'Add Employee': await addEmployee(); break;
        case 'Update Employee Role': await updateEmployeeRole(); break;
        case 'View All Departments': await displayDepartments(); break;
        case 'View All Roles': await displayRoles(); break;
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
    connection.query(`INSERT INTO departments (name) VALUES ("${data.deptartmentName}")`);
}

async function addRole() {
    const data = await inquirer
    .prompt(
        [
            {
                type: 'input',
                message: 'What\'s the role\'s title?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What\'s the role\'s salary?',
                name: 'roleSalary'
            },
            {
                type: 'input',
                message: 'What\'s the role\'s departments ID?',
                name: 'departmentID'
            },

        ]
    );
    const query = connection.query(`INSERT INTO roles SET ?`, {
        title: data.roleTitle,
        salary: parseFloat(data.roleSalary),
        department_id: parseInt(data.departmentID)
    }, (err) => {
        if (err) throw err;
    });
}

async function addEmployee() {
    const data = await inquirer
    .prompt([
        {
            type: 'input',
            message: 'What\'s the employee\'s first name?',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName',
        },
        {
            type: 'input',
            message: 'What is the employee\'s role ID?',
            name: 'roleID',
        },
        {
            type: 'input',
            message: 'What is the employee\'s manager ID?',
            name: 'managerID',
        },
    ]).then(data => {
        const query = connection.query(`INSERT INTO employees SET ?`, 
        {
            first_name: data.firstName,
            last_name: data.lastName,
            roles_id: data.roleID,
            manager_id: data.managerID,
        });
    });
}

async function updateEmployeeRole() {
    const data = await inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the Employee ID of the Employee you want to change?',
            name: 'employeeID'
        },
        {
            type: 'input',
            message: 'What is the role ID of the Employee\'s new role?',
            name: 'roleID'
        },
    ]).then(data => {
        const query = connection.query(`UPDATE employees SET ? WHERE ?`, [{
            roles_id: data.roleID
        }, {
            id: data.employeeID
        }], (err, res) => {
            if (err) throw err;
        });
    });
}

async function displayDepartments() {
    connection.query(`SELECT * FROM departments`,
    (err, res) => {
        console.log('\n');
        console.table(res);
    });
}

async function displayRoles() {
    connection.query(`SELECT * FROM roles`,
    (err, res) => {
        console.log('\n');
        console.table(res);
    });
}

async function displayEmployees() {
    connection.query(`SELECT employees.id, first_name, last_name, title, departments.name AS departments, roles.salary FROM employees
    LEFT JOIN roles
    ON employees.roles_id = roles.id
    LEFT JOIN departments 
    ON roles.department_id = departments.id
    GROUP BY employees.id;`,
    (err, res) => {
        console.log("\n");
        console.table(res);
    });
}