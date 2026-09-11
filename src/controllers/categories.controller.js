const categoriesData = require("../data/categories.data");
const productsData = require("../data/products.data");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { sendSuccess } = require("../utils/apiResponse");

/**
 * GET /api/categories
 * Lists every snack category with its metadata.
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoriesData.findAll();
  return sendSuccess(res, {
    data: categories,
    meta: { count: categories.length },
  });
});

/**
 * GET /api/categories/:slug
 * Returns a single category plus the products that belong to it.
 */
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const category = await categoriesData.findBySlug(slug);

  if (!category) {
    throw ApiError.notFound(`No category found with slug "${slug}".`);
  }

  const products = await productsData.findByCategory(slug);

  return sendSuccess(res, {
    data: { ...category, products },
    meta: { productCount: products.length },
  });
});

module.exports = { getCategories, getCategoryBySlug };
