export interface Course {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  badge: string;
  features: string[];
  extraFeatures?: string[];
  description: string;
  duration: string;
  accessPeriod: string;
  icon: string;
  color: string;
  gradient: string;
  targetScore: string;
}

export const courses: Course[] = [
  {
    id: "premium-2026",
    name: "دورة STEP الحساني المميزة",
    subtitle: "النسخة الحديثة 2026",
    price: 349,
    originalPrice: 749,
    badge: "الأكثر مبيعاً",
    description: "هدفك درجة عالية +90… فهنا البداية الصح! شرح مبسط من الصفر مع أحدث النماذج والتدريبات المكثفة.",
    duration: "شاملة ومتكاملة",
    accessPeriod: "90 يوم",
    icon: "Crown",
    color: "#1a2a4a",
    gradient: "from-[#1a2a4a] to-[#2a3a5a]",
    targetScore: "+90",
    features: [
      "شرح مبسط من الصفر (Grammar + Reading + Listening)",
      "أحدث النماذج 50 - 51 - 52",
      "تدريبات + كويزات + محاكيات للاختبار",
      "خطة مذاكرة جاهزة تمشي عليها",
      "محتوى منظم يوفر عليك وقتك ويختصر لك الطريق"
    ],
    extraFeatures: [
      "توصلك كل التحديثات الجديدة + النماذج القادمة",
      "لمدة 90 يوم كاملة من تاريخ اشتراكك",
      "بدون ما تدفع ولا ريال زيادة"
    ]
  },
  {
    id: "intensive-2026",
    name: "دورة STEP الحساني المكثفة",
    subtitle: "خطة 10 أيام (تحديث 2026)",
    price: 299,
    originalPrice: 549,
    badge: "سريعة وفعالة",
    description: "مثالية إذا وقتك ضيق وتحتاج نتيجة سريعة قبل الاختبار. خطة مكثفة تركز على المتكرر + التثبيت.",
    duration: "10 أيام مكثفة",
    accessPeriod: "90 يوم",
    icon: "Zap",
    color: "#f5a623",
    gradient: "from-[#f5a623] to-[#f7b84e]",
    targetScore: "+85",
    features: [
      "خطة مكثفة 10 أيام فقط",
      "تركيز على الأخطاء المتكررة",
      "تثبيت المفاهيم الأساسية",
      "حل أكبر عدد من الأسئلة المتوقعة",
      "نماذج محاكاة مكثفة"
    ]
  },
  {
    id: "comprehensive-2026",
    name: "دورة STEP الحساني الشاملة",
    subtitle: "تحديث 2026 - مدى الحياة",
    price: 249,
    originalPrice: 399,
    badge: "الأفضل قيمة",
    description: "مناسبة تبني أساس قوي وتراجع خطوة بخطوة. شرح مفصل لكل أقسام الاختبار مع خطط مرنة.",
    duration: "خطط 5/10/30 يوم",
    accessPeriod: "مدى الحياة",
    icon: "BookOpen",
    color: "#1a2a4a",
    gradient: "from-[#2a3a5a] to-[#3a4a6a]",
    targetScore: "+80",
    features: [
      "شرح مفصل لكل أقسام الاختبار (Grammar – Reading – Listening – Structure)",
      "نماذج سابقة محلولة بالتفصيل",
      "خطط مذاكرة مرنة (5/10/30 يوم)",
      "تحديثات مجانية مدى الحياة",
      "مجتمع طلابي للدعم والمناقشة"
    ]
  }
];
