import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { getUser, logoutUser } from "../utils/auth";


export default function Header() {

    const location = useLocation();

    const [mobileMenu, setMobileMenu] = useState(false);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const navLinks = ["Home", "Shop", "Blog", "About Us", "Contact Us", "Account"];

    const { currency, setCurrency, rates, convert } = useCurrency();
    const currencyRef = useRef();
    const { wishlist } = useWishlist();
    const { cartCount, cartTotal } = useCart();
    const [currencyOpen, setCurrencyOpen] = useState(false);


    const navigate = useNavigate();

    // const [showDropdown, setDropdown] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const userRef = useRef()

    const [user, setUser] = useState(() => {

        try {

            const storedUser = localStorage.getItem("user");

            if (
                storedUser &&
                storedUser !== "undefined"
            ) {
                return JSON.parse(storedUser);
            }

            return null;

        } catch {
            return null;
        }
    });

    // ✅ REPLACE all user useEffects with just this one
    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("user");
                setUser(stored && stored !== "undefined" ? JSON.parse(stored) : null);
            } catch {
                setUser(null);
            }
        };

        // Run immediately on mount
        syncUser();

        // Listen for login/logout events
        window.addEventListener("userChanged", syncUser);
        window.addEventListener("storage", syncUser); // ✅ catches cross-tab changes

        return () => {
            window.removeEventListener("userChanged", syncUser);
            window.removeEventListener("storage", syncUser);
        };
    }, []); // ✅ empty array — runs once on mount, event handles rest


    const handleSearch = () => {
        if (search.trim() !== "") {
            navigate(`/shop?search=${search}`);
        }
    };


    // useEffect(() => {
    //     function handleClickOutside(e) {
    //         if (userRef.current && !userRef.current.contains(e.target)) {
    //             setUserOpen(false);
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);



    // ✅ Logout function
    const handleLogout = () => {
        logoutUser();
        setUser(null);
        navigate("/");
    };

    return (

        <header className="bg-white shadow-sm sticky top-0 z-40">

            <div className="block bg-white border-b border-gray-100 text-xs text-gray-500 py-2">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 flex justify-between items-center">

                    {/* 📍 Hide long address on mobile */}
                    <span className="hidden sm:block">
                        📍 Store Location: Ballygunge, South Kolkata, Kolkata - 700029
                    </span>

                    {/* 📱 Mobile: Short version */}
                    <span className="sm:hidden">
                        📍 Kolkata
                    </span>

                    <div className="flex items-center gap-3 sm:gap-5">

                        {/* 💱 Currency */}
                        <div ref={currencyRef} className="relative">
                            <span
                                onClick={() => setCurrencyOpen(prev => !prev)}
                                className="cursor-pointer hover:text-green-600 font-medium flex items-center gap-1"
                            >
                                {currency} ▾
                            </span>

                            {currencyOpen && (
                                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 z-50 min-w-24">
                                    {Object.keys(rates).map(cur => (
                                        <button
                                            key={cur}
                                            onClick={() => {
                                                setCurrency(cur);
                                                setCurrencyOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-green-50 hover:text-green-600 transition-colors ${currency === cur
                                                ? "bg-green-50 text-green-600"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {rates[cur].symbol} {cur}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="hidden sm:flex items-center gap-2 relative" ref={userRef}>
                            <div className="hidden sm:flex items-center gap-3">

                                {user ? (

                                    <>
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-2 hover:text-green-600"
                                        >

                                            <img
                                                src={user.avatar || "https://i.pravatar.cc/40"}
                                                alt="profile"
                                                className="w-9 h-9 rounded-full border-2 border-green-500 object-cover"
                                            />

                                            <span className="text-sm font-semibold text-gray-700">
                                                {user.name}
                                            </span>

                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </>

                                ) : (

                                    <div className="text-sm">
                                        <Link to="/signin">
                                            <span className="cursor-pointer hover:text-green-600">
                                                Sign In
                                            </span>
                                        </Link>

                                        {" | "}

                                        <Link to="/signup">
                                            <span className="cursor-pointer hover:text-green-600">
                                                Sign Up
                                            </span>
                                        </Link>
                                    </div>

                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
                <button onClick={() => setMobileMenu(!mobileMenu)} className="sm:hidden flex flex-col gap-1 p-1.5 rounded-md hover:bg-gray-100">
                    <span className="block w-5 h-0.5 bg-gray-600" /><span className="block w-5 h-0.5 bg-gray-600" /><span className="block w-5 h-0.5 bg-gray-600" />
                </button>
                <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-green-500 text-xl sm:text-2xl">🌿</span>
                    <span className="text-base sm:text-xl font-extrabold text-gray-800">Ecobazar</span>
                </Link>
                <div className="hidden sm:flex flex-1 max-w-xl">
                    <input
                        type="text"
                        placeholder="Search for fresh products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 border-2 border-gray-200 focus:border-green-400 rounded-l-lg px-4 py-2 text-sm outline-none"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-r-lg text-sm font-bold transition-colors"
                    >
                        Search
                    </button>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
                    <Link to="/wishlist"
                        className={`relative p-1.5 hidden sm:block transition-colors ${wishlist.length > 0 ? "text-red-500" : "text-gray-400 hover:text-red-400"
                            }`}>
                        {/* ✅ Filled when items in wishlist */}
                        <svg className="w-6 h-6" fill={wishlist.length > 0 ? "currentColor" : "none"}
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>

                        {/* ✅ Live badge count */}
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart"
                        className="relative flex items-center gap-1.5 bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>

                        {/* ✅ Item count badge */}
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}

                        {/* ✅ Total price */}
                        <span className="text-sm font-bold text-green-700 hidden sm:inline">
                            {convert(cartTotal)}
                        </span>
                    </Link>
                </div>
            </div>
            <div className="bg-gray-800 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <nav className="flex">
                        {navLinks.map(link => {
                            // ✅ Custom path mapping
                            const pathMap = {
                                "Home": "/",
                                "Shop": "/shop",
                                "Blog": "/blog",
                                "About Us": "/aboutus",
                                "Contact Us": "/contactus",
                                "Account": "/dashboard",  // ✅ Account → dashboard
                            };
                            const path = pathMap[link] || `/${link.toLowerCase().replace(/\s+/g, "")}`;

                            return (
                                <Link key={link} to={path}
                                    className={`flex-shrink-0 px-4 py-3 text-sm transition-colors ${location.pathname === path
                                        ? "text-green-400 border-b-2 border-green-400 font-bold"
                                        : "text-gray-300 hover:text-white"
                                        }`}>
                                    {link}
                                </Link>
                            );
                        })}
                    </nav>
                    <span className="text-gray-400 text-sm hidden lg:flex items-center gap-2">📞 (033) 4555-0114</span>
                </div>
            </div>
            {mobileMenu && (
                <div className="sm:hidden bg-white border-t shadow-lg">
                    {/* ✅ NEW: Sign In / Sign Up */}
                    <div className="px-5 py-4 border-b border-gray-100">

                        {user ? (
                            <div className="space-y-2">
                                <div className="text-sm font-bold text-gray-800">
                                    👤 {user.name}
                                </div>

                                <Link
                                    to="/dashboard"
                                    onClick={() => setMobileMenu(false)}
                                    className="block bg-green-500 text-white py-2 rounded-lg text-sm text-center"
                                >
                                    My Profile
                                </Link>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenu(false);
                                    }}
                                    className="w-full border border-red-500 text-red-600 py-2 rounded-lg text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/signin"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex-1 text-center bg-green-500 text-white py-2 rounded-lg text-sm font-bold"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex-1 text-center border border-green-500 text-green-600 py-2 rounded-lg text-sm font-bold"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}

                    </div>
                    {navLinks.map(link => {
                        // ✅ Custom path mapping
                        const pathMap = {
                            "Home": "/",
                            "Shop": "/shop",
                            "Blog": "/blog",
                            "About Us": "/aboutus",
                            "Contact Us": "/contactus",
                            "Account": "/dashboard",  // ✅ Account → dashboard
                        };
                        const path = pathMap[link] || `/${link.toLowerCase().replace(/\s+/g, "")}`;

                        return (
                            <Link key={link} to={path}
                                className={`block px-5 py-3.5 text-sm border-b border-gray-50 ${location.pathname === path
                                    ? "text-green-600 font-bold bg-green-50"
                                    : "text-gray-700 hover:bg-gray-50"
                                    }`}>
                                {link}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}