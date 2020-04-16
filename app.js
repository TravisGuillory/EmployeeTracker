const mySql = require('mysql');
const inquiry = require('./inquiry.js');
const runQuery = require('./runQuery.js');
// 






// --Main function to handle primary menu selection
async function main() {
    let exitApp = false;
    while (!exitApp) {
        const selection = await inquiry.mainInquiry();

        switch (selection.action) {
            case ('View Departments'):
                runQuery.viewDepartments();
                break;
            case ('View Roles'):
                runQuery.viewRoles();
                break;
            case ('View Employees'):
                runQuery.viewEmployees();
                break;
            case ('Add Employee'):

                const newEmployee = await addEmployeeInquiry();
                runQuery.addEmployee();
                break;
            case ('Add Role'):

                break;
            case ('Add Department'):
                const newDepartmentInfo = await addDepartmentInquiry();
                console.log(newDepartmentInfo);
                // runQuery.addDepartment(newDepartmentinfo.name);
                break;
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