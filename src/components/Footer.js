import React, { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeNewsletter } from "../api/newsletter";

export default function Footer() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setMessage("You're subscribed! 🎉");
      localStorage.setItem("eco_subscribed_email", email);
      setEmail("");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      if (msg.includes("already subscribed")) {
        setStatus("success");
        setMessage("You're already subscribed! Thanks 💚");
      } else {
        setStatus("error");
        setMessage(msg);
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400">

      {/* ── NEWSLETTER BANNER ── */}
      <div className="bg-white border-t border-b border-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left text */}
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-1">
              Subscribe our Newsletter
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Pellentesque eu nibh eget mauris congue mattis mattis nec telus.
              Phasellus imperdiet elit eu magna.
            </p>
          </div>

          {/* Right form */}
          <div className="w-full md:w-auto">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-xl px-5 py-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-700 font-bold text-sm">{message}</p>
                  <p className="text-green-600 text-xs">Use code <strong>ECO20OFF</strong> for 20% off!</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-0 w-full md:w-auto">
                <div className="flex-1 md:w-72">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus("idle"); setMessage(""); }}
                    placeholder="Your email address"
                    className={`w-full px-4 py-3 border-2 border-r-0 rounded-l-xl text-sm outline-none transition-all ${
                      status === "error"
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 focus:border-green-400"
                    }`}
                  />
                  {status === "error" && (
                    <p className="text-red-500 text-xs mt-1">{message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-r-xl text-sm transition-all disabled:opacity-60 flex items-center gap-2 flex-shrink-0"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  ) : "Subscribe"}
                </button>
              </form>
            )}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {[
              { label: "f", bg: "bg-blue-600" },
              { label: "t", bg: "bg-sky-400" },
              { label: "p", bg: "bg-red-500" },
              { label: "in", bg: "bg-pink-500" },
            ].map(s => (
              <button key={s.label}
                className={`${s.bg} w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center hover:opacity-80 transition-opacity`}>
                {s.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── MAIN FOOTER ── */}
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 mb-8">

          {/* LOGO */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 text-2xl">🌿</span>
              <span className="text-white font-extrabold text-xl">Ecobazar</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              Your trusted source for fresh, organic, and healthy groceries.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/"         className="hover:text-green-400">Home</Link></li>
              <li><Link to="/aboutus"  className="hover:text-green-400">About Us</Link></li>
              <li><Link to="/shop"     className="hover:text-green-400">Shop</Link></li>
              <li><Link to="/blog"     className="hover:text-green-400">Blog</Link></li>
              <li><Link to="/contactus" className="hover:text-green-400">Contact Us</Link></li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-green-400 cursor-pointer">Fresh Fruit</li>
              <li className="hover:text-green-400 cursor-pointer">Vegetables</li>
              <li className="hover:text-green-400 cursor-pointer">Meat & Fish</li>
              <li className="hover:text-green-400 cursor-pointer">Beverages</li>
              <li className="hover:text-green-400 cursor-pointer">Snacks</li>
            </ul>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">My Account</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard"   className="hover:text-green-400">Dashboard</Link></li>
              <li><Link to="/orders"      className="hover:text-green-400">Order History</Link></li>
              <li><Link to="/wishlist"    className="hover:text-green-400">Wishlist</Link></li>
              <li><Link to="/returns"     className="hover:text-green-400">Returns</Link></li>
              <li><Link to="/track-order" className="hover:text-green-400">Track Order</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Contact</h4>
            <ul className="space-y-2 text-xs">
              <li>📍 Ballygunge, South Kolkata - 700029</li>
              <li>📞 (033) 4555-0114</li>
              <li>✉️ hello@ecobazar.com</li>
              <li>🕐 Mon-Sat: 8am–8pm</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© 2024 Ecobazar. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <span className="hover:text-green-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-green-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-green-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>

    </footer>
  );
}