/**
 * Local development entry point ONLY.
 * Vercel never runs this file — it uses api/index.js instead.
 */
const app = require("./src/app");
const config = require("./src/config/env");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Yummzo Foods API running at http://localhost:${PORT} [${config.env}]`);
});
