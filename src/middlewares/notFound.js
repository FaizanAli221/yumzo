const ApiError = require("../utils/ApiError");

/**
 * Catch-all for unmatched routes. Registered after all real routes
 * so it only fires when nothing else handled the request.
 */
function notFound(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} does not exist.`));
}

module.exports = notFound;
