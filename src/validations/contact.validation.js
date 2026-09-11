const Joi = require("joi");

/**
 * Validation schema for POST /api/contact.
 * `name` is optional; email/subject/message are required and sanitized
 * (trimmed, length-bounded) before ever reaching the controller.
 */
const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).optional(),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  subject: Joi.string().trim().min(3).max(120).required().messages({
    "string.min": "Subject must be at least 3 characters.",
    "any.required": "Subject is required.",
  }),
  message: Joi.string().trim().min(10).max(1000).required().messages({
    "string.min": "Message must be at least 10 characters.",
    "any.required": "Message is required.",
  }),
});

module.exports = { contactSchema };
