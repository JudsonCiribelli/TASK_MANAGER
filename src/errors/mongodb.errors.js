const notFoundError = (res) => {
  return res
    .status(404)
    .send("O id inserido não foi encontrado no banco de dados!");
};

const obejectIdError = (res) => {
  return res.status(500).send("Error ao recuperar dados.");
};

module.exports = {
  notFoundError,
  obejectIdError,
};
