import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  "My Profile",
  "Order History",
  "Wishlist",
  "Returns",
  "Track Order",
];

export default function MyProfile() {
  const [active, setActive] = useState("My Profile");
  const location = useLocation();

  useEffect(() => {
    const pathMap = {
        "/myprofile":    "My Profile",
        "/orders": "Order History",
        "/wishlist":     "Wishlist",
        "/returns":      "Returns",
        "/track-order":   "Track Order",
    };
    const found = pathMap[location.pathname];
    if (found) setActive(found);
}, [location.pathname]);



  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── BREADCRUMB ── */}
      <div className="bg-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-600">

          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <span className="text-gray-400">›</span>

          <span className="text-gray-500">
            My Account
          </span>

          <span className="text-gray-400">›</span>

          <span className="text-gray-800 font-semibold">
            {active}
          </span>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => window.history.back()}
          className="mt-2 text-green-500 text-sm hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-col lg:flex-row">

        {/* ── SIDEBAR ── */}
        <div className="lg:w-1/4 bg-[#0b1a2c] text-white p-6">
          <h2 className="text-xl font-bold mb-6">My Account</h2>

          <ul className="space-y-4">
            {[
              { label: "My Profile", path: "/myprofile" },
              { label: "Order History", path: "/orders" },
              { label: "Wishlist", path: "/wishlist" },
              { label: "Returns", path: "/returns" },
              { label: "Track Order", path: "/track-order" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setActive(item.label)}
                  className={`block text-sm transition ${active === item.label
                      ? "text-white font-bold border-l-4 border-green-400 pl-3"
                      : "text-gray-300 hover:text-green-400 pl-3"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CONTENT ── */}
        <div className="flex-1 p-6 sm:p-10">

          {active === "My Profile" && (
            <div className="bg-white rounded-2xl shadow p-6 max-w-2xl">

              <h2 className="text-xl font-bold mb-6 text-gray-800">
                My Profile
              </h2>

              {/* PROFILE IMAGE */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                  className="w-16 h-16 rounded-full"
                />
                <button className="text-sm bg-green-500 text-white px-4 py-2 rounded-full">
                  Change Photo
                </button>
              </div>

              {/* FORM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-3 rounded-lg text-sm"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-3 rounded-lg text-sm"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="border p-3 rounded-lg text-sm col-span-2"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-3 rounded-lg text-sm col-span-2"
                />
              </div>

              {/* BUTTON */}
              <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold">
                Save Changes
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}