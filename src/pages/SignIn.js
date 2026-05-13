import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth";
import SuccessPopup from "../components/SuccessPopup";

export default function SignIn() {

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(form);

      // ✅ Save token + user
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // ✅ Fire BOTH events immediately — Header and Contexts update right away
      window.dispatchEvent(new Event("authChange"));   // triggers CartContext + WishlistContext DB fetch
      window.dispatchEvent(new Event("userChanged"));  // triggers Header user state

      // ✅ Show popup — waits for user to click Continue
      setShowPopup(true);

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">

        {/* HERO */}
        <div className="relative h-40">
          <img
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400"
            className="w-full h-full object-cover"
            alt="banner"
          />
          <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold">Sign In</h1>
          </div>
        </div>

        {/* FORM */}
        <div className="flex justify-center py-12 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-6 text-center">
              Login to Your Account
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-600 font-semibold">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Continue button closes popup and navigates home */}
      {showPopup && (
        <SuccessPopup
          message="Login Successful! Welcome back 👋"
          onClose={() => {
            setShowPopup(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
}