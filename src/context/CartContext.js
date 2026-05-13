import axios from "axios";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { fetchCart, syncCart, clearCartDB } from "../api/cartWishlist";

const CartContext = createContext();

// Normalize item so productId is always stored alongside id
const normalize = (product) => ({
  ...product,
  id: product.id || product.productId,
  productId: product.productId || product.id,
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const syncTimer = useRef(null);

  // ── Load from DB on login ──
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchCart()
      .then((res) => {
        const items = (res.data || []).map(normalize);
        setCartItems(items);
      })
      .catch(() => {}); // silently fail — use local state
  }, [isLoggedIn]);

  // ── Debounced sync to DB whenever cartItems changes ──
  const debouncedSync = useCallback((items) => {
    if (!isLoggedIn) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      syncCart(items).catch(() => {});
    }, 600);
  }, [isLoggedIn]);

  useEffect(() => {
    debouncedSync(cartItems);
  }, [cartItems, debouncedSync]);

  // ── Listen for login/logout (token changes) ──
  useEffect(() => {
    const check = () => {
      const loggedIn = !!localStorage.getItem("token");
      setIsLoggedIn(loggedIn);
      if (!loggedIn) setCartItems([]); // clear on logout
    };
    window.addEventListener("storage", check);
    window.addEventListener("authChange", check); // fire this custom event after login
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("authChange", check);
    };
  }, []);

  // ── Actions ──
  const addToCart = (product) => {
    const item = normalize(product);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (isLoggedIn) clearCartDB().catch(() => {});
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart,
      updateQuantity, clearCart, cartCount, cartTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}