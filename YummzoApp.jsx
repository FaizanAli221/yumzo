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
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Star,
  ShoppingBag,
} from "lucide-react";
import {
  fetchHealth,
  fetchCategories,
  fetchProducts,
  fetchProductById,
  submitContact,
} from "./src/services/api";

const CATEGORY_STYLES = {
  "nano-banana": { icon: Sparkles, bg: "#FFF4CE", chip: "#B88600" },
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

const EVENTS_LIST = [
  {
    id: "evt-1",
    title: "Yummzo Nano Banana Tasting & Crunch Pop-Up",
    date: "October 18-20, 2026",
    time: "11:00 AM - 9:00 PM",
    location: "Emporium Mall Courtyard, Lahore",
    category: "Pop-Up & Tasting",
    description:
      "Be the first to try our new Signature Nano Banana Crisps! Live vacuum-frying demonstrations, complimentary snack samplers, and limited edition gift hampers.",
    featured: true,
  },
  {
    id: "evt-2",
    title: "Asian FMCG & D2C Food Expo 2026",
    date: "November 12-14, 2026",
    time: "10:00 AM - 6:00 PM",
    location: "Expo Center, Hall 3, Karachi",
    category: "Trade Expo",
    description:
      "Connecting with distributors, supermarket buyers, and cafe owners. Meet our founders Jayesh & Jash Chheda to discuss wholesale bulk pricing.",
    featured: false,
  },
  {
    id: "evt-3",
    title: "Organic Snacking & Wellness Street Fest",
    date: "December 05, 2026",
    time: "4:00 PM - 11:00 PM",
    location: "Liberty Market Promenade, Lahore",
    category: "Festival",
    description:
      "A celebration of clean label, gluten-free snacks! Enjoy live music, organic tea pairings, and exclusive discounts on Jowar Puffs & Energy Bites.",
    featured: false,
  },
];

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
  const [page, setPage] = useState("home"); // 'home' | 'products' | 'events' | 'about' | 'contact'
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

  // Load API Health & Categories
  useEffect(() => {
    fetchHealth()
      .then((data) => setApiHealth(data.data))
      .catch((err) => console.error("Health check failed:", err));

    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Categories fetch failed:", err));
  }, []);

  // Fetch products
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
            Featured Product: <strong>Nano Banana Crisps</strong>
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
              ["Home", "home"],
              ["Products", "products"],
              ["Events", "events"],
              ["About Us", "about"],
              ["Contact", "contact"],
            ].map(([label, key]) => (
              <button
                key={label}
                onClick={() => setPage(key)}
                className={`text-sm tracking-wide transition-colors ${
                  page === key
                    ? "text-[#FFC23C] font-semibold border-b-2 border-[#FFC23C] pb-0.5"
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
              className="hidden sm:flex bg-[#FF5A3C] hover:bg-[#E1341E] text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
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
            {[
              ["Home", "home"],
              ["Products Catalog", "products"],
              ["Events & Expos", "events"],
              ["About Us", "about"],
              ["Contact Us", "contact"],
            ].map(([label, key]) => (
              <button
                key={label}
                onClick={() => {
                  setPage(key);
                  setNavOpen(false);
                }}
                className={`text-left w-full py-3 text.base transition-colors ${
                  page === key ? "text-[#C23B1C] font-bold" : "text-[#241C14] hover:text-[#C23B1C]"
                }`}
              >
                {label}
              </button>
            ))}
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
                placeholder="Search products by name, banana, makhana, spice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#241C14]/20 rounded-2xl outline-none focus:border-[#FF5A3C] text-sm"
              />
              {searching && (
                <Loader2 className="absolute right-4 top-3.5 animate-spin text-[#FF5A3C]" size={20} />
              )}
            </div>

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
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

      {/* ---------------- PRODUCT DETAIL MODAL ---------------- */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          loading={loadingProductDetail}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* ---------------- DYNAMIC PAGES ---------------- */}
      {page === "home" && (
        <HomePage
          categories={categories}
          products={products}
          loadingProducts={loadingProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onProductClick={handleProductClick}
          onOpenContact={() => setContactOpen(true)}
          onNavigateProducts={() => setPage("products")}
        />
      )}

      {page === "products" && (
        <ProductsPage
          categories={categories}
          products={products}
          loadingProducts={loadingProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onProductClick={handleProductClick}
        />
      )}

      {page === "events" && <EventsPage onOpenContact={() => setContactOpen(true)} />}

      {page === "about" && <AboutPage onOpenContact={() => setContactOpen(true)} />}

      {page === "contact" && <ContactPage />}

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
  onNavigateProducts,
}) {
  const nanoBananaProduct = products.find((p) => p.slug === "nano-banana-crisps");

  return (
    <main>
      {/* ---- HERO / PROMO BENTO ---- */}
      <section className="px-4 sm:px-6 pt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Hero Card featuring Nano Banana Package Photo */}
          <div
            className="relative overflow-hidden rounded-3xl md:col-span-2 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #FFC23C 0%, #FF9900 100%)" }}
          >
            <Blob className="w-80 -right-16 -top-20 opacity-20" fill="#241C14" />
            <div className="relative z-10 max-w-md">
              <span className="inline-block bg-[#241C14] text-[#FFC23C] text-xs font-bold px-3 py-1 rounded-full rotate-[-2deg] mb-3">
                🔥 NEW RELEASE: Nano Banana Series
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#241C14] leading-[1.05]">
                Yummzo Nano Banana Crisps
              </h1>
              <p className="text-[#241C14]/85 mt-3 text-sm sm:text-base leading-relaxed">
                Vacuum-fried ultra-thin ripe banana slices coated in real honey & sea salt glaze. Unreasonably crunchy!
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    nanoBananaProduct
                      ? onProductClick(nanoBananaProduct)
                      : onNavigateProducts()
                  }
                  className="bg-[#241C14] hover:bg-[#3A2A22] text-white font-bold text-sm px-5 py-3 rounded-2xl transition-all shadow-md flex items-center gap-2"
                >
                  <ShoppingBag size={18} /> View Nano Banana (299 PKR)
                </button>
                <button
                  onClick={onOpenContact}
                  className="bg-white/80 hover:bg-white text-[#241C14] font-bold text-xs px-4 py-3 rounded-2xl transition-all"
                >
                  Bulk Inquiry
                </button>
              </div>
            </div>

            {/* Generated Nano Banana Package Image */}
            <div className="relative z-10 shrink-0 group">
              <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 group-hover:rotate-0 transition-all duration-300">
                <img
                  src="/images/products/nano-banana-crisps.png"
                  alt="Yummzo Nano Banana Crisps Packaging"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-3 -right-2 bg-[#FF5A3C] text-white font-display text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                100% Ripe Banana
              </span>
            </div>
          </div>

          {/* Secondary promo stack */}
          <div className="flex flex-col gap-4">
            <div
              className="relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 flex-1 cursor-pointer transition-transform hover:-translate-y-1"
              style={{ backgroundColor: "#0D6E6E" }}
              onClick={() => setSelectedCategory("jowar-puffs")}
            >
              <PackageArt Icon={Wheat} chip="#7FD9C4" dark={true} />
              <div className="text-white">
                <h3 className="font-display font-semibold text-lg leading-tight">
                  Jalapeño Jowar Puffs
                </h3>
                <p className="text-xs text-white/75 mt-1">Airy sorghum, gluten free</p>
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl p-6 flex items-center gap-4 flex-1 text-white cursor-pointer transition-transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,#FF5A3C,#C23B1C)" }}
              onClick={() => setSelectedCategory("flavoured-nuts")}
            >
              <PackageArt Icon={Flame} chip="#FFC23C" />
              <div>
                <h3 className="font-display font-semibold text-lg leading-tight">
                  Peri Peri Makhana
                </h3>
                <p className="text-xs text-white/80 mt-1">High protein roasted snack</p>
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
                Snack Categories
              </h2>
              <Squiggle color="#FFC23C" className="mt-2" />
            </div>

            <button
              onClick={onNavigateProducts}
              className="text-xs font-bold bg-[#FFC23C] text-[#241C14] px-4 py-2 rounded-full hover:bg-white transition-colors self-start sm:self-auto"
            >
              View Full Catalog ({categories.length} Categories) →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const style = CATEGORY_STYLES[cat.slug] || DEFAULT_CAT_STYLE;
              const IconComp = style.icon;

              return (
                <div
                  key={cat.id || cat.slug}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    onNavigateProducts();
                  }}
                  className="cat-card group relative overflow-hidden rounded-2xl p-4 flex flex-col justify-between min-h-[150px] cursor-pointer transition-all hover:-translate-y-1"
                  style={{ backgroundColor: style.bg }}
                >
                  <div>
                    <h3
                      className={`font-display font-semibold text-base leading-tight ${
                        style.dark ? "text-white" : "text-[#241C14]"
                      }`}
                    >
                      {cat.name}
                    </h3>
                    <span
                      className="text-[11px] font-medium mt-1 inline-block"
                      style={{ color: style.dark ? "#ffffffaa" : style.chip }}
                    >
                      {cat.tagline || "Snack item"}
                    </span>
                  </div>
                  <div className="flex items-end justify-between mt-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        style.dark ? "text-[#FFC23C]" : ""
                      }`}
                      style={!style.dark ? { color: style.chip } : undefined}
                    >
                      Explore <ChevronRight size={12} />
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

      {/* ---- FEATURED PRODUCTS SHOWCASE ---- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Featured Snacks</h2>
            <Squiggle color="#FF5A3C" className="mt-2" />
          </div>
          <button
            onClick={onNavigateProducts}
            className="text-xs font-bold text-[#FF5A3C] hover:underline"
          >
            See All Snacks →
          </button>
        </div>

        {loadingProducts ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="animate-spin text-[#FF5A3C] mb-3" size={36} />
            <p className="text-sm font-semibold text-gray-500">Loading products catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((prod) => (
              <ProductCard key={prod.id} prod={prod} onProductClick={onProductClick} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

/* ================= PRODUCTS PAGE ================= */
function ProductsPage({
  categories,
  products,
  loadingProducts,
  selectedCategory,
  setSelectedCategory,
  onProductClick,
}) {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">All Products Catalog</h1>
        <p className="text-sm text-gray-600 mt-2">
          Discover our full range of handcrafted, plant-first snacks.
        </p>
        <Squiggle color="#0D6E6E" className="mt-3" />
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
            selectedCategory === "all"
              ? "bg-[#241C14] text-[#FFC23C]"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All Items ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id || cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
              selectedCategory === cat.slug
                ? "bg-[#FF5A3C] text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loadingProducts ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin text-[#FF5A3C] mb-3" size={36} />
          <p className="text-sm font-semibold text-gray-500">Fetching products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} prod={prod} onProductClick={onProductClick} />
          ))}
        </div>
      )}
    </main>
  );
}

