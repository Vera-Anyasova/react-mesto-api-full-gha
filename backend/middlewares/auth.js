const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "jwt-secret"
    );
  } catch (err) {
    return next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload;

  next();
};
