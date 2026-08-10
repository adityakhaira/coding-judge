//import the mysql2 package so node.js can communicate with the mysql database
require('dotenv').config();
const mysql = require('mysql2');  

//create a connection object containing all details required to connect all details required to connect the mysql server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'coding_judge'
});

//connect to the mysql database and check wheather the connection is successful

connection.connect(function(err){
    if(err){
        console.log("Database connection failed:", err);
        return;
    }
    console.log("Database connected successfully");
});

//run a sql query to check wheather mysql is responding correctly


 connection.query("SELECT 1",function(err,results){
    if(err){
        console.log("Database query failed:",err);
        return;
    }
    console.log("Database query successful");
});

module.exports=connection;