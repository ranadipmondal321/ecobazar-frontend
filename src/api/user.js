import axios from "axios";

const API = "https://ecobazar-backend-3.onrender.com/api/user";
const getToken = () => localStorage.getItem("token");

const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
});

// Get profile
export const getProfile = () =>
    axios.get(`${API}/profile`, { headers: headers() });

// Update profile
export const updateProfile = (data) =>
    axios.put(`${API}/profile`, data, { headers: headers() });

// Change password
export const changePassword = (data) =>
    axios.put(`${API}/change-password`, data, { headers: headers() });