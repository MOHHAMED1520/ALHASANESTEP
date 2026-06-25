import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Send, Copy, Check, ArrowRight, MessageCircle, AlertCircle } from "lucide-react";

interface LocationState {
  customerData: {
    fullName: string;
    phone: string;
    email: string;
    targetScore: string;
  };
  courses: { id: string; name: string; price: number }[];
  totalPrice: number;
}

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
    clearCart();
    setTimeout(() => setVisible(true), 100);
  }, [state, navigate, clearCart]);

  if (!state) return null;

  const { customerData, courses, totalPrice } = state;

  // Generate Telegram message
  const generateTelegramMessage = () => {
    const coursesList = courses.map((c, i) => `${i + 1}. ${c.name} - ${c.price} ر.س`).join("\n");
    return `
🎓 *طلب جديد - أكاديمية الحساني STEP 2026*

━━━━━━━━━━━━━━━━
👤 *بيانات المشترك:*
• الاسم: ${customerData.fullName}
• الجوال: ${customerData.phone}
• البريد: ${customerData.email}
• الدرجة المستهدفة: ${customerData.targetScore}

━━━━━━━━━━━━━━━━
📚 *الدورات المختارة:*
${coursesList}

━━━━━━━━━━━━━━━━
💰 *المبلغ الإجمالي: ${totalPrice} ر.س*

━━━━━━━━━━━━━━━━
⏰ *حالة الطلب:* في انتظار التحويل البنكي
📱 *يرجى إرسال تفاصيل الدفع لتأكيد الاشتراك*
`.trim();
  };

  const telegramMessage = generateTelegramMessage();
  const encodedMessage = encodeURIComponent(telegramMessage);
  const telegramUrl = `https://t.me/qiyas_2026_2030`;
  const telegramSendUrl = `https://t.me/share/url?url=${encodeURIComponent("https://t.me/qiyas_2026_2030")}&text=${encodedMessage}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(telegramMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleOpenTelegram = () => {
    // Try to open Telegram with pre-filled message
    window.open(telegramSendUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-8 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div
            className={`text-center mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-14 h-14 text-green-500" />
            </div>
            <h1 className="text-3xl font-black text-[#1a2a4a] mb-3">
              تم استلام طلبك بنجاح!
            </h1>
            <p className="text-[#6b7280] max-w-lg mx-auto">
              شكراً لثقتك بأكاديمية الحساني. خطوة واحدة تفصلك عن تفعيل اشتراكك!
            </p>
          </div>

          {/* Order Details Card */}
          <div
            className={`bg-white rounded-2xl border border-[#e5e7eb] p-6 lg:p-8 mb-6 shadow-lg transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-xl font-bold text-[#1a2a4a] mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              تفاصيل الطلب
            </h2>

            {/* Customer Info */}
            <div className="bg-[#f8f9fa] rounded-xl p-4 mb-6">
              <h3 className="text-sm font-bold text-[#1a2a4a] mb-3">بيانات المشترك</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#6b7280]">الاسم:</span>
                  <span className="mr-2 font-medium text-[#1a2a4a]">{customerData.fullName}</span>
                </div>
                <div>
                  <span className="text-[#6b7280]">الجوال:</span>
                  <span className="mr-2 font-medium text-[#1a2a4a]">{customerData.phone}</span>
                </div>
                <div>
                  <span className="text-[#6b7280]">البريد:</span>
                  <span className="mr-2 font-medium text-[#1a2a4a]">{customerData.email}</span>
                </div>
                <div>
                  <span className="text-[#6b7280]">الدرجة المستهدفة:</span>
                  <span className="mr-2 font-medium text-[#1a2a4a]">{customerData.targetScore}</span>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#1a2a4a] mb-3">الدورات المختارة</h3>
              <div className="space-y-2">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a] text-white flex items-center justify-center text-sm font-bold shadow-navy">
                        {index + 1}
                      </span>
                      <span className="font-medium text-[#1a2a4a] text-sm">{course.name}</span>
                    </div>
                    <span className="font-bold text-[#f5a623]">{course.price} ر.س</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-[#e5e7eb] pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-[#1a2a4a]">المبلغ المستحق</span>
                <span className="text-3xl font-black text-[#f5a623]">{totalPrice} ر.س</span>
              </div>
            </div>
          </div>

          {/* Telegram CTA Card */}
          <div
            className={`bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] rounded-2xl p-6 lg:p-8 text-white mb-6 shadow-navy transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f5a623] flex items-center justify-center shadow-gold">
                <Send className="w-6 h-6 text-[#1a2a4a]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">خطوة واحدة متبقية!</h3>
                <p className="text-white/60 text-sm">أرسل تفاصيل طلبك عبر التلجرام لإتمام عملية الشراء</p>
              </div>
            </div>

            {/* Pre-written Message Preview */}
            <div className="bg-white/10 rounded-xl p-4 mb-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#f5a623] font-medium">الرسالة الجاهزة:</span>
                <button
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1 text-xs text-white/60 hover:text-[#f5a623] transition-colors"
                >
                  {copied ? (
                    <><Check className="w-3 h-3" /> تم النسخ</>
                  ) : (
                    <><Copy className="w-3 h-3" /> نسخ</>
                  )}
                </button>
              </div>
              <pre className="text-xs text-white/80 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto bg-white/5 rounded-lg p-3">
                {telegramMessage}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleOpenTelegram}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#f5a623] text-[#1a2a4a] font-bold hover:shadow-gold hover:scale-[1.02] transition-all"
              >
                <Send className="w-5 h-5" />
                فتح التلجرام وإرسال الطلب
              </button>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                مراسلة الدعم
              </a>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/60 leading-relaxed">
                بعد إرسال الرسالة، سيقوم فريق الدعم بإرسال تفاصيل الحساب البنكي لإتمام عملية التحويل.
                سيتم تفعيل اشتراكك فور تأكيد عملية الدفع.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div
            className={`text-center transition-all duration-700 delay-600 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#f5a623] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
