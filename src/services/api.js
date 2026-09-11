const API_BASE = "/api";

/**
 * Generic helper for handling fetch requests and standardizing JSON envelopes.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  const result = await response.json();

  if (!response.ok || !result.success) {
    const errorMsg =
      result.error?.message ||
      (result.error?.details ? result.error.details.join(", ") : "API request failed");
    throw new Error(errorMsg);
  }

  return result;
}

/**
 * Fetch API Health Status
 */
export async function fetchHealth() {
  return request("/health");
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
  const res = await request("/categories");
  return res.data;
}

/**
 * Fetch category details by slug
 */
export async function fetchCategoryBySlug(slug) {
  const res = await request(`/categories/${slug}`);
  return res.data;
}

/**
 * Fetch products with optional filters
 * @param {Object} params
 * @param {string} [params.category]
 * @param {boolean} [params.featured]
 * @param {string} [params.search]
 */
export async function fetchProducts({ category, featured, search } = {}) {
  const query = new URLSearchParams();
  if (category) query.append("category", category);
  if (typeof featured === "boolean") query.append("featured", String(featured));
  if (search) query.append("search", search);

  const queryString = query.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ""}`;
  const res = await request(endpoint);
  return res.data;
}

/**
 * Fetch single product details by ID or Slug
 */
export async function fetchProductById(id) {
  const res = await request(`/products/${id}`);
  return res.data;
}

/**
 * Submit contact lead form
 * @param {Object} data { name, email, subject, message }
 */
export async function submitContact(data) {
  const res = await request("/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
}
