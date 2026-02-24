import express from "express";

export const taskRouter = express.Router();

taskRouter.get("/", (req, res) => {
  res.json({ 
    tasks: [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ],
   });
});

taskRouter.get("/:id", (req, res) => {
  const taskId = req.params.id;
  res.json({  task: { id: taskId, title: `Task ${taskId}`, completed: false }
  });
});

taskRouter.post("/", (req, res) => {
  const title = req.body.title;
  const completed = req.body.completed;
  res.json({ task: { title, completed} });  
});

taskRouter.put("/:id", (req, res) => {
    const taskId = req.params.id;
    res.json({ 
        task: { id: taskId, title: req.body.title, completed: req.body.completed } 
    });
});

taskRouter.delete("/:id", (req, res) => {
    const taskId = req.params.id;
    res.json({ message: `Task with id ${taskId} deleted` });
});