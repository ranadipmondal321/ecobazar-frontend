import { useState, useEffect } from "react";
import { subscribeNewsletter } from "../api/newsletter";

export default function NewsletterPopup() {
  const [visible, setVisible]     = useState(false);
  const [email, setEmail]         = useState("");
  const [dontShow, setDontShow]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [closing, setClosing]     = useState(false);

  // Auto-show after 2s (skip if user said "don't show again")
  useEffect(() => {
    const hidden = localStorage.getItem("eco_newsletter_hidden");
    if (hidden) return;
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Close with animation
  const handleClose = () => {
    setClosing(true);
    if (dontShow) localStorage.setItem("eco_newsletter_hidden", "true");
    setTimeout(() => { setVisible(false); setClosing(false); }, 300);
  };

  // Submit — calls backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await subscribeNewsletter(email);
      setSubmitted(true);
      // Save email so footer section also knows they're subscribed
      localStorage.setItem("eco_subscribed_email", email);
      if (dontShow) localStorage.setItem("eco_newsletter_hidden", "true");
      // Auto-close after 3s
      setTimeout(() => handleClose(), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      // Already subscribed is a soft error — still show success
      if (msg.includes("already subscribed")) {
        setSubmitted(true);
        setTimeout(() => handleClose(), 3000);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes ecoFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes ecoSlideUp { from { opacity:0; transform:translateY(40px) scale(0.96) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes ecoFadeOut { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(20px) scale(0.96) } }
        @keyframes ecoPulse   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
        @keyframes ecoLeafFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
        .eco-backdrop      { animation: ecoFadeIn  0.3s ease forwards }
        .eco-modal         { animation: ecoSlideUp 0.35s cubic-bezier(.22,.68,0,1.2) forwards }
        .eco-modal-closing { animation: ecoFadeOut 0.3s ease forwards }
        .eco-leaf   { animation: ecoLeafFloat 3s   ease-in-out infinite }
        .eco-leaf-2 { animation: ecoLeafFloat 4s   ease-in-out infinite 1s }
        .eco-leaf-3 { animation: ecoLeafFloat 3.5s ease-in-out infinite 0.5s }
        .eco-submit-btn:hover { animation: ecoPulse 0.4s ease }
      `}</style>

      {/* Backdrop */}
      <div onClick={handleBackdrop}
        className="eco-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(3px)" }}>

        {/* Modal */}
        <div className={`eco-modal ${closing ? "eco-modal-closing" : ""} relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl`}
          style={{ maxHeight: "95vh" }}>

          {/* Close */}
          <button onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 font-bold text-lg">
            ✕
          </button>

          <div className="flex flex-col sm:flex-row">

            {/* LEFT — image */}
            <div className="relative sm:w-5/12 h-48 sm:h-auto overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=600&fit=crop"
                alt="Fresh Organic Food" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-br from-green-700/70 via-green-600/50 to-transparent"/>
              <span className="eco-leaf  absolute top-6  left-5  text-3xl select-none">🌿</span>
              <span className="eco-leaf-2 absolute bottom-10 right-4 text-2xl select-none">🍃</span>
              <span className="eco-leaf-3 absolute top-1/2 left-3 text-xl select-none opacity-70">🌱</span>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/15 backdrop-blur rounded-xl p-3 border border-white/20">
                  <p className="text-white text-xs font-semibold uppercase tracking-widest mb-0.5">Exclusive Offer</p>
                  <p className="text-white text-2xl font-extrabold leading-tight">Get 20% OFF</p>
                  <p className="text-green-200 text-xs mt-0.5">on your first order</p>
                </div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
              {!submitted ? (
                <>
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-500 text-xl">🌿</span>
                      <span className="text-green-600 text-xs font-bold uppercase tracking-widest">Ecobazar</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 leading-tight mb-2">
                      Subscribe to Our<br/>
                      <span className="text-green-500">Newsletter</span>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Get the freshest deals, seasonal offers, and new arrivals delivered straight to your inbox. No spam, ever.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mb-5">
                    {["🎁 Exclusive subscriber-only discounts", "🥦 Weekly fresh produce highlights", "🚚 Early access to flash sales"].map(b => (
                      <div key={b} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"/>
                        {b}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </span>
                      <input
                        type="email"
                        placeholder="Enter your email address..."
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(""); }}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm outline-none transition-all ${
                          error ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-400 bg-gray-50 focus:bg-white"
                        }`}
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <span>⚠️</span> {error}
                      </p>
                    )}

                    <button type="submit" disabled={loading}
                      className="eco-submit-btn w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-green-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                          Subscribing...
                        </>
                      ) : "Subscribe & Get 20% Off 🎉"}
                    </button>
                  </form>

                  <label className="flex items-center gap-2 mt-4 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" checked={dontShow} onChange={e => setDontShow(e.target.checked)} className="sr-only"/>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        dontShow ? "bg-green-500 border-green-500" : "border-gray-300 group-hover:border-green-400"
                      }`}>
                        {dontShow && <span className="text-white text-xs font-bold leading-none">✓</span>}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                      Don't show this popup again
                    </span>
                  </label>

                  <p className="text-xs text-gray-400 mt-3 text-center">
                    🔒 We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              ) : (
                /* Success */
                <div className="text-center py-6">
                  <div className="text-6xl mb-4" style={{ animation: "ecoPulse 0.6s ease" }}>🎉</div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">You're in!</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    Thanks for subscribing! Use your <span className="text-green-600 font-bold">20% OFF</span> coupon below.
                  </p>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Your coupon code:</p>
                    <p className="text-2xl font-extrabold text-green-600 tracking-widest">ECO20OFF</p>
                    <p className="text-xs text-gray-400 mt-1">Valid for 7 days on your first order</p>
                  </div>
                  <button onClick={handleClose}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-2.5 rounded-full text-sm transition-all hover:scale-105 shadow-lg">
                    Start Shopping →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}