import axios from "axios";

const BASE = "https://ecobazar-backend-3.onrender.com";
const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

// ── CART ──
export const fetchCart    = ()        => axios.get(`${BASE}/api/cart`, authHeaders());
export const syncCart     = (items)   => axios.post(`${BASE}/api/cart/sync`, { items }, authHeaders());
export const clearCartDB  = ()        => axios.delete(`${BASE}/api/cart`, authHeaders());

// ── WISHLIST ──
export const fetchWishlist  = ()      => axios.get(`${BASE}/api/wishlist`, authHeaders());
export const syncWishlist   = (items) => axios.post(`${BASE}/api/wishlist/sync`, { items }, authHeaders());