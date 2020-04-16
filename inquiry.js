const inquirer = require('inquirer');
// 
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
            
])
}

let addDepartmentInquiry = async () =>{
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "Enter department name."
        }
        
    ])
}

let addEmployeeInfo = async () =>{
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter first name of employee.',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter last name of employee.'
            
        },


    ])
}



module.exports  = {
    mainInquiry: mainInquiry,
    addDepartmentInquiry: addDepartmentInquiry,
    addEmployeeInfo: addEmployeeInfo

}