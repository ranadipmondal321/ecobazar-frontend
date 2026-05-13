import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { convert } = useCurrency();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Add some fresh products to get started!</p>
            <Link to="/shop" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg text-sm">
              Browse Shop →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
                  <img src={item.img} alt={item.name}
                    onError={e => e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.unit || "1 pc"}</p>
                    <p className="text-green-600 font-extrabold mt-1">{convert(item.price)}</p>
                  </div>
                  {/* Quantity */}
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg">−</button>
                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg">+</button>
                  </div>
                  {/* Subtotal */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-extrabold text-gray-800 text-sm">{convert(item.price * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 mt-1 font-semibold transition-colors">Remove</button>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-600 font-semibold hover:underline">
                🗑 Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="font-extrabold text-gray-800 text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{convert(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-semibold">{convert(cartTotal * 0.05)}</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between text-gray-800 font-extrabold text-base">
                    <span>Total</span>
                    <span className="text-green-600">{convert(cartTotal * 1.05)}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                <Link to="/shop" className="block text-center text-green-600 text-sm font-semibold hover:underline">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}