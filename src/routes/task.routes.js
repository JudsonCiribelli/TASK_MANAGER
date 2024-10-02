const express = require("express");

const TaskControllers = require("../controllers/task.controllers");
const Router = express.Router();
const TaskModel = require("../models/task.models");

Router.get("/", async (req, res) => {
  return new TaskControllers(req, res).getTasks();
});

Router.get("/:id", async (req, res) => {
  return new TaskControllers(req, res).getTasksById();
});

Router.patch("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;

    const taskToUpdate = await TaskModel.findById(taskId);

    const allowedUpdates = ["isCompleted"];
    const requestedUpdates = Object.keys(taskData);

    for (update of requestedUpdates) {
      if (allowedUpdates.includes(update)) {
        taskToUpdate[update] = taskData[update];
      } else {
        return res
          .status(500)
          .send("Alguns campos inseridos não são editáveis");
      }
    }

    await taskToUpdate.save();
    return res.status(200).send(taskToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

Router.post("/:id", async (req, res) => {
  try {
    const newTask = new TaskModel(req.body);
    await newTask.save();

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const tasksId = req.params.id;

    const tasksToDelete = await TaskModel.findById(tasksId);

    if (!tasksToDelete) {
      return res.status(404).send("Esta tarefa não foi encontrada.");
    }

    const deleteTasks = await TaskModel.findByIdAndDelete(tasksId);
    res.status(200).send(deleteTasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Router;
