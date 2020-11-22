const express = require("express");


const app = express();


const port = 5000;
app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port ${port}...`);
});


app.use(express.static("public"));



app.use(express.json());

let users = [
  { name: "Visitor 1", age: 20, id: 1 },
  { name: "Visitor 2", age: 23, id: 2 },
  { name: "Visitor 3", age: 22, id: 3 },
];

console.log(users);


app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});


app.post("/api/users", (req, res) => {
  let newUser = { ...req.body, id: Math.random() };
  users.push(newUser);
  res.status(200).json({
    msg: "User added with success",
    users,
  });
});


app.delete("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.status(200).json({
    msg: "User has been deleted",
    users,
  });
});


app.put("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.map((user) =>
    user.id === id ? { ...user, ...req.body } : user
  );
  res.status(200).json({
    msg: "User has been updated",
    users,
  });
});