import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, updateProfile, changePassword } from "../api/user";
import axios from "axios";

export default function EditProfile() {
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [preview, setPreview] = useState(""); // local blob URL for instant preview

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        avatar: "",
    });

    const [pwForm, setPwForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirm: "",
    });

    // ── Load current profile ──
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/signin"); return; }
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setFetching(true);
            const res = await getProfile();
            const u = res.data;
            setForm({
                firstName: u.firstName || u.name || "",
                lastName: u.lastName || "",
                email: u.email || "",
                phone: u.phone || "",
                avatar: u.avatar || "",
            });
            setPreview(u.avatar || "");
        } catch (err) {
            if (err.response?.status === 401) navigate("/signin");
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handlePwChange = (e) => setPwForm({ ...pwForm, [e.target.name]: e.target.value });

    // ── Photo picker: show instant preview then upload ──
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Instant local preview
        const blobUrl = URL.createObjectURL(file);
        setPreview(blobUrl);

        // Upload to backend
        try {
            setUploading(true);
            setMessage({ type: "", text: "" });

            const formData = new FormData();
            formData.append("avatar", file);

            const res = await axios.post("http://localhost:5000/api/user/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const newAvatarUrl = res.data.avatarUrl;

            // Save URL into form state so it gets saved on profile update too
            setForm(prev => ({ ...prev, avatar: newAvatarUrl }));
            setPreview(newAvatarUrl);

            // Update localStorage + header
            const stored = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...stored, avatar: newAvatarUrl }));
            window.dispatchEvent(new Event("userChanged"));

            setMessage({ type: "success", text: "Photo updated successfully! ✅" });
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Photo upload failed" });
            setPreview(form.avatar); // revert preview on error
        } finally {
            setUploading(false);
        }
    };

    // ── Save profile ──
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        if (!form.firstName || !form.email) {
            setMessage({ type: "error", text: "Name and email are required" });
            return;
        }
        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            const res = await updateProfile({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                avatar: form.avatar,
            });

            const stored = JSON.parse(localStorage.getItem("user") || "{}");
            const updated = { ...stored, ...res.data.user };
            localStorage.setItem("user", JSON.stringify(updated));
            window.dispatchEvent(new Event("userChanged"));

            setMessage({ type: "success", text: "Profile updated successfully! ✅" });
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Update failed" });
        } finally {
            setLoading(false);
        }
    };

    // ── Change password ──
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!pwForm.oldPassword || !pwForm.newPassword || !pwForm.confirm) {
            setMessage({ type: "error", text: "All fields are required" }); return;
        }
        if (pwForm.newPassword !== pwForm.confirm) {
            setMessage({ type: "error", text: "Passwords do not match" }); return;
        }
        if (pwForm.newPassword.length < 6) {
            setMessage({ type: "error", text: "Password must be at least 6 characters" }); return;
        }
        try {
            setLoading(true);
            setMessage({ type: "", text: "" });
            await changePassword({ oldPassword: pwForm.oldPassword, newPassword: pwForm.newPassword });
            setMessage({ type: "success", text: "Password changed successfully! ✅" });
            setPwForm({ oldPassword: "", newPassword: "", confirm: "" });
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to change password" });
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Loading profile...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Segoe UI',system-ui,sans-serif" }}>

            {/* Hero */}
            <div className="relative h-36 sm:h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=300&fit=crop"
                    alt="banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 to-green-700/50" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-16">
                    <div>
                        <h1 className="text-white text-2xl sm:text-4xl font-extrabold">Edit Profile</h1>
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
                            <Link to="/" className="hover:text-white">Home</Link>
                            <span>›</span>
                            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
                            <span>›</span>
                            <span className="text-white font-semibold">Edit Profile</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">

                {/* Alert */}
                {message.text && (
                    <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}>
                        <span>{message.type === "success" ? "✅" : "❌"}</span>
                        {message.text}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
                    {[
                        { id: "profile", label: "👤 Edit Profile" },
                        { id: "password", label: "🔒 Change Password" },
                    ].map(tab => (
                        <button key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setMessage({ type: "", text: "" }); }}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id
                                    ? "bg-green-500 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── PROFILE TAB ── */}
                {activeTab === "profile" && (
                    <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-lg font-extrabold text-gray-800 mb-6">Personal Information</h2>

                        {/* ── PHOTO UPLOAD ── */}
                        <div className="flex items-center gap-5 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">

                            {/* Avatar circle */}
                            <div className="relative flex-shrink-0">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-green-300 bg-green-100 flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="avatar"
                                            onError={e => e.target.style.display = "none"}
                                            className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-green-600 text-2xl font-extrabold">
                                            {form.firstName?.charAt(0)?.toUpperCase() || "U"}
                                        </span>
                                    )}
                                </div>

                                {/* Camera icon overlay */}
                                <button type="button" onClick={() => fileRef.current?.click()}
                                    className="absolute bottom-0 right-0 w-7 h-7 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-md transition-colors"
                                    title="Change photo">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Text + button */}
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-700 mb-0.5">Profile Photo</p>
                                <p className="text-xs text-gray-400 mb-3">JPG, PNG or WEBP · Max 3MB</p>

                                <button type="button" onClick={() => fileRef.current?.click()}
                                    disabled={uploading}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-green-400 text-green-600 font-bold text-sm rounded-lg hover:bg-green-50 transition-colors disabled:opacity-60">
                                    {uploading ? (
                                        <>
                                            <span className="w-3.5 h-3.5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Choose Photo
                                        </>
                                    )}
                                </button>

                                {/* Hidden file input */}
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Form fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">First Name *</label>
                                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required
                                    placeholder="First Name"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">Last Name</label>
                                <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs font-bold text-gray-600 mb-1 block">Email Address *</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} required
                                    placeholder="Email Address"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs font-bold text-gray-600 mb-1 block">Phone Number</label>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button type="submit" disabled={loading || uploading}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </span>
                                ) : "💾 Save Changes"}
                            </button>
                            <Link to="/dashboard"
                                className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm text-center">
                                Cancel
                            </Link>
                        </div>
                    </form>
                )}

                {/* ── PASSWORD TAB ── */}
                {activeTab === "password" && (
                    <form onSubmit={handleChangePassword} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-lg font-extrabold text-gray-800 mb-6">Change Password</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">Current Password *</label>
                                <input type="password" name="oldPassword" value={pwForm.oldPassword} onChange={handlePwChange} required
                                    placeholder="Enter current password"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">New Password *</label>
                                <input type="password" name="newPassword" value={pwForm.newPassword} onChange={handlePwChange} required
                                    placeholder="Enter new password (min 6 chars)"
                                    className="w-full border-2 border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-600 mb-1 block">Confirm New Password *</label>
                                <input type="password" name="confirm" value={pwForm.confirm} onChange={handlePwChange} required
                                    placeholder="Confirm new password"
                                    className={`w-full border-2 rounded-lg px-4 py-3 text-sm outline-none transition-colors ${pwForm.confirm && pwForm.newPassword !== pwForm.confirm
                                            ? "border-red-400 bg-red-50"
                                            : "border-gray-200 focus:border-green-400"
                                        }`} />
                                {pwForm.confirm && pwForm.newPassword !== pwForm.confirm && (
                                    <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button type="submit" disabled={loading}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Updating...
                                    </span>
                                ) : "🔒 Update Password"}
                            </button>
                            <button type="button" onClick={() => setPwForm({ oldPassword: "", newPassword: "", confirm: "" })}
                                className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">
                                Clear
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}