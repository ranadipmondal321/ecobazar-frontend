import { Link } from "react-router-dom";

const recentPosts = [
    {
        title: "Healthy Organic Food",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200"
    },
    {
        title: "Fresh Vegetables Guide",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200"
    }
];

export default function BlogDetails() {
    return (
        <div className="min-h-screen bg-white">

            {/* ── HERO ── */}
            <div className="relative h-48 sm:h-64">
                <img
                    src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1400"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-900/70" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-16">
                    <div>
                        <h1 className="text-white text-3xl sm:text-5xl font-extrabold">
                            Blog Details
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
                            <Link to="/" className="hover:text-white">
                                Home
                            </Link>

                            <span className="text-green-400">›</span>

                            <Link to="/blog" className="hover:text-white">
                                Blog
                            </Link>

                            <span className="text-green-400">›</span>

                            <span className="text-white font-semibold">
                                Details
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">

                {/* MAIN BLOG */}
                <div className="flex-1">

                    {/* Image */}
                    <img
                        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"
                        className="w-full h-80 object-cover rounded-xl mb-6"
                    />

                    {/* Meta */}
                    <div className="flex gap-4 text-xs text-gray-400 mb-3">
                        <span>👤 Admin</span>
                        <span>📅 April 5, 2026</span>
                        <span>💬 3 Comments</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4">
                        Benefits of Organic Food for Healthy Living
                    </h2>

                    {/* Content */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Organic food is grown without synthetic chemicals, fertilizers, or pesticides.
                        It ensures better nutrition and promotes a healthier lifestyle.
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Choosing organic food helps reduce exposure to harmful toxins and supports sustainable farming practices.
                        It also enhances taste and freshness.
                    </p>

                    <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-500 my-6">
                        “Eating organic is not just a trend, it's a healthy lifestyle choice.”
                    </blockquote>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Incorporating organic vegetables, fruits, and grains into your diet can significantly improve your overall well-being.
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["Organic", "Health", "Food"].map(tag => (
                            <span key={tag} className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Share */}
                    <div className="flex items-center gap-3 mb-10">
                        <span className="text-sm text-gray-500">Share:</span>
                        {["f", "𝕏", "in"].map(s => (
                            <button key={s} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-green-500 hover:text-white">
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Author */}
                    <div className="bg-gray-50 p-5 rounded-xl flex gap-4 items-center mb-10">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h4 className="font-bold text-gray-800">John Doe</h4>
                            <p className="text-xs text-gray-500">
                                Passionate about organic food and healthy living.
                            </p>
                        </div>
                    </div>

                    {/* COMMENTS */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Comments (3)</h3>

                        {[1, 2].map((c, i) => (
                            <div key={i} className="flex gap-3 mb-5">
                                <img
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="text-sm font-bold">User {c}</p>
                                    <p className="text-xs text-gray-400 mb-1">2 days ago</p>
                                    <p className="text-sm text-gray-600">
                                        Great article! Very informative.
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Comment Form */}
                        <h4 className="font-bold mt-6 mb-3">Leave a Comment</h4>
                        <textarea
                            placeholder="Write your comment..."
                            className="w-full border rounded-lg p-3 text-sm mb-3"
                        />
                        <button className="bg-green-500 text-white px-5 py-2 rounded-full">
                            Post Comment
                        </button>
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="lg:w-1/3 space-y-6">

                    {/* Search */}
                    <div className="bg-white p-5 shadow rounded-xl">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {/* Categories */}
                    <div className="bg-white p-5 shadow rounded-xl">
                        <h4 className="font-bold mb-3">Categories</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-green-600">Organic</li>
                            <li className="hover:text-green-600">Health</li>
                            <li className="hover:text-green-600">Lifestyle</li>
                        </ul>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white p-5 shadow rounded-xl">
                        <h4 className="font-bold mb-3">Recent Posts</h4>
                        {recentPosts.map((p, i) => (
                            <div key={i} className="flex gap-3 mb-3">
                                <img src={p.img} className="w-14 h-14 rounded" />
                                <p className="text-sm font-semibold">{p.title}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

        </div>
    );
}