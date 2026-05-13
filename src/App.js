import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";   // homepage
import Shop from "./Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import MyProfile from "./pages/MyProfile";
import OrderHistory from "./components/OrderHistory";
import Wishlist from "./components/Wishlist";
import Returns from "./components/Returns";
import TrackOrder from "./components/TrackOrder";
import { CartProvider } from "./context/CartContext";
import UserDashboard from "./pages/UserDashboard";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoutes";
import Checkout from "./pages/Chekout";
import EditProfile from "./pages/EditProfile";


export default function App() {
  return (
    
    <CartProvider>
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        {/* <Route path="/my-profile" element={<MyProfile />} /> */}
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/dashboard" element={<ProtectedRoute> <UserDashboard /> </ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      </Layout>
      </CartProvider>
   
   
  );
}