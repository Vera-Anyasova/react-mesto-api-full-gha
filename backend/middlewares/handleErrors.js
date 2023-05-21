// const mongoose = require("mongoose");
const BadRequestError = require("../utils/errors/bad-request-error");
const UnauthorizedError = require("../utils/errors/unauthorized-error");
const ForbiddenError = require("../utils/errors/forbidden-error");
const NotFoundError = require("../utils/errors/not-found-error");
const ConflictError = require("../utils/errors/not-found-error");

const {
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../constants");

const handleErrors = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(STATUS_BAD_REQUEST).send({ message: err.message });
    return;
  }
  if (err instanceof UnauthorizedError) {
    res.status(STATUS_UNAUTHORIZED).send({ message: err.message });
    return;
  }
  if (err instanceof ForbiddenError) {
    res.status(STATUS_FORBIDDEN).send({ message: err.message });
    return;
  }
  if (err instanceof NotFoundError) {
    res.status(STATUS_NOT_FOUND).send({ message: err.message });
    return;
  }
  if (err instanceof ConflictError) {
    res.status(STATUS_CONFLICT).send({ message: err.message });
    return;
  }
  return res.status(STATUS_INTERNAL_SERVER_ERROR).send({
    message: "На сервере произошла ошибка",
  });
};

module.exports = handleErrors;

// const handleErrors = (err, req, res, next) => {
//   if (err instanceof GeneralError) {
//     return res.status(err.checkError()).send({
//       status: console.log(err),
//       message: err.message,
//     });
//   }

//   if (
//     err instanceof mongoose.Error.CastError ||
//     err instanceof mongoose.Error.ValidationError
//   ) {
//     res
//       .status(BadRequestError)
//       .send({ message: "Сlient sent an invalid request" });
//   }

//   return res.status(500).send({
//     message: "На сервере произошла ошибка",
//   });
// };
