const { sendSuccess } = require("../utils/apiResponse");
const config = require("../config/env");

const startedAt = Date.now();

/**
 * GET /api/health
 * Lightweight liveness/readiness check — safe to hit from uptime monitors.
 */
function getHealth(req, res) {
  return sendSuccess(res, {
    data: {
      status: "ok",
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      environment: config.env,
      apiVersion: config.apiVersion,
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = { getHealth };
