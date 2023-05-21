class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
