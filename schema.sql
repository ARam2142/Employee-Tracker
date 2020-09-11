DROP DATABASE IF EXISTS employeetrack_db;
CREATE DATABASE employeetrack_db;

USE employeetrack_db;

CREATE TABLE department (
    id INT NOT NULL IDENTITY,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL IDENTITY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL IDENTITY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES role(id)
);


