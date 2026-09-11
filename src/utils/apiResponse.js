/**
 * Consistent JSON response envelopes used across every controller.
 * Success: { success: true, data, meta? }
 * Error:   { success: false, error: { message, code?, details? } }
 */

function sendSuccess(res, { statusCode = 200, data = null, meta = null, message = null }) {
  const body = { success: true };
  if (message) body.message = message;
  body.data = data;
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
}

function sendError(res, { statusCode = 500, message = "Something went wrong", code = "INTERNAL_ERROR", details = null }) {
  const body = {
    success: false,
    error: { message, code },
  };
  if (details) body.error.details = details;
  return res.status(statusCode).json(body);
}

module.exports = { sendSuccess, sendError };
