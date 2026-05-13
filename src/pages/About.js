import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = ["Home", "Shop", "Blog", "About Us", "Contact Us", "Account"];

const teamMembers = [
  { name: "John Smith",    role: "CEO & Founder",      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" },
  { name: "Emily Davis",   role: "Head of Operations", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face" },
  { name: "Michael Brown", role: "Farm Manager",        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" },
  { name: "Sarah Wilson",  role: "Quality Control",    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" },
];

const testimonials = [
  { name: "Rose Lauer",    role: "Home Chef",       rating: 5, text: "Ecobazar has completely changed how I shop for groceries. Everything is always so fresh!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { name: "Emily Clark",   role: "Nutritionist",    rating: 5, text: "The quality of their organic produce is unmatched. I recommend Ecobazar to all my clients.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face" },
  { name: "Mark Johnson",  role: "Fitness Trainer", rating: 4, text: "Great selection and fast delivery. My go-to store for healthy living essentials.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
];

const stats = [
  { value: "28K+",  label: "Products" },
  { value: "2K+",   label: "Farmers" },
  { value: "500+",  label: "Stores" },
  { value: "200K+", label: "Customers" },
  { value: "65+",   label: "Countries" },
];

const features = [
  { icon: "🌿", label: "100% Organic" },
  { icon: "🚚", label: "Free Shipping" },
  { icon: "🔒", label: "Secure Payment" },
  { icon: "🎧", label: "24/7 Support" },
];

function Stars({ n }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-sm ${i <= n ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </span>
  );
}

// ── Animated counter ──
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ""));
    const step = Math.ceil(num / 60);
    let cur = 0;
    const timer = setInterval(() => {
      cur += step;
      if (cur >= num) { setCount(num); clearInterval(timer); }
      else setCount(cur);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  const display = target.includes("K") ? (count >= 1000 ? `${Math.floor(count/1000)}K` : count) : count;
  return <span>{display}{suffix}</span>;
}

export default function About() {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount]  = useState(0);
  const [teamIdx, setTeamIdx]   = useState(0);
  const [testIdx, setTestIdx]   = useState(0);

  const visibleTeam = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI',system-ui,sans-serif" }}>

       {/* ── TOP BAR (hidden on mobile) ── */}
                 

      {/* ── HEADER ── */}
      

      {/* ── HERO BANNER ── */}
      <div className="relative h-40 sm:h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=350&fit=crop" alt="About Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-16">
          <div>
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-1">Our Story</p>
            <h1 className="text-white text-3xl sm:text-5xl font-extrabold leading-tight">About Us</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="text-green-400">›</span>
              <span className="text-white font-semibold">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: 100% Trusted (image right) ── */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">About Ecobazar</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
              100% Trusted<br />Organic Food Store
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map(f => (
                <div key={f.label} className="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-sm font-bold text-gray-700">{f.label}</span>
                </div>
              ))}
            </div>
            <Link to="/shop"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-300/40 text-sm">
              Shop Now →
            </Link>
          </div>
          <div className="lg:w-5/12 flex-shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&h=500&fit=crop"
                alt="Farmer with vegetables" className="w-full rounded-2xl shadow-xl object-cover h-72 sm:h-96" />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🌿</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Certified</p>
                  <p className="font-extrabold text-gray-800 text-sm">100% Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 100% Trusted (image left, green bg) ── */}
      <section className="bg-green-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-5/12 flex-shrink-0">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=500&fit=crop"
                  alt="Organic vegetables" className="w-full rounded-2xl shadow-xl object-cover h-72 sm:h-96" />
                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-2xl shadow-xl p-4 text-center">
                  <p className="text-3xl font-extrabold">15+</p>
                  <p className="text-xs font-semibold text-green-100">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">Why Choose Us</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
                100% Trusted<br />Organic Food Store
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We partner directly with local farmers to bring you the freshest organic produce. Every product is carefully selected, quality-tested, and delivered with care to ensure you get the best nature has to offer.
              </p>
              <div className="space-y-3">
                {[
                  { icon:"✅", title:"100% Organic",       desc:"All products are certified organic" },
                  { icon:"🚛", title:"Free Shipping",       desc:"Free delivery on orders over $50" },
                  { icon:"🌾", title:"100% Organic Food",   desc:"Sourced directly from trusted farms" },
                  { icon:"🤝", title:"Customer Checkout",   desc:"Smooth and secure checkout experience" },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: We Delivered + delivery man ── */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">Our Mission</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight mb-4">
              We Delivered, You<br />Enjoy Your Order.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Our dedicated delivery team ensures your fresh organic groceries arrive at your doorstep in perfect condition. We use eco-friendly packaging and temperature-controlled vehicles to maintain freshness from farm to table.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              With real-time tracking and same-day delivery options, getting fresh organic food has never been easier or more convenient.
            </p>
            <Link to="/shop"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-300/40 text-sm">
              Order Now →
            </Link>
          </div>
          <div className="lg:w-5/12 flex-shrink-0">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=500&fit=crop"
                alt="Delivery person" className="w-full rounded-2xl shadow-xl object-cover h-72 sm:h-96" />
              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg flex justify-around">
                <div className="text-center">
                  <p className="text-green-600 text-xl font-extrabold">50K+</p>
                  <p className="text-gray-400 text-xs">Deliveries</p>
                </div>
                <div className="w-px bg-gray-200"/>
                <div className="text-center">
                  <p className="text-green-600 text-xl font-extrabold">99%</p>
                  <p className="text-gray-400 text-xs">On Time</p>
                </div>
                <div className="w-px bg-gray-200"/>
                <div className="text-center">
                  <p className="text-green-600 text-xl font-extrabold">4.9★</p>
                  <p className="text-gray-400 text-xs">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="bg-gray-800 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label} className="group">
                <p className="text-3xl sm:text-4xl font-extrabold text-green-400 group-hover:scale-110 transition-transform inline-block">
                  <Counter target={s.value} suffix={s.value.includes("+") ? "+" : ""}/>
                </p>
                <p className="text-gray-400 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TEAM ── */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-10">
          <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">The People</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Our Awesome Team</h2>
          <span className="block h-0.5 w-12 bg-green-500 mt-2 rounded-full mx-auto"/>
        </div>
        <div className="relative">
          {/* Prev/Next */}
          <button onClick={() => setTeamIdx(i => Math.max(0, i - 1))} disabled={teamIdx === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all disabled:opacity-30 font-bold text-lg border border-gray-200">‹</button>
          <button onClick={() => setTeamIdx(i => Math.min(teamMembers.length - 1, i + 1))} disabled={teamIdx >= teamMembers.length - 1}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-all disabled:opacity-30 font-bold text-lg border border-gray-200">›</button>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {teamMembers.map((m, i) => (
              <div key={i} className="group text-center">
                <div className="relative overflow-hidden rounded-2xl mb-4 shadow-sm hover:shadow-xl transition-shadow">
                  <img src={m.img} alt={m.name} onError={e => e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"/>
                  {/* Hover overlay with socials */}
                  <div className="absolute inset-0 bg-green-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {["f","𝕏","in"].map(s => (
                      <button key={s} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 text-xs font-bold hover:bg-green-500 hover:text-white transition-colors shadow">{s}</button>
                    ))}
                  </div>
                </div>
                <h3 className="font-extrabold text-gray-800 text-sm">{m.name}</h3>
                <p className="text-green-600 text-xs font-semibold mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teamMembers.map((_, i) => (
              <button key={i} onClick={() => setTeamIdx(i)}
                className={`rounded-full transition-all ${i === teamIdx ? "bg-green-500 w-5 h-2" : "bg-gray-300 w-2 h-2"}`}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS ── */}
      <section className="bg-green-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-1">Testimonials</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Client Testimonial</h2>
              <span className="block h-0.5 w-10 bg-green-500 mt-1 rounded-full"/>
            </div>
            {/* Nav dots */}
            <div className="flex gap-2">
              <button onClick={() => setTestIdx(i => Math.max(0, i - 1))}
                className="w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white transition-all font-bold">‹</button>
              <button onClick={() => setTestIdx(i => Math.min(testimonials.length - 1, i + 1))}
                className="w-8 h-8 rounded-full bg-green-500 text-white shadow flex items-center justify-center font-bold hover:bg-green-600 transition-all">›</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${i === testIdx ? "ring-2 ring-green-400 shadow-green-100" : ""}`}>
                <Stars n={t.rating}/>
                <p className="text-gray-600 text-sm mt-3 mb-5 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0"/>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR (28K / 2K / 500 / 200K+ / 65+) ── */}
      <section className="border-y border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg font-bold group-hover:bg-green-500 group-hover:text-white transition-colors">
                  {["🛒","🌾","🏪","👥","🌍"][i]}
                </div>
                <div>
                  <p className="font-extrabold text-gray-800 text-lg leading-none">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
                {i < stats.length - 1 && <div className="hidden sm:block w-px h-8 bg-gray-200 ml-4"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* ── MOBILE BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex sm:hidden shadow-lg">
        {[
          { icon:"🏠", label:"Home",    path:"/" },
          { icon:"🛍", label:"Shop",    path:"/shop" },
          { icon:"🔍", label:"Search",  path:"/shop" },
          { icon:"♡",  label:"Wishlist",path:"/" },
          { icon:"🛒", label:"Cart",    path:"/" },
        ].map(item => (
          <Link key={item.label} to={item.path}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${location.pathname === item.path && item.path !== "/" ? "text-green-600" : "text-gray-400"}`}>
            <span className="text-lg leading-none">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}