/**
 * In-memory products store.
 * Each product references a category by slug (`categorySlug`) to keep
 * the shape close to what a real relational schema would look like.
 */

const products = [
  {
    id: "prod_101",
    slug: "peri-peri-makhana",
    name: "Peri Peri Makhana",
    categorySlug: "flavoured-nuts",
    price: 249,
    currency: "PKR",
    weight: "200g",
    featured: true,
    inStock: true,
    description:
      "Roasted fox nuts (makhana) tossed in a tangy peri peri seasoning. Gluten-free and high in protein.",
    tags: ["gluten-free", "high-protein", "roasted"],
    nutrition: { servingSize: "30g", calories: 120, protein: "4g", fat: "5g", carbs: "15g", sugar: "1g" },
    images: ["/images/products/peri-peri-makhana.png"],
    createdAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "prod_102",
    slug: "walnut-date-energy-bites",
    name: "Walnut & Date Energy Bites",
    categorySlug: "energy-bites",
    price: 199,
    currency: "PKR",
    weight: "150g",
    featured: true,
    inStock: true,
    description:
      "No-added-sugar energy bites made with walnuts, dates, and a pinch of sea salt.",
    tags: ["no-added-sugar", "vegan", "on-the-go"],
    nutrition: { servingSize: "25g", calories: 105, protein: "2g", fat: "6g", carbs: "12g", sugar: "8g" },
    images: ["/images/products/walnut-date-bites.png"],
    createdAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "prod_103",
    slug: "saffron-cardamom-instant-tea",
    name: "Saffron & Cardamom Instant Tea",
    categorySlug: "gummies",
    price: 349,
    currency: "PKR",
    weight: "10 sachets",
    featured: true,
    inStock: true,
    description:
      "A single-serve instant tea blend with real saffron threads and cardamom — steep anywhere, anytime.",
    tags: ["instant", "aromatic", "travel-friendly"],
    nutrition: { servingSize: "1 sachet", calories: 15, protein: "0g", fat: "0g", carbs: "3g", sugar: "2g" },
    images: ["/images/products/saffron-cardamom-tea.png"],
    createdAt: "2024-02-02T00:00:00.000Z",
  },
  {
    id: "prod_104",
    slug: "vegan-chicken-tikka-bites",
    name: "Vegan Chicken Tikka Bites",
    categorySlug: "vegan-food",
    price: 429,
    currency: "PKR",
    weight: "250g",
    featured: false,
    inStock: true,
    description:
      "Plant-based tikka-style bites marinated in a smoky tandoori spice blend. Ready in 5 minutes.",
    tags: ["plant-based", "high-protein", "ready-to-cook"],
    nutrition: { servingSize: "100g", calories: 180, protein: "14g", fat: "7g", carbs: "10g", sugar: "2g" },
    images: ["/images/products/vegan-chicken-tikka.png"],
    createdAt: "2024-02-03T00:00:00.000Z",
  },
  {
    id: "prod_105",
    slug: "coffee-energy-bite",
    name: "Coffee Energy Bite",
    categorySlug: "energy-bites",
    price: 179,
    currency: "PKR",
    weight: "150g",
    featured: false,
    inStock: true,
    description: "A caffeinated take on the classic energy bite — real espresso, dates, and cacao nibs.",
    tags: ["caffeinated", "vegan"],
    nutrition: { servingSize: "25g", calories: 110, protein: "3g", fat: "5g", carbs: "13g", sugar: "9g" },
    images: ["/images/products/coffee-energy-bite.png"],
    createdAt: "2024-02-03T00:00:00.000Z",
  },
  {
    id: "prod_106",
    slug: "chilly-cashew-nuts",
    name: "Chilly Cashew Nuts",
    categorySlug: "flavoured-nuts",
    price: 399,
    currency: "PKR",
    weight: "200g",
    featured: true,
    inStock: true,
    description: "Whole roasted cashews finished with a fiery red chilly coating.",
    tags: ["spicy", "roasted", "high-protein"],
    nutrition: { servingSize: "30g", calories: 170, protein: "5g", fat: "13g", carbs: "8g", sugar: "1g" },
    images: ["/images/products/chilly-cashew-nuts.png"],
    createdAt: "2024-02-04T00:00:00.000Z",
  },
  {
    id: "prod_107",
    slug: "jalapeno-jowar-puffs",
    name: "Jalapeño Jowar Puffs",
    categorySlug: "jowar-puffs",
    price: 149,
    currency: "PKR",
    weight: "80g",
    featured: false,
    inStock: true,
    description: "Airy sorghum puffs seasoned with a tangy jalapeño coating. Baked, not fried.",
    tags: ["gluten-free", "baked", "low-oil"],
    nutrition: { servingSize: "20g", calories: 85, protein: "2g", fat: "2g", carbs: "15g", sugar: "1g" },
    images: ["/images/products/jalapeno-jowar-puffs.png"],
    createdAt: "2024-02-04T00:00:00.000Z",
  },
  {
    id: "prod_108",
    slug: "hemp-gummies-mixed-fruit",
    name: "Hemp Gummies — Mixed Fruit",
    categorySlug: "gummies",
    price: 599,
    currency: "PKR",
    weight: "100g",
    featured: false,
    inStock: true,
    description: "Chewy mixed-fruit gummies infused with hemp seed extract.",
    tags: ["hemp-infused", "chewy"],
    nutrition: { servingSize: "5 gummies", calories: 90, protein: "0g", fat: "0g", carbs: "22g", sugar: "18g" },
    images: ["/images/products/hemp-gummies.png"],
    createdAt: "2024-02-05T00:00:00.000Z",
  },
  {
    id: "prod_109",
    slug: "peanut-chikki",
    name: "Peanut Chikki",
    categorySlug: "chikki",
    price: 129,
    currency: "PKR",
    weight: "200g",
    featured: false,
    inStock: true,
    description: "Traditional jaggery-peanut brittle, made in small batches with no refined sugar.",
    tags: ["traditional", "no-refined-sugar"],
    nutrition: { servingSize: "40g", calories: 190, protein: "6g", fat: "9g", carbs: "22g", sugar: "16g" },
    images: ["/images/products/peanut-chikki.png"],
    createdAt: "2024-02-05T00:00:00.000Z",
  },
  {
    id: "prod_110",
    slug: "jeera-baked-bhakri",
    name: "Jeera Baked Bhakri",
    categorySlug: "baked-bhakri",
    price: 219,
    currency: "PKR",
    weight: "180g",
    featured: false,
    inStock: true,
    description: "Thin, oven-baked millet crackers seasoned with roasted cumin (jeera).",
    tags: ["baked", "low-oil", "millet"],
    nutrition: { servingSize: "30g", calories: 130, protein: "3g", fat: "4g", carbs: "20g", sugar: "1g" },
    images: ["/images/products/jeera-baked-bhakri.png"],
    createdAt: "2024-02-06T00:00:00.000Z",
  },
  {
    id: "prod_111",
    slug: "garlic-multigrain-thin-bites",
    name: "Garlic Multigrain Thin Bites",
    categorySlug: "thin-bites",
    price: 169,
    currency: "PKR",
    weight: "150g",
    featured: true,
    inStock: true,
    description: "Ultra-thin multigrain crisps with roasted garlic — light, low-oil crunch.",
    tags: ["low-oil", "multigrain"],
    nutrition: { servingSize: "20g", calories: 88, protein: "2g", fat: "2g", carbs: "16g", sugar: "1g" },
    images: ["/images/products/garlic-multigrain-thin-bites.png"],
    createdAt: "2024-02-06T00:00:00.000Z",
  },
  {
    id: "prod_112",
    slug: "salty-crack-nuts",
    name: "Salty Crack Nuts",
    categorySlug: "coated-nuts",
    price: 229,
    currency: "PKR",
    weight: "200g",
    featured: false,
    inStock: false,
    description: "Batter-coated peanuts with a crackling salted shell.",
    tags: ["crunchy", "salted"],
    nutrition: { servingSize: "30g", calories: 160, protein: "5g", fat: "10g", carbs: "12g", sugar: "1g" },
    images: ["/images/products/salty-crack-nuts.png"],
    createdAt: "2024-02-07T00:00:00.000Z",
  },
];

/**
 * @param {{ category?: string, featured?: boolean, search?: string }} filters
 * @returns {Promise<Array>}
 */
async function findAll(filters = {}) {
  let result = [...products];
  const { category, featured, search } = filters;

  if (category) {
    result = result.filter((p) => p.categorySlug === category.toLowerCase());
  }

  if (typeof featured === "boolean") {
    result = result.filter((p) => p.featured === featured);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result;
}

/** @param {string} id @returns {Promise<Object|undefined>} */
async function findById(id) {
  return products.find((p) => p.id === id || p.slug === id);
}

/** @param {string} categorySlug @returns {Promise<Array>} */
async function findByCategory(categorySlug) {
  return products.filter((p) => p.categorySlug === categorySlug.toLowerCase());
}

module.exports = { findAll, findById, findByCategory };
