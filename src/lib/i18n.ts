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
      pricing: "Pricing",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      investors: "Investors",
      launch: "Book a Kitchen",
    },
    hero: {
      badge: "Cloud kitchen infrastructure · Jeddah",
      titleLead: "Launch your food brand in a",
      titleAccent: "fully equipped",
      titleTail: "commercial kitchen.",
      subtitle:
        "Fully equipped cloud kitchens and the technology to launch, operate, and scale delivery brands — without building infrastructure from scratch.",
      primaryCta: "Book a Kitchen",
      secondaryCta: "Explore Facilities",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Simple. Fast. Scalable.",
      subtitle:
        "One platform to launch a kitchen, run it day to day, and grow across the Kingdom.",
    },
    whyUs: {
      eyebrow: "Cloud Kitchen Infrastructure",
      title: "Why Kitchen District",
      subtitle:
        "Infrastructure, technology, and operations — everything a food brand needs to launch and scale.",
    },
    solutions: {
      title: "Solutions built for food operators.",
      subtitle:
        "Everything you need to operate, scale, and optimize your delivery business — in one platform.",
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
      title: "Expanding across the Kingdom.",
      subtitle:
        "Put your brand where the demand is. Our network starts in Jeddah, with new districts planned across the Kingdom.",
    },
    investors: {
      eyebrow: "For investors",
      title: "The infrastructure behind modern food brands.",
      body: "Food delivery is reshaping the restaurant industry. Kitchen District provides the physical infrastructure and operational backbone that modern food brands need to grow — efficiently and at scale.",
      ctaPrimary: "Investor relations",
      ctaSecondary: "Contact IR team",
      thesisEyebrow: "The thesis",
      thesisTitle: "An asset-light model in a growing market.",
      contactTitle: "Talk to our investor relations team.",
      contactBody:
        "We share detailed materials with qualified investors on request. Reach out and we'll get back to you.",
      backHome: "Back to home",
    },
    modal: {
      title: "Partner Inquiry",
      name: "Name",
      namePlaceholder: "Your full name",
      brand: "Brand Name",
      brandPlaceholder: "Your brand name",
      city: "City",
      cityPlaceholder: "e.g. Jeddah",
      phone: "Phone",
      phonePlaceholder: "+966 5X XXX XXXX",
      message: "Tell us about your brand",
      messagePlaceholder:
        "What you need — kitchen size, preferred location, and when you plan to start.",
      submit: "Submit Inquiry",
      success: "Thank you — our partnerships team will be in touch shortly.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Simple plans, engineered to scale",
      subtitle: "Pick the footprint you need today — upgrade as your brand grows.",
      note: "Pricing depends on kitchen size, location, and duration. Speak to our team for a tailored quote.",
      cta: "Request a Quote",
      featuredBadge: "Popular",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked",
      subtitle: "Answers to the questions we hear most from new tenants.",
      ctaTitle: "Still have questions?",
      cta: "Contact us",
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact us",
      subtitle: "Speak with our tenant success team — we respond within one business day.",
      form: {
        name: "Full name",
        brand: "Brand name",
        phone: "Phone",
        email: "Email",
        branch: "Preferred branch",
        message: "Message",
        submit: "Send message",
        success: "Thank you — we will be in touch shortly.",
      },
      channels: {
        whatsapp: "WhatsApp",
        phone: "Phone",
        email: "Email",
        hours: "Sun – Thu · 9:00 – 18:00",
        location: "Jeddah · KSA",
      },
    },
    about: {
      eyebrow: "About",
      title: "The infrastructure behind Saudi food brands",
      subtitle:
        "Kitchen District builds and operates the professional kitchens the next generation of Saudi food brands are launching from.",
      missionTitle: "Mission",
      mission: "Lower the cost and complexity of launching a food brand in Saudi Arabia.",
      visionTitle: "Vision",
      vision: "Become the operating layer for cloud kitchens across the GCC.",
      valuesTitle: "Values",
      futureTitle: "Future expansion",
      future: "New districts planned in Jeddah, Riyadh, Dammam, and beyond.",
    },
    footer: {
      tagline: "Cloud kitchen infrastructure in Jeddah.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      pricing: "Pricing",
      about: "About",
      faq: "FAQ",
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
      locations: "الفروع",
      pricing: "الأسعار",
      about: "من نحن",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      investors: "المستثمرون",
      launch: "احجز مطبخك",
    },
    hero: {
      badge: "البنية التحتية للمطابخ السحابية · جدة",
      titleLead: "ابدأ علامتك الغذائية",
      titleAccent: "في مطبخ تجاري",
      titleTail: "مجهّز بالكامل.",
      subtitle:
        "مطابخ سحابية مجهّزة بالكامل والتقنية اللازمة لإطلاق وتشغيل وتوسيع علامات التوصيل — دون بناء البنية التحتية من الصفر.",
      primaryCta: "احجز مطبخك",
      secondaryCta: "استكشف المرافق",
    },
    howItWorks: {
      eyebrow: "كيف يعمل",
      title: "بسيط. سريع. قابل للتوسّع.",
      subtitle:
        "منصة واحدة لإطلاق المطبخ وتشغيله يوميًا والنمو عبر المملكة.",
    },
    whyUs: {
      eyebrow: "البنية التحتية للمطابخ السحابية",
      title: "لماذا كيتشن ديستريكت",
      subtitle:
        "بنية تحتية وتقنية وتشغيل — كل ما تحتاجه علامتك الغذائية للانطلاق والتوسع.",
    },
    solutions: {
      title: "حلول مصممة لمشغلي قطاع الأغذية.",
      subtitle:
        "كل ما تحتاجه لتشغيل أعمال التوصيل وتوسيعها وتحسينها — في منصة واحدة.",
    },
    facilities: {
      eyebrow: "المرافق",
      title: "مبنية للأداء العالي.",
      subtitle:
        "مساحات مصممة لسرعة تجهيز الطلبات وسلامة الغذاء واستقرار التشغيل.",
    },
    trust: {
      eyebrow: "منصة مطابخ واحدة لكل أنواع مطاعم التوصيل",
    },
    expansion: {
      title: "نتوسع عبر المملكة.",
      subtitle:
        "ضع علامتك حيث يوجد الطلب. تبدأ شبكتنا من جدة، مع خطط لأحياء جديدة عبر المملكة.",
    },
    investors: {
      eyebrow: "للمستثمرين",
      title: "البنية التحتية خلف العلامات الغذائية الحديثة.",
      body: "يعيد توصيل الطعام تشكيل قطاع المطاعم. توفّر كيتشن ديستريكت البنية التحتية المادية والعمود التشغيلي الذي تحتاجه العلامات الحديثة للنمو — بكفاءة وعلى نطاق واسع.",
      ctaPrimary: "علاقات المستثمرين",
      ctaSecondary: "تواصل مع فريق العلاقات",
      thesisEyebrow: "الفرضية",
      thesisTitle: "نموذج خفيف الأصول في سوق متنامٍ.",
      contactTitle: "تحدّث مع فريق علاقات المستثمرين.",
      contactBody:
        "نشارك المواد التفصيلية مع المستثمرين المؤهلين عند الطلب. تواصل معنا وسنرد عليك.",
      backHome: "العودة للرئيسية",
    },
    modal: {
      title: "استفسار الشراكة",
      name: "الاسم",
      namePlaceholder: "اسمك الكامل",
      brand: "اسم العلامة",
      brandPlaceholder: "اسم علامتك التجارية",
      city: "المدينة",
      cityPlaceholder: "مثال: جدة",
      phone: "الهاتف",
      phonePlaceholder: "+966 5X XXX XXXX",
      message: "أخبرنا عن علامتك",
      messagePlaceholder:
        "احتياجاتك — حجم المطبخ، الموقع المفضل، وموعد البدء المخطط له.",
      submit: "إرسال الاستفسار",
      success: "شكرًا لك — سيتواصل معك فريق الشراكات قريبًا.",
    },
    pricing: {
      eyebrow: "الأسعار",
      title: "باقات بسيطة مصممة للتوسع",
      subtitle: "اختر ما يناسبك اليوم — وطوّر مع نمو علامتك.",
      note: "يعتمد السعر على حجم المطبخ والموقع والمدة. تواصل معنا لعرض مخصص.",
      cta: "اطلب عرض سعر",
      featuredBadge: "الأكثر طلباً",
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "الأسئلة الشائعة",
      subtitle: "إجابات على أكثر الأسئلة التي نتلقاها من المستأجرين الجدد.",
      ctaTitle: "لا تزال لديك أسئلة؟",
      cta: "تواصل معنا",
    },
    contact: {
      eyebrow: "تواصل",
      title: "تواصل معنا",
      subtitle: "تحدث مع فريق نجاح المستأجرين — نرد خلال يوم عمل واحد.",
      form: {
        name: "الاسم الكامل",
        brand: "اسم العلامة",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        branch: "الفرع المفضل",
        message: "الرسالة",
        submit: "إرسال",
        success: "شكراً لك — سنتواصل معك قريباً.",
      },
      channels: {
        whatsapp: "واتساب",
        phone: "الهاتف",
        email: "البريد",
        hours: "الأحد – الخميس · ٩:٠٠ – ١٨:٠٠",
        location: "جدة · السعودية",
      },
    },
    about: {
      eyebrow: "من نحن",
      title: "البنية التحتية خلف العلامات الغذائية السعودية",
      subtitle:
        "تبني كيتشن ديستريكت وتشغّل المطابخ الاحترافية التي تنطلق منها الأجيال الجديدة من العلامات السعودية.",
      missionTitle: "المهمة",
      mission: "تقليل تكلفة وتعقيد إطلاق علامة غذائية في المملكة العربية السعودية.",
      visionTitle: "الرؤية",
      vision: "أن نصبح طبقة التشغيل للمطابخ السحابية عبر دول الخليج.",
      valuesTitle: "قيمنا",
      futureTitle: "التوسع المستقبلي",
      future: "أحياء جديدة قيد التخطيط في جدة والرياض والدمام وما بعدها.",
    },
    footer: {
      tagline: "البنية التحتية للمطابخ السحابية في جدة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      pricing: "الأسعار",
      about: "من نحن",
      faq: "الأسئلة الشائعة",
      investors: "المستثمرون",
      contact: "تواصل معنا",
      rights: "© ٢٠٢٦ كيتشن ديستريكت. المملكة العربية السعودية.",
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
