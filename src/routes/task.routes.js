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
  return new TaskControllers(req, res).update();
});

Router.delete("/:id", async (req, res) => {
  return new TaskControllers(req, res).deleteTasks();
});

module.exports = Router;
