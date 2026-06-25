import { Link } from "react-router";
import { MessageCircle, Send, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0f1d3a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/logo.jpg"
                alt="أكاديمية الحساني"
                className="w-14 h-14 rounded-xl object-cover border-2 border-[#f5a623]"
              />
              <div>
                <h3 className="font-bold text-lg">أكاديمية الحساني</h3>
                <p className="text-[#f5a623] text-sm">STEP 2026</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              أكاديمية متخصصة في التحضير لاختبار STEP 2026 مع دورات احترافية وخطط مذاكرة مجربة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#f5a623] mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-[#f5a623] text-sm transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/60 hover:text-[#f5a623] text-sm transition-colors"
                >
                  الدورات
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-white/60 hover:text-[#f5a623] text-sm transition-colors"
                >
                  لماذا نحن
                </button>
              </li>
              <li>
                <Link to="/cart" className="text-white/60 hover:text-[#f5a623] text-sm transition-colors">
                  سلة المشتريات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#f5a623] mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://t.me/qiyas_2026_2030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-[#f5a623] text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  تلجرام الدعم
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MessageCircle className="w-4 h-4" />
                للاستفسارات والدعم
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <GraduationCap className="w-4 h-4" />
                استشارة مجانية
              </li>
            </ul>
          </div>

          {/* Telegram CTA */}
          <div className="bg-[#f5a623]/10 rounded-2xl p-5 border border-[#f5a623]/20">
            <h4 className="font-bold text-[#f5a623] mb-3">انضم لقناتنا</h4>
            <p className="text-white/60 text-sm mb-4">
              احصل على نصائح يومية وتحديثات مجانية للاختبار
            </p>
            <a
              href="https://t.me/qiyas_2026_2030"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#f5a623] text-[#1a2a4a] font-bold text-sm hover:shadow-gold transition-all"
            >
              <Send className="w-4 h-4" />
              قناة التلجرام
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/40 text-sm">
            © 2026 أكاديمية الحساني للتدريب. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
