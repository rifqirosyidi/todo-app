const express = require('express')
const bodyParser = require('body-parser')
const dbConnect = require('./models/connection')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

// Show All Todos
app.get('/api/todos/', (req, res) => {
    let sqlQuery = "SELECT * FROM todos"
    dbConnect.query(sqlQuery, (error, results) => {
        if (error) { 
            throw error 
        }
        return res.send({ status: 200, error: false, data: results, message: "list of todos" })
    })
})

// Show Single Todo
app.get('/api/todo/:id', (req, res) => {
    let todoId = req.params.id
    let initialQuery = "SELECT * FROM todos WHERE id = "
    let sqlQuery = initialQuery.concat(todoId)
    dbConnect.query(sqlQuery, (error, results) => {
        if (error) { 
            throw error 
        }
        return res.send({ status: 200, error: false, data: results, message: "todo" })
    })
})

// Add New Todo
app.post('/api/todos', (req, res) => {

    console.log(req.body)
    let todo = req.body.todo
    if (!todo) {
        return res.status(400).send({error: true, message: 'please provie todo'})
    }

    let sqlQuery = "INSERT INTO todos SET ?"
    dbConnect.query(sqlQuery, {todo: todo}, (error, results) => {
        res.send({ status: 200, error: false, data: results, message: "add todo" })
    })
})

// Update Todo
app.put('/api/todos/:id', (req, res) => {
    let sqlQuery = "UPDATE todos SET todo = '" + req.body.todo + "' WHERE id = " + req.params.id;
    dbConnect.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send({ status: 200, error: false, data: results, message: "update todo" })
    })
})



// Delete Todo
app.delete('/api/todos/:id', (req, res) => {
    let sqlQuery = "DELETE FROM todos WHERE id = "+ req.params.id;
    console.log(sqlQuery)
    dbConnect.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send({ status: 200, error: false, data: results, message: "deleted todo" })
    })
})


app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`)
})