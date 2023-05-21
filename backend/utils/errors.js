// class GeneralError extends Error {
//   constructor(message, type) {
//     super(message);
//     this.type = type;
//   }

//   checkError() {
//     if (this instanceof BadRequestError) {
//       return 400;
//     }
//     if (this instanceof UnauthorizedError) {
//       return 401;
//     }
//     if (this instanceof ForbiddenError) {
//       return 403;
//     }
//     if (this instanceof NotFoundError) {
//       return 404;
//     }
//     if (this instanceof ConflictError) {
//       return 409;
//     }
//   }
// }

// class BadRequestError extends GeneralError {}
// class UnauthorizedError extends GeneralError {}
// class ForbiddenError extends GeneralError {}
// class NotFoundError extends GeneralError {}
// class ConflictError extends GeneralError {}

// module.exports = {
//   GeneralError,
//   BadRequestError,
//   UnauthorizedError,
//   ForbiddenError,
//   NotFoundError,
//   ConflictError,
// };

// const handleErrors = (err, req, res, next) => {
//   if (this instanceof BadRequestError) {
//     res.status(STATUS_BAD_REQUEST).json({ message: err.message })
//     return;
//   }
//   if (this instanceof UnauthorizedError) {
//     res.status(STATUS_UNAUTHORIZED).json({ message: err.message })
//     return;
//   }
//   if (this instanceof ForbiddenError) {
//     res.status(STATUS_FORBIDDEN).json({ message: err.message })
//     return;
//   }
//   if (this instanceof NotFoundError) {
//     res.status(STATUS_NOT_FOUND).json({ message: err.message })
//     return;
//   }
//   if (this instanceof ConflictError) {
//     res.status(STATUS_CONFLICT).json({ message: err.message })
//     return;
//   }
//   return res.status(STATUS_INTERNAL_SERVER_ERROR).json({
//     message: "На сервере произошла ошибка",
//   });
// };
