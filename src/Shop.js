import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductQuickView from "./components/ProductQuickView";
import { useCurrency } from "./context/CurrencyContext";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

// ─── SHOP DATA ────────────────────────────────────────────────────────────────

const allProducts = [
  { id: 1, name: "Potato", price: 3.99, oldPrice: 5.00, badge: "50%", img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop", rating: 4.5, reviews: 120, category: "Vegetables", tags: ["organic"] },
  { id: 2, name: "Chinese Cabbage", price: 2.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=300&h=300&fit=crop", rating: 4.3, reviews: 88, category: "Vegetables", tags: [] },
  { id: 3, name: "Green Capsicum", price: 2.49, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop", rating: 4.6, reviews: 145, category: "Vegetables", tags: ["organic"] },
  { id: 4, name: "Sweet Corn", price: 1.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&h=300&fit=crop", rating: 4.7, reviews: 200, category: "Vegetables", tags: [] },
  { id: 5, name: "Eggplant", price: 4.50, oldPrice: 6.00, badge: "25%", img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=300&h=300&fit=crop", rating: 4.2, reviews: 63, category: "Vegetables", tags: [] },
  { id: 6, name: "Cauliflower", price: 2.99, oldPrice: 4.00, badge: "25%", img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=300&h=300&fit=crop", rating: 4.5, reviews: 97, category: "Vegetables", tags: ["organic"] },
  { id: 7, name: "Green Apple", price: 14.99, oldPrice: 20.00, badge: "50%", img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop", rating: 4.8, reviews: 128, category: "Fresh Fruit", tags: ["organic"] },
  { id: 8, name: "Green Beans", price: 1.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=300&h=300&fit=crop", rating: 4.7, reviews: 188, category: "Vegetables", tags: [] },
  { id: 9, name: "Red Chilli", price: 1.49, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop", rating: 4.4, reviews: 75, category: "Vegetables", tags: [] },
  { id: 10, name: "Tomato", price: 2.29, oldPrice: 3.00, badge: "23%", img: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=300&h=300&fit=crop", rating: 4.6, reviews: 204, category: "Vegetables", tags: ["organic"] },
  { id: 11, name: "Mango", price: 8.99, oldPrice: null, badge: "NEW", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop", rating: 4.9, reviews: 89, category: "Fresh Fruit", tags: ["organic"] },
  { id: 12, name: "Lettuce", price: 2.79, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop", rating: 4.3, reviews: 55, category: "Vegetables", tags: [] },
  { id: 13, name: "Broccoli", price: 3.99, oldPrice: 6.00, badge: "50%", img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop", rating: 4.6, reviews: 204, category: "Vegetables", tags: ["organic"] },
  { id: 14, name: "Avocado", price: 5.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop", rating: 5.0, reviews: 312, category: "Fresh Fruit", tags: ["organic"] },
  { id: 15, name: "Blueberries", price: 6.49, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop", rating: 4.8, reviews: 97, category: "Fresh Fruit", tags: [] },
  { id: 16, name: "Bell Pepper", price: 2.99, oldPrice: 4.50, badge: "33%", img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop", rating: 4.7, reviews: 156, category: "Vegetables", tags: ["organic"] },
  { id: 17, name: "Spinach", price: 1.79, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop", rating: 4.4, reviews: 88, category: "Vegetables", tags: ["organic"] },
  { id: 18, name: "Carrot", price: 2.49, oldPrice: 3.20, badge: "22%", img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop", rating: 4.5, reviews: 133, category: "Vegetables", tags: [] },
];


const categories = [
  { name: "All", count: 18 },
  { name: "Vegetables", count: 13 },
  { name: "Fresh Fruit", count: 5 },
  { name: "Meat & Fish", count: 0 },
  { name: "Snacks", count: 0 },
  { name: "Beverages", count: 0 },
  { name: "Beauty & Health", count: 0 },
  { name: "Bread & Bakery", count: 0 },
];

const popularTags = ["Organic", "Fresh", "Vegetable", "Fruit", "Natural", "Healthy", "Seasonal", "Local", "Premium", "Salad"];
const navLinks = ["Home", "Shop", "Blog", "About Us", "Contact Us"];


// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Stars({ n }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= n ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </span>
  );
}

function RangeSlider({ min, max, value, onChange }) {
  return (
    <div className="relative pt-1">
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-500" />
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ p, view, onAdd, wishlist, onWish, onQuickView }) {
  const { convert } = useCurrency();
  const [added, setAdded] = useState(false);


  const handleAdd = () => {
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // ── LIST VIEW ──
  if (view === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex gap-4 p-4 group">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          {p.badge && (
            <span className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full ${p.badge === "NEW" ? "bg-green-500" : "bg-red-500"}`}>{p.badge}</span>
          )}
          {/* Quick View overlay on list image */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 rounded-lg">
            <button
              onClick={() => onQuickView && onQuickView(p)}
              className="bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all">
              👁 View
            </button>
          </div>
          <img src={p.img} alt={p.name}
            onError={e => e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-xs text-green-600 font-semibold mb-0.5">{p.category}</p>
            <Link to={`/product/${p.id}`} className="font-bold text-gray-800 text-base mb-1 hover:text-green-600 transition-colors block">{p.name}</Link>
            <div className="flex items-center gap-2 mb-2">
              <Stars n={Math.round(p.rating)} />
              <span className="text-xs text-gray-400">({p.reviews})</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {p.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-extrabold text-lg">{convert(p.price)}</span>
              {p.oldPrice && <span className="text-gray-400 text-sm line-through">{convert(p.oldPrice)}</span>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onQuickView && onQuickView(p)}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-400 hover:text-green-600 transition-all hover:scale-110 text-sm"
                title="Quick View">
                👁
              </button>
              <button onClick={() => onWish(p)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${Array.isArray(wishlist) && wishlist.some(item => item.id === p.id) ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300"
                  }`}>
                {Array.isArray(wishlist) && wishlist.some(item => item.id === p.id) ? "♥" : "♡"}
              </button>
              <button onClick={handleAdd}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${added ? "bg-green-100 text-green-700" : "bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-sm"}`}>
                {added ? "✓ Added" : "+ Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── GRID VIEW ──
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative bg-gray-50 h-40 sm:h-48 overflow-hidden">
        {p.badge && (
          <span className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full ${p.badge === "NEW" ? "bg-green-500" : "bg-red-500"}`}>{p.badge}</span>
        )}
        <button onClick={() => onWish(p)}
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:scale-110 ${Array.isArray(wishlist) && wishlist.some(item => item.id === p.id) ? "text-red-500" : "text-gray-300"
            }`}>
          {Array.isArray(wishlist) && wishlist.some(item => item.id === p.id) ? "♥" : "♡"}
        </button>

        {/* ✅ Quick View hover overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <button
            onClick={() => onQuickView && onQuickView(p)}
            className="bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
            👁 Quick View
          </button>
        </div>

        <Link to={`/product/${p.id}`} className="block w-full h-full">
          <img src={p.img} alt={p.name}
            onError={e => e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </Link>
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs text-green-600 font-semibold mb-0.5">{p.category}</p>
        <Link to={`/product/${p.id}`} className="font-bold text-gray-800 text-sm mb-1 truncate hover:text-green-600 transition-colors block">{p.name}</Link>
        <div className="flex items-center gap-1.5 mb-2">
          <Stars n={Math.round(p.rating)} />
          <span className="text-xs text-gray-400">({p.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-green-600 font-extrabold">{convert(p.price)}</span>
            {p.oldPrice && <span className="text-gray-400 text-xs line-through ml-1">{convert(p.oldPrice)}</span>}
          </div>
          <button onClick={handleAdd}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow ${added ? "bg-green-100 text-green-700 scale-90" : "bg-green-500 hover:bg-green-600 text-white hover:scale-110"}`}>
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SHOP PAGE ───────────────────────────────────────────────────────────

export default function Shop() {

  const location = useLocation();
  const { convert } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(20);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, cartCount, cartTotal } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const [mobileFilter, setMobileFilter] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const ITEMS_PER_PAGE = 9;



  const toggleTag = (tag) => setSelectedTags(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  // Filter
  const filtered = allProducts.filter(p => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    if (selectedRating > 0 && p.rating < selectedRating) return false;
    if (selectedTags.length > 0 && !selectedTags.some(t => p.tags.includes(t.toLowerCase()))) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, priceRange, selectedRating, selectedTags, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("All"); setPriceRange(20);
    setSelectedRating(0); setSelectedTags([]); setSearchQuery("");
  };

  const activeFiltersCount = (selectedCategory !== "All" ? 1 : 0) + (priceRange < 20 ? 1 : 0) + (selectedRating > 0 ? 1 : 0) + selectedTags.length;

  // ── Sidebar ──
  const Sidebar = () => (
    <aside className="w-full space-y-5">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Search Products</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(searchInput);
              }
            }}
            className="flex-1 border-2 border-gray-200 focus:border-green-400 rounded-lg px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={() => setSearchQuery(searchInput)}
            className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
          >
            🔍
          </button>

        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Categories</h3>
        <ul className="space-y-1">
          {categories.map(cat => (
            <li key={cat.name}>
              <button onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.name
                  ? "bg-green-500 text-white font-semibold"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-600"}`}>
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === cat.name ? "bg-white" : "bg-green-400"}`} />
                  {cat.name}
                </span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${selectedCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Price Range</h3>
        <RangeSlider min={0} max={20} value={priceRange} onChange={setPriceRange} />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>$0</span>
          <span className="font-bold text-green-600">Up to {convert(priceRange)}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Filter by Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(r => (
            <button key={r} onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${selectedRating === r ? "bg-green-50 border-2 border-green-400" : "hover:bg-gray-50 border-2 border-transparent"}`}>
              <span className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className={`text-xs ${i <= r ? "text-yellow-400" : "text-gray-200"}`}>★</span>)}
              </span>
              <span className="text-gray-500 text-xs">& up</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <button key={tag} onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${selectedTags.includes(tag)
                ? "bg-green-500 text-white border-green-500"
                : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600"}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop" alt="Sale" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-green-700/50" />
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          <p className="text-green-300 text-xs font-bold uppercase tracking-wide">79% Discount</p>
          <p className="text-white font-extrabold text-lg leading-tight">Fresh Organic Vegetables</p>
          <button className="mt-2 bg-white text-green-700 text-xs font-bold px-4 py-1.5 rounded-full w-fit hover:bg-green-50 transition-colors">Shop Now →</button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI',system-ui,sans-serif" }}>


      {/* ── HERO BANNER ── */}

      <div className="relative h-40 sm:h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=350&fit=crop" alt="About Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-16">
          <div>
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-1">Ecobazar Store</p>
            <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight">Our Shop</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="text-green-400">›</span>
              <span className="text-white font-semibold">Shop</span>
            </div>
            <p className="text-green-100 text-sm mt-1 hidden sm:block">Fresh, organic products delivered to your door</p>

          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">

        {/* ── TOOLBAR ── */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileFilter(!mobileFilter)}
              className="lg:hidden flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors relative">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
              {activeFiltersCount > 0 && <span className="bg-white text-green-600 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{activeFiltersCount}</span>}
            </button>
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">{paginated.length}</span> of <span className="font-bold text-gray-800">{sorted.length}</span> results
            </p>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 font-semibold hover:underline">
                Clear all ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="border-2 border-gray-200 focus:border-green-400 rounded-lg px-3 py-1.5 text-sm outline-none bg-white cursor-pointer">
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
            <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 transition-colors ${viewMode === "grid" ? "bg-green-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" /></svg>
              </button>
              <button onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 transition-colors ${viewMode === "list" ? "bg-green-500 text-white" : "bg-white text-gray-400 hover:bg-gray-50"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── ACTIVE FILTER CHIPS ── */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategory !== "All" && (
              <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="ml-1 hover:text-green-900">✕</button>
              </span>
            )}
            {priceRange < 20 && (
              <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                Under ${priceRange}
                <button onClick={() => setPriceRange(20)} className="ml-1 hover:text-green-900">✕</button>
              </span>
            )}
            {selectedRating > 0 && (
              <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {selectedRating}★ & up
                <button onClick={() => setSelectedRating(0)} className="ml-1 hover:text-green-900">✕</button>
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                #{tag}
                <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-green-900">✕</button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-5 sm:gap-6">

          {/* ── SIDEBAR desktop ── */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* ── MOBILE FILTER DRAWER ── */}
          {mobileFilter && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilter(false)} />
              <div className="relative bg-gray-50 w-80 max-w-full h-full overflow-y-auto p-4 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-extrabold text-gray-800 text-lg">Filters</h2>
                  <button onClick={() => setMobileFilter(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold">✕</button>
                </div>
                <Sidebar />
                <button onClick={() => setMobileFilter(false)} className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition-colors">
                  Apply Filters ({sorted.length} results)
                </button>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="text-6xl mb-4">🥦</div>
                <h3 className="text-xl font-extrabold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="bg-green-500 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-600 transition-colors">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {paginated.map(p => (
                      <ProductCard
                        key={p.id} p={p} view="grid"
                        onAdd={(p) => addToCart(p)}
                        wishlist={wishlist}
                        onWish={toggleWishlist}
                        onQuickView={setQuickView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {paginated.map(p => (
                      <ProductCard
                        key={p.id} p={p} view="list"
                        onAdd={(p) => addToCart(p)}
                        wishlist={wishlist}
                        onWish={toggleWishlist}
                        onQuickView={setQuickView}
                      />
                    ))}
                  </div>
                )}

                {/* ── PAGINATION ── */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                      className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold">‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button key={page} onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition-all ${currentPage === page ? "bg-green-500 border-green-500 text-white shadow-md" : "border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600"}`}>
                        {page}
                      </button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold">›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex sm:hidden shadow-lg">
        {[
          { icon: "🏠", label: "Home", path: "/", active: false },
          { icon: "🛍", label: "Shop", path: "/shop", active: true },
          { icon: "🔍", label: "Search", path: "/shop", active: true },
          { icon: "♡", label: "Wishlist", path: "/wishlist", badge: wishlist.length },
          { icon: "🛒", label: "Cart", path: "/cart", badge: cartCount },
        ].map(item => (
          <Link key={item.label} to={item.path}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 relative transition-colors ${item.active ? "text-green-600" : "text-gray-400"}`}>
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
            {item.badge > 0 && <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{item.badge}</span>}
          </Link>
        ))}
      </div>

      {/* ✅ QUICK VIEW MODAL */}
      {quickView && (
        <ProductQuickView
          product={quickView}
          onClose={() => setQuickView(null)}
          onAddToCart={(p) => addToCart(p)}
          wishlist={wishlist}
          onWishlist={(product) => toggleWishlist(product)}
        />
      )}
    </div>
  );
}