const { sendError } = require("../utils/apiResponse");

/**
 * Generic Joi-schema validation middleware factory.
 * Usage: router.post('/contact', validate(contactSchema), controller)
 */
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    return sendError(res, {
      statusCode: 400,
      message: "Validation failed.",
      code: "VALIDATION_ERROR",
      details,
    });
  }

  req.body = value;
  next();
};

module.exports = validate;
