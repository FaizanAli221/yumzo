const express = require("express");

const healthRoutes = require("./health.routes");
const categoriesRoutes = require("./categories.routes");
const productsRoutes = require("./products.routes");
const contactRoutes = require("./contact.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
