import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  ChevronRight,
  ChevronUp,
  BadgeCheck,
  FlaskConical,
  Globe2,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Leaf,
  Zap,
  Nut,
  Wheat,
  Candy,
  Cookie,
  Sparkles,
  Flame,
  Coffee,
  Package,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import {
  fetchHealth,
  fetchCategories,
  fetchProducts,
  fetchProductById,
  submitContact,
} from "./src/services/api";

/**
 * YUMMZO FOODS — Brand Frontend with Live REST API Integration
 */

const CATEGORY_STYLES = {
  "vegan-food": { icon: Leaf, bg: "#EAF3D8", chip: "#6B8E3A" },
  "energy-bites": { icon: Zap, bg: "#3A2A22", chip: "#FFC23C", dark: true },
  "flavoured-nuts": { icon: Nut, bg: "#FDE3DA", chip: "#C23B1C" },
  "jowar-puffs": { icon: Wheat, bg: "#173B36", chip: "#7FD9C4", dark: true },
  gummies: { icon: Candy, bg: "#E6E1F5", chip: "#6B3FA0" },
  chikki: { icon: Flame, bg: "#FFE2A8", chip: "#B85C00" },
  "baked-bhakri": { icon: Cookie, bg: "#F6E4C8", chip: "#8A5A22" },
  "thin-bites": { icon: Sparkles, bg: "#DCEEEC", chip: "#0D6E6E" },
  "coated-nuts": { icon: Flame, bg: "#FFE2A8", chip: "#B85C00" },
};

const DEFAULT_CAT_STYLE = { icon: Package, bg: "#F6E4C8", chip: "#8A5A22" };

const MISSION = [
  {
    title: "Fueling everyday adventures",
    copy: "A good snack should carry you through the day — deadlines, long commutes, or just a quiet ten minutes to yourself.",
  },
  {
    title: "Globally inspired, locally crafted",
    copy: "We borrow techniques and flavors from kitchens around the world, then make them with ingredients we can trace back to source.",
  },
  {
    title: "Setting a new standard",
    copy: "Sustainable packaging, ethical sourcing, fair pay for farmers. Snacking well shouldn't cost the planet anything.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: BadgeCheck,
    title: "Unwavering quality",
    copy: "Every batch is tasted, checked, and signed off before it leaves the kitchen — no exceptions.",
  },
  {
    icon: FlaskConical,
    title: "Innovative flavors",
    copy: "Our flavor lab runs on curiosity: unexpected spice blends, slow-toasted aromatics, playful pairings.",
  },
  {
    icon: Globe2,
    title: "Global reach",
    copy: "From our kitchen to shelves on four continents, without losing the small-batch care we started with.",
  },
];

const LEADERS = [
  { name: "Jayesh Chheda", role: "Co-Founder & CEO", tone: "#FFC23C" },
  { name: "Jash Chheda", role: "Co-Founder & COO", tone: "#FF5A3C" },
  { name: "Chirag Dedhia", role: "Head of Product", tone: "#0D6E6E" },
  { name: "Vaibhav Dedhia", role: "Head of Growth", tone: "#6B3FA0" },
];

function Avatar({ name, tone }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0 ring-4 ring-white shadow-sm"
      style={{ backgroundColor: tone }}
    >
      {initials}
    </div>
  );
}

function Squiggle({ color = "#241C14", className = "" }) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={className}
      width="96"
      height="10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 8C14 2 22 2 34 8C46 14 54 14 66 8C78 2 86 2 98 8C104 11 112 11 118 6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Blob({ className, fill }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      style={{ position: "absolute" }}
    >
      <path
        fill={fill}
        d="M45.3,-58.6C58.6,-51.1,69.3,-36.9,73.2,-21.1C77.1,-5.3,74.3,12.1,66.6,26.9C58.9,41.7,46.4,53.9,31.6,61.5C16.8,69.1,-0.3,72,-17.3,68.9C-34.3,65.8,-51.2,56.7,-61.8,42.6C-72.4,28.5,-76.7,9.4,-73.6,-8.1C-70.5,-25.6,-60,-41.5,-46.2,-49.3C-32.4,-57.1,-16.2,-56.8,0.5,-57.5C17.2,-58.2,32.1,-66.1,45.3,-58.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

function PackageArt({ Icon, chip, dark }) {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
      <div
        className="absolute inset-0 rounded-[28%] rotate-6 opacity-90"
        style={{ backgroundColor: chip }}
      />
      <div
        className={`absolute inset-1 rounded-[26%] -rotate-3 flex items-center justify-center ${
          dark ? "bg-[#241C14]/80" : "bg-white/85"
        }`}
      >
        <Icon size={32} color={chip} strokeWidth={1.75} />
      </div>
    </div>
  );
}

export default function YummzoApp() {
  const [page, setPage] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  // API State
  const [apiHealth, setApiHealth] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProductDetail, setLoadingProductDetail] = useState(false);

  // Search overlay state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Contact Modal state
  const [contactOpen, setContactOpen] = useState(false);

  // Check API health and load categories on mount
  useEffect(() => {
    fetchHealth()
      .then((data) => setApiHealth(data.data))
      .catch((err) => console.error("Health check failed:", err));

    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Categories fetch failed:", err));
  }, []);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    setLoadingProducts(true);
    const filter = selectedCategory !== "all" ? { category: selectedCategory } : {};
    fetchProducts(filter)
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Products fetch failed:", err);
        setLoadingProducts(false);
      });
  }, [selectedCategory]);

  // Live search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(() => {
      fetchProducts({ search: searchQuery })
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
        })
        .catch(() => setSearching(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleProductClick = async (product) => {
    setLoadingProductDetail(true);
    setSelectedProduct(product);
    try {
      const fullDetail = await fetchProductById(product.id || product.slug);
      setSelectedProduct(fullDetail);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProductDetail(false);
    }
  };

  const navLink = (label, key, action) => (
    <button
      key={label}
      onClick={() => {
        if (action) {
          action();
        } else {
          setPage(key);
        }
        setNavOpen(false);
      }}
      className={`text-left w-full py-3 text-base transition-colors ${
        page === key
          ? "text-[#C23B1C] font-semibold"
          : "text-[#241C14] hover:text-[#C23B1C]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundColor: "#FFF8E9",
        color: "#241C14",
        fontFamily:
          "'Manrope', ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Fredoka', ui-sans-serif, system-ui, sans-serif; }
        .cat-card:hover .cat-art { transform: translateY(-4px) rotate(-2deg) scale(1.05); }
        .cat-art { transition: transform .3s ease; }
      `}</style>

      {/* ---------------- API STATUS BADGE BAR ---------------- */}
      <div className="bg-[#173B36] text-[#7FD9C4] text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7FD9C4] animate-pulse" />
            <span>
              REST API Status:{" "}
              {apiHealth ? `Connected (v${apiHealth.version})` : "Connecting..."}
            </span>
          </div>
          <span className="hidden sm:inline opacity-80">
            Express Backend active at /api
          </span>
        </div>
      </div>

      {/* ---------------- HEADER ---------------- */}
      <header className="sticky top-0 z-40 bg-[#241C14] text-[#FFF8E9] shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
          >
            <Menu size={22} />
          </button>

          <button
            onClick={() => {
              setPage("home");
              setSelectedCategory("all");
            }}
            className="font-display text-2xl font-bold tracking-tight flex items-center gap-1"
          >
            YUMMZO
            <span className="text-2xl leading-none" style={{ color: "#FFC23C" }}>
              ◕‿◕
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Home", "home", () => { setPage("home"); setSelectedCategory("all"); }],
              ["About Us", "about", () => setPage("about")],
              ["Products", "home", () => { setPage("home"); window.scrollTo({ top: 600, behavior: 'smooth' }); }],
              ["Contact", "home", () => setContactOpen(true)],
            ].map(([label, key, action]) => (
              <button
                key={label}
                onClick={action}
                className={`text-sm tracking-wide transition-colors ${
                  page === key && label !== "Contact"
                    ? "text-[#FFC23C] font-semibold"
                    : "text-[#FFF8E9]/80 hover:text-[#FFC23C]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-1.5 text-sm"
            >
              <Search size={20} />
              <span className="hidden sm:inline text-xs text-[#FFF8E9]/70">Search</span>
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="hidden sm:flex bg-[#FF5A3C] hover:bg-[#E1341E] text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- OFF-CANVAS DRAWER ---------------- */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          navOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setNavOpen(false)}
          className="absolute inset-0 bg-black/40"
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-[#FFF8E9] shadow-2xl px-6 pt-6 transition-transform duration-300 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-xl font-bold">YUMMZO</span>
            <button
              onClick={() => setNavOpen(false)}
              className="w-8 h-8 rounded-full bg-[#0D6E6E] text-white flex items-center justify-center"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>
          <nav className="flex flex-col divide-y divide-[#241C14]/10">
            {navLink("Home", "home", () => { setPage("home"); setSelectedCategory("all"); })}
            {navLink("About Us", "about", () => setPage("about"))}
            {navLink("Products", "home", () => { setPage("home"); window.scrollTo({ top: 600, behavior: 'smooth' }); })}
            {navLink("Contact Us", "home", () => setContactOpen(true))}
          </nav>
        </div>
      </div>

      {/* ---------------- SEARCH OVERLAY MODAL ---------------- */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-[#FFF8E9] w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5"
            >
              <X size={20} />
            </button>
            <h3 className="font-display text-xl font-bold mb-4">Search Yummzo Snacks</h3>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                autoFocus
                placeholder="Search products by name, spice, or tag (e.g. makhana, coffee, spicy)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#241C14]/20 rounded-2xl outline-none focus:border-[#FF5A3C] text-sm"
              />
              {searching && (
                <Loader2 className="absolute right-4 top-3.5 animate-spin text-[#FF5A3C]" size={20} />
              )}
            </div>

            {/* Results list */}
            <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
              {searchQuery && searchResults.length === 0 && !searching && (
                <div className="text-center py-8 text-sm text-[#241C14]/60">
                  No snacks found matching "{searchQuery}"
                </div>
              )}
              {searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    handleProductClick(prod);
                    setSearchOpen(false);
                  }}
                  className="bg-white p-3 rounded-2xl border border-[#241C14]/10 hover:border-[#FF5A3C] flex items-center justify-between cursor-pointer transition-all hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FFEFC2] flex items-center justify-center font-display font-bold text-[#FF5A3C]">
                      {prod.name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{prod.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{prod.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#C23B1C]">
                      {prod.price} {prod.currency}
                    </span>
                    <p className="text-[10px] text-gray-400">{prod.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CONTACT MODAL ---------------- */}
      {contactOpen && (
        <ContactModal onClose={() => setContactOpen(false)} />
      )}

      {/* ---------------- PRODUCT DETAIL MODAL ---------------- */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          loading={loadingProductDetail}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* ---------------- PAGE CONTENT ---------------- */}
      {page === "home" ? (
        <HomePage
          categories={categories}
          products={products}
          loadingProducts={loadingProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onProductClick={handleProductClick}
          onOpenContact={() => setContactOpen(true)}
        />
      ) : (
        <AboutPage onOpenContact={() => setContactOpen(true)} />
      )}

      {/* ---------------- FOOTER ---------------- */}
      <Footer setPage={setPage} onOpenContact={() => setContactOpen(true)} />

      {/* ---------------- BACK TO TOP ---------------- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#C23B1C] text-white flex items-center justify-center shadow-lg transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

/* ================= HOME PAGE ================= */
function HomePage({
  categories,
  products,
  loadingProducts,
  selectedCategory,
  setSelectedCategory,
  onProductClick,
  onOpenContact,
}) {
  return (
    <main>
      {/* ---- HERO / PROMO BENTO ---- */}
      <section className="px-4 sm:px-6 pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Hero card */}
          <div
            className="relative overflow-hidden rounded-3xl md:col-span-2 p-7 sm:p-10 min-h-[280px] flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg,#FF5A3C 0%, #E1341E 100%)" }}
          >
            <Blob className="w-64 -right-10 -top-16 opacity-20" fill="#FFC23C" />
            <div className="relative z-10">
              <span className="inline-block bg-[#FFC23C] text-[#241C14] text-xs font-bold px-3 py-1 rounded-full rotate-[-3deg] mb-4">
                Order directly from kitchen
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-[1.05] max-w-md">
                Peri Peri Makhana & Roasted Snacks
              </h1>
              <p className="text-white/85 mt-3 max-w-sm text-sm sm:text-base">
                Freshly crafted gluten-free, high-protein bites delivered across four continents.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-4 text-white">
              <PackageArt Icon={Flame} chip="#FFC23C" />
              <div>
                <span className="font-display font-semibold text-lg block">
                  Connected to Yummzo Express REST API
                </span>
                <button
                  onClick={onOpenContact}
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold bg-white text-[#C23B1C] px-3 py-1.5 rounded-full hover:bg-[#FFC23C] transition-colors"
                >
                  Request Wholesale Pricing <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary promo stack */}
          <div className="flex flex-col gap-4">
            <div
              className="relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 flex-1 cursor-pointer"
              style={{ backgroundColor: "#FFC23C" }}
              onClick={() => setSelectedCategory("energy-bites")}
            >
              <PackageArt Icon={Leaf} chip="#6B8E3A" />
              <div>
                <h3 className="font-display font-semibold text-lg leading-tight">
                  Healthy Energy Bites
                </h3>
                <p className="text-sm text-[#241C14]/70 mt-1">Walnut-date, no added sugar</p>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 flex-1 text-white cursor-pointer"
              style={{ background: "linear-gradient(135deg,#6B3FA0,#4A2A73)" }}
              onClick={() => setSelectedCategory("gummies")}
            >
              <PackageArt Icon={Coffee} chip="#E6E1F5" />
              <div>
                <h3 className="font-display font-semibold text-lg leading-tight">
                  Instant Tea & Hemp Bites
                </h3>
                <p className="text-sm text-white/75 mt-1">Saffron & cardamom sachets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CATEGORIES SECTION ---- */}
      <section className="mt-14 pb-16" style={{ backgroundColor: "#0D6E6E" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Explore Categories (Live API)
              </h2>
              <Squiggle color="#FFC23C" className="mt-2" />
            </div>

            {/* All category pill */}
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#FFC23C] text-[#241C14]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Show All Products ({categories.length} categories)
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const style = CATEGORY_STYLES[cat.slug] || DEFAULT_CAT_STYLE;
              const IconComp = style.icon;
              const isSelected = selectedCategory === cat.slug;

              return (
                <div
                  key={cat.id || cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`cat-card group relative overflow-hidden rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[168px] cursor-pointer transition-all ${
                    isSelected ? "ring-4 ring-[#FFC23C] scale-[1.02]" : "hover:-translate-y-1"
                  }`}
                  style={{ backgroundColor: style.bg }}
                >
                  <div>
                    <h3
                      className={`font-display font-semibold text-base sm:text-lg leading-tight ${
                        style.dark ? "text-white" : "text-[#241C14]"
                      }`}
                    >
                      {cat.name}
                    </h3>
                    <span
                      className="text-xs font-medium mt-1 inline-block"
                      style={{ color: style.dark ? "#ffffffaa" : style.chip }}
                    >
                      {cat.tagline || "Snack item"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                        style.dark ? "text-[#FFC23C]" : ""
                      }`}
                      style={!style.dark ? { color: style.chip } : undefined}
                    >
                      View Items <ChevronRight size={14} />
                    </span>
                    <div className="cat-art">
                      <PackageArt Icon={IconComp} chip={style.chip} dark={style.dark} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- PRODUCTS CATALOG GRID ---- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              {selectedCategory === "all"
                ? "All Products Catalog"
                : `Category: ${categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}`}
            </h2>
            <Squiggle color="#FF5A3C" className="mt-2" />
          </div>
          <span className="text-sm font-semibold text-gray-500">
            {products.length} Products
          </span>
        </div>

        {loadingProducts ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-[#FF5A3C] mb-3" size={36} />
            <p className="text-sm font-semibold text-gray-500">Fetching products from /api/products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#241C14]/10">
            <p className="text-gray-500 text-base mb-4">No products found in this category.</p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="bg-[#FF5A3C] text-white text-xs font-bold px-4 py-2 rounded-full"
            >
              Reset Category Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onProductClick(prod)}
                className="bg-white rounded-3xl p-6 border border-[#241C14]/10 hover:border-[#FF5A3C] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FFEFC2] text-[#B85C00]">
                      {prod.categorySlug}
                    </span>
                    {prod.featured && (
                      <span className="text-[10px] font-extrabold bg-[#FF5A3C] text-white px-2 py-0.5 rounded-full">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#241C14] group-hover:text-[#FF5A3C] transition-colors mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                    {prod.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {prod.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg font-bold text-[#C23B1C]">
                      {prod.price} {prod.currency}
                    </span>
                    <span className="text-xs text-gray-400 block">{prod.weight}</span>
                  </div>
                  <button className="bg-[#241C14] group-hover:bg-[#FF5A3C] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ================= ABOUT PAGE ================= */
function AboutPage({ onOpenContact }) {
  return (
    <main>
      {/* ---- INTRO SPLIT ---- */}
      <section className="px-4 sm:px-6 pt-10">
        <div
          className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
          style={{ backgroundColor: "#FFEFC2" }}
        >
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              About Yummzo Foods
            </h1>
            <Squiggle color="#C23B1C" className="mt-3 mb-4" />
            <p className="text-[#241C14]/90 text-base leading-relaxed">
              At Yummzo Foods, we're passionate about creating delicious and
              innovative snack experiences.
            </p>
            <p className="text-[#241C14]/70 text-sm mt-3 leading-relaxed">
              We handcraft premium, on-the-go treats using high-quality
              ingredients, bold flavors, and unique combinations. Join us on
              our journey to redefine snacking.
            </p>
            <div className="mt-6">
              <button
                onClick={onOpenContact}
                className="bg-[#C23B1C] hover:bg-[#A02D15] text-white text-xs font-bold px-5 py-3 rounded-full transition-colors shadow-md"
              >
                Connect With Our Team
              </button>
            </div>
          </div>
          <div className="relative min-h-[220px] md:min-h-0">
            <div
              className="absolute inset-4 sm:inset-6 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(160deg,#FF5A3C,#C23B1C)" }}
            >
              <div className="grid grid-cols-2 gap-3 p-6">
                {[Flame, Leaf, Candy, Coffee].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center rotate-[-4deg]"
                    style={{ transform: `rotate(${i % 2 ? 4 : -4}deg)` }}
                  >
                    <Icon size={28} color="#FFF8E9" strokeWidth={1.6} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- MISSION ---- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold">Our mission</h2>
        <Squiggle color="#0D6E6E" className="mt-2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MISSION.map((m, i) => (
            <div
              key={m.title}
              className="relative pl-5"
              style={{
                borderLeft: `3px solid ${["#FFC23C", "#FF5A3C", "#0D6E6E"][i]}`,
              }}
            >
              <h3 className="font-display font-semibold text-lg mb-2">{m.title}</h3>
              <p className="text-sm text-[#241C14]/70 leading-relaxed">{m.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- DIFFERENTIATORS ---- */}
      <section className="mt-16 py-14" style={{ backgroundColor: "#241C14" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            What makes us different
          </h2>
          <Squiggle color="#FFC23C" className="mt-2 mb-9" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#2E241A" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ border: "2px solid #FFC23C" }}
                >
                  <d.icon size={24} color="#FFC23C" strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">
                  {d.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">{d.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- LEADERSHIP ---- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center">
          Meet our leaders
        </h2>
        <Squiggle color="#C23B1C" className="mt-2 mb-10 mx-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {LEADERS.map((l) => (
            <div key={l.name} className="flex flex-col items-center text-center gap-3">
              <Avatar name={l.name} tone={l.tone} />
              <div>
                <p className="font-semibold text-sm">{l.name}</p>
                <p className="text-xs text-[#241C14]/60">{l.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ================= PRODUCT DETAIL MODAL ================= */
function ProductDetailModal({ product, loading, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFF8E9] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-[#FF5A3C] mb-3" size={32} />
            <p className="text-xs text-gray-500">Loading product data...</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#FFC23C] px-3 py-1 rounded-full text-[#241C14]">
                {product.categorySlug}
              </span>
              {product.inStock ? (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> In Stock
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#241C14] mb-2">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-2xl font-bold text-[#C23B1C]">
                {product.price} {product.currency}
              </span>
              <span className="text-sm font-medium text-gray-500">
                Weight / Size: {product.weight}
              </span>
            </div>

            <p className="text-sm text-[#241C14]/80 leading-relaxed mb-6 bg-white p-4 rounded-2xl border border-[#241C14]/10">
              {product.description}
            </p>

            {/* Nutrition Information */}
            {product.nutrition && (
              <div className="mb-6">
                <h4 className="font-display font-semibold text-sm mb-3 flex items-center gap-1.5">
                  <Info size={16} className="text-[#0D6E6E]" /> Nutritional Information ({product.nutrition.servingSize})
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs">
                  {Object.entries(product.nutrition)
                    .filter(([k]) => k !== "servingSize")
                    .map(([key, val]) => (
                      <div key={key} className="bg-white p-2.5 rounded-xl border border-gray-100">
                        <span className="text-gray-400 capitalize block text-[10px]">{key}</span>
                        <span className="font-bold text-gray-800">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#0D6E6E]/10 text-[#0D6E6E] px-3 py-1 rounded-lg font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-[#FF5A3C] hover:bg-[#E1341E] text-white font-bold py-3 rounded-2xl transition-colors text-sm shadow-md"
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= CONTACT FORM MODAL ================= */
function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: '' }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await submitContact(formData);
      setStatus({
        type: "success",
        text: `Thank you! Your message was submitted successfully (Lead ID: ${res.data?.lead?.id || "Saved"}).`,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.message || "Failed to submit enquiry. Please check form input.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFF8E9] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5"
        >
          <X size={20} />
        </button>

        <h2 className="font-display text-2xl font-bold mb-1">Get in Touch</h2>
        <p className="text-xs text-gray-600 mb-6">
          Directly posts to Express backend endpoint <code className="bg-[#241C14]/10 px-1 py-0.5 rounded text-[11px]">POST /api/contact</code>
        </p>

        {status && (
          <div
            className={`p-4 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              status.type === "success"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-rose-100 text-rose-800 border border-rose-300"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0" />
            ) : (
              <AlertCircle size={18} className="shrink-0" />
            )}
            <span>{status.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Full Name *</label>
            <input
              type="text"
              required
              placeholder="Faizan Ali"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#241C14]/20 rounded-xl outline-none focus:border-[#FF5A3C] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Email Address *</label>
            <input
              type="email"
              required
              placeholder="faizan@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#241C14]/20 rounded-xl outline-none focus:border-[#FF5A3C] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Subject *</label>
            <input
              type="text"
              required
              placeholder="Bulk order enquiry"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#241C14]/20 rounded-xl outline-none focus:border-[#FF5A3C] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Message *</label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about your order or question..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#241C14]/20 rounded-xl outline-none focus:border-[#FF5A3C] text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C23B1C] hover:bg-[#A02D15] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Submitting Lead...
              </>
            ) : (
              "Submit Lead to API"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ================= FOOTER ================= */
function Footer({ setPage, onOpenContact }) {
  return (
    <footer className="mt-4 pt-14 pb-8" style={{ backgroundColor: "#FFEFC2" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <span className="font-display text-2xl font-bold flex items-center gap-1">
            YUMMZO <span style={{ color: "#FFC23C" }}>◕‿◕</span>
          </span>
          <p className="text-sm text-[#241C14]/70 mt-3 max-w-xs leading-relaxed">
            At Yummzo Foods, we're passionate about creating delicious and
            innovative snack experiences.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-[#241C14] text-white flex items-center justify-center hover:bg-[#C23B1C] transition-colors"
                aria-label="social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-[#241C14]/70">
            <li>
              <button onClick={() => setPage("home")} className="hover:text-[#C23B1C]">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => setPage("about")} className="hover:text-[#C23B1C]">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setPage("home")} className="hover:text-[#C23B1C]">
                Products
              </button>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-[#C23B1C]">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-3">Need help?</h4>
          <a
            href="mailto:yummzofoods@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-[#241C14]/80 hover:text-[#C23B1C] mb-4 block"
          >
            <Mail size={16} />
            yummzofoods@gmail.com
          </a>
          <button
            onClick={onOpenContact}
            className="bg-[#241C14] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#C23B1C] transition-colors"
          >
            Send Inquiry
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-[#241C14]/10 text-xs text-[#241C14]/50 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>© {new Date().getFullYear()} Yummzo Foods. All rights reserved.</span>
        <span>Express API Integration active</span>
      </div>
    </footer>
  );
}
