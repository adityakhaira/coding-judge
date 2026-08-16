console.log("server file ready");

const express = require("express");
const connection = require("./src/config/db");

const app = express();

app.use(express.json());


// Home route
app.get("/", function(req, res) {
    res.send("Hello World");
});


// GET - Get all problems
app.get("/problems", function(req, res) {
    const sql = "SELECT * FROM problems";

    connection.query(sql, function(err, results) {
        if (err) {
            console.log("Error fetching problems:", err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        res.status(200).json(results);
    });
});


// GET - Get one problem by ID
app.get("/problems/:id", function(req, res) {
    const id = req.params.id;

    const sql = "SELECT * FROM problems WHERE id = ?";

    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.log("Error fetching problem:", err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: "Problem not found"
            });
        }

        res.status(200).json(results[0]);
    });
});


// POST - Create a new problem
app.post("/problems", function(req, res) {
    const { title, difficulty, description } = req.body;

    if (!title || !difficulty || !description) {
        return res.status(400).json({
            error: "Title, difficulty and description are required"
        });
    }

    const sql = `
        INSERT INTO problems (title, difficulty, description)
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [title, difficulty, description],
        function(err, result) {
            if (err) {
                console.log("Error creating problem:", err);
                return res.status(500).json({
                    error: "Database error"
                });
            }

            res.status(201).json({
                message: "Problem created successfully",
                id: result.insertId
            });
        }
    );
});


// PUT - Update an existing problem
app.put("/problems/:id", function(req, res) {
    const id = req.params.id;
    const { title, difficulty, description } = req.body;

    if (!title || !difficulty || !description) {
        return res.status(400).json({
            error: "Title, difficulty and description are required"
        });
    }

    const sql = `
        UPDATE problems
        SET title = ?, difficulty = ?, description = ?
        WHERE id = ?
    `;

    connection.query(
        sql,
        [title, difficulty, description, id],
        function(err, result) {
            if (err) {
                console.log("Error updating problem:", err);
                return res.status(500).json({
                    error: "Database error"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Problem not found"
                });
            }

            res.status(200).json({
                message: "Problem updated successfully",
                id: id
            });
        }
    );
});


// DELETE - Delete a problem
app.delete("/problems/:id", function(req, res) {
    const id = req.params.id;

    const sql = "DELETE FROM problems WHERE id = ?";

    connection.query(sql, [id], function(err, result) {
        if (err) {
            console.log("Error deleting problem:", err);
            return res.status(500).json({
                error: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Problem not found"
            });
        }

        res.status(200).json({
            message: "Problem deleted successfully",
            id: id
        });
    });
});


// Start server
app.listen(3000, function() {
    console.log("Server is running on port 3000");
});