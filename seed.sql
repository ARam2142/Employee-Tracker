DROP DATABASE IF EXISTS employeetrack_db;
CREATE DATABASE employeetrack_db;

USE employeetrack_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NULL,
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
)




employee:


--id - INT PRIMARY KEY

--first_name - VARCHAR(30) to hold employee first name

--last_name - VARCHAR(30) to hold employee last name

--role_id - INT to hold reference to role employee has

--manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager


department:

--id - INT PRIMARY KEY

--name - VARCHAR(30) to hold department name


role:


--id - INT PRIMARY KEY

--title -  VARCHAR(30) to hold role title

--salary -  DECIMAL to hold role salary

--department_id -  INT to hold reference to department role belongs to



