import { Shield, MessageCircle, Clock, Award, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "محتوى موثوق ومحدث",
    description: "نماذج وأسئلة حديثة مخصصة لاختبار STEP 2026 مع أحدث التحديثات",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "دعم مباشر",
    description: "تواصل مباشر مع المدرب للإجابة على استفساراتك طوال فترة الاشتراك",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "وصول مرن",
    description: "درس في أي وقت ومن أي مكان مع وصول مرن يمتد لـ 90 يوم أو مدى الحياة",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "نتائج مضمونة",
    description: "خطط مذاكرة مجربة مع آلاف الطلاب حققت درجات عالية +90",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "تحديثات مستمرة",
    description: "تحديثات مجانية تشمل النماذج الجديدة والتغييرات في الاختبار",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "تدريبات تفاعلية",
    description: "كويزات ومحاكيات للاختبار تشبه الاختبار الحقيقي لبناء الثقة",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 text-sm font-medium text-[#f5a623] mb-4">
            لماذا أكاديمية الحساني
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-[#1a2a4a] mb-4">
            مميزات تجعلنا الخيار الأول
          </h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">
            نقدم لك تجربة تعليمية متكاملة مصممة لتحقيق أعلى الدرجات في اختبار STEP
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-[#e5e7eb] hover:border-[#f5a623]/50 hover:shadow-gold hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a] flex items-center justify-center text-[#f5a623] mb-4 group-hover:scale-110 transition-transform shadow-navy">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a2a4a] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
