const mySql = require('mysql');

const Table = require('cli-table');
const inquiry = require('./inquiry.js');
const runQuery = require('./runQuery.js');







// --Main function to handle primary menu selection
async function main(){
    let exitApp = false;
    while(!exitApp){
        const selection = await inquiry.mainTask();

        switch (selection.action){
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
                
                break;
            case ('Add Role'):

                break;
            case ('Add Department'):

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

/* const viewDepartments = async () =>{
    let query =  await db.viewDepartments();
    
                   let table = new Table ({
                   head: ['ID', 'Name'], 
                   colWidths: [20, 45]
               });
               query.forEach(e => {
                   table.push( 
                       [e.id, e.name]
                   );
               });
               console.log(table.toString()); 

}; */











process.on('exit', async (code) =>{
    await runQuery.close();
    return console.log(`Exiting with conde ${code}`);
});