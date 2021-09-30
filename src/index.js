const { request, response } = require("express");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

const users = [];

app.use(cors());
app.use(express.json());

// const users = [];

function checksExistsUserAccount(request, response, next) {
 next()
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  users.push({
    username,
    name,
    id: uuidv4(),
    todos: [],
  });

  return response.status(201).send(users);
});

app.get("/todos/:username", checksExistsUserAccount, (request, response) => {
  const { username } = request.params;

  const user = users.find((user) => user.username === username);

  return response.json(user.todos);
});

app.post("/todos/:username", checksExistsUserAccount, (request, response) => {
  const { username } = request.params;

  const user = users.find((user) => user.username === username);

  const { title, deadline } = request.body;

  user.todos.push({
    id: uuidv4(),
    title: title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  });

  return response.status(201).send(user.todos);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
