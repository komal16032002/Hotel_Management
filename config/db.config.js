const mysql=require("mysql2")
const pool=mysql.createPool({
    host:"127.0.0.1",
    password:"root",
    user:"root",
    database:"hotel"
})//database connectivity

module.exports=pool.promise();


