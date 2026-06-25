import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "@/context/CartContext";
import type { Course } from "@/data/courses";
import { Crown, Zap, BookOpen, Check, ShoppingCart, Eye, Star, Clock, Target } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Crown: <Crown className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const { addToCart, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = isInCart(course.id);

  const handleAdd = () => {
    if (!inCart) {
      addToCart(course.id);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden hover-lift shadow-lg animate-slide-up card-shine"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#f5a623] text-[#1a2a4a] shadow-gold">
          <Star className="w-3 h-3 ml-1 fill-current" />
          {course.badge}
        </span>
      </div>

      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
          وفر {discount}%
        </span>
      </div>

      {/* Header Gradient */}
      <div className={`bg-gradient-to-br ${course.gradient} p-6 pb-8 relative`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative flex justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
            {iconMap[course.icon]}
          </div>
        </div>
        <h3 className="relative text-xl font-bold text-white text-center mb-1">{course.name}</h3>
        <p className="relative text-sm text-white/80 text-center">{course.subtitle}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Target Score */}
        <div className="flex items-center justify-center gap-2 mb-4 -mt-10">
          <div className="bg-white border-2 border-[#f5a623] rounded-xl px-4 py-2 shadow-gold flex items-center gap-2">
            <Target className="w-4 h-4 text-[#f5a623]" />
            <span className="text-sm font-bold text-[#1a2a4a]">الهدف: {course.targetScore}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-center gap-4 mb-4 text-sm text-[#6b7280]">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#f5a623]" />
            {course.duration}
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#f5a623]" />
            وصول: {course.accessPeriod}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#6b7280] text-center mb-4 leading-relaxed">{course.description}</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {course.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-[#374151]">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Extra Features */}
        {course.extraFeatures && (
          <div className="bg-[#f5a623]/10 rounded-xl p-3 mb-4 border border-[#f5a623]/20">
            <p className="text-xs font-bold text-[#f5a623] mb-2 text-center">الميزة الأقوى</p>
            <ul className="space-y-1">
              {course.extraFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1a2a4a] font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl font-black text-[#1a2a4a]">{course.price} ر.س</span>
          <span className="text-lg text-[#9ca3af] strikethrough font-medium">{course.originalPrice} ر.س</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            disabled={inCart}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              inCart
                ? "bg-green-500 text-white cursor-default"
                : added
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                في السلة
              </>
            ) : added ? (
              <>
                <Check className="w-4 h-4" />
                تمت الإضافة
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                أضف للسلة
              </>
            )}
          </button>
          <Link
            to={`/course/${course.id}`}
            className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-[#1a2a4a] text-[#1a2a4a] font-bold text-sm hover:bg-[#1a2a4a] hover:text-white transition-all"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
