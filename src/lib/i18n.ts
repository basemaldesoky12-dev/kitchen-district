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
      network: "Network",
      solutions: "Solutions",
      facilities: "Facilities",
      expansion: "Expansion",
      login: "Login",
      launch: "Launch Now",
    },
    hero: {
      badge: "Now live in Jeddah",
      titleLead: "The operating system for",
      titleAccent: "delivery-first",
      titleTail: "food brands.",
      subtitle:
        "Elevate your hospitality footprint across the Kingdom. We provide the infrastructure, technology, and operational excellence to scale your culinary vision without the friction of traditional brick-and-mortar.",
      primaryCta: "Join the District",
      secondaryCta: "Explore Facilities",
    },
    trust: {
      eyebrow: "One kitchen platform, built for every delivery concept",
    },
    solutions: {
      title: "A complete culinary ecosystem.",
      subtitle:
        "Everything you need to operate, scale, and optimize your delivery business, integrated into one seamless platform.",
      exploreDashboard: "Explore dashboard",
      viewInsights: "View insights",
      startJourney: "Start your journey",
    },
    facilities: {
      eyebrow: "Infrastructure",
      title: "Designed for culinary excellence.",
      body: "Our facilities transcend the concept of 'dark kitchens'. We build professional culinary hubs utilizing premium materials, advanced HVAC systems for air quality, and ergonomic layouts designed by veteran chefs.",
    },
    logistics: {
      eyebrow: "Logistics",
      title: "Seamless rider integration.",
      body: "The handover is critical. Our hubs feature dedicated rider zones, smart dispatch screens, and optimized parking to ensure food goes from kitchen to customer with zero friction.",
      cta: "Read about our logistics partners",
      statLabel: "Average Dispatch Time",
      statUnit: "Minutes",
    },
    expansion: {
      title: "Strategic network expansion.",
      subtitle:
        "Position your brand where the demand is. Our network is anchored in Jeddah, the Kingdom's culinary gateway.",
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
      portal: "Partner Portal",
      contact: "Contact Us",
      rights: "© 2024 Kitchen District. Kingdom of Saudi Arabia.",
    },
    status: {
      liveNow: "Live Now",
    },
    common: {
      kitchensSuffix: "Kitchens",
    },
  },

  ar: {
    nav: {
      network: "الشبكة",
      solutions: "الحلول",
      facilities: "المرافق",
      expansion: "التوسع",
      login: "تسجيل الدخول",
      launch: "انطلق الآن",
    },
    hero: {
      badge: "متوفر الآن في جدة",
      titleLead: "نظام التشغيل لعلامات",
      titleAccent: "الطعام",
      titleTail: "التي تعتمد على التوصيل.",
      subtitle:
        "ارتقِ بحضور علامتك في قطاع الضيافة عبر المملكة. نوفّر البنية التحتية والتقنية والتميّز التشغيلي لتوسيع رؤيتك الطهوية دون عوائق المطاعم التقليدية.",
      primaryCta: "انضم إلى الحي",
      secondaryCta: "استكشف المرافق",
    },
    trust: {
      eyebrow: "منصة مطابخ واحدة، مبنية لكل مفهوم توصيل",
    },
    solutions: {
      title: "منظومة طهوية متكاملة.",
      subtitle:
        "كل ما تحتاجه لتشغيل وتوسيع وتحسين أعمال التوصيل، في منصة واحدة سلسة.",
      exploreDashboard: "استكشف لوحة التحكم",
      viewInsights: "عرض الرؤى",
      startJourney: "ابدأ رحلتك",
    },
    facilities: {
      eyebrow: "البنية التحتية",
      title: "مصممة للتميّز الطهوي.",
      body: "تتجاوز مرافقنا مفهوم «المطابخ المظلمة». نبني مراكز طهوية احترافية بمواد فاخرة وأنظمة تكييف متقدمة لجودة الهواء وتصاميم مريحة صممها طهاة محترفون.",
    },
    logistics: {
      eyebrow: "الخدمات اللوجستية",
      title: "تكامل سلس مع المندوبين.",
      body: "التسليم لحظة حاسمة. تضم مراكزنا مناطق مخصصة للمندوبين وشاشات إرسال ذكية ومواقف مُحسّنة لضمان وصول الطعام من المطبخ إلى العميل بلا أي عوائق.",
      cta: "اقرأ عن شركائنا اللوجستيين",
      statLabel: "متوسط زمن الإرسال",
      statUnit: "دقيقة",
    },
    expansion: {
      title: "توسع استراتيجي للشبكة.",
      subtitle:
        "ضع علامتك حيث يوجد الطلب. تتمركز شبكتنا في جدة، البوابة الطهوية للمملكة.",
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
      portal: "بوابة الشركاء",
      contact: "تواصل معنا",
      rights: "© ٢٠٢٤ كيتشن ديستريكت. المملكة العربية السعودية.",
    },
    status: {
      liveNow: "متوفر الآن",
    },
    common: {
      kitchensSuffix: "مطبخ",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];
