const mySql = require('mysql');
const Database = require('./db.js');
const Table = require('cli-table3');
const br = '\n';
// 
let db = new Database({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '*',
    database: 'employee_trackerdb'
});


let viewDepartments = async () => {
    let query = await db.getDepartments();

    let table = new Table({
        head: ['ID', 'Name'],
        colWidths: [20, 45]
    });
    query.forEach(e => {
        table.push(
            [e.id, e.name]
        );
    });
    console.log(br + table.toString() + br);
    

};

let viewRoles = async () => {
    let query = await db.getRoles();
    let table = new Table({
        head: ['ID', 'Title', 'Salary', 'Dept ID'],
        colWidths: [10, 40, 20, 10]
    });
    query.forEach(e => {
        table.push(
            [e.id, e.title, e.salary, e.department_id]
        );
    });
    console.log(br + table.toString() + br);
};

let viewEmployees = async () => {

    let query = await db.getEmployees();
    let table = new Table({
        defaultValue: 0,
        errorOnNull: false,
        head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
        colWidths: [20, 20, 20, 20, 20]
    });
     query.forEach(e => {
        table.push(
            [e.id, e.first_name, e.last_name, e.role_id, e.manager_id]
        );
    });
        console.log(br + table.toString() + br);
   
};

let addEmployee = async() => {
    let query = await db.addEmployee();
    console.log(query);

};

let addDepartment = async (name) => {
    
    await db.addDepartment(name);
    await viewDepartments();
};

let addRole = async (name, salary, department) => {
    await db.addRole(name, salary, department);
    await viewRoles();

};

// -- Function to get department column values based on argument value
let getDepartmentColumn = async (columnName) => {
    console.log(columnName);
    
    let query = await db.getAllDepartments();
    console.log(Object.keys(query[0]));
    console.log(query);
    console.log(typeof query);
    let departments = [];
    query.forEach((e) =>{
        departments.push(e);
        
    })
    
    process.exit(0);
    // return departments;
};


let getRoleNames = async () => {

};





let close = async () => {
    let query = await db.close();
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees,
    addEmployee: addEmployee,
    addDepartment: addDepartment,
    addRole: addRole,
    getDepartmentColumn: getDepartmentColumn,
    close: close
}