/* ================= EVENTS PAGE ================= */
function EventsPage({ onOpenContact }) {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="bg-[#FFC23C] text-[#241C14] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          Expos & Pop-Ups
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-3">
          Upcoming Events & Tasting Labs
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Come meet the Yummzo team live, taste fresh batches, and get exclusive event-only discounts.
        </p>
        <Squiggle color="#C23B1C" className="mt-3 mx-auto" />
      </div>

      <div className="space-y-6">
        {EVENTS_LIST.map((evt) => (
          <div
            key={evt.id}
            className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row justify-between gap-6 transition-all hover:shadow-md ${
              evt.featured ? "border-[#FF5A3C] ring-2 ring-[#FF5A3C]/20" : "border-[#241C14]/10"
            }`}
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase bg-[#FFEFC2] text-[#B85C00] px-3 py-1 rounded-full">
                  {evt.category}
                </span>
                {evt.featured && (
                  <span className="text-xs font-bold bg-[#FF5A3C] text-white px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={12} fill="white" /> FEATURED EVENT
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl font-bold text-[#241C14]">{evt.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{evt.description}</p>

              <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700 pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-[#FF5A3C]" /> {evt.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-[#0D6E6E]" /> {evt.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#6B3FA0]" /> {evt.location}
                </span>
              </div>
            </div>

            <div className="flex md:flex-col justify-center items-end shrink-0 gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto bg-[#241C14] hover:bg-[#FF5A3C] text-white text-xs font-bold px-5 py-3 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Ticket size={16} /> RSVP / Get VIP Pass
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* ================= ABOUT PAGE ================= */
function AboutPage({ onOpenContact }) {
  return (
    <main>
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
              innovative snack experiences like our Signature Nano Banana Crisps.
            </p>
            <p className="text-[#241C14]/70 text-sm mt-3 leading-relaxed">
              We handcraft premium, on-the-go treats using high-quality ingredients,
              bold flavors, and unique vacuum-frying techniques.
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
          <div className="relative min-h-[220px] md:min-h-0 flex items-center justify-center p-6 bg-[#FF5A3C]">
            <img
              src="/images/products/nano-banana-crisps.png"
              alt="Yummzo Product Banner"
              className="max-h-64 rounded-2xl shadow-2xl rotate-2"
            />
          </div>
        </div>
      </section>

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
    </main>
  );
}

/* ================= CONTACT PAGE ================= */
function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Contact & Wholesale Enquiries</h1>
        <p className="text-sm text-gray-600 mt-2">
          Whether you want to carry Yummzo snacks in your store or ask a question, we'd love to talk!
        </p>
        <Squiggle color="#FF5A3C" className="mt-3 mx-auto" />
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#241C14]/10 shadow-lg">
        <ContactFormContent />
      </div>
    </main>
  );
}

/* ================= REUSABLE PRODUCT CARD ================= */
function ProductCard({ prod, onProductClick }) {
  const isNanoBanana = prod.slug === "nano-banana-crisps";

  return (
    <div
      onClick={() => onProductClick(prod)}
      className="bg-white rounded-3xl p-6 border border-[#241C14]/10 hover:border-[#FF5A3C] shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
    >
      {isNanoBanana && (
        <div className="h-40 -mx-6 -mt-6 mb-4 overflow-hidden bg-[#FFF4CE] flex items-center justify-center">
          <img
            src="/images/products/nano-banana-crisps.png"
            alt={prod.name}
            className="h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

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
  );
}

/* ================= PRODUCT DETAIL MODAL ================= */
function ProductDetailModal({ product, loading, onClose }) {
  const isNanoBanana = product.slug === "nano-banana-crisps";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFF8E9] w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 z-10"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin text-[#FF5A3C] mb-3" size={32} />
            <p className="text-xs text-gray-500">Loading product details...</p>
          </div>
        ) : (
          <div>
            {isNanoBanana && (
              <div className="mb-4 rounded-2xl overflow-hidden h-48 bg-[#FFF4CE] flex items-center justify-center">
                <img
                  src="/images/products/nano-banana-crisps.png"
                  alt={product.name}
                  className="h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#FFC23C] px-3 py-1 rounded-full text-[#241C14]">
                {product.categorySlug}
              </span>
              {product.inStock && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> In Stock
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
              <span className="text-sm font-medium text-gray-500">Weight: {product.weight}</span>
            </div>

            <p className="text-sm text-[#241C14]/80 leading-relaxed mb-6 bg-white p-4 rounded-2xl border border-[#241C14]/10">
              {product.description}
            </p>

            {product.nutrition && (
              <div className="mb-6">
                <h4 className="font-display font-semibold text-sm mb-3 flex items-center gap-1.5">
                  <Info size={16} className="text-[#0D6E6E]" /> Nutritional Values ({product.nutrition.servingSize})
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

/* ================= REUSABLE CONTACT FORM ================= */
function ContactModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFF8E9] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5"
        >
          <X size={20} />
        </button>
        <ContactFormContent />
      </div>
    </div>
  );
}

function ContactFormContent() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await submitContact(formData);
      setStatus({
        type: "success",
        text: `Submitted! Your inquiry was sent successfully (Lead ID: ${res.data?.lead?.id || "Saved"}).`,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.message || "Submission failed. Please check form input.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-1">Get in Touch</h2>
      <p className="text-xs text-gray-600 mb-6">
        Connected to backend endpoint <code className="bg-[#241C14]/10 px-1 py-0.5 rounded">POST /api/contact</code>
      </p>

      {status && (
        <div
          className={`p-4 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
            status.type === "success"
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-rose-100 text-rose-800 border border-rose-300"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
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
            placeholder="Nano Banana bulk order / inquiry"
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
            placeholder="Tell us about your question or order..."
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
          {submitting ? <Loader2 className="animate-spin" size={16} /> : "Submit Inquiry to API"}
        </button>
      </form>
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
            Crafting innovative, delicious snacks like our Signature Nano Banana Crisps.
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
          <h4 className="font-display font-semibold mb-3">Pages</h4>
          <ul className="space-y-2 text-sm text-[#241C14]/70">
            <li>
              <button onClick={() => setPage("home")} className="hover:text-[#C23B1C]">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => setPage("products")} className="hover:text-[#C23B1C]">
                Products Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setPage("events")} className="hover:text-[#C23B1C]">
                Events & Expos
              </button>
            </li>
            <li>
              <button onClick={() => setPage("about")} className="hover:text-[#C23B1C]">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setPage("contact")} className="hover:text-[#C23B1C]">
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
        <span>Express API + Nano Banana Series</span>
      </div>
    </footer>
  );
}
