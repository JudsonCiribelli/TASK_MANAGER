const express = require("express");
const dotenv = require("dotenv");
const connectToDatabase = require("./src/database/mongoose.database");

//inicializando o express
dotenv.config();
const app = express();
connectToDatabase();

app.get("/", (req, res) => {
  res.status(200).send("API RODANDO COM SUCESSO!");
});
//iniciar servidor
app.listen(800, () => {
  console.log("Listening on port 800!");
});
