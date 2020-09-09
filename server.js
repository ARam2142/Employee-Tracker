const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employeetrack_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});

const employeeWatcher = [];

//you will be directed her upon entering app
const mainMenu = () => {
  inquirer.prompt ([
    {
      type: "list",
      name: "mainmenu",
      message: "Welcome, what would you like to do?",
      choices: [
        "view all employees",
        "add department", 
        "add employee role", 
        "add employee", 
        "view department", 
        "view employee role", 
        "view employee",
        "update employee role",
        "End" ]
    },
  ]).then(function(choice) {

    switch (choice.mainmenu) {
      case 'add department':
        addDepartment();
        break;
      case 'add employee role':
        addEmployeeRole();
        break;
      case 'add employee':
        addEmployee();
        break;
      case 'view department':
        viewDepartment();
        break;
      case 'view employee role':
        viewEmployeeRole();
        break;
      case 'view employee':
        viewEmployee();
        break;
      case 'update employee role':
        updateRole()
        break;
      case 'Exit':
        connection.end()
    }

  });

}

//add the department to the console
const addDepartment = () => {
  console.log("please enter name of department");
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",   
    }

  ]).then(answers => {
    
  })
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