import { Routes, Route } from "react-router";
import { CartProvider } from "@/context/CartContext";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import CourseDetails from "@/pages/CourseDetails";
import OrderSuccess from "@/pages/OrderSuccess";
import AIChatbot from "@/components/AIChatbot";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      {/* Floating AI Chatbot - visible on all pages */}
      <AIChatbot />
    </CartProvider>
  );
}
