const leadsStore = require("../data/leads.store");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * POST /api/contact
 * Body is already validated & sanitized by the `validate(contactSchema)`
 * middleware before this controller runs.
 */
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const lead = await leadsStore.save({ name, email, subject, message });

  // eslint-disable-next-line no-console
  console.log(`[LEAD RECEIVED] ${lead.id} — ${lead.email} — "${lead.subject}"`);

  return sendSuccess(res, {
    statusCode: 201,
    message: "Thanks for reaching out — we'll get back to you soon.",
    data: { id: lead.id, receivedAt: lead.createdAt },
  });
});

module.exports = { submitContact };
