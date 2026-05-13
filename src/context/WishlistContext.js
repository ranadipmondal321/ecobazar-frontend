import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { fetchWishlist, syncWishlist } from "../api/cartWishlist";

const WishlistContext = createContext();

const normalize = (product) => ({
  ...product,
  id: product.id || product.productId,
  productId: product.productId || product.id,
});

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const syncTimer = useRef(null);

  // ── Load from DB on login ──
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchWishlist()
      .then((res) => {
        const items = (res.data || []).map(normalize);
        setWishlist(items);
      })
      .catch(() => {});
  }, [isLoggedIn]);

  // ── Debounced sync to DB whenever wishlist changes ──
  const debouncedSync = useCallback((items) => {
    if (!isLoggedIn) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => {
      syncWishlist(items).catch(() => {});
    }, 600);
  }, [isLoggedIn]);

  useEffect(() => {
    debouncedSync(wishlist);
  }, [wishlist, debouncedSync]);

  // ── Listen for login/logout ──
  useEffect(() => {
    const check = () => {
      const loggedIn = !!localStorage.getItem("token");
      setIsLoggedIn(loggedIn);
      if (!loggedIn) setWishlist([]);
    };
    window.addEventListener("storage", check);
    window.addEventListener("authChange", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("authChange", check);
    };
  }, []);

  // ── Actions ──
  const addToWishlist = (product) => {
    const item = normalize(product);
    setWishlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWishlist = (product) => {
    const item = normalize(product);
    setWishlist((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      return exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];
    });
  };

  const isWishlisted = (id) => wishlist.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{
      wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isWishlisted,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);