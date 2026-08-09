console.log("server file ready");

const express = require("express");
const connection = require("./src/config/db");

const app = express();

app.use(express.json());

// Home route
app.get("/", function(req, res) {
    console.log("Got a request");
    res.send("Hello World");
});

// Get all problems
app.get("/problems", function(req, res) {
    connection.query("SELECT * FROM problems", function(err, results) {
        if (err) {
            console.log("Error fetching problems:", err);
            return res.status(500).send("Database error");
        }

        res.json(results);
    });
});

// Create a new problem
app.post("/problems", function(req, res) {
    const { title, difficulty, description } = req.body;

    const sql = "INSERT INTO problems (title, difficulty, description) VALUES (?, ?, ?)";

    connection.query(
        sql,
        [title, difficulty, description],
        function(err, result) {
            if (err) {
                console.log("Error creating problem:", err);
                return res.status(500).send("Database error");
            }

            res.status(201).json({
                message: "Problem created successfully",
                id: result.insertId
            });
        }
    );
});

// Start server
app.listen(3000, function() {
    console.log("Server is running on port 3000");
});