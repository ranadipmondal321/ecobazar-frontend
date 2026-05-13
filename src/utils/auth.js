export const getUser = () => {
    try {
        const user = localStorage.getItem("user");

        return user && user !== "undefined"
            ? JSON.parse(user)
            : null;

    } catch {
        return null;
    }
};

// utils/auth.js
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("authChange"));
  window.dispatchEvent(new Event("userChanged"));
};