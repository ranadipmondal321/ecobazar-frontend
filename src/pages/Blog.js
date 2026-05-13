import { Link } from "react-router-dom";

const posts = [
    {
        title: "Healthy Organic Food Benefits",
        date: "April 5, 2026",
        img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600",
        desc: "Discover how organic food improves your lifestyle and health."
    },
    {
        title: "Top 10 Fresh Vegetables",
        date: "April 2, 2026",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
        desc: "Explore the healthiest vegetables you should include daily."
    },
    {
        title: "Why Choose Organic Farming?",
        date: "March 28, 2026",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600",
        desc: "Organic farming ensures better quality and sustainability."
    },
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-white">

            {/* ── HERO ── */}
            <div className="relative h-40 sm:h-56">
                <img
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-900/70" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-16">
                    <div>
                        <h1 className="text-white text-3xl sm:text-5xl font-extrabold">
                            Blog
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-100">
                            <Link to="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="text-green-400">›</span>
                            <span className="text-white font-semibold">
                                Blog
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">

                {/* BLOG GRID */}
                <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {posts.map((post, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition">

                            <img src={post.img} className="w-full h-52 object-cover rounded-t-xl" />

                            <div className="p-5">
                                <p className="text-xs text-green-500 font-semibold mb-2">
                                    {post.date}
                                </p>
                                <Link to={`/blog/${post.title}`}>
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 hover:text-green-600">
                                        {post.title}
                                    </h3>
                                </Link>

                                <Link
                                    to={`/blog/${post.title}`}
                                    className="text-green-600 font-semibold text-sm hover:underline"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SIDEBAR */}
                <div className="lg:w-1/3 space-y-6">

                    {/* SEARCH */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border border-gray-200 px-4 py-2 rounded-lg outline-none"
                        />
                    </div>

                    {/* CATEGORIES */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold mb-3">Categories</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="hover:text-green-600 cursor-pointer">Organic</li>
                            <li className="hover:text-green-600 cursor-pointer">Vegetables</li>
                            <li className="hover:text-green-600 cursor-pointer">Fruits</li>
                            <li className="hover:text-green-600 cursor-pointer">Health</li>
                        </ul>
                    </div>

                    {/* RECENT POSTS */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold mb-3">Recent Posts</h4>
                        {posts.map((p, i) => (
                            <div key={i} className="flex gap-3 mb-3">
                                <img src={p.img} className="w-14 h-14 object-cover rounded" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-700">{p.title}</p>
                                    <span className="text-xs text-gray-400">{p.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PAGINATION ── */}
            <div className="flex justify-center gap-2 pb-10">
                {[1, 2, 3].map(n => (
                    <button
                        key={n}
                        className="w-9 h-9 rounded-full border hover:bg-green-500 hover:text-white"
                    >
                        {n}
                    </button>
                ))}
            </div>

      
        </div>
    );
}