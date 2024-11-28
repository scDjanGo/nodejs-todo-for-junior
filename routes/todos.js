const { Router } = require("express");
const Todo = require("../models/Todo");
const router = Router();

router.get(`/`, async (req, res) => {
  const todos = await Todo.find({}).lean();

//   const todosData = todos.map((todo) => ({
//     completed: todo.completed,
//     title: todo.title,
//     _id: todo._id,
//   }));

//   console.log(todosData);
  res.render(`index`, {
    title: "Todos list",
    isIndex: true,
    todos: todos,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create todo",
    isCreate: true,
  });
});

router.post(`/create`, async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();
  res.redirect("/");
});

router.post(`/complete`, async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  console.log("Completed", req.body)
  todo.completed = !!req.body.completed;
  await todo.save();

  res.redirect("/");
});

module.exports = router;
