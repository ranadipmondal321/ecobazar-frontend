import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/order";
import { useCurrency } from "../context/CurrencyContext";
import SuccessPopup from "../components/SuccessPopup";

export default function Checkout() {

    const { cartItems, cartTotal, clearCart } = useCart();


    const { convert, rates, currency } = useCurrency();

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        state: "",
        zip: "",
        notes: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first to place an order");
                navigate("/signin");
                return;
            }

            if (!form.firstName || !form.phone || !form.address) {
                alert("Please fill all required fields ❌");
                return;
            }

            if (cartItems.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // ✅ Get current currency rate (83.5 for INR, 1 for USD)
            const currentRate = rates[currency].rate;
            const currencySymbol = rates[currency].symbol;

            const orderData = {
                items: cartItems.map(item => ({
                    productId: item._id || item.id,
                    name: item.name,
                    price: parseFloat((item.price * currentRate).toFixed(2)), // ✅ converted
                    quantity: item.quantity,
                    img: item.img,
                })),

                totalAmount: parseFloat((cartTotal * currentRate).toFixed(2)), // ✅ converted

                currency,        // ✅ "INR" or "USD" — saved for order history display
                currencySymbol,  // ✅ "₹" or "$"

                shippingAddress: {
                    name: `${form.firstName} ${form.lastName}`,
                    phone: form.phone,
                    address: form.address,
                    city: form.state,
                    pincode: form.pin,
                },
            };

            console.log("Sending order:", orderData);

            const res = await placeOrder(orderData);
            console.log("Order response:", res.data);

            clearCart();
            setShowPopup(true);

        } catch (err) {
            console.error("Checkout error:", err.response?.data || err.message);
            alert("❌ " + (err.response?.data?.message || "Order Failed. Please try again."));
        }
    };

    return (
        // <>    
        <div className="bg-gray-50 min-h-screen ">

            {/* ── HERO BANNER ── */}
            <div className="relative h-40 sm:h-56 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400" alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent" />
                <div className="absolute inset-0 flex items-center px-6 sm:px-16">
                    <div>
                        <h1 className="text-white text-3xl sm:text-5xl font-extrabold">
                            Checkout
                        </h1>
                        <div className="flex gap-2 mt-2 text-sm text-green-100">
                            <Link to="/">Home</Link>
                            <span>›</span>
                            <span className="text-white font-semibold">Shopping Cart</span>
                            <span>›</span>
                            <span className="text-white font-semibold">Checkout</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-10">

                {/* LEFT FORM */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

                    <h2 className="text-xl font-bold mb-4">Billing Information</h2>

                    <div className="grid md:grid-cols-2 gap-4">

                        <input name="firstName" placeholder="First Name"
                            onChange={handleChange} className="input"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="lastName" placeholder="Last Name"
                            onChange={handleChange} className="input"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />


                        <input name="email" placeholder="Email"
                            onChange={handleChange} className="input md:col-span-2"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="phone" placeholder="Phone"
                            onChange={handleChange} className="input md:col-span-2"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="address" placeholder="Address"
                            onChange={handleChange} className="input md:col-span-2"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="country" placeholder="Country"
                            onChange={handleChange} className="input"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="state" placeholder="State"
                            onChange={handleChange} className="input"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                        <input name="pin" placeholder="Pin Code"
                            onChange={handleChange} className="input"
                            className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none"
                            required
                        />

                    </div>

                    <textarea
                        name="notes"
                        placeholder="Order Notes"
                        onChange={handleChange}
                        className="w-full border border-gray-200 focus:border-green-400 rounded-lg px-4 py-3 text-sm outline-none mt-4 h-32"
                    />

                </div>

                {/* RIGHT SUMMARY */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                    {cartItems.length === 0 ? (
                        <p>No items in cart ❌</p>
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <div key={item._id} className="flex items-center justify-between mb-3">

                                    {/* LEFT: IMAGE + NAME */}
                                    <div className="flex items-center gap-3">

                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-lg object-cover border"
                                        />

                                        <div className="text-sm">
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                                        </div>

                                    </div>

                                    {/* RIGHT: PRICE */}
                                    <div className="font-semibold text-sm">
                                        {convert(item.price * item.quantity)}
                                    </div>

                                </div>
                            ))}

                            <hr className="my-3" />

                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>{convert(cartTotal)}</span>
                            </div>

                            {/* PAYMENT */}
                            <div className="mt-4 space-y-2 text-sm">
                                <label><input type="radio" name="payment" defaultChecked /> Cash on Delivery</label><br />
                                <label><input type="radio" name="payment" /> UPI</label><br />
                                <label><input type="radio" name="payment" /> Card</label>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold"
                            >
                                Place Order
                            </button>
                        </>
                    )}

                </div>

            </div>
            {showPopup && (
                <SuccessPopup
                    message="Order Placed Successfully 🎉"
                    onClose={() => {
                        setShowPopup(false);
                        navigate("/orders");
                    }}
                />
            )}
        </div>
        // </>
    );
}