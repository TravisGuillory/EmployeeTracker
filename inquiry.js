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
                'Exit']
        }
            
]);
}

let addDepartmentInquiry = async () =>{
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "Enter Department Name: "
        }
        
    ]);
}

let addRoleInquiry = async () =>{
    const departments = await runQuery.getDepartmentNames();
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: 'Enter Title of new Role: '
        },
        {
            type: 'input',
            name: 'role_salary',
            message: 'Enter Salary of the new Role: '
        },
        {
            type: 'list',
            name: 'department_name',
            choices: [...departments]
        }
        
    ]);
}

let addEmployeeInfo = async () =>{
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
    ]);
}





module.exports  = {
    mainInquiry: mainInquiry,
    addDepartmentInquiry: addDepartmentInquiry,
    addRoleInquiry: addRoleInquiry,
    addEmployeeInfo: addEmployeeInfo

}