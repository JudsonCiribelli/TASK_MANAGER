const express = require("express");

//inicializando o express
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Sucesso!");
});
//iniciar servidor
app.listen(800, () => {
  console.log("Listening on port 8000!");
});
