const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.models");

//inicializando o express
dotenv.config();
const app = express();
connectToDatabase();

app.get("/", async (req, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).send(tasks);
});
//iniciar servidor
app.listen(800, () => {
  console.log("Listening on port 800!");
});
