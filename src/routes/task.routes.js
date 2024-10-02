const express = require("express");

const TaskControllers = require("../controllers/task.controllers");
const Router = express.Router();
const TaskModel = require("../models/task.models");
const { Transaction } = require("mongodb");

Router.get("/", async (req, res) => {
  return new TaskControllers(req, res).getAll();
});

Router.get("/:id", async (req, res) => {
  return new TaskControllers(req, res).getById();
});

Router.patch("/:id", async (req, res) => {
  return new TaskControllers(req, res).create();
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
