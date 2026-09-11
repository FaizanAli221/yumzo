const { sendError } = require("../utils/apiResponse");
const config = require("../config/env");

/**
 * Centralized error-handling middleware. Every thrown/forwarded error
 * (via next(err) or asyncHandler) ends up here exactly once, so the
 * JSON error shape is guaranteed to be consistent across the whole API.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.isOperational ? err.message : "Internal server error.";

  if (!err.isOperational) {
    // Unexpected/programmer errors — log full detail server-side only.
    // eslint-disable-next-line no-console
    console.error("[UNHANDLED ERROR]", err);
  }

  return sendError(res, {
    statusCode,
    message,
    code,
    details: err.details || (!config.isProduction && !err.isOperational ? err.stack : null),
  });
}

module.exports = errorHandler;
