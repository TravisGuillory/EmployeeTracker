const mySql = require('mysql');
const inquiry = require('./inquiry.js');
const runQuery = require('./runQuery.js');







// --Main function to handle primary menu selection
async function main() {
    let exitApp = false;
    while (!exitApp) {
        const selection = await inquiry.mainInquiry();

        switch (selection.action) {
            case ('View Departments'):
                await runQuery.viewDepartments();
                break;
            case ('View Roles'):
                await runQuery.viewRoles();
                break;
            case ('View Employees'):
                await runQuery.viewEmployees();
                break;
            case ('Add Employee'):

                const newEmployeeInfo = await inquiry.addEmployeeInquiry();
                

                
                
                
                await runQuery.addEmployee(newEmployeeInfo);
                break;
            case ('Add Role'):
                const newRole = await inquiry.addRoleInquiry();
                const targetDepartmentID = await runQuery.getDepartmentIdByName(newRole.department_name);
                await runQuery.addRole(newRole.role_name, newRole.role_salary, targetDepartmentID);
                break;
            case ('Add Department'):
                const newDepartmentInfo = await inquiry.addDepartmentInquiry();
                await runQuery.addDepartment(newDepartmentInfo.department_name);
                break;
            case ('Update Employee Role'):
                const updateRole = await inquiry.updateEmployeeRoleInquiry()
                const employeeFullName = updateRole.employee_to_update.split(',');
                const firstName = employeeFullName[1];
                const lastName = employeeFullName[0];
                
                break;
            case ('test Function'):
                let roleId = await runQuery.getEmployeeIdByName('William', 'Nelson');
                console.log(roleId);

            case ('Exit'):
                exitApp = true;
                process.exit(0);

            default:

                break;
        }
    }


}

main();



process.on('exit', async (code) => {
    await runQuery.close();
    return console.log(`Exiting with conde ${code}`);
});