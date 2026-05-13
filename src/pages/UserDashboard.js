import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../api/user";
import { logoutUser } from "../utils/auth";
import LogoutPopup from "../components/LogoutPopup"

export default function UserDashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        console.log("Auth Error", err);
        setError("Session expired. Please login again.");

        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // 🚫 Safety fallback
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  // 🔐 Logout
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };


  // ⏳ Loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // ❌ Error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
        <Link to="/" className="text-green-600">Home</Link> / Dashboard
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-[#0b1a2c] text-white p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-6">My Account</h2>

          <ul className="space-y-4 text-sm">
            <li><Link to="/dashboard">My Profile</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>

          {/* 🔥 Logout Button */}
          <button
            onClick={() => setShowLogout(true)}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-sm font-bold"
          >
            Logout
          </button>
        </div>

        {/* MAIN */}
        <div className="md:col-span-3 space-y-6">

          {/* PROFILE */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src={user.avatar || "https://i.pravatar.cc/100"}
              alt="user"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />

            <h3 className="font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-400 text-sm">{user.email}</p>

            <Link to="/editprofile"
              className="mt-2 text-green-600 text-sm font-semibold">
              ✏️ Edit Profile
            </Link>

          </div>

          {/* ACCOUNT INFO */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm mb-3">Account Info</h3>

            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>User ID:</b> {user._id}</p>
          </div>

        </div>
      </div>

      {showLogout && (
        <LogoutPopup
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}


    </div>

  );
}