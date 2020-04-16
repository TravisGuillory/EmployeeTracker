const mySql = require('mysql');
const Database = require('./db.js');
const Table = require('cli-table');

// 
let db = new Database({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1Gumbo@cash2!',
    database: 'employee_trackerdb'
});


let viewDepartments = async () => {
    let query = await db.viewDepartments();

    let table = new Table({
        head: ['ID', 'Name'],
        colWidths: [20, 45]
    });
    query.forEach(e => {
        table.push(
            [e.id, e.name]
        );
    });
    console.log(table.toString());

};

let viewRoles = async () => {
    let query = await db.viewRoles();
    let table = new Table({
        head: ['ID', 'Title', 'Salary', 'Dept ID'],
        colWidths: [10, 40, 20, 10]
    });
    query.forEach(e => {
        table.push(
            [e.id, e.title, e.salary, e.department_id]
        );
    });
    console.log(table.toString());
};

let viewEmployees = async () => {

    let query = await db.viewEmployees();
    let table = new Table({
        head: ['ID', 'First Name', 'Last Name', 'Role ID', 'Manager ID'],
        colWidths: [20, 20, 20, 20, 20]
    });
    // -- Replace null values with a space for cli-table
    query.forEach((e, i) => {
        if (e.i === null) e.i = "";
    });
    query.forEach(e => {
        table.push(
            [e.id, e.first_name, e.last_name, e.role_id, e.manager_id]
        );
    });
    console.log(table.toString());
};

let addEmployee = async() => {
    let query = await db.addEmployee();
    console.log(query);

};
let close = async () => {
    let query = await db.close();
};

module.exports = {
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees,
    addEmployee: addEmployee,
    close: close
}