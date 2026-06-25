import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, MinusCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  "سعر|تكلفة|كم|ريال|سعر الدورة": "💰 أسعار دوراتنا:\n\n👑 دورة STEP المميزة: 349 ر.س (بدلاً من 749)\n⚡ دورة STEP المكثفة: 299 ر.س (بدلاً من 549)\n📚 دورة STEP الشاملة: 249 ر.س (بدلاً من 399)\n\nجميع الأسعار شاملة وصول كامل للمحتوى!",

  "مميز|مميزة|premium": "👑 دورة STEP الحساني المميزة 2026:\n\n✅ شرح مبسط من الصفر (Grammar + Reading + Listening)\n✅ أحدث النماذج 50-51-52\n✅ تدريبات + كويزات + محاكيات\n✅ خطة مذاكرة جاهزة\n✅ وصول 90 يوم مع تحديثات\n\n💰 السعر: 349 ر.س فقط!\nالهدف: +90 درجة 🎯",

  "مكثفة|مكثف|intensive|سريع|10 أيام": "⚡ دورة STEP الحساني المكثفة:\n\n✅ خطة مكثفة 10 أيام فقط\n✅ تركيز على الأخطاء المتكررة\n✅ تثبيت المفاهيم الأساسية\n✅ أكبر عدد من الأسئلة المتوقعة\n✅ نماذج محاكاة مكثفة\n\n💰 السعر: 299 ر.س\nمثالية إذا وقتك ضيق! ⏰",

  "شاملة|شامل|comprehensive|مدى الحياة": "📚 دورة STEP الحساني الشاملة:\n\n✅ شرح مفصل لكل أقسام الاختبار\n✅ نماذج سابقة محلولة بالتفصيل\n✅ خطط مذاكرة مرنة (5/10/30 يوم)\n✅ تحديثات مجانية مدى الحياة\n✅ مجتمع طلابي للدعم\n\n💰 السعر: 249 ر.س\nالأفضل قيمة مدى الحياة! 🌟",

  "step|اختبار|قياس|كفايات": "📝 اختبار STEP هو اختبار كفايات اللغة الإنجليزية المعتمد في المملكة العربية السعودية.\n\nيتكون من:\n🔹 Grammar (القواعد)\n🔹 Reading (القراءة)\n🔹 Listening (الاستماع)\n\nأكاديمية الحساني تغطي جميع أقسامه بشكل متكامل! 💪",

  "تواصل|اتصال|وصول|تلجرام|واتساب": "📞 للتواصل مع أكاديمية الحساني:\n\n📱 تلجرام: @qiyas_2026_2030\n\nيمكنك التواصل للاستفسار عن:\n• تفاصيل الدورات\n• طرق الدفع\n• الدعم الفني\n• الاستشارات المجانية\n\nنحن هنا لمساعدتك! 🤝",

  "دفع|payment|visa|مدى|تحويل": "💳 طرق الدفع المتاحة:\n\n💳 بطاقات الائتمان (Visa/Mastercard)\n💳 مدى (Mada)\n🏦 التحويل البنكي\n📱 Apple Pay / STC Pay\n\nالدفع آمن 100% ومشفر 🔒\nللمزيد تواصل عبر التلجرام: @qiyas_2026_2030",

  "وصول|مدة|كم يوم": "⏱️ مدد الوصول:\n\n👑 المميزة: 90 يوم (مع تحديثات)\n⚡ المكثفة: 90 يوم\n📚 الشاملة: مدى الحياة مع تحديثات مجانية دائمة!\n\nيبدأ حساب المدة من تاريخ اشتراكك.",

  "تحديث|نماذج|2026|جديد": "🔄 التحديثات:\n\nأكاديمية الحساني توفر:\n✅ أحدث النماذج: 50 - 51 - 52\n✅ تحديثات مستمرة مع كل نموذج جديد\n✅ المشتركون يتلقون التحديثات تلقائياً\n✅ بدون أي تكلفة إضافية\n\nكن دائماً في صدارة الاختبار! 🏆",

  "نجاح|ضمان|نتيجة|درجة": "🏆 نسبة النجاح في أكاديمية الحساني:\n\n✅ 95% نسبة نجاح الطلاب\n✅ +5000 طالب مشترك\n✅ متوسط درجة +90\n✅ خطط مجربة مع آلاف الطلاب\n\nهدفك درجة عالية +90… فهنا البداية الصح! 🎯",
};

