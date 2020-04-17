const mySql = require('mysql');
// 
class Database{
    constructor(config){
        this.connection =mySql.createConnection(config);
        
    }


    async addEmployee(){
        return('addEmployee return');
       /*  return new Promise((resolve, reject) =>{
            this.connection.query('INSERT INTO ')
        }); */
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
            this.connection.query('INSERT INTO role(name, salary, department_id) VALUES (?, ?, ?)', 
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

   

   async updateManager(){

   }

   async getEmployeeByManager(){

   }

   async getAllDepartments() {
       return new Promise((resolve, reject) =>{
           this.connection.query('SELECT * FROM department', (err, data)=>{
                if (err){
                    console.log(err);
                    return resolve(err);
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