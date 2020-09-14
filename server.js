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
  //const userId = "6";
  //const firstName = "Jack";
  //connection.query('SELECT * FROM employee WHERE id=? AND first_name=?',[userId, firstName], function(err, dtaa) {
  //if (err) throw err;
  //console.log(dtaa);
  //})
});

//you will be directed her upon entering app
const mainMenu = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "mainmenu",
      message: "Welcome, what would you like to do?",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add departments",
        "add roles",
        "add employees",
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
      case 'update roles':
        updateRoles();
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
    function (err, res) {
      if (err) throw err;
      console.table(res);
      mainMenu();
    })

}

//view all roles
const viewAllRoles = () => {
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

/////////////////////////////////////////////////
//add a department to the console
const addDepartments = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department you want to add?",
    }

  ]).then(function (answers) {
    connection.query("INSERT INTO department SET ?",
      {
        name: answers.name
      },
      function (err) {
        if (err) throw err;
        console.table(answers);
        console.log("successfully added department");
        mainMenu();
      });

  });

}

////////////////////////////////////////////////////
//add the roles to the console
const addRoles = () => {
  //console.log("please enter name of role");
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role you want to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the role you want to add?",
    },
    {
      type: "input",
      name: "department_id",
      message: "What is the department_id of the role you want to add?",
    }

  ]).then(answers => {
    connection.query("INSERT INTO role SET ?",
      {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department_id
      },
      function (err) {
        if (err) throw err;
        console.table(answers);
        console.log("successfully added department");
        mainMenu();
      });

  });

}

////////////////////////////////////////////////////
//add the employee to the console
const addEmployees = () => {
  //console.log("please enter name of role");
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the new employee?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the new employee?"
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the role_id of the new employee?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager_id of the new employee manager?"
    }

  ]).then(answers => {
    connection.query("INSERT INTO employee SET ?",
      {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: answers.role_id,
        manager_id: answers.manager_id || 0
      },
      function (err) {
        if (err) throw err;
        console.table(answers);
        console.log("successfully added employee");
        mainMenu();
      });

  });

}

//update employees roles 
const updateRoles = () => {
  //get employee names and job titles
  //make a select connection to query
  var query = `SELECT CONCAT(first_name," ",last_name) AS employee FROM employee INNER JOIN role ON employee.role_id = role_id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);

    inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "What employee do you want to update?",
        choices: function () {
          let employee = [];
          for (let i = 0; i < res.length; i++) {
            employee.push(res[i].employee)
          }
          return employee;
        }
      },
      /*
      {//still in the works so stay tuned
        
        type: "list",
        name: "title",
        message: "What title do you want to update to?",
        choices: function () {
          if (err) throw err;
          let title = [];
          for (let i = 0; i < res.length; i++) {
            title.push(res[i].title)
          }
          return title;
        }
      }*/
    ])
    
    //.then(answers => {
    /*connection.query("UPDATE title SET WHERE ?",
    {
      employee:
    },
  });*/




  

      

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