// -- Functions in this file are used to initiate sql queries to the databse 
// -- by instantation of the Database class. 

const mySql = require('mysql');
const Database = require('./db.js');
const Table = require('cli-table3');
const br = '\n';

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

let addEmployee = async (newEmployeeInfo) => {
    
    
    let roleId = await db.getRoleIdByName(newEmployeeInfo.role);
    newEmployeeInfo.role_id = roleId[0].id;
    managerFirstName = newEmployeeInfo.manager_name.split(',')[1].trim();
    managerLastName = newEmployeeInfo.manager_name.split(',')[0].trim();
    let managerId = await db.getEmployeeIdByName(managerFirstName, managerLastName);
    newEmployeeInfo.manager_id = managerId[0].id; 
    
    
    
    let query = await db.addEmployee(newEmployeeInfo);
    
    await viewEmployees(); 


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

let getDepartmentIdByName = async (departmentName) => {
    let queryDepartments = await db.getAllDepartments();
    let deptId;
    queryDepartments.forEach((e) => {
        if (e.name === departmentName) {
            deptId = e.id;
        }
    });
    return deptId;
};

let getRoleNames = async () => {
    let query = await db.getRoles();
    let roleNames = [];
    query.forEach((e) => {
        roleNames.push(e.title);
    });
    return roleNames;
};

let  getRoleIdByName = async (roleName) =>{
    let query = await db.getRoleIdByName(roleName);
   
    return query[0].id;
};


let getEmployeeNames = async () => {
    let query = await db.getEmployees();
    let employeeNames = [];
    query.forEach((e) => {
        employeeNames.push(e.last_name + ", " + e.first_name);
    });
    return employeeNames;

};

let getEmployeeIdByName = async (firstName, lastName) =>{
    console.log(firstName, lastName);
    let query = await db.getEmployeeIdByName(firstName, lastName);
    console.log(query);
    return query[0].id;
}

let getAllManagers = async () => {
    
    let query = await db.getAllManagers();
    
    let managers = [];
    query.forEach((e) =>{
        managers.push(e.last_name + ', '+ e.first_name);
    });
    return managers;
};

let updateEmployeeRole = async (updateInfo) => {
    // - split name of employee and get id,  get id of new Role
    updateInfo.first_name = updateInfo.employee_to_update.split(',')[1].trim();
    updateInfo.last_name = updateInfo.employee_to_update.split(',')[0].trim();
    let newRoleId = await db.getRoleIdByName(updateInfo.new_role);
    updateInfo.role_id = newRoleId[0].id;
    let query = db.updateEmployeeRole(updateInfo);
    await viewEmployees();
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
    getRoleNames: getRoleNames,
    getRoleIdByName: getRoleIdByName,
    getDepartmentIdByName: getDepartmentIdByName,
    getEmployeeNames: getEmployeeNames,
    getEmployeeIdByName: getEmployeeIdByName,
    getAllManagers: getAllManagers,
    updateEmployeeRole: updateEmployeeRole,
    close: close
}