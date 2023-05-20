const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "jwt-secret"
    );
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = { _id: payload._id };

  next();
};
