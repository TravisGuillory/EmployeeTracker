const mySql = require('mysql');
const Database = require('./db.js');
const Table = require('cli-table3');
const br = '\n';
// 
let db = new Database({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'X',
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

let addEmployee = async () => {
    let query = await db.addEmployee();
    console.log(query);

};

let addDepartment = async (name) => {

    await db.addDepartment(name);
    await viewDepartments();
};

let addRole = async (name, salary, departmentId) => {
    await db.addRole(name, salary, departmentId);
    await viewRoles();

};

// -- Function to get department rows containing id and name.
let getDepartmentNames = async () => {
    let query = await db.getAllDepartments();

    let departmentNames = [];

    query.forEach((e) => {
        //departmentColumns.push(e[columnName]);
        departmentNames.push(e.name);
    });

    return departmentNames;
};


let getRoleNames = async () => {

};

let getDepartmentIdByName = async (departmentName) => {
    console.log(departmentName);
    let query = await db.getDepartmentIdByName(departmentName);
    return(query[0].id);
}





let close = async () => {
    let query = await db.close();
};





module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees,
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee,
    getDepartmentNames: getDepartmentNames,
    getDepartmentIdByName: getDepartmentIdByName,
    getRoleNames, getRoleNames,
    getDepartmentIdByName: getDepartmentIdByName,
    close: close
}