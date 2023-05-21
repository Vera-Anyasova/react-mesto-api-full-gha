// const mongoose = require("mongoose");
const { BadRequestError } = require("../utils/errors/bad-request-error");
const { UnauthorizedError } = require("../utils/errors/unauthorized-error");
const { ForbiddenError } = require("../utils/errors/forbidden-error");
const { NotFoundError } = require("../utils/errors/not-found-err");
const { ConflictError } = require("../utils/errors/conflict-error");

const handleErrors = (err, req, res, next) => {
  if (this instanceof BadRequestError) {
    res.status(STATUS_BAD_REQUEST).send({ message: err.message });
    return;
  }
  if (this instanceof UnauthorizedError) {
    res.status(STATUS_UNAUTHORIZED).send({ message: err.message });
    return;
  }
  if (this instanceof ForbiddenError) {
    res.status(STATUS_FORBIDDEN).send({ message: err.message });
    return;
  }
  if (this instanceof NotFoundError) {
    res.status(STATUS_NOT_FOUND).send({ message: err.message });
    return;
  }
  if (this instanceof ConflictError) {
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
