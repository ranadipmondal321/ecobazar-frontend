import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NewsletterPopup from "./components/NewsLetterPopup";
import ProductQuickView from "./components/ProductQuickView";
import { useCurrency } from "./context/CurrencyContext";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";



// ─── DATA ─────────────────────────────────────────────────────────────────────

const carouselSlides = [
    { img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&h=420&fit=crop", tag: "Summer Sale", title: "Fresh & Healthy\nOrganic Food", badge: "Sale up to 30% OFF", sub: "Free shipping on all your order", btn: "Shop now", overlay: "from-green-900/85 via-green-800/50 to-transparent" },
    { img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=900&h=420&fit=crop", tag: "New Arrivals", title: "Farm Fresh\nVegetables Daily", badge: "Up to 20% OFF", sub: "Delivered straight from the farm", btn: "Explore Now", overlay: "from-emerald-900/85 via-emerald-800/50 to-transparent" },
    { img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&h=420&fit=crop", tag: "Best Deals", title: "Seasonal Fruits\nAt Best Prices", badge: "Limited Time Offer", sub: "100% organic and pesticide-free", btn: "Buy Now", overlay: "from-orange-900/85 via-orange-800/50 to-transparent" },
];

const categories = [
    { name: "Fresh Fruit", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=140&h=140&fit=crop" },
    { name: "Vegetables", img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=140&h=140&fit=crop" },
    { name: "Meat & Fish", img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=140&h=140&fit=crop" },
    { name: "Snacks", img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=140&h=140&fit=crop" },
    { name: "Beverages", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=140&h=140&fit=crop" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=140&h=140&fit=crop" },
    { name: "Bread & Bakery", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=140&h=140&fit=crop" },
    { name: "Baking Needs", img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=140&h=140&fit=crop" },
];

const popularProducts = [
    { id: 1, name: "Green Apple", price: 14.99, oldPrice: 20.00, badge: null, img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop", rating: 4.8, reviews: 128, unit: "1 kg" },
    { id: 2, name: "Fresh Mango", price: 8.99, oldPrice: null, badge: "NEW", img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop", rating: 4.9, reviews: 89, unit: "1 kg" },
    { id: 3, name: "Broccoli", price: 3.99, oldPrice: 6.00, badge: "50%", img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop", rating: 4.6, reviews: 204, unit: "500 g" },
    { id: 4, name: "Avocado", price: 5.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop", rating: 5.0, reviews: 312, unit: "1 pc" },
    { id: 5, name: "Red Capsicum", price: 2.99, oldPrice: 4.00, badge: "25%", img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop", rating: 4.7, reviews: 156, unit: "500 g" },
    { id: 6, name: "Blueberries", price: 6.49, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop", rating: 4.8, reviews: 97, unit: "250 g" },
    { id: 7, name: "Cauliflower", price: 2.29, oldPrice: 3.00, badge: "23%", img: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=300&h=300&fit=crop", rating: 4.5, reviews: 73, unit: "1 pc" },
    { id: 8, name: "Green Beans", price: 1.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=300&h=300&fit=crop", rating: 4.7, reviews: 188, unit: "500 g" },
];

const hotDeals = [
    { id: 9, name: "Green Apple", price: 14.99, oldPrice: 20.00, img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop", rating: 4.8, sold: 63 },
    { id: 10, name: "Fresh Broccoli", price: 3.99, oldPrice: 6.00, img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop", rating: 4.6, sold: 48 },
    { id: 11, name: "Avocado", price: 5.99, oldPrice: 8.00, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop", rating: 5.0, sold: 71 },
    { id: 12, name: "Bell Pepper", price: 2.99, oldPrice: 4.50, img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop", rating: 4.7, sold: 55 },
];

const featuredProducts = [
    { id: 13, name: "Green Apple", price: 14.99, oldPrice: 20.00, badge: "50%", img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=300&fit=crop", rating: 4.8, reviews: 128, unit: "1 kg" },
    { id: 14, name: "Fresh Orange", price: 6.99, oldPrice: null, badge: "NEW", img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=300&h=300&fit=crop", rating: 4.9, reviews: 89, unit: "1 kg" },
    { id: 15, name: "Broccoli", price: 3.99, oldPrice: 6.00, badge: null, img: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=300&fit=crop", rating: 4.6, reviews: 204, unit: "500 g" },
    { id: 16, name: "Avocado", price: 5.99, oldPrice: null, badge: null, img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop", rating: 5.0, reviews: 312, unit: "1 pc" },
];

const latestNews = [
    { title: "7 Creative Ways to Enjoy Seasonal Fruits This Summer", date: "Aug 2, 2024", cat: "Tips", img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=250&fit=crop", desc: "Discover exciting recipes to make the most of summer's fresh fruits." },
    { title: "The Benefits of Eating Organic: What You Need to Know", date: "Jul 28, 2024", cat: "Health", img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=250&fit=crop", desc: "Organic food offers more than just taste — learn about the health benefits." },
    { title: "How to Store Vegetables to Keep Them Fresh Longer", date: "Jul 15, 2024", cat: "Guide", img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=250&fit=crop", desc: "Simple tips to extend the life of your vegetables and reduce food waste." },
];

const testimonials = [
    { name: "Sarah Johnson", role: "Home Chef", rating: 5, text: "Ecobazar has completely changed how I shop for groceries. The vegetables are always fresh and delivery is super fast!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
    { name: "Michael Brown", role: "Fitness Trainer", rating: 5, text: "I love that everything is organic. My clients ask about my diet and I always recommend Ecobazar for fresh produce.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
    { name: "Emily Davis", role: "Nutritionist", rating: 4, text: "The quality of produce here is outstanding. I've been a customer for 2 years and the consistency is remarkable.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
];

const instagramPhotos = [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
];

const sideCategories = ["Fresh Fruit", "Chicken & Meat", "Drink & Water", "Yogurt & Ice Cream", "Cake & Bread", "Butter & Cream", "Cooking", "View all Category →"];
const navLinks = ["Home", "Shop", "Blog", "About Us", "Contact Us", "Account"];



// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Stars({ n }) {
    return <span className="text-yellow-400 text-xs">{[1, 2, 3, 4, 5].map(i => <span key={i}>{i <= n ? "★" : "☆"}</span>)}</span>;
}

function SectionHeader({ title, link = "View All" }) {
    return (
        <div className="flex justify-between items-center mb-5">
            <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">{title}</h2>
                <span className="block h-0.5 w-8 bg-green-500 mt-1 rounded-full" />
            </div>
            <a href="#" className="text-green-600 text-xs sm:text-sm font-semibold hover:underline whitespace-nowrap">{link} →</a>
        </div>
    );
}

function ProductCard({ p, onAdd, wishlist, onWish, onQuickView }) {

    const handleAdd = () => {
        onAdd(p);
    };

    const { convert } = useCurrency();

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="relative bg-gray-50 h-36 sm:h-44 overflow-hidden">
                {p.badge && (
                    <span className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded-full ${p.badge === "NEW" ? "bg-green-500" : "bg-red-500"}`}>{p.badge}</span>
                )}
                <button
                    onClick={() => onWish(p)}
                    className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow flex items-center justify-center transition-all hover:scale-110 text-sm ${wishlist.some(item => item.id === p.id) ? "text-red-500" : "text-gray-300"
                        }`}
                >
                    {wishlist.some(item => item.id === p.id) ? "♥" : "♡"}
                </button>

                {/* ✅ Quick View hover overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button
                        onClick={() => onQuickView && onQuickView(p)}
                        className="bg-white text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-green-500 hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                        👁 Quick View
                    </button>
                </div>

                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="p-3 sm:p-4">
                <Stars n={Math.round(p.rating)} />
                <p className="font-semibold text-gray-800 text-xs sm:text-sm mt-1 mb-0.5 truncate">{p.name}</p>
                {p.unit && <p className="text-xs text-gray-400 mb-1 sm:mb-2">{p.unit}</p>}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-green-600 font-bold text-sm">{convert(p.price)}</span>
                        {p.oldPrice && <span className="text-gray-400 text-xs line-through ml-1">{convert(p.oldPrice)}</span>}
                    </div>
                    <button onClick={() => onAdd(p)}
                        className="bg-green-500 hover:bg-green-600 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg font-bold transition-all hover:scale-110 shadow">+</button>
                </div>
            </div>
        </div>
    );
}

function Countdown({ white = false }) {
    const [t, setT] = useState({ d: 2, h: 18, m: 45, s: 30 });
    useEffect(() => {
        const timer = setInterval(() => {
            setT(p => { let { d, h, m, s } = p; s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; d--; } if (d < 0) { d = h = m = s = 0; } return { d, h, m, s }; });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const box = white
        ? "bg-white/20 backdrop-blur rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-center min-w-10 sm:min-w-12"
        : "bg-white rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-center shadow-sm min-w-10 sm:min-w-12";
    const numCls = white ? "text-white text-base sm:text-xl font-extrabold leading-none" : "text-green-600 text-base sm:text-xl font-extrabold leading-none";
    const lblCls = white ? "text-white/70 text-xs mt-0.5" : "text-gray-400 text-xs mt-0.5";
    return (
        <div className="flex gap-1.5 sm:gap-2">
            {[[t.d, "Days"], [t.h, "Hrs"], [t.m, "Min"], [t.s, "Sec"]].map(([v, l]) => (
                <div key={l} className={box}>
                    <div className={numCls}>{String(v).padStart(2, "0")}</div>
                    <div className={lblCls}>{l}</div>
                </div>
            ))}
        </div>
    );
}

function BannerCarousel() {
    const [cur, setCur] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setCur(p => (p + 1) % carouselSlides.length), 4500);
        return () => clearInterval(t);
    }, []);
    const s = carouselSlides[cur];
    return (
        <div className="flex-1 relative rounded-xl overflow-hidden" style={{ minHeight: 220 }}>
            {carouselSlides.map((sl, i) => (
                <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === cur ? 1 : 0 }}>
                    <img src={sl.img} alt={sl.tag} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${sl.overlay}`} />
                </div>
            ))}
            <div className="absolute inset-0 z-10 p-5 sm:p-8 flex flex-col justify-center max-w-xs sm:max-w-sm">
                <p className="text-green-200 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">{s.tag}</p>
                <h1 className="text-white text-2xl sm:text-4xl font-extrabold leading-tight mb-2 sm:mb-3 whitespace-pre-line">{s.title}</h1>
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 w-fit">{s.badge}</span>
                <p className="text-green-100 text-xs mb-3 sm:mb-5 hidden sm:block">{s.sub}</p>
                <button className="bg-white text-green-700 font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-green-50 shadow-lg w-fit transition-all hover:scale-105">{s.btn} →</button>
            </div>
            <button onClick={() => setCur(p => (p - 1 + carouselSlides.length) % carouselSlides.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md text-lg sm:text-xl font-bold hover:scale-110 transition-all">‹</button>
            <button onClick={() => setCur(p => (p + 1) % carouselSlides.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md text-lg sm:text-xl font-bold hover:scale-110 transition-all">›</button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
                {carouselSlides.map((_, i) => (
                    <button key={i} onClick={() => setCur(i)} className="rounded-full transition-all duration-300"
                        style={{ width: i === cur ? 20 : 6, height: 6, backgroundColor: i === cur ? "white" : "rgba(255,255,255,0.5)" }} />
                ))}
            </div>
        </div>
    );
}


// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────

function MobileBottomNav({ cartCount, wishlistCount }) {
    const navigate = useNavigate();
    const [active, setActive] = useState("home");
    const items = [
        { id: "home", icon: "🏠", label: "Home" },
        { id: "shop", icon: "🛍", label: "Shop" },
        { id: "search", icon: "🔍", label: "Search" },
        { id: "wishlist", icon: "♡", label: "Wishlist", badge: wishlistCount },
        { id: "cart", icon: "🛒", label: "Cart", badge: cartCount },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex sm:hidden shadow-lg">
            {items.map(item => (
                <button key={item.id} onClick={() => setActive(item.id)}
                    className={`flex-1 flex flex-col items-center py-2 gap-0.5 relative transition-colors ${active === item.id ? "text-green-600" : "text-gray-400"}`}>
                    <span className="text-lg leading-none">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                    {item.badge > 0 && (
                        <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{item.badge}</span>
                    )}
                </button>
            ))}
        </div>
    );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
    const { convert } = useCurrency();
    const location = useLocation();
    const [activeCategory, setActiveCategory] = useState("Vegetables");
    const { cartItems, addToCart, cartCount, cartTotal } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [quickView, setQuickView] = useState(null);
    const navigate = useNavigate();
    const [active, setActive] = useState("home");



    const items = [
        { id: "home", label: "Home", path: "/", icon: "🏠" },
        { id: "shop", label: "Shop", path: "/shop", icon: "🛍" },
        { id: "search", label: "Search", path: "/shop", icon: "🔍" },
        { id: "wishlist", label: "Wishlist", path: "/wishlist", icon: "♡", badge: wishlist.length },
        { id: "cart", label: "Cart", path: "/cart", icon: "🛒", badge: cartCount },
    ];





    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI',system-ui,sans-serif" }}>

            {/* ── HERO ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
                <div className="flex gap-3 sm:gap-4">

                    {/* Category sidebar — desktop only */}
                    <div className="hidden xl:block w-52 flex-shrink-0 bg-white rounded-xl shadow-sm overflow-hidden self-start">
                        <div className="bg-green-500 text-white px-4 py-3 flex items-center gap-2 font-bold text-sm">☰ All Categories</div>
                        {sideCategories.map((cat, i) => (
                            <button key={cat} className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors border-b border-gray-50 last:border-0
                ${i === 0 ? "bg-green-50 text-green-600 font-semibold border-l-4 border-l-green-500" : "text-gray-600 hover:bg-gray-50"}
                ${cat.includes("→") ? "text-green-600 font-semibold" : ""}`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" /> {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 flex gap-3 sm:gap-4 min-w-0">
                        <BannerCarousel />

                        {/* Side banners — hidden on mobile, shown lg+ */}
                        <div className="hidden lg:flex flex-col gap-3 sm:gap-4 w-44 xl:w-48 flex-shrink-0">
                            <div className="flex-1 rounded-xl overflow-hidden relative" style={{ minHeight: 130 }}>
                                <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=220&fit=crop" alt="75% OFF" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-amber-700/30" />
                                <div className="relative z-10 p-4 flex flex-col justify-end h-full">
                                    <p className="text-amber-200 text-xs font-bold uppercase tracking-wide">Summer Sale</p>
                                    <p className="text-white text-2xl font-extrabold">75% OFF</p>
                                    <p className="text-amber-100 text-xs">Fruit & Vegetable</p>
                                    <button className="mt-1.5 text-amber-200 text-xs font-bold hover:text-white text-left">Shop Now →</button>
                                </div>
                            </div>
                            <div className="flex-1 rounded-xl overflow-hidden relative" style={{ minHeight: 130 }}>
                                <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=220&fit=crop" alt="Best Deal" className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-emerald-700/30" />
                                <div className="relative z-10 p-4 flex flex-col justify-end h-full">
                                    <p className="text-green-300 text-xs font-bold uppercase tracking-wide">Best Deal</p>
                                    <p className="text-white text-sm font-extrabold leading-tight">Special Products Deal</p>
                                    <button className="mt-1.5 text-green-300 text-xs font-bold hover:text-white text-left">Shop Now →</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {[
                        { icon: "🚚", title: "Free Shipping", sub: "On all orders" },
                        { icon: "🎧", title: "24/7 Support", sub: "Instant access" },
                        { icon: "🔒", title: "Secure Payment", sub: "100% protected" },
                        { icon: "↩️", title: "Money-Back", sub: "30 days guarantee" },
                    ].map(b => (
                        <div key={b.title} className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-xl sm:text-2xl flex-shrink-0">{b.icon}</span>
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-gray-800 truncate">{b.title}</p>
                                <p className="text-xs text-gray-400 truncate">{b.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── POPULAR CATEGORIES ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
                <SectionHeader title="Popular Categories" />
                {/* Mobile: horizontal scroll. Tablet+: grid */}
                <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 scrollbar-hide">
                    {categories.map(cat => (
                        <button key={cat.name} onClick={() => setActiveCategory(cat.name)}
                            className={`flex-shrink-0 flex flex-col items-center gap-2 p-2.5 sm:p-3 rounded-xl border-2 transition-all hover:scale-105 w-20 sm:w-auto ${activeCategory === cat.name ? "border-green-500 bg-green-50 shadow-md" : "border-gray-100 bg-white hover:border-green-300"}`}>
                            <img src={cat.img} alt={cat.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm" />
                            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── POPULAR PRODUCTS ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
                <SectionHeader title="Popular Products" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {popularProducts.map(p => (
                        <ProductCard
                            key={p.id}
                            p={p}
                            onAdd={() => addToCart(p)}
                            wishlist={wishlist}
                            onWish={toggleWishlist}
                            onQuickView={setQuickView} 
                        />
                    ))}
                </div>
            </section>

            {/* ── 3 PROMO BANNERS ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                        { img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=200&fit=crop", label: "Sale of the Month", tag: "Best Deals", overlay: "from-gray-900/80 to-gray-800/30" },
                        { img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=200&fit=crop", label: "Low-Fat Meat", tag: "Everyday Fresh", overlay: "from-black/80 to-black/20" },
                        { img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&h=200&fit=crop", label: "100% Fresh Fruit", tag: "Organic", overlay: "from-yellow-900/70 to-yellow-700/20" },
                    ].map(b => (
                        <div key={b.label} className="relative rounded-xl overflow-hidden h-28 sm:h-36 group cursor-pointer">
                            <img src={b.img} alt={b.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className={`absolute inset-0 bg-gradient-to-r ${b.overlay}`} />
                            <div className="absolute inset-0 z-10 p-4 sm:p-5 flex flex-col justify-center">
                                <p className="text-white/70 text-xs uppercase tracking-widest">{b.tag}</p>
                                <p className="text-white text-base sm:text-lg font-extrabold mt-0.5">{b.label}</p>
                                <button className="mt-1.5 text-white/80 text-xs font-bold hover:text-white text-left">Shop Now →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── HOT DEALS ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
                <div className="flex flex-wrap justify-between items-start gap-3 mb-5">
                    <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">Hot Deals</h2>
                        <span className="block h-0.5 w-8 bg-green-500 mt-1 rounded-full" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="font-semibold hidden sm:inline">Ends in:</span>
                            <Countdown />
                        </div>
                        <Link to="/shop" className="text-green-600 text-xs sm:text-sm font-semibold hover:underline">View All →</Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {hotDeals.map(p => (
                        <div key={p.name} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                            <div className="relative bg-gray-50 h-36 sm:h-40 overflow-hidden">
                                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">HOT</span>
                                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-3 sm:p-4">
                                <Stars n={Math.round(p.rating)} />
                                <p className="font-semibold text-gray-800 text-xs sm:text-sm mt-1 mb-2 truncate">{p.name}</p>
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                    <span className="text-green-600 font-bold text-sm">{convert(p.price)}</span>
                                    <span className="text-gray-400 text-xs line-through">{convert(p.oldPrice)}</span>
                                </div>
                                <div className="mb-2 sm:mb-3">
                                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                                        <span>Sold: {p.sold}</span><span>Left: {100 - p.sold}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.sold}%` }} />
                                    </div>
                                </div>
                                <button onClick={() => addToCart(p)}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-sm">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── DISCOUNT BANNER ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
                <div className="relative rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1400&h=280&fit=crop" alt="Discount" className="w-full h-44 sm:h-52 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
                    <div className="absolute inset-0 z-10 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 gap-3 sm:gap-4 py-4">
                        <div className="text-center sm:text-left">
                            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-0.5">Summer Sale</p>
                            <h2 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight">37% <span className="text-green-400">OFF</span></h2>
                            <p className="text-gray-300 text-xs sm:text-sm mt-0.5">on all organic vegetables</p>
                        </div>
                        <Countdown white />
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all hover:scale-105 shadow-lg text-sm">
                            Shop Now →
                        </button>
                    </div>
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
                <SectionHeader title="Featured Products" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {featuredProducts.map(p => (
                        <ProductCard key={p.name + "f"} p={p} onAdd={() => addToCart(p)} wishlist={wishlist} onWish={toggleWishlist} onQuickView={setQuickView} />
                    ))}
                </div>
            </section>

            {/* ── LATEST NEWS ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
                <SectionHeader title="Latest News" link="View All Posts" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {latestNews.map(n => (
                        <div key={n.title} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer">
                            <div className="relative h-40 sm:h-44 overflow-hidden">
                                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{n.cat}</span>
                            </div>
                            <div className="p-4 sm:p-5">
                                <p className="text-xs text-gray-400 mb-1.5">🗓 {n.date}</p>
                                <h3 className="font-bold text-gray-800 text-sm mb-2 leading-snug group-hover:text-green-600 transition-colors line-clamp-2">{n.title}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{n.desc}</p>
                                <button className="mt-3 text-green-600 text-xs font-bold hover:underline">Read More →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="bg-green-50 py-10 sm:py-12 mt-2">
                <div className="max-w-7xl mx-auto px-3 sm:px-4">
                    <SectionHeader title="Client Testimonials" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {testimonials.map(t => (
                            <div key={t.name} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                                <Stars n={t.rating} />
                                <p className="text-gray-600 text-xs sm:text-sm mt-3 mb-4 leading-relaxed italic">"{t.text}"</p>
                                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                    <img src={t.avatar} alt={t.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">{t.name}</p>
                                        <p className="text-xs text-gray-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INSTAGRAM ── */}
            <section className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-10">
                <div className="text-center mb-5 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">Follow Us on Instagram</h2>
                    <p className="text-gray-400 text-sm mt-1">@ecobazar_organic</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                    {instagramPhotos.map((src, i) => (
                        <div key={i} className="relative group overflow-hidden rounded-lg sm:rounded-xl aspect-square cursor-pointer">
                            <img src={src} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/20 transition-all flex items-center justify-center">
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MOBILE BOTTOM NAV ── */}

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex sm:hidden shadow-lg">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActive(item.id);
                            navigate(item.path);
                        }}
                        className={`flex-1 flex flex-col items-center py-2 gap-0.5 relative transition-colors ${active === item.id ? "text-green-600" : "text-gray-400"}`}>
                        <span className="text-lg leading-none">{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                        {item.badge > 0 && (
                            <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>
            <div className=" bg-gray-50">
                <NewsletterPopup />
            </div>

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