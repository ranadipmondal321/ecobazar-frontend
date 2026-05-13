import API from "./api";

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data && data !== "undefined" ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};