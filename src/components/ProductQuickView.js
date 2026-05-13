import { useState, useEffect } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

// ─── PRODUCT QUICK VIEW MODAL ─────────────────────────────────────────────────


export default function ProductQuickView({ product, onClose, onAddToCart, wishlist, onWishlist }) {
  const { convert } = useCurrency();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [closing, setClosing] = useState(false);

  // Extra mock images using same product image at different crops
  const images = [
    product.img,
    product.img.replace("fit=crop", "fit=crop&crop=top"),
    product.img.replace("fit=crop", "fit=crop&crop=bottom"),
    product.img.replace("w=300&h=300", "w=300&h=300").replace("fit=crop", "fit=crop&sat=-20"),
  ];

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 280);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
};

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <>
      <style>{`
        @keyframes qvFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes qvSlideUp { from{opacity:0;transform:translateY(32px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes qvFadeOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(20px) scale(.97)} }
        @keyframes qvPop     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        .qv-backdrop { animation: qvFadeIn .25s ease forwards; }
        .qv-modal    { animation: qvSlideUp .32s cubic-bezier(.22,.68,0,1.15) forwards; }
        .qv-closing  { animation: qvFadeOut .28s ease forwards; }
        .qv-thumb:hover img { transform: scale(1.08); }
        .qv-added { animation: qvPop .35s ease; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleBackdrop}
        className="qv-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      >
        {/* Modal */}
        <div className={`qv-modal ${closing ? "qv-closing" : ""} bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative`}
          style={{ maxHeight: "92vh", overflowY: "auto" }}>

          {/* Close */}
          <button onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center shadow transition-all hover:scale-110 font-bold text-base">
            ✕
          </button>

          <div className="flex flex-col md:flex-row">

            {/* ── LEFT: Image Gallery ── */}
            <div className="md:w-5/12 bg-gray-50 p-5 sm:p-6 flex flex-col gap-4">

              {/* Main image */}
              <div className="relative rounded-xl overflow-hidden bg-white shadow-sm aspect-square flex items-center justify-center">
                {product.badge && (
                  <span className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow ${product.badge === "NEW" ? "bg-green-500" : "bg-red-500"}`}>
                    {product.badge === "NEW" ? "NEW" : `-${discount}%`}
                  </span>
                )}
                <img
                  src={images[activeImg]}
                  alt={product.name}
                  onError={e => e.target.src = product.img}
                  className="w-full h-full object-contain p-4 transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`qv-thumb w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? "border-green-500 shadow-md" : "border-gray-200 hover:border-green-300"
                      }`}
                  >
                    <img src={img} alt="" onError={e => e.target.src = product.img}
                      className="w-full h-full object-cover transition-transform duration-300" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Product Info ── */}
            <div className="flex-1 p-5 sm:p-7 flex flex-col gap-4">

              {/* Status + SKU */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  In Stock
                </span>
                <span className="text-xs text-gray-400">SKU: ECO-{String(product.id || Math.floor(Math.random() * 900) + 100).padStart(6, "0")}</span>
              </div>

              {/* Name */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={`text-sm ${i <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">{product.rating} ({product.reviews || 0} Reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-green-600 font-semibold">✓ Verified</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                {product.oldPrice && (
                  <span className="text-gray-400 text-base line-through font-medium">{convert(product.oldPrice)}</span>
                )}
                <span className="text-green-600 text-3xl font-extrabold">{convert(product.price)}</span>
                {discount && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                Fresh, organic {product.name.toLowerCase()} sourced directly from certified local farms.
                Packed with essential nutrients, natural flavour, and delivered fresh to your door.
                Perfect for salads, cooking, and healthy snacking.
              </p>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-semibold">Share:</span>
                {[
                  { label: "f", bg: "#1877f2" },
                  { label: "𝕏", bg: "#000" },
                  { label: "P", bg: "#e60023" },
                  { label: "in", bg: "#0a66c2" },
                ].map(s => (
                  <button key={s.label}
                    className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center hover:scale-110 transition-all shadow-sm"
                    style={{ backgroundColor: s.bg }}>
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Qty stepper */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xl font-bold transition-colors">
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-xl font-bold transition-colors">
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all shadow-lg ${added
                    ? "qv-added bg-green-100 text-green-700 shadow-green-200"
                    : "bg-green-500 hover:bg-green-600 text-white shadow-green-300 hover:scale-105"
                    }`}>
                  {added ? (
                    <><span>✓</span> Added to Cart!</>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                   onClick={() => onWishlist && onWishlist(product)} 
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-lg transition-all hover:scale-110 ${ wishlist && wishlist.some(item => item.id === product.id)
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
                    }`}>
                  {wishlist && wishlist.some(item => item.id === product.id) ? "♥" : "♡"}
                </button>
              </div>

              {/* Category & Tags */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-semibold w-20">Category:</span>
                  <span className="text-green-600 hover:underline cursor-pointer font-medium">{product.category || "Vegetables"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 font-semibold w-20 pt-0.5">Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Vegetables", "Healthy", "Organic", "Fresh", "Natural"].map(tag => (
                      <span key={tag} className="bg-gray-100 hover:bg-green-100 hover:text-green-700 text-gray-600 px-2.5 py-1 rounded-full cursor-pointer transition-colors font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}