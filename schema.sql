DROP DATABASE IF EXISTS employeetrack_db;
CREATE DATABASE employeetrack_db;

USE employeetrack_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id)
);


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


