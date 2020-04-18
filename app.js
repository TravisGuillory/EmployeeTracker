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
                // -- Convert department name taken by inquirer to dept id 
                const targetDepartmentID = await runQuery.getDepartmentIdByName(newRole.department_name);
                await runQuery.addRole(newRole.role_name, newRole.role_salary, targetDepartmentID);
                break;
            case ('Add Department'):
                const newDepartmentInfo = await inquiry.addDepartmentInquiry();
                
                await runQuery.addDepartment(newDepartmentInfo.department_name);
                break;
            case ('Update Employee Role'):
                const updateRoleInfo = await inquiry.updateEmployeeRoleInquiry()
                // Different than newRole method. getting role_id in the runQuery.js 
                await runQuery.updateEmployeeRole(updateRoleInfo);
                break;
            

            case ('Exit'):
                exitApp = true;
                await runQuery.close()
                process.exit(0);

            default:
                console.log("Unauthorized part of the application reched");
                break;
        }
    }


}

main();



process.on('exit', async (code) => {
    await runQuery.close();
    return console.log(`Exiting with conde ${code}`);
});