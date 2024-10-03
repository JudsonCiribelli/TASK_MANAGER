const mongoose = require("mongoose");
const TaskModel = require("../models/task.models");

const { notFoundError, obejectIdError } = require("../errors/mongodb.errors");
const { notAllowedFillToUpdateError } = require("../errors/general.errors");

class TaskControllers {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const tasks = await TaskModel.find({});
      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return notFoundError(this.res);
      }

      return this.res.status(200).send(task);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return obejectIdError(this.res);
      }
      this.res.status(500).send(error.message);
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(this.req.body);
      await newTask.save();

      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const taskToUpdate = await TaskModel.findById(taskId);

      if (!taskToUpdate) {
        return notFoundError(this.res);
      }

      const allowedUpdates = ["isCompleted"];
      const requestedUpdates = Object.keys(taskData);

      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return notAllowedFillToUpdateError(this.res);
        }
      }

      await taskToUpdate.save();
      return this.res.status(200).send(taskToUpdate);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return obejectIdError(this.res);
      }
      this.res.status(500).send(error.message);
    }
  }
  async deleteTasks() {
    try {
      const tasksId = this.req.params.id;

      const tasksToDelete = await TaskModel.findById(tasksId);

      if (!tasksToDelete) {
        return notFoundError(this.res);
      }

      const deleteTasks = await TaskModel.findByIdAndDelete(tasksId);
      this.res.status(200).send(deleteTasks);
    } catch (error) {
      this.res.status(500).send(error.message);
    }
  }
}

module.exports = TaskControllers;
