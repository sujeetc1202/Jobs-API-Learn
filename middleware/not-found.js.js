const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json("Route doesn't exists!");
};

module.exports = notFoundMiddleware;
