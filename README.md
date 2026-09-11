# Yummzo Foods API

A production-ready REST API for **Yummzo Foods** — an FMCG/D2C snack e-commerce
brand. Built with Express.js, deployed as zero-config **Vercel Serverless
Functions**, with layered validation, centralized error handling, and rate
limiting baked in.

```
GET  /api/health
GET  /api/categories
GET  /api/categories/:slug
GET  /api/products
GET  /api/products/:id
POST /api/contact
```

---

## Architecture Overview

The project follows a **layered, controller-service-data** structure so each
concern can be swapped independently (e.g. replacing the in-memory data layer
with Prisma/PostgreSQL touches only `src/data/*`, nothing else):

```
yummzo-foods-api/
├── api/
│   └── index.js            # Vercel serverless entry — exports the Express app
├── server.js                # Local-only dev entry (app.listen)
├── src/
│   ├── app.js                # Express app assembly: middleware + routes
│   ├── config/
│   │   └── env.js             # Single source of truth for process.env
│   ├── routes/                # Thin route definitions per resource
│   │   ├── index.js
│   │   ├── health.routes.js
│   │   ├── categories.routes.js
│   │   ├── products.routes.js
│   │   └── contact.routes.js
│   ├── controllers/           # Request/response orchestration
│   │   ├── health.controller.js
│   │   ├── categories.controller.js
│   │   ├── products.controller.js
│   │   └── contact.controller.js
│   ├── data/                  # Data-access layer (swap for a real DB later)
│   │   ├── categories.data.js
│   │   ├── products.data.js
│   │   └── leads.store.js
│   ├── validations/            # Joi schemas
│   │   └── contact.validation.js
│   ├── middlewares/
│   │   ├── validate.js          # Generic Joi-schema middleware factory
│   │   ├── rateLimiter.js        # General + endpoint-specific limiters
│   │   ├── notFound.js            # Catch-all 404
│   │   └── errorHandler.js         # Centralized error → JSON translation
│   └── utils/
│       ├── apiResponse.js          # sendSuccess / sendError envelopes
│       ├── asyncHandler.js          # try/catch-free async controllers
│       └── ApiError.js               # Typed operational errors
├── vercel.json
├── package.json
├── .env.example
└── .gitignore
```

**Request lifecycle:** `helmet` → `cors` → body parsers → `morgan` (dev only)
→ general rate limiter → route → controller (`asyncHandler`-wrapped) → data
layer → `sendSuccess` **or** thrown `ApiError` → `errorHandler` → `sendError`.

Every response — success or failure — uses one of two consistent envelopes:

```jsonc
// Success
{ "success": true, "data": { /* ... */ }, "meta": { /* optional */ } }

// Error
{ "success": false, "error": { "message": "...", "code": "...", "details": [] } }
```

> **Note on serverless statelessness:** `leads.store.js` and the health
> check's `uptimeSeconds` live in memory, which is fine for local dev but
> resets on every cold start once deployed to Vercel. The interface
> (`save()`, `findAll()`) is written so swapping in Postgres/Prisma or a
> webhook dispatch later requires no controller changes.

---

## API Documentation

Base URL (local): `http://localhost:5000/api`
Base URL (Vercel): `https://<your-project>.vercel.app/api`

### `GET /api/health`
Liveness check with uptime, environment, and API version.

```bash
curl https://<your-project>.vercel.app/api/health
```

### `GET /api/categories`
List every snack category.

```bash
curl https://<your-project>.vercel.app/api/categories
```

### `GET /api/categories/:slug`
Category details plus its associated products. Returns `404` if the slug
doesn't exist.

```bash
curl https://<your-project>.vercel.app/api/categories/energy-bites
```

### `GET /api/products`
Filterable product catalog. All query params are optional and combinable.

| Query param  | Type    | Example                  |
|--------------|---------|---------------------------|
| `category`   | string  | `?category=flavoured-nuts` |
| `featured`   | boolean | `?featured=true`            |
| `search`     | string  | `?search=coffee`             |

```bash
curl "https://<your-project>.vercel.app/api/products?category=energy-bites&featured=true"
curl "https://<your-project>.vercel.app/api/products?search=chilly"
```

### `GET /api/products/:id`
Single product by id (`prod_101`) or slug (`peri-peri-makhana`). Returns
`404` if not found.

```bash
curl https://<your-project>.vercel.app/api/products/prod_101
```

### `POST /api/contact`
Validated lead capture. Rate-limited to 5 requests / 15 min per IP.

```bash
curl -X POST https://<your-project>.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Faizan",
        "email": "faizan@example.com",
        "subject": "Bulk order enquiry",
        "message": "Interested in wholesale pricing for cafes."
      }'
```

Validation failure example (`400`):

```bash
curl -X POST https://<your-project>.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email": "not-an-email", "subject": "hi", "message": "short"}'
```

---

## Local Setup

```bash
git clone <your-repo-url> yummzo-foods-api
cd yummzo-foods-api
npm install
cp .env.example .env
npm run dev          # nodemon, http://localhost:5000
# or
npm start            # plain node
```

All routes are available under `http://localhost:5000/api/...` — matching
production exactly, since `server.js` mounts the same Express app used by the
Vercel function.

---

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm i -g vercel
vercel login
vercel                # first deploy, follow the prompts
vercel --prod         # promote to production
```

**Option B — Git integration**

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel detects `vercel.json` automatically — no build step needed.
4. Add any environment variables from `.env.example` under
   **Project Settings → Environment Variables**.
5. Deploy. Your API is live at `https://<project>.vercel.app/api/...`.

`vercel.json` routes every request under `/api/(.*)` to the single
`api/index.js` serverless function, which exports the Express app directly —
zero extra configuration required.

---

## Design Patterns & Highlights (for your CV/Portfolio)

- Layered **controller → service/data-access** architecture with a
  swappable data layer (in-memory today, Prisma/PostgreSQL-ready)
- **Centralized error handling** via a typed `ApiError` class and a single
  `errorHandler` middleware — no repeated try/catch in controllers
- **`asyncHandler` wrapper** pattern to keep async/await controllers clean
  and crash-safe
- **Schema-based validation & sanitization** with Joi, enforced through a
  reusable `validate(schema)` middleware factory
- **Security hardening**: `helmet` for HTTP headers, scoped `cors`, and
  tiered `express-rate-limit` (general + stricter contact-form limiter)
- **Consistent JSON response envelope** (`{ success, data }` /
  `{ success, error }`) across every endpoint
- **Zero-config serverless deployment**: single Express app dual-purposed
  as both a local `http.Server` (`server.js`) and a Vercel serverless
  function (`api/index.js`) with no code duplication
- Environment-driven configuration (`src/config/env.js`) — no scattered
  `process.env` calls throughout the codebase
