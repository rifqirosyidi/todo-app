const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const dbConnect = require("./models/connection");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Show All Todos
app.get("/api/todos/", (req, res) => {
  let sqlQuery = "SELECT * FROM todos";
  dbConnect.query(sqlQuery, (error, results) => {
    if (error) {
      throw error;
    }
    return res.send({ error: false, data: results, message: "list of todos" });
  });
});

// Show Single Todo
app.get("/api/todo/:id", (req, res) => {
  let todoId = req.params.id;
  let sqlQuery = "SELECT * FROM todos WHERE id = ?";
  dbConnect.query(sqlQuery, todoId, (error, results) => {
    if (error) {
      throw error;
    }
    return res.send({
      status: 200,
      error: false,
      data: results,
      message: "todo",
    });
  });
});

// Add New Todo
app.post("/api/todos", (req, res) => {
  // daripada logging gini mending pake logging middleware, kyk morgan
  // https://github.com/expressjs/morgan
  let todo = req.body.todo;
  if (!todo) {
    morgan("combined", {
      skip: function (req, res) {
        return res.status < 400;
      },
    });
  }

  let sqlQuery = "INSERT INTO todos SET ?";
  dbConnect.query(sqlQuery, { todo: todo }, (error, results) => {
    if (error) console.error(error);
    res.send({ status: 200, error: false, data: results, message: "add todo" });
  });
});

// Update Text For Todo Below Here (still progress)
app.put("/api/todos/:id/text", (req, res) => {
  // Test
  console.log(req.params.id);
});

// Update / Toggle Complete Status
app.put("/api/todos/:id/status", (req, res) => {
  let status = req.body.complete;
  let id = req.params.id;
  let sqlQuery = "UPDATE todos SET complete = ? WHERE id = ?";

  console.log(sqlQuery);
  dbConnect.query(sqlQuery, [status, id], (err, results) => {
    if (err) {
      throw err;
    }
    res.send({
      status: 200,
      error: false,
      data: results,
      message: "update complete",
    });
  });
});

// Delete Todo
app.delete("/api/todos/:id", (req, res) => {
  let id = req.params.id;
  let sqlQuery = "DELETE FROM todos WHERE id = ?";
  console.log(sqlQuery);
  dbConnect.query(sqlQuery, id, (err, results) => {
    if (err) throw err;
    res.send({
      status: 200,
      error: false,
      data: results,
      message: "deleted todo",
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
