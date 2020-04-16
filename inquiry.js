const inquirer = require('inquirer');

let mainTask = async () =>{
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

let anotherTask =  () =>{return "Kiss my ass ";}

module.exports  = {
    mainTask: mainTask,
    anotherTask: anotherTask

}