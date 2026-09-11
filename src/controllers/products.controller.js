const productsData = require("../data/products.data");
const categoriesData = require("../data/categories.data");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/products
 * Supports ?category=<slug>  ?featured=true|false  ?search=<term>
 */
const getProducts = asyncHandler(async (req, res) => {
  const { category, featured, search } = req.query;

  if (category) {
    const categoryExists = await categoriesData.findBySlug(category);
    if (!categoryExists) {
      throw ApiError.badRequest(`Unknown category "${category}".`);
    }
  }

  const filters = {
    category,
    search,
    ...(featured !== undefined ? { featured: featured === "true" } : {}),
  };

  const products = await productsData.findAll(filters);

  return sendSuccess(res, {
    data: products,
    meta: { count: products.length, filters },
  });
});

/**
 * GET /api/products/:id
 * Accepts either the product id (e.g. prod_101) or its slug.
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productsData.findById(id);

  if (!product) {
    throw ApiError.notFound(`No product found with id/slug "${id}".`);
  }

  return sendSuccess(res, { data: product });
});

module.exports = { getProducts, getProductById };
