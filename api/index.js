/**
 * Vercel Serverless Function entry point.
 *
 * vercel.json rewrites every request under /api/(.*) to this file.
 * Exporting the Express app directly works because Express apps are
 * callable as `(req, res) => void`, which is exactly the signature
 * @vercel/node expects from a serverless handler.
 */
const app = require("../src/app");

module.exports = app;
