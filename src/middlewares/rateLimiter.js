const rateLimit = require("express-rate-limit");
const config = require("../config/env");
const { sendError } = require("../utils/apiResponse");

const handler = (req, res) =>
  sendError(res, {
    statusCode: 429,
    message: "Too many requests. Please try again later.",
    code: "RATE_LIMITED",
  });

/** General limiter applied to every /api/* request. */
const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

/** Stricter limiter for the contact form to deter spam/abuse. */
const contactLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.contactMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

module.exports = { generalLimiter, contactLimiter };
