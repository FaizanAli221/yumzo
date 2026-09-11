const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const config = require("./config/env");
const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const { generalLimiter } = require("./middlewares/rateLimiter");
const { sendSuccess } = require("./utils/apiResponse");

const app = express();

/* ---------- Security & core middleware ---------- */
app.use(helmet());
app.use(
  cors({
    origin: config.allowedOrigins.includes("*") ? true : config.allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

if (!config.isProduction) {
  app.use(morgan("dev"));
}

app.use(generalLimiter);

/* ---------- Root & API routes ----------
 * Everything lives under /api — both locally and on Vercel — so the
 * exact same URLs work in development and production. Vercel's
 * "/api/(.*)" route forwards the full original path (including the
 * "/api" prefix) into this function, so Express must mount here too.
 */
app.get("/", (req, res) =>
  sendSuccess(res, {
    data: {
      name: "Yummzo Foods API",
      version: config.apiVersion,
      docs: "See README.md for full endpoint documentation.",
    },
  })
);

app.use("/api", routes);

/* ---------- 404 + centralized error handling ---------- */
app.use(notFound);
app.use(errorHandler);

module.exports = app;
