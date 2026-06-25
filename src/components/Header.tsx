import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, GraduationCap } from "lucide-react";

export default function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/logo.jpg"
              alt="أكاديمية الحساني"
              className="h-12 w-12 lg:h-14 lg:w-14 rounded-xl object-cover border-2 border-[#f5a623] shadow-gold"
            />
            <div className="flex flex-col">
              <span className="text-sm lg:text-base font-bold text-[#1a2a4a] leading-tight">
                أكاديمية الحساني
              </span>
              <span className="text-[10px] lg:text-xs text-[#f5a623] font-semibold">
                STEP 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-[#1a2a4a] hover:text-[#f5a623] transition-colors"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="text-sm font-medium text-[#1a2a4a] hover:text-[#f5a623] transition-colors"
            >
              الدورات
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-[#1a2a4a] hover:text-[#f5a623] transition-colors"
            >
              لماذا نحن
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-[#1a2a4a] hover:text-[#f5a623] transition-colors"
            >
              تواصل معنا
            </button>
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1a2a4a] text-white hover:bg-[#f5a623] transition-colors shadow-navy"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#f5a623] text-[#1a2a4a] text-xs font-bold rounded-full shadow-gold animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#f5a623] text-[#1a2a4a]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e5e7eb] shadow-lg animate-slide-up">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-right text-[#1a2a4a] hover:bg-[#f5a623]/10 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-[#f5a623]" />
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-right text-[#1a2a4a] hover:bg-[#f5a623]/10 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-[#f5a623]" />
              الدورات
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-right text-[#1a2a4a] hover:bg-[#f5a623]/10 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-[#f5a623]" />
              لماذا نحن
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-right text-[#1a2a4a] hover:bg-[#f5a623]/10 transition-colors"
            >
              <GraduationCap className="w-5 h-5 text-[#f5a623]" />
              تواصل معنا
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
