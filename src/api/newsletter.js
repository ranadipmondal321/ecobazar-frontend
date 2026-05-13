import axios from "axios";

const BASE = "https://ecobazar-backend-3.onrender.com/api/newsletter";

export const subscribeNewsletter   = (email) => axios.post(`${BASE}/subscribe`,   { email });
export const unsubscribeNewsletter = (email) => axios.post(`${BASE}/unsubscribe`, { email });
export const getSubscribers        = ()      => axios.get(`${BASE}/subscribers`);