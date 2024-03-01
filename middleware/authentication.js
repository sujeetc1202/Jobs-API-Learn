const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticationError } = require("../errors");

const auth = (req, res, next) => {
  // header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticationError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //   attach the user to job role
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticationError("Authentication Invalid");
  }
};

module.exports = auth;
