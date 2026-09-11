/**
 * In-memory lead store for /api/contact submissions.
 *
 * NOTE: Serverless functions are stateless between invocations —
 * this module is a demonstration of the storage interface only.
 * In production, swap `save()` for a real write (Postgres, a
 * headless CRM, an email/webhook dispatch, etc.) without changing
 * the controller that calls it.
 */
const { v4: uuidv4 } = require("uuid");

const leads = [];

/**
 * @param {{ name?: string, email: string, subject: string, message: string }} payload
 * @returns {Promise<Object>} the stored lead record
 */
async function save(payload) {
  const lead = {
    id: uuidv4(),
    ...payload,
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  return lead;
}

/** @returns {Promise<Array>} all leads captured during this process's lifetime */
async function findAll() {
  return leads;
}

module.exports = { save, findAll };
