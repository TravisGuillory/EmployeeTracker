USE employee_trackerDB;

INSERT into 
	department(name) 
    VALUES 
		("Sales"),
		("Information Technology"),
		("Human Resources"),
		("Customer Service")
;
select * from department ORDER by id;

INSERT IGNORE into role (title, salary, department_id)
	VALUES
		("Sales Representative", 60000, 1 ),
        ("Sales Clerk", 40000, 1),
        ("Sales Manager", 100000, 1),
        ("Systems Administrator", 30000, 3),
        ("Technology Manager", 100000, 2),
        ("Developer", 150000, 2),
        ("Talent Coordinator", 50000, 3),
        ("Human Resources Manager", 100000, 3),
        ("Customer Services Representative", 25000, 4),
        ("Customer Services Manager", 50000, 4)
;


INSERT IGNORE INTO employee(first_name, last_name, role_id, manager_id)
	VALUES
		-- Managers
        ("Billy", "Mays", 3, null),
        ("William", "Nelson", 5, null),
        ("Andrew", "Griffith", 8, null),
        ("Bernard", "Fife", 10, null)
        ;
 select * from employee;       
        
INSERT IGNORE INTO employee(first_name, last_name, role_id, manager_id)
	VALUES
        -- Employees
        ("Vince", "Shlomi", 1, 3),
        ("Patty", "Mills", 2, 1),
        ("Jimmy", "Page", 6,5 ),
        ("Mark", "Cuban", 7, 3),
        ("Otis", "Campbell", 9, 4)
        ;
        
select * from employee;
