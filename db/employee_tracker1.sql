DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;
-- 
CREATE TABLE department(
	id INT auto_increment NOT NULL,
    name VARCHAR(30) NOT NULL UNIQUE,
		PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT auto_increment NOT NULL, 
    title VARCHAR(30) NOT NULL UNIQUE,
    salary dec(10, 2) NOT NULL,
    department_id INT NOT NULL UNIQUE,
		PRIMARY KEY(id),
		FOREIGN KEY(department_id)
        REFERENCES department(id)
);

CREATE TABLE employee(
	id INT auto_increment NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
		PRIMARY KEY(id),
		FOREIGN KEY(role_id)
        REFERENCES role(id),
        FOREIGN KEY(manager_id)
		REFERENCES employee(id)

);



