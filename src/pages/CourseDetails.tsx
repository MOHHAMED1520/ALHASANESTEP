import { useParams, Link } from "react-router";
import { useState } from "react";
import { courses } from "@/data/courses";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Crown, Zap, BookOpen, Check, ShoppingCart, ArrowRight, Clock, Target, Star, Users, Award, FileText, Video, HelpCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-12 h-12" />,
  Zap: <Zap className="w-12 h-12" />,
  BookOpen: <BookOpen className="w-12 h-12" />,
};

const detailedContent: Record<string, { title: string; items: string[]; icon: React.ReactNode }[]> = {
  "premium-2026": [
    {
      title: "قسم القواعد (Grammar)",
      icon: <FileText className="w-6 h-6" />,
      items: [
        "شرح مبسط لجميع قواعد اللغة الإنجليزية المطلوبة في STEP",
        "تدريبات تفاعلية مع تصحيح فوري",
        "أسئلة متوقعة من نماذج 50-51-52",
        "نصائح لتجنب الأخطاء الشائعة"
      ]
    },
    {
      title: "قسم القراءة (Reading)",
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        "استراتيجيات القراءة السريعة والفهم العميق",
        "تدريب على أنواع الأسئلة المختلفة",
        "نصوص مشابهة لنماذج الاختبار الحقيقية",
        "تمارين تثبيت مع مراجعة شاملة"
      ]
    },
    {
      title: "قسم الاستماع (Listening)",
      icon: <Video className="w-6 h-6" />,
      items: [
        "تقنيات الاستماع الفعال والتركيز",
        "تدريبات عملية على المحادثات",
        "محاكاة واقعية لاختبار الاستماع",
        "نصائح لتحسين مهارات الاستماع"
      ]
    },
    {
      title: "محاكيات واختبارات",
      icon: <HelpCircle className="w-6 h-6" />,
      items: [
        "5 محاكيات كاملة للاختبار",
        "كويزات تفاعلية بعد كل درس",
        "تقييم ذاتي مع تقرير الأداء",
        "مراجعة نهائية شاملة قبل الاختبار"
      ]
    }
  ],
  "intensive-2026": [
    {
      title: "اليوم 1-3: المراجعة السريعة",
      icon: <Zap className="w-6 h-6" />,
      items: [
        "مراجعة شاملة لأهم القواعد",
        "تدريبات مكثفة على الأخطاء المتكررة",
        "حل نماذج سريعة مع الشرح"
      ]
    },
    {
      title: "اليوم 4-6: التثبيت والتطبيق",
      icon: <Target className="w-6 h-6" />,
      items: [
        "تثبيت المفاهيم الأساسية",
        "حل أكبر عدد من الأسئلة المتوقعة",
        "استراتيجيات الإجابة السريعة"
      ]
    },
    {
      title: "اليوم 7-10: المحاكاة والتجهيز",
      icon: <Award className="w-6 h-6" />,
      items: [
        "محاكيات كاملة تحت ضغط الوقت",
        "مراجعة ليلة الاختبار",
        "نصائح وأدوات النجاح"
      ]
    }
  ],
  "comprehensive-2026": [
    {
      title: "القواعد الأساسية (Structure)",
      icon: <FileText className="w-6 h-6" />,
      items: [
        "شرح تفصيلي من البداية",
        "تمارين تفاعلية متدرجة",
        "اختبارات قصيرة بعد كل وحدة"
      ]
    },
    {
      title: "القراءة والاستماع",
      icon: <BookOpen className="w-6 h-6" />,
      items: [
        "تقنيات القراءة السريعة",
        "مهارات الاستماع المتقدمة",
        "تدريبات عملية مكثفة"
      ]
    },
    {
      title: "القواعد المتقدمة (Grammar)",
      icon: <Star className="w-6 h-6" />,
      items: [
        "قواعد متقدمة للدرجات العالية",
        "تمارين تحديرية",
        "نماذج من اختبارات سابقة"
      ]
    },
    {
      title: "خطط المذاكرة المرنة",
      icon: <Clock className="w-6 h-6" />,
      items: [
        "خطة 5 أيام: المراجعة السريعة",
        "خطة 10 أيام: المراجعة المتوسطة",
        "خطة 30 يوم: التحضير الشامل"
      ]
    }
  ]
};

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1a2a4a] mb-4">الدورة غير موجودة</h2>
            <Link to="/" className="text-[#f5a623] hover:underline">العودة للرئيسية</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const inCart = isInCart(course.id);
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const sections = detailedContent[course.id] || [];

  const handleAdd = () => {
    if (!inCart) {
      addToCart(course.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      <main className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-[#6b7280] hover:text-[#f5a623] transition-colors">الرئيسية</Link>
            <ArrowRight className="w-4 h-4 text-[#9ca3af]" />
            <span className="text-[#1a2a4a] font-medium">{course.name}</span>
          </nav>

          {/* Course Header */}
          <div className={`bg-gradient-to-br ${course.gradient} rounded-2xl p-8 lg:p-12 text-white mb-8 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/3" />
            </div>
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                {iconMap[course.icon]}
              </div>
              <div className="text-center lg:text-right flex-1">
                <div className="flex items-center gap-2 mb-3 justify-center lg:justify-start">
                  <span className="px-3 py-1 rounded-full bg-[#f5a623] text-[#1a2a4a] text-xs font-bold">
                    {course.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                    وفر {discount}%
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-black mb-2">{course.name}</h1>
                <p className="text-white/80 mb-4">{course.subtitle}</p>
                <div className="flex items-center gap-4 justify-center lg:justify-start text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#f5a623]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-[#f5a623]" />
                    الهدف: {course.targetScore}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#f5a623]" />
                    وصول: {course.accessPeriod}
                  </span>
                </div>
              </div>
              {/* Price Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center min-w-[200px]">
                <div className="text-4xl font-black mb-1">{course.price} ر.س</div>
                <div className="text-lg text-white/60 strikethrough mb-4">{course.originalPrice} ر.س</div>
                <button
                  onClick={handleAdd}
                  disabled={inCart}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    inCart
                      ? "bg-green-500 text-white cursor-default"
                      : added
                      ? "bg-green-500 text-white"
                      : "bg-[#f5a623] text-[#1a2a4a] hover:shadow-gold hover:scale-[1.02]"
                  }`}
                >
                  {inCart ? (
                    <><Check className="w-5 h-5" /> في السلة</>
                  ) : added ? (
                    <><Check className="w-5 h-5" /> تمت الإضافة</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> أضف للسلة</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-8">
            <p className="text-[#374151] leading-relaxed">{course.description}</p>
          </div>

          {/* Detailed Content Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#e5e7eb] p-6 hover:border-[#f5a623]/50 hover:shadow-gold hover-lift transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a] flex items-center justify-center text-[#f5a623] shadow-navy">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2a4a]">{section.title}</h3>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 mb-8">
            <h3 className="text-xl font-bold text-[#1a2a4a] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#f5a623]" />
              مميزات الدورة
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {course.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            {course.extraFeatures && (
              <div className="mt-4 p-4 bg-[#f5a623]/10 rounded-xl border border-[#f5a623]/20">
                <p className="text-sm font-bold text-[#f5a623] mb-2">الميزة الأقوى</p>
                <ul className="space-y-1">
                  {course.extraFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1a2a4a]">
                      <Check className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f5a623] rounded-full blur-3xl -translate-y-1/2" />
            </div>
            <div className="relative">
              <h3 className="text-2xl font-black text-white mb-4">استثمر في مستقبلك الآن</h3>
              <p className="text-white/70 mb-6">لا تفوت الفرصة - سجل الآن وابدأ التحضير لاختبار STEP 2026</p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleAdd}
                  disabled={inCart}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                    inCart
                      ? "bg-green-500 text-white cursor-default"
                      : "bg-[#f5a623] text-[#1a2a4a] hover:shadow-gold hover:scale-[1.02]"
                  }`}
                >
                  {inCart ? "في السلة" : `اشترك الآن - ${course.price} ر.س`}
                </button>
                <Link
                  to="/cart"
                  className="px-6 py-4 rounded-xl border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all"
                >
                  عرض السلة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
