import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useCurrency } from "../context/CurrencyContext";

// const initialWishlist = [
//   {
//     id: 1,
//     name: "Green Capsicum",
//     price: "$14.99",
//     oldPrice: "$20.99",
//     stock: "In Stock",
//     img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=80",
//   },
//   {
//     id: 2,
//     name: "Chinese Cabbage",
//     price: "$45.00",
//     stock: "In Stock",
//     img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=80",
//   },
//   {
//     id: 3,
//     name: "Fresh Mango",
//     price: "$09.00",
//     stock: "Out of Stock",
//     img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=80",
//   },
// ];


export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { convert } = useCurrency();

  // const removeItem = (id) => {
  //   setItems(items.filter((item) => item.id !== id));
  // };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO / BREADCRUMB ── */}
      <div className="relative h-40 sm:h-52">
        <img
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1400"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center px-6 sm:px-16">
          <div>
            <h1 className="text-white text-3xl font-bold">My Wishlist</h1>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-green-400">Wishlist</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-sm font-semibold p-4">
            <span className="col-span-2">Product</span>
            <span>Price</span>
            <span>Stock Status</span>
          </div>

          {/* ITEMS */}
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center border-t p-4 text-sm"
            >
              {/* PRODUCT */}
              <div className="col-span-2 flex items-center gap-4">
                <img src={item.img} className="w-12 h-12 object-cover rounded" />
                <span className="font-medium text-gray-800">
                  {item.name}
                </span>
              </div>

              {/* PRICE */}
              <div>
                <span className="font-bold text-gray-800">{convert(item.price)}</span>
                {item.oldPrice && (
                  <span className="line-through text-gray-400 ml-2">{convert(item.oldPrice)}</span>
                )}
              </div>

              {/* STOCK + ACTION */}
              <div className="flex items-center gap-3">

                {/* STOCK BADGE */}
                <span className={`text-xs px-2 py-1 rounded ${item.stock !== "Out of Stock"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                  }`}>
                  {item.stock || "In Stock"}  
                </span>

                {/* BUTTON */}
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 text-xs rounded-full font-semibold bg-green-500 text-white hover:bg-green-600"
                >
                  Add to Cart
                </button>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-gray-400 hover:text-red-500 text-lg"
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {wishlist.length === 0 && (
            <div className="text-center p-10 text-gray-500">
              Your wishlist is empty.
            </div>
          )}
        </div>

        {/* SHARE */}
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
          Share:
          <span className="w-7 h-7 flex items-center justify-center bg-green-500 text-white rounded-full">f</span>
          <span className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-full">t</span>
          <span className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-full">p</span>
        </div>
      </div>
    </div>
  );
}