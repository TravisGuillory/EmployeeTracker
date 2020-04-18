const mySql = require('mysql');
// 
class Database{
    constructor(config){
        this.connection =mySql.createConnection(config);
        
    }


    async addEmployee(newEmployee){
        return new Promise((resolve, reject) =>{
            this.connection.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)', 
            [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id],
            (err, data) =>{
                if (err){
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });
        });
    }

    async addDepartment(name){
        return new Promise((resolve, reject) =>{
            this.connection.query('INSERT INTO department(name) VALUES (?)', [name], (err, data) =>{
                if (err){
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });

        });
    }

    async addRole(name, salary, department){
        return new Promise((resolve, reject) =>{
            this.connection.query
            ('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)', 
                [name, salary, department], (err, data) =>{
                    if (err) {
                        console.log(err);
                        return reject(err);
                }
                resolve(data);
            });
        });
        
    }

    async getEmployees(){
        return new Promise((resolve, reject) =>{
            this.connection.query("SELECT * FROM employee", (err, data) =>{
                if (err){
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });
        });
   }

   async getEmployeeIdByName(firstName, lastName){
    return new Promise((resolve, reject) =>{
        this.connection.query
            ('SELECT id FROM employee WHERE first_name = ? and last_name = ?', 
                [firstName, lastName], (err, data)=>{
                    if (err){
                        console.log(err);
                        return reject(err);
                    }
                    resolve(data);
            });
        });
   }

   async getAllManagers (){
       return new Promise((resolve, reject) =>{
           this.connection.query
                ('SELECT * FROM employee WHERE manager_id IS null', (err, data) =>{
                    if (err){
                        console.log(err);
                        return reject(err);
                    }
                    resolve(data);
            });
        });
   }

   

   async getManagersByDepartmentID (roleId) {
       return new Promise((resolve, reject) =>{
           this.connection.query
                ('SELECT FROM employee WHERE role_id = ? AND manager_id = null', 
                    [roleId], (err, data) =>{
                        if (err){
                            console.log(err);
                            return reject(err);
                        }
                        resolve(data)
                    });
       });
   }

   async getRoles(){
    return new Promise((resolve, reject) =>{
        this.connection.query('SELECT * FROM role', (err, data) =>{
            if (err) {
                console.log(err);
                return reject(err);
            }
            
            resolve(data);
        })
    });
   }

   async getRoleIdByName(role){
       return new Promise((resolve, reject) => {
        this.connection.query('Select id FROM role WHERE title = ?', [role], (err, data)=>{
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(data);
        });
       });

   }

   async getDepartments(){
         return new Promise((resolve, reject) => {
             this.connection.query("SELECT * FROM department ORDER BY id", (err, data) => {
                 if (err){
                     console.log(err);
                     return reject(err);
                 }
                 resolve(data);
             })
         })
   }

   

   async updateEmployeeRole(updateInfo){
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE employee SET role_id =? WHERE first_name = ? AND last_name = ?',
            [updateInfo.role_id, updateInfo.first_name, updateInfo.last_name], 
            (err, data) =>{
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });
        });
   }

   
   async getEmployeeByManager(){

   }

   async getAllDepartments() {
       return new Promise((resolve, reject) =>{
           this.connection.query('SELECT * FROM department ORDER BY id', (err, data)=>{
                if (err){
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
           });
       });
    }

    async getDepartmentIdByName(departmentName){
        return new Promise((resolve, reject) =>{
            this.connection.query('SELECT id FROM department WHERE name = ?', [departmentName], (err, data)=>{
                if (err){
                    console.log(err);
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
   

  



    close() {
        return new Promise ((resolve, reject)=>{
            this.connection.end((err) => {
                if (err){
                    return reject(err);
                }
                resolve();
           });
        });
    }

}

module.exports = Database;