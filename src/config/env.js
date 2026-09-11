/**
 * Centralized environment configuration.
 * All process.env access happens here so the rest of the app
 * never touches process.env directly — easier to test & mock.
 */
require("dotenv").config();

const toArray = (value, fallback = []) =>
  value ? value.split(",").map((v) => v.trim()).filter(Boolean) : fallback;

const config = {
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  apiVersion: process.env.API_VERSION || "1.0.0",
  allowedOrigins: toArray(process.env.ALLOWED_ORIGINS, ["*"]),
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
    contactMax: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  },
};

module.exports = config;
