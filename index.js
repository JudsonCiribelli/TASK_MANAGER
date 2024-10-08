const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes");
const cors = require("cors");

const connectToDatabase = require("./src/database/mongoose.database");

//inicializando o express
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectToDatabase();

app.use("/tasks", taskRouter);

app.listen(800, () => {
  console.log("Listening on port 800!");
});
