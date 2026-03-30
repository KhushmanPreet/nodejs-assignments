const express = require("express")
const app = express();

app.use(express.json())
let todos = [];


app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

app.get('/todos', (req, res) => {
    res.json(todos);
})

app.post("/create/todo", (req, res) => {

    const {title, description} = req.body || {};
    console.log(req.body);
    

    if (!title || !description) {
        return res.sendStatus(400)
    }
    const newTodo = {
        id: todos.length + 1,
        title, description
    }
    todos.push(newTodo)

    res.status(200).json(todos);
})

app.get('/todo', (req, res) => {
    const id = parseInt(req.query.id);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        res.status(404).json({"error": "Todo not found"})
    }
    else {
        res.status(200).json(todo);
    }

})

app.delete('/todo',(req, res) => {
    const id = Number(req.query.id);

    const todo = todos.find(t => t.id === id);


    if (!todo) {
        res.status(404).json({"error": "Todo not found"})
    }
    else {
        console.log(todos);
        todos = todos.filter(t => t.id !== id);
        console.log(todos);
        
        res.sendStatus(200);
    }
})


app.listen(3000);