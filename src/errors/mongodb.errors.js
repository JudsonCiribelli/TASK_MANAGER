const notFoundError = (res) => {
  return res
    .status(404)
    .send("O id inserido não foi encontrado no banco de dados!");
};

module.exports = {
  notFoundError,
};
