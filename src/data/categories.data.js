/**
 * In-memory categories store.
 * Swap this module for a Prisma/DB-backed repository later without
 * touching controllers — they only depend on the exported functions.
 */

const categories = [
  {
    id: "cat_001",
    slug: "vegan-food",
    name: "Vegan Food",
    tagline: "Plant-first, protein-packed",
    description:
      "Fully plant-based snacks and meal bites made without compromising on flavor or texture.",
    color: "#6B8E3A",
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "cat_002",
    slug: "energy-bites",
    name: "Energy Bites",
    tagline: "Grab & go fuel",
    description:
      "Dense, naturally sweetened bites built for a quick mid-day energy boost.",
    color: "#B8791C",
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "cat_003",
    slug: "flavoured-nuts",
    name: "Flavoured Nuts",
    tagline: "Roasted daily",
    description: "Slow-roasted nuts tossed in bold, house-blended spice coatings.",
    color: "#C23B1C",
    createdAt: "2024-01-11T00:00:00.000Z",
  },
  {
    id: "cat_004",
    slug: "jowar-puffs",
    name: "Jowar Puffs",
    tagline: "Gluten free",
    description: "Light, airy puffs made from whole jowar (sorghum) grain.",
    color: "#0D6E6E",
    createdAt: "2024-01-11T00:00:00.000Z",
  },
  {
    id: "cat_005",
    slug: "gummies",
    name: "Gummies",
    tagline: "Hemp-infused",
    description: "Chewy, fruit-forward gummies infused with hemp extract.",
    color: "#6B3FA0",
    createdAt: "2024-01-12T00:00:00.000Z",
  },
  {
    id: "cat_006",
    slug: "chikki",
    name: "Chikki",
    tagline: "Traditional & crunchy",
    description: "Classic Indian jaggery-nut brittle, made in small batches.",
    color: "#B85C00",
    createdAt: "2024-01-12T00:00:00.000Z",
  },
  {
    id: "cat_007",
    slug: "baked-bhakri",
    name: "Baked Bhakri",
    tagline: "Slow baked",
    description: "Oven-baked, thin millet crackers seasoned with regional spice blends.",
    color: "#8A5A22",
    createdAt: "2024-01-13T00:00:00.000Z",
  },
  {
    id: "cat_008",
    slug: "thin-bites",
    name: "Thin Bites",
    tagline: "Light crunch",
    description: "Ultra-thin, low-oil multigrain crisps for a lighter snacking option.",
    color: "#0D6E6E",
    createdAt: "2024-01-13T00:00:00.000Z",
  },
  {
    id: "cat_009",
    slug: "coated-nuts",
    name: "Coated Nuts",
    tagline: "Spice-cracked",
    description: "Crunchy batter-coated nuts finished with a spiced cracked shell.",
    color: "#C23B1C",
    createdAt: "2024-01-14T00:00:00.000Z",
  },
];

/** @returns {Promise<Array>} all categories */
async function findAll() {
  return categories;
}

/** @param {string} slug @returns {Promise<Object|undefined>} */
async function findBySlug(slug) {
  return categories.find((c) => c.slug === slug.toLowerCase());
}

module.exports = { findAll, findBySlug };