function getResponse(input: string): string {
  const normalized = input.toLowerCase().trim();

  for (const [keywords, response] of Object.entries(FAQ_RESPONSES)) {
    const keyList = keywords.split("|");
    if (keyList.some((k) => normalized.includes(k))) {
      return response;
    }
  }

  if (
    normalized.includes("مرحب") ||
    normalized.includes("هلا") ||
    normalized.includes("السلام") ||
    normalized.includes("اهلا") ||
    normalized.includes("أهلا") ||
    normalized.includes("hi") ||
    normalized.includes("hello")
  ) {
    return "أهلاً وسهلاً! 👋\n\nأنا المساعد الذكي لأكاديمية الحساني.\nيمكنني مساعدتك في:\n\n📌 معرفة تفاصيل الدورات\n💰 الأسعار والعروض\n📞 طرق التواصل\n💳 طرق الدفع\n📝 معلومات اختبار STEP\n\nكيف يمكنني مساعدتك؟ 😊";
  }

  if (
    normalized.includes("شكر") ||
    normalized.includes("مشكور") ||
    normalized.includes("thanks") ||
    normalized.includes("thank")
  ) {
    return "العفو! 😊\nيسعدنا دائماً مساعدتك.\n\nهل تحتاج لمعرفة أي معلومة أخرى عن دوراتنا؟\n\n👑 للتواصل المباشر: @qiyas_2026_2030 على تلجرام";
  }

  return "شكراً لسؤالك! 🙂\n\nيمكنني مساعدتك في:\n\n• 💰 أسعار الدورات\n• 📚 تفاصيل كل دورة\n• ⏱️ مدة الوصول\n• 💳 طرق الدفع\n• 📞 التواصل مع الأكاديمية\n• 🔄 التحديثات والنماذج الجديدة\n\nاكتب استفسارك وسأجيبك فوراً! 😊\nأو تواصل مباشرة: @qiyas_2026_2030";
}

const QUICK_QUESTIONS = [
  "ما هي أسعار الدورات؟",
  "ما الفرق بين الدورات؟",
  "كيف أتواصل مع الأكاديمية؟",
  "ما هو اختبار STEP؟",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "أهلاً بك في أكاديمية الحساني! 🎓\n\nأنا المساعد الذكي، يمكنني الإجابة على جميع استفساراتك عن دورات STEP 2026.\n\nكيف يمكنني مساعدتك؟ 😊",
      isBot: true,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const botResponse = getResponse(text);
        const botMsg: Message = {
          id: Date.now() + 1,
          text: botResponse,
          isBot: true,
          time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        if (!isOpen || isMinimized) {
          setHasNewMessage(true);
        }
      },
      800 + Math.random() * 600
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-2">
        {/* Tooltip */}
        {!isOpen && (
          <div className="bg-[#1a2a4a] text-white text-xs px-3 py-1.5 rounded-full shadow-navy whitespace-nowrap animate-bounce-slow">
            💬 اسألنا الآن!
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
            setHasNewMessage(false);
          }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e8951f] text-[#1a2a4a] shadow-gold hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          aria-label="فتح المساعد الذكي"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}

          {/* Pulse Ring */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#f5a623] animate-ping opacity-30" />
          )}

          {/* New Message Badge */}
          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-bounce">
              !
            </span>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div
          className="fixed bottom-28 left-4 z-[9998] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] flex flex-col overflow-hidden animate-slide-up"
          style={{ height: "520px", maxHeight: "calc(100vh - 140px)" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a2a4a] to-[#2a3a5a] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f5a623]/20 border-2 border-[#f5a623] flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-[#f5a623]" />
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#f5a623]" />
                مساعد أكاديمية الحساني
              </div>
              <div className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                متاح الآن • يرد فوراً
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="تصغير"
              >
                <MinusCircle className="w-4 h-4 text-white/70" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8f9fa]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.isBot ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.isBot
                      ? "bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a]"
                      : "bg-gradient-to-br from-[#f5a623] to-[#f7b84e]"
                  }`}
                >
                  {msg.isBot ? (
                    <Bot className="w-4 h-4 text-[#f5a623]" />
                  ) : (
                    <User className="w-4 h-4 text-[#1a2a4a]" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.isBot
                      ? "bg-white text-[#1a2a4a] rounded-bl-none shadow-sm border border-[#e5e7eb]"
                      : "bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] rounded-br-none"
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.isBot ? "text-[#9ca3af]" : "text-[#1a2a4a]/60"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a2a4a] to-[#2a3a5a] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#f5a623]" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-[#e5e7eb]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-white border-t border-[#e5e7eb]">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/30 text-[#1a2a4a] hover:bg-[#f5a623]/20 transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#e5e7eb]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب استفسارك هنا..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e5e7eb] text-sm text-[#1a2a4a] placeholder-[#9ca3af] focus:outline-none focus:border-[#f5a623] focus:ring-2 focus:ring-[#f5a623]/20 bg-[#f8f9fa] text-right"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#f5a623] to-[#f7b84e] text-[#1a2a4a] flex items-center justify-center hover:shadow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
