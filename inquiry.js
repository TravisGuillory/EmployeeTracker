const inquirer = require('inquirer');
const runQuery = require('./runQuery.js');

let mainInquiry = async () =>{
    return await inquirer.prompt([

        {
            name: 'action', 
            message: 'What would you like to do?',
            type: 'list',
            choices:['View Departments',
                'View Roles', 
                'View Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee',
                'Update Employee Role',
                'test Function',
                'Exit']
        }
            
]);
};

let addDepartmentInquiry = async () =>{
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "Enter Department Name: "
        }
        
    ]);
};

let addRoleInquiry = async () =>{
    const departments = await runQuery.getDepartmentNames();
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'Enter Title of new Role: '
        },
        {
            type: 'number',
            name: 'role_salary',
            message: 'Enter Salary of the new Role: '
        },
        {
            type: 'list',
            name: 'department_name',
            choices: [...departments]
        }
        
    ]);
};

let addEmployeeInquiry = async () =>{
    let roleNames = await runQuery.getRoleNames();
    let managers = await runQuery.getAllManagers();
    
    
        return await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name of employee: ',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name of employee.'
            
        },
        {
            type: 'list', 
            name: 'role',
            message: 'Select the role of the employee',
            choices: [...roleNames]
        },
        {
            type: 'list',
            name: 'manager_name',
            message: 'Slect the manager of the employee',
            choices: [...managers]
        } 
        
    ]);
    
    
};



let updateEmployeeRoleInquiry = async () => {
    let employeeNames = await runQuery.getEmployeeNames();
    let roleNames = await runQuery.getRoleNames();
    return await inquirer.prompt([
        {
            type: 'list', 
            name: 'employee_to_update',
            message: 'Select the employee to update role',
            choices: [...employeeNames]
        },
        {
            type: 'list',
            name: 'new_role',
            message: 'Select the new role',
            choices: [...roleNames]
        }
    ])

};





module.exports  = {
    mainInquiry: mainInquiry,
    addDepartmentInquiry: addDepartmentInquiry,
    addRoleInquiry: addRoleInquiry,
    addEmployeeInquiry: addEmployeeInquiry,
    updateEmployeeRoleInquiry, updateEmployeeRoleInquiry

}