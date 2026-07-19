/**
 * Lightweight, type-safe i18n dictionary.
 *
 * The landing page ships bilingual (English + Arabic) with full RTL support.
 * Adding a locale = add a key to `Locale` and a matching object to `dictionary`.
 * Keeping copy here (rather than inline in components) is what lets the page
 * scale into a fully localized marketing site later.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/** The label shown on the language toggle for the *other* language. */
export const languageToggleLabel: Record<Locale, string> = {
  en: "العربية",
  ar: "English",
};

export const dictionary = {
  en: {
    nav: {
      solutions: "Solutions",
      facilities: "Facilities",
      locations: "Locations",
      investors: "Investors",
      login: "Login",
      launch: "Launch Now",
    },
    hero: {
      badge: "Cloud kitchen infrastructure · Jeddah",
      titleLead: "The operating system for",
      titleAccent: "delivery-first",
      titleTail: "food brands.",
      subtitle:
        "Fully equipped cloud kitchens and the technology to launch, operate, and scale delivery brands — without building infrastructure from scratch.",
      primaryCta: "Join the District",
      secondaryCta: "Explore Facilities",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Simple. Fast. Scalable.",
      subtitle:
        "One platform to launch a kitchen, run it day to day, and grow across the Kingdom.",
    },
    whyUs: {
      eyebrow: "Why Kitchen District",
      title: "Infrastructure designed for growth.",
    },
    solutions: {
      title: "A complete culinary ecosystem.",
      subtitle:
        "Everything you need to run, scale, and optimize your delivery business — in one platform.",
    },
    facilities: {
      eyebrow: "Facilities",
      title: "Built for high performance.",
      subtitle:
        "Purpose-built spaces engineered for delivery throughput, food safety and operational reliability.",
    },
    trust: {
      eyebrow: "One kitchen platform, built for every delivery concept",
    },
    expansion: {
      title: "Strategic network expansion.",
      subtitle:
        "Position your brand where the demand is. Our network is anchored in Jeddah, the Kingdom's culinary gateway.",
    },
    investors: {
      eyebrow: "For investors",
      title: "The infrastructure behind the future of food.",
      body: "Food delivery is reshaping the restaurant industry. Kitchen District provides the physical infrastructure and operational backbone that modern food brands need to grow — efficiently and at scale.",
      ctaPrimary: "Investor relations",
      ctaSecondary: "Contact IR team",
      thesisEyebrow: "The thesis",
      thesisTitle: "An asset-light bet on the future of food.",
      contactTitle: "Talk to our investor relations team.",
      contactBody:
        "We share detailed materials with qualified investors on request. Reach out and we'll get back to you.",
      backHome: "Back to home",
    },
    modal: {
      title: "Partner Inquiry",
      name: "Name",
      namePlaceholder: "Enter your name",
      brand: "Brand Name",
      brandPlaceholder: "Enter your brand name",
      city: "City",
      cityPlaceholder: "e.g. Jeddah",
      phone: "Phone",
      phonePlaceholder: "+966...",
      message: "Tell us about your brand",
      messagePlaceholder: "Your culinary vision...",
      submit: "Submit Inquiry",
      success: "Thank you — our partnerships team will be in touch shortly.",
    },
    footer: {
      tagline: "Elevating Hospitality Through Technology.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      investors: "Investors",
      contact: "Contact Us",
      rights: "© 2026 Kitchen District. Kingdom of Saudi Arabia.",
    },
    status: {
      liveNow: "Live",
    },
    common: {
      kitchensSuffix: "Kitchens",
    },
  },

  ar: {
    nav: {
      solutions: "الحلول",
      facilities: "المرافق",
      locations: "المواقع",
      investors: "المستثمرون",
      login: "تسجيل الدخول",
      launch: "انطلق الآن",
    },
    hero: {
      badge: "بنية تحتية للمطابخ السحابية · جدة",
      titleLead: "نظام التشغيل لعلامات",
      titleAccent: "الطعام",
      titleTail: "التي تعتمد على التوصيل.",
      subtitle:
        "مطابخ سحابية مجهّزة بالكامل والتقنية اللازمة لإطلاق وتشغيل وتوسيع علامات التوصيل — دون بناء البنية التحتية من الصفر.",
      primaryCta: "انضم إلى الحي",
      secondaryCta: "استكشف المرافق",
    },
    howItWorks: {
      eyebrow: "كيف يعمل",
      title: "بسيط. سريع. قابل للتوسّع.",
      subtitle:
        "منصة واحدة لإطلاق المطبخ وتشغيله يوميًا والنمو عبر المملكة.",
    },
    whyUs: {
      eyebrow: "لماذا Kitchen District",
      title: "بنية تحتية مصممة للنمو.",
    },
    solutions: {
      title: "منظومة طهوية متكاملة.",
      subtitle:
        "كل ما تحتاجه لتشغيل أعمال التوصيل وتوسيعها وتحسينها، في منصة واحدة.",
    },
    facilities: {
      eyebrow: "المرافق",
      title: "مبنية للأداء العالي.",
      subtitle:
        "مساحات مصممة خصيصًا لإنتاجية التوصيل وسلامة الغذاء والموثوقية التشغيلية.",
    },
    trust: {
      eyebrow: "منصة مطابخ واحدة، مبنية لكل مفهوم توصيل",
    },
    expansion: {
      title: "توسع استراتيجي للشبكة.",
      subtitle:
        "ضع علامتك حيث يوجد الطلب. تتمركز شبكتنا في جدة، البوابة الطهوية للمملكة.",
    },
    investors: {
      eyebrow: "للمستثمرين",
      title: "البنية التحتية وراء مستقبل الطعام.",
      body: "يعيد توصيل الطعام تشكيل قطاع المطاعم. توفّر Kitchen District البنية التحتية والعمود التشغيلي الذي تحتاجه العلامات الحديثة كي تنمو بكفاءة وعلى نطاق واسع.",
      ctaPrimary: "علاقات المستثمرين",
      ctaSecondary: "تواصل مع فريق العلاقات",
      thesisEyebrow: "الفرضية",
      thesisTitle: "رهان خفيف الأصول على مستقبل الطعام.",
      contactTitle: "تحدّث مع فريق علاقات المستثمرين.",
      contactBody:
        "نشارك المواد التفصيلية مع المستثمرين المؤهلين عند الطلب. تواصل معنا وسنرد عليك.",
      backHome: "العودة للرئيسية",
    },
    modal: {
      title: "استفسار الشراكة",
      name: "الاسم",
      namePlaceholder: "أدخل اسمك",
      brand: "اسم العلامة",
      brandPlaceholder: "أدخل اسم علامتك",
      city: "المدينة",
      cityPlaceholder: "مثال: جدة",
      phone: "الهاتف",
      phonePlaceholder: "+966...",
      message: "أخبرنا عن علامتك",
      messagePlaceholder: "رؤيتك الطهوية...",
      submit: "إرسال الاستفسار",
      success: "شكرًا لك — سيتواصل معك فريق الشراكات قريبًا.",
    },
    footer: {
      tagline: "نرتقي بالضيافة عبر التقنية.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      investors: "المستثمرون",
      contact: "تواصل معنا",
      rights: "© ٢٠٢٦ Kitchen District. المملكة العربية السعودية.",
    },
    status: {
      liveNow: "مباشر",
    },
    common: {
      kitchensSuffix: "مطبخ",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];
