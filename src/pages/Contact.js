import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="min-h-screen bg-white">

      

      {/* ── HERO BANNER ── */}
      <div className="relative h-40 sm:h-56 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1400"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-16">
          <div>
            <p className="text-green-300 text-xs font-bold uppercase mb-1">
              Get in Touch
            </p>
            <h1 className="text-white text-3xl sm:text-5xl font-extrabold">
              Contact Us
            </h1>
            <div className="flex gap-2 mt-2 text-sm text-green-100">
              <Link to="/">Home</Link>
              <span>›</span>
              <span className="text-white font-semibold">Contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT INFO */}
          <div className="lg:w-1/3 space-y-5">
            {[
              { icon: "📍", title: "Address", text: "Kolkata, India" },
              { icon: "📧", title: "Email", text: "support@example.com" },
              { icon: "📞", title: "Phone", text: "+91 9876543210" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-sm hover:shadow-lg transition rounded-xl p-5 flex gap-4 items-start"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT FORM */}
          <div className="flex-1 bg-white shadow-sm rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
              Just Say Hello!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We’d love to hear from you. Send us a message.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                  required
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none mt-4"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none mt-4 h-32"
              />

              <button
                type="submit"
                className="mt-5 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-300/40 text-sm"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="w-full h-80">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=kolkata&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
        />
      </section>

    </div>
  );
}