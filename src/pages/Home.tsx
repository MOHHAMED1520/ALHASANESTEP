import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { Sparkles, BookOpen, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />

        {/* Courses Section */}
        <section id="courses" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2a4a]/10 border border-[#1a2a4a]/20 text-sm font-medium text-[#1a2a4a] mb-4">
                <Sparkles className="w-4 h-4" />
                دوراتنا المتخصصة
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#1a2a4a] mb-4">
                اختر دورتك وابدأ رحلة النجاح
              </h2>
              <p className="text-[#6b7280] max-w-2xl mx-auto">
                ثلاثة دورات احترافية مصممة لتغطية جميع احتياجاتك في اختبار STEP 2026
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden shadow-lg mb-16">
              <div className="bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#f5a623]" />
                  مقارنة الدورات
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="px-6 py-4 text-right font-bold text-[#1a2a4a]">الميزة</th>
                      {courses.map((c) => (
                        <th key={c.id} className="px-6 py-4 text-center font-bold text-[#1a2a4a] min-w-[140px]">
                          {c.name.replace("دورة STEP الحساني ", "")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#e5e7eb]">
                      <td className="px-6 py-4 font-medium text-[#374151]">السعر</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center">
                          <span className="text-lg font-black text-[#1a2a4a]">{c.price} ر.س</span>
                          <span className="block text-xs text-[#9ca3af] strikethrough">{c.originalPrice} ر.س</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <td className="px-6 py-4 font-medium text-[#374151]">مدة الوصول</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center text-[#6b7280]">{c.accessPeriod}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <td className="px-6 py-4 font-medium text-[#374151]">الهدف</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-lg bg-[#f5a623]/10 text-[#f5a623] font-bold text-xs">
                            <TrendingUp className="w-3 h-3 ml-1" />
                            {c.targetScore}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <td className="px-6 py-4 font-medium text-[#374151]">النماذج</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center text-[#6b7280]">
                          {c.id === "premium-2026" ? "50, 51, 52" : c.id === "intensive-2026" ? "المتكررة" : "سابقة + حالية"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <td className="px-6 py-4 font-medium text-[#374151]">خطة المذاكرة</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center text-[#6b7280]">
                          {c.id === "premium-2026" ? "جاهزة ومنظمة" : c.id === "intensive-2026" ? "10 أيام" : "5/10/30 يوم"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-[#374151]">التحديثات</td>
                      {courses.map((c) => (
                        <td key={c.id} className="px-6 py-4 text-center text-[#6b7280]">
                          {c.id === "comprehensive-2026" ? "مدى الحياة" : "90 يوم"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5a623] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f5a623] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              </div>
              <div className="relative">
                <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                  هدفك درجة عالية +90… فهنا البداية الصح!
                </h3>
                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                  اختر دورتك الآن وابدأ رحلة التحضير لاختبار STEP 2026 مع أكاديمية الحساني
                </p>
                <button
                  onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#f5a623] text-[#1a2a4a] font-bold text-lg hover:shadow-gold hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  اختر دورتك الآن
                </button>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
