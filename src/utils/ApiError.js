/**
 * Typed application error. Throw this from anywhere in the request
 * lifecycle and the centralized error handler will translate it into
 * the correct HTTP status code and JSON envelope.
 */
class ApiError extends Error {
  constructor(statusCode, message, code = "API_ERROR", details = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message, details) {
    return new ApiError(400, message, "BAD_REQUEST", details);
  }

  static notFound(message) {
    return new ApiError(404, message, "NOT_FOUND");
  }

  static tooManyRequests(message) {
    return new ApiError(429, message, "RATE_LIMITED");
  }

  static internal(message) {
    return new ApiError(500, message, "INTERNAL_ERROR");
  }
}

module.exports = ApiError;
