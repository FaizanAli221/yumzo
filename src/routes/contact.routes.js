const express = require("express");
const { submitContact } = require("../controllers/contact.controller");
const validate = require("../middlewares/validate");
const { contactSchema } = require("../validations/contact.validation");
const { contactLimiter } = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/", contactLimiter, validate(contactSchema), submitContact);

module.exports = router;
