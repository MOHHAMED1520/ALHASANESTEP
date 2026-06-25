import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowDown, Award, Users, BookOpen, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const scrollToCourses = () => {
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative bg-navy-gradient overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5a623]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f5a623]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div
            className={`text-center lg:text-right transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5a623]/20 border border-[#f5a623]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
              <span className="text-sm font-medium text-[#f5a623]">تحديث 2026 - نماذج 50-51-52</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              أكاديمية الحساني
              <span className="block text-[#f5a623] mt-2">لاختبار STEP 2026</span>
            </h1>

            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              دورات احترافية مصممة خصيصاً لتحقيق درجات عالية في اختبار كفايات اللغة الإنجليزية STEP.
              من الصفر حتى الاحتراف مع أحدث النماذج والتدريبات المكثفة.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={scrollToCourses}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] font-bold text-lg hover:shadow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                اكتشف الدورات
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </button>
              <Link
                to="/cart"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all"
              >
                سلة المشتريات
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Users className="w-6 h-6 text-[#f5a623] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">+5000</div>
                <div className="text-xs text-white/60">طالب مشترك</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Award className="w-6 h-6 text-[#f5a623] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">+90</div>
                <div className="text-xs text-white/60">متوسط الدرجة</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <BookOpen className="w-6 h-6 text-[#f5a623] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">3</div>
                <div className="text-xs text-white/60">دورات متخصصة</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <TrendingUp className="w-6 h-6 text-[#f5a623] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">95%</div>
                <div className="text-xs text-white/60">نسبة النجاح</div>
              </div>
            </div>
          </div>

          {/* Logo Display */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#f5a623]/20 rounded-3xl blur-2xl scale-110" />
              <img
                src="/assets/logo.jpg"
                alt="أكاديمية الحساني STEP 2026"
                className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-3xl object-cover border-4 border-[#f5a623] shadow-gold"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-[#f5a623] text-[#1a2a4a] px-4 py-2 rounded-xl font-bold text-sm shadow-gold animate-bounce">
                STEP 2026
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-[#1a2a4a] px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-1">
                <span className="text-green-500">●</span>
                متاح الآن
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
