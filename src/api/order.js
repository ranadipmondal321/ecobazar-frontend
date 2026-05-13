import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const placeOrder = (data) => {
  return axios.post("https://ecobazar-backend-3.onrender.com/api/orders/create", data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
};

export const getOrders = () => {
  return axios.get("https://ecobazar-backend-3.onrender.com/api/orders", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const getOrderById = (id) => {
  return axios.get(`https://ecobazar-backend-3.onrender.com/api/orders/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const cancelOrder = (id) => {
  return axios.put(`https://ecobazar-backend-3.onrender.com/api/orders/${id}/cancel`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};