import { Link, useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { items, removeFromCart, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-[#6b7280] hover:text-[#f5a623] transition-colors">الرئيسية</Link>
            <ArrowLeft className="w-4 h-4 text-[#9ca3af]" />
            <span className="text-[#1a2a4a] font-medium">سلة المشتريات</span>
          </nav>

          <h1 className="text-3xl font-black text-[#1a2a4a] mb-8 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-[#f5a623]" />
            سلة المشتريات
            {totalItems > 0 && (
              <span className="text-lg font-medium text-[#6b7280]">({totalItems} دورات)</span>
            )}
          </h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-[#f5a623]/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-[#f5a623]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1a2a4a] mb-3">السلة فارغة</h2>
              <p className="text-[#6b7280] mb-6">لم تضف أي دورات بعد. تصفح دوراتنا واختر ما يناسبك</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] font-bold hover:shadow-gold transition-all"
              >
                تصفح الدورات
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.course.id}
                    className="bg-white rounded-2xl border border-[#e5e7eb] p-6 flex flex-col sm:flex-row items-center gap-6 animate-slide-up"
                  >
                    {/* Course Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.course.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-navy`}>
                      {item.course.id === "premium-2026" ? (
                        <span className="text-2xl">👑</span>
                      ) : item.course.id === "intensive-2026" ? (
                        <span className="text-2xl">⚡</span>
                      ) : (
                        <span className="text-2xl">📚</span>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 text-center sm:text-right">
                      <h3 className="font-bold text-[#1a2a4a] mb-1">{item.course.name}</h3>
                      <p className="text-sm text-[#6b7280] mb-2">{item.course.subtitle}</p>
                      <div className="flex items-center gap-3 justify-center sm:justify-start text-sm">
                        <span className="text-[#f5a623] font-bold">{item.course.price} ر.س</span>
                        <span className="text-[#9ca3af] strikethrough">{item.course.originalPrice} ر.س</span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.course.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      إزالة
                    </button>
                  </div>
                ))}

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  إفراغ السلة
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-[#1a2a4a] mb-6">ملخص الطلب</h3>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.course.id} className="flex justify-between text-sm">
                        <span className="text-[#374151]">{item.course.name}</span>
                        <span className="font-bold text-[#1a2a4a]">{item.course.price} ر.س</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#e5e7eb] pt-4 mb-6">
                    {/* Original Total */}
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#6b7280]">المبلغ الأصلي</span>
                      <span className="text-[#9ca3af] strikethrough">
                        {items.reduce((sum, item) => sum + item.course.originalPrice, 0)} ر.س
                      </span>
                    </div>
                    {/* Savings */}
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-600">الخصم</span>
                      <span className="text-green-600 font-medium">
                        -{items.reduce((sum, item) => sum + (item.course.originalPrice - item.course.price), 0)} ر.س
                      </span>
                    </div>
                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-[#e5e7eb]">
                      <span className="font-bold text-[#1a2a4a]">الإجمالي</span>
                      <span className="text-2xl font-black text-[#f5a623]">{totalPrice} ر.س</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] font-bold text-lg hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    متابعة الشراء
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <Link
                    to="/"
                    className="flex items-center justify-center gap-2 w-full mt-3 px-6 py-3 rounded-xl border border-[#e5e7eb] text-[#6b7280] font-medium text-sm hover:bg-[#f8f9fa] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    إضافة دورات أخرى
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-4 border-t border-[#e5e7eb] grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg mb-1">🔒</div>
                      <div className="text-[10px] text-[#6b7280]">دفع آمن</div>
                    </div>
                    <div>
                      <div className="text-lg mb-1">⚡</div>
                      <div className="text-[10px] text-[#6b7280]">تفعيل فوري</div>
                    </div>
                    <div>
                      <div className="text-lg mb-1">✅</div>
                      <div className="text-[10px] text-[#6b7280]">ضمان الجودة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
