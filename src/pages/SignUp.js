import { Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";
import SuccessPopup from "../components/SuccessPopup";

export default function SignUp() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ✅ Validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required ❌");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    try {
      // Split name into firstName + lastName
      const nameParts = form.name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";
      const res = await registerUser({
        firstName,
        lastName,
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Show premium popup
      setShowPopup(true);

    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed ❌");
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
            <h1 className="text-white text-3xl font-bold">Create Account</h1>
          </div>
        </div>

        {/* FORM */}
        <div className="flex justify-center py-12 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-6 text-center">
              Create Account
            </h2>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Name"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-3 rounded-lg mb-4 focus:border-green-500 outline-none"
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />

            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" required />
              Accept all terms & Conditions
            </label>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition">
              Create Account
            </button>

            <p className="text-center text-sm mt-4">
              Already have account?{" "}
              <Link to="/signin" className="text-green-600 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ PREMIUM SUCCESS POPUP */}
      {showPopup && (
        <SuccessPopup
          message="Account created successfully 🚀"
          onClose={() => {
            setShowPopup(false);
            window.dispatchEvent(new Event("userChanged"));
            window.location.href = "/";
          }}
        />
      )}
    </>
  );
}