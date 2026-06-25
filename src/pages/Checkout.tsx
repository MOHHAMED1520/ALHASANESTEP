import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, User, Phone, Mail, Target, CreditCard, Check, AlertCircle } from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  targetScore: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  targetScore?: string;
}

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    targetScore: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [agreed, setAgreed] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a2a4a] mb-4">السلة فارغة</h2>
            <Link to="/" className="text-[#f5a623] hover:underline">العودة للتسوق</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "الاسم الكامل مطلوب";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم التواصل مطلوب";
    } else if (!/^(05|5)\d{8}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "رقم الجوال غير صحيح (مثال: 05XXXXXXXX)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.targetScore) {
      newErrors.targetScore = "الدرجة المستهدفة مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    if (validate()) {
      // Pass form data to order success page via navigation state
      navigate("/order-success", {
        state: {
          customerData: formData,
          courses: items.map((i) => ({ id: i.course.id, name: i.course.name, price: i.course.price })),
          totalPrice,
        },
      });
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-right transition-all focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-300 focus:ring-red-200 bg-red-50"
        : "border-[#e5e7eb] focus:ring-[#f5a623]/30 focus:border-[#f5a623] bg-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-[#6b7280] hover:text-[#f5a623] transition-colors">الرئيسية</Link>
            <ArrowLeft className="w-4 h-4 text-[#9ca3af]" />
            <Link to="/cart" className="text-[#6b7280] hover:text-[#f5a623] transition-colors">السلة</Link>
            <ArrowLeft className="w-4 h-4 text-[#9ca3af]" />
            <span className="text-[#1a2a4a] font-medium">إتمام الطلب</span>
          </nav>

          <h1 className="text-3xl font-black text-[#1a2a4a] mb-8 flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-[#f5a623]" />
            إتمام الطلب
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e7eb] p-6 lg:p-8">
                <h2 className="text-xl font-bold text-[#1a2a4a] mb-6">بيانات المشترك</h2>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <User className="w-4 h-4 text-[#f5a623]" />
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={inputClasses("fullName")}
                      placeholder="أدخل اسمك الكامل"
                      dir="rtl"
                    />
                    {errors.fullName && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Phone className="w-4 h-4 text-[#f5a623]" />
                      رقم الجوال (للتواصل)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClasses("phone")}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Mail className="w-4 h-4 text-[#f5a623]" />
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClasses("email")}
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Target Score */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#374151] mb-2">
                      <Target className="w-4 h-4 text-[#f5a623]" />
                      الدرجة المستهدفة في STEP
                    </label>
                    <select
                      value={formData.targetScore}
                      onChange={(e) => setFormData({ ...formData, targetScore: e.target.value })}
                      className={inputClasses("targetScore")}
                    >
                      <option value="">اختر الدرجة المستهدفة</option>
                      <option value="80-85">80 - 85</option>
                      <option value="85-90">85 - 90</option>
                      <option value="90-95">90 - 95</option>
                      <option value="95-100">95 - 100</option>
                    </select>
                    {errors.targetScore && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" />
                        {errors.targetScore}
                      </p>
                    )}
                  </div>

                  {/* Agreement */}
                  <div className="pt-4 border-t border-[#e5e7eb]">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-[#e5e7eb] text-[#f5a623] focus:ring-[#f5a623]"
                      />
                      <span className="text-sm text-[#374151] leading-relaxed">
                        أوافق على شروط الاشتراك وأتعهد بتحويل المبلغ المستحق خلال 24 ساعة من تأكيد الطلب.
                        سيتم إرسال تفاصيل التحويل عبر التلجرم.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!agreed}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                      agreed
                        ? "bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed"
                    }`}
                  >
                    تأكيد الطلب
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#1a2a4a] mb-6">ملخص الطلب</h3>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.course.id} className="flex justify-between text-sm">
                      <span className="text-[#374151]">{item.course.name}</span>
                      <span className="font-bold text-[#1a2a4a]">{item.course.price} ر.س</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e5e7eb] pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1a2a4a]">الإجمالي</span>
                    <span className="text-2xl font-black text-[#f5a623]">{totalPrice} ر.س</span>
                  </div>
                </div>

                {/* Payment Method Info */}
                <div className="mt-6 p-4 bg-[#f5a623]/10 rounded-xl border border-[#f5a623]/20">
                  <h4 className="text-sm font-bold text-[#1a2a4a] mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#f5a623]" />
                    طريقة الدفع
                  </h4>
                  <p className="text-xs text-[#6b7280] leading-relaxed">
                    بعد تأكيد الطلب، سيتم إرسال رسالة عبر التلجرام تحتوي على تفاصيل التحويل البنكي.
                    سيتم تفعيل اشتراكك فور تأكيد عملية التحويل.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
