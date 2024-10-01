const express = require("express");
const Router = express.Router();
const TaskModel = require("../models/task.models");

Router.get("/", async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).send("Not Found!");
    }

    return res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
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
