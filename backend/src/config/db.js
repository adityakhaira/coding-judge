require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "coding_judge"
});

connection.connect(function(err) {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("Database connected successfully");
});

connection.query("SELECT 1", function(err, results) {
    if (err) {
        console.log("Database query failed:", err);
        return;
    }

    console.log("Database query successful");
});

module.exports = connection;