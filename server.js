const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeetrack_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});


//you will be directed her upon entering app
const mainMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "mainmenu",
      message: "Welcome, what would you like to do?",
      choices: [
        "add departments",
        "add roles",
        "add employees",
        "view all departments",
        "view all roles",
        "view all employees",
        "update roles",
        "End"
      ]
    },

  ]).then(function (choice) {
      switch (choice.mainmenu) {
        case 'view all employees':
          viewAllEmployees();
          break;
        case 'view all departments':
          viewAllDepartments();
          break;
        case 'view all roles':
          viewAllRoles();
          break;
        case 'add departments':
          addDepartments();
          break;
        case 'add roles':
          addRoles();
          break;
        case 'add employees':
          addEmployees();
          break;
        case 'Exit':
          connection.end();
          //break;
      }

    });

}

//display the employees
const viewAllEmployees = () => {
  var query =
  `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
  department.name AS department, CONCAT(e.first_name, ' ' ,e.last_name) 
  AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id 
  INNER JOIN department ON department.id = role.department_id 
  LEFT JOIN employee e ON employee.manager_id = e.id`
    connection.query(query, 
      function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
      })

}   
  
//view all roles
const viewAllRoles = () => {
  //let query = "SELECT * FROM role";
  let query = `SELECT role.id, role.title, role.salary, department.name 
  AS department FROM role INNER JOIN department on department.id = role.department_id`;
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res);
    mainMenu();
  })
}

//view all departments
const viewAllDepartments = () => {
  var query = "SELECT department.id, department.name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  })
}

//add the department to the console
const addDepartments = () => {
  console.log("please enter name of department");
  inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: "What is the name of the department you want to add?",
    }

  ]).then(function(answers) {
    connection.query("INSERT INTO department SET ?",
      {
        name: answers.department
      },
      function(err) {
        if (err) throw err;
        console.table(answers);
        console.log("successfully added department");
        mainMenu();
    });

  });
  

}

//mainMenu();
/*
Build a command-line application that at a minimum allows the user to:

Add departments, roles, employees
View departments, roles, employees
Update employee roles




Bonus points if you're able to:
Update employee managers
View employees by manager
Delete departments, roles, and employees
*/