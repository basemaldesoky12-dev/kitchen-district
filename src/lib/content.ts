import type { Locale } from "./i18n";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export type NavKey =
  | "solutions"
  | "facilities"
  | "locations"
  | "pricing"
  | "about"
  | "faq"
  | "contact"
  | "investors";

export interface NavLink {
  id: string;
  /** Hash links scroll on the home page; "/..." links route to a page. */
  href: string;
  labelKey: NavKey;
}

export const navLinks: NavLink[] = [
  { id: "solutions", href: "/#solutions", labelKey: "solutions" },
  { id: "facilities", href: "/#facilities", labelKey: "facilities" },
  { id: "locations", href: "/#locations", labelKey: "locations" },
  { id: "pricing", href: "/pricing", labelKey: "pricing" },
  { id: "about", href: "/about", labelKey: "about" },
  { id: "faq", href: "/faq", labelKey: "faq" },
  { id: "contact", href: "/contact", labelKey: "contact" },
  { id: "investors", href: "/investors", labelKey: "investors" },
];

/**
 * Cuisine concepts the platform is built for, shown in the marquee.
 * (We're pre-launch — this signals breadth of capability, not a customer list.)
 */
export interface Concept {
  label: Localized;
  icon: string; // Material Symbols ligature
}

export const concepts: Concept[] = [
  { label: { en: "Pizza", ar: "بيتزا" }, icon: "local_pizza" },
  { label: { en: "Burgers", ar: "برجر" }, icon: "lunch_dining" },
  { label: { en: "Grill", ar: "مشويات" }, icon: "outdoor_grill" },
  { label: { en: "Coffee", ar: "قهوة" }, icon: "local_cafe" },
  { label: { en: "Desserts", ar: "حلويات" }, icon: "icecream" },
  { label: { en: "Asian", ar: "آسيوي" }, icon: "ramen_dining" },
  { label: { en: "Bakery", ar: "مخبوزات" }, icon: "bakery_dining" },
  { label: { en: "Shawarma", ar: "شاورما" }, icon: "kebab_dining" },
  { label: { en: "Breakfast", ar: "فطور" }, icon: "breakfast_dining" },
];

/** "How it works" — the three-step operating model. */
export interface Step {
  index: string;
  icon: string;
  title: Localized;
  body: Localized;
}

export const howItWorks: Step[] = [
  {
    index: "01",
    icon: "rocket_launch",
    title: { en: "Launch", ar: "الإطلاق" },
    body: {
      en: "Move into a fully equipped kitchen — licensing, utilities and equipment ready on day one.",
      ar: "انتقل إلى مطبخ مجهّز بالكامل — التراخيص والمرافق والمعدات جاهزة من اليوم الأول.",
    },
  },
  {
    index: "02",
    icon: "tune",
    title: { en: "Operate", ar: "التشغيل" },
    body: {
      en: "Focus on food and brand. We handle staffing support, cleaning, maintenance and procurement.",
      ar: "ركّز على الطعام والعلامة. نتولى دعم الطاقم والنظافة والصيانة والمشتريات.",
    },
  },
  {
    index: "03",
    icon: "trending_up",
    title: { en: "Scale", ar: "التوسّع" },
    body: {
      en: "Expand across districts and cities on a single operational platform.",
      ar: "توسّع عبر الأحياء والمدن على منصة تشغيلية واحدة.",
    },
  },
];

/** Benefit cells for the "Infrastructure designed for growth" section. */
export interface Benefit {
  icon: string;
  title: Localized;
  body: Localized;
}

export const benefits: Benefit[] = [
  {
    icon: "savings",
    title: { en: "Lower Investment", ar: "استثمار أقل" },
    body: {
      en: "Skip millions in capex. Start operating in a professional kitchen for a fraction of the cost.",
      ar: "لا حاجة لملايين الريالات كرأس مال. ابدأ التشغيل في مطبخ احترافي بجزء بسيط من التكلفة.",
    },
  },
  {
    icon: "countertops",
    title: { en: "Professional Kitchens", ar: "مطابخ احترافية" },
    body: {
      en: "Commercial-grade equipment, ventilation, and cold storage — engineered for volume.",
      ar: "معدات تجارية وتهوية وتخزين مبرد — مصممة للأحجام الكبيرة.",
    },
  },
  {
    icon: "location_on",
    title: { en: "Prime Locations", ar: "مواقع مميزة" },
    body: {
      en: "Facilities placed within Jeddah's highest-demand delivery zones.",
      ar: "مرافق داخل أعلى مناطق الطلب في جدة.",
    },
  },
  {
    icon: "local_shipping",
    title: { en: "Delivery Optimized", ar: "مهيأة للتوصيل" },
    body: {
      en: "Layouts, workflows, and integrations built for HungerStation, Jahez, and The Chefz.",
      ar: "تصاميم وسير عمل وتكاملات مبنية لـ هنقرستيشن وجاهز والشيفز.",
    },
  },
  {
    icon: "monitoring",
    title: { en: "Technology Platform", ar: "منصة تقنية" },
    body: {
      en: "KD Ops — orders, analytics, and operations in one dashboard.",
      ar: "نظام KD Ops — الطلبات والتحليلات والعمليات في لوحة واحدة.",
    },
  },
  {
    icon: "event_available",
    title: { en: "Flexible Plans", ar: "خطط مرنة" },
    body: {
      en: "Monthly, quarterly, or annual agreements. Scale up or down as you grow.",
      ar: "شهرية أو ربع سنوية أو سنوية. تنمو معك.",
    },
  },
  {
    icon: "schedule",
    title: { en: "24/7 Access", ar: "وصول ٢٤/٧" },
    body: {
      en: "Operate on your own schedule with round-the-clock secure access.",
      ar: "شغّل بجدولك الخاص مع وصول آمن على مدار الساعة.",
    },
  },
  {
    icon: "bolt",
    title: { en: "Utilities Included", ar: "المرافق مشمولة" },
    body: {
      en: "Electricity, water, gas, internet, cleaning, and maintenance — all handled.",
      ar: "الكهرباء والماء والغاز والإنترنت والنظافة والصيانة — كلها مشمولة.",
    },
  },
];

/** A bullet inside a solution card. */
export interface SolutionBullet {
  text: Localized;
}

export interface Solution {
  id: string;
  icon: string;
  /** Which accent this card leans on. */
  accent: "primary" | "secondary" | "tertiary";
  /** Layout size in the bento grid. */
  span: "wide" | "single";
  variant: "hero" | "standard";
  title: Localized;
  body: Localized;
  bullets?: SolutionBullet[];
  linkLabel?: Localized;
}

export const solutions: Solution[] = [
  {
    id: "kd-core",
    icon: "restaurant_menu",
    accent: "primary",
    span: "wide",
    variant: "hero",
    title: { en: "KD Core", ar: "KD Core" },
    body: {
      en: "Commercial kitchen spaces optimized for high-volume delivery. Engineered for flow, safety, and operational excellence.",
      ar: "مساحات مطابخ تجارية مُهيأة للتوصيل عالي الحجم، مصممة لانسيابية العمل والسلامة والتشغيل المنضبط.",
    },
    bullets: [
      {
        text: {
          en: "Premium appliances & ventilation",
          ar: "أجهزة وتهوية عالية الجودة",
        },
      },
      {
        text: { en: "Cold storage & prep areas", ar: "تخزين بارد ومناطق تحضير" },
      },
      {
        text: { en: "24/7 maintenance support", ar: "دعم صيانة على مدار الساعة" },
      },
    ],
  },
  {
    id: "kd-ops",
    icon: "analytics",
    accent: "secondary",
    span: "single",
    variant: "standard",
    title: { en: "KD Ops", ar: "KD Ops" },
    body: {
      en: "Unified dashboard to manage orders, track inventory, and analyze performance across all delivery apps.",
      ar: "لوحة تحكم موحّدة لإدارة الطلبات وتتبع المخزون وتحليل الأداء عبر جميع تطبيقات التوصيل.",
    },
    linkLabel: { en: "Explore dashboard", ar: "استكشف لوحة التحكم" },
  },
];

/** Image-led facility cards (Facilities section). */
export interface FacilityCard {
  id: string;
  image: string;
  tag: Localized;
  title: Localized;
}

export const facilityCards: FacilityCard[] = [
  {
    id: "prep",
    image: "/facilities/kitchen.jpg",
    tag: { en: "30–80 m²", ar: "٣٠–٨٠ م²" },
    title: { en: "Preparation zone", ar: "منطقة التحضير" },
  },
  {
    id: "dry-storage",
    image: "/facilities/storage-dry.jpg",
    tag: { en: "Racked & receiving", ar: "مرفّف واستلام" },
    title: { en: "Dry storage", ar: "تخزين جاف" },
  },
  {
    id: "cold-storage",
    image: "/facilities/storage-cold.jpg",
    tag: { en: "Temperature-controlled", ar: "مُتحكّم بالحرارة" },
    title: { en: "Cold & pantry storage", ar: "تخزين بارد ومؤن" },
  },
];

/**
 * Network locations.
 * Per current go-to-market, Jeddah is the only operational district.
 */
export interface LocationNode {
  id: string;
  city: Localized;
  district: Localized;
  kitchens: number;
  status: "live";
}

export const locations: LocationNode[] = [
  {
    id: "jeddah",
    city: { en: "Jeddah", ar: "جدة" },
    district: { en: "Al Safa District Hub", ar: "مركز حي الصفا" },
    kitchens: 12,
    status: "live",
  },
];

/** Investor-facing headline metrics. */
export interface InvestorStat {
  value: string;
  label: Localized;
}

export const investorStats: InvestorStat[] = [
  { value: "$1T+", label: { en: "Global food-service market", ar: "سوق خدمات الطعام العالمي" } },
  { value: "18%+", label: { en: "GCC delivery CAGR", ar: "نمو التوصيل الخليجي السنوي" } },
  { value: "−40%", label: { en: "Capex vs. standalone", ar: "توفير في رأس المال مقارنةً بالمطبخ المستقل" } },
  { value: "GCC", label: { en: "Expansion roadmap", ar: "خارطة التوسّع" } },
];

/** Longer-form investment thesis points (investors page). */
export interface ThesisPoint {
  icon: string;
  title: Localized;
  body: Localized;
}

export const investorThesis: ThesisPoint[] = [
  {
    icon: "insights",
    title: { en: "A structural shift", ar: "تحوّل هيكلي" },
    body: {
      en: "Delivery-first dining is reshaping food service. Brands need infrastructure, not real-estate risk.",
      ar: "أصبح الطعام المعتمد على التوصيل يعيد تشكيل القطاع. تحتاج العلامات إلى بنية تحتية لا إلى مخاطر عقارية.",
    },
  },
  {
    icon: "hub",
    title: { en: "Asset-light network", ar: "شبكة خفيفة الأصول" },
    body: {
      en: "A repeatable district model that compounds utilization across brands and aggregators.",
      ar: "نموذج أحياء قابل للتكرار يضاعف الاستفادة عبر العلامات وتطبيقات التوصيل.",
    },
  },
  {
    icon: "public",
    title: { en: "Regional runway", ar: "مجال إقليمي" },
    body: {
      en: "Anchored in Jeddah with a clear roadmap across the Kingdom and the wider GCC.",
      ar: "منطلقنا جدة مع خارطة واضحة عبر المملكة ومنطقة الخليج.",
    },
  },
];

/** Pricing tiers (/pricing). */
export interface PricingTier {
  id: string;
  name: Localized;
  description: Localized;
  bullets: Localized[];
  featured?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: { en: "Starter", ar: "البداية" },
    description: {
      en: "For solo operators and new food brands testing a concept.",
      ar: "للمشغلين الأفراد والعلامات الجديدة التي تختبر فكرتها.",
    },
    bullets: [
      { en: "Small kitchen station", ar: "محطة مطبخ صغيرة" },
      { en: "Shared cold storage", ar: "تخزين مبرد مشترك" },
      { en: "Delivery integrations", ar: "تكاملات التوصيل" },
      { en: "KD Ops — Basic", ar: "نظام KD Ops — الأساسي" },
    ],
  },
  {
    id: "growth",
    name: { en: "Growth", ar: "النمو" },
    description: {
      en: "For established brands scaling volume across delivery apps.",
      ar: "للعلامات القائمة التي توسع أعمالها على تطبيقات التوصيل.",
    },
    bullets: [
      { en: "Standard kitchen (25 – 40 m²)", ar: "مطبخ قياسي (٢٥ – ٤٠ م²)" },
      { en: "Dedicated cold + freezer", ar: "تبريد وتجميد مخصص" },
      { en: "Priority maintenance", ar: "صيانة ذات أولوية" },
      { en: "KD Ops — Pro", ar: "نظام KD Ops — برو" },
    ],
    featured: true,
  },
  {
    id: "enterprise",
    name: { en: "Enterprise", ar: "المؤسسات" },
    description: {
      en: "For multi-brand operators and franchise groups.",
      ar: "لمشغلي العلامات المتعددة ومجموعات الامتياز.",
    },
    bullets: [
      { en: "Custom layout (50 m²+)", ar: "تصميم مخصص (٥٠ م²+)" },
      { en: "Multi-brand orders", ar: "تشغيل متعدد العلامات" },
      { en: "Dedicated success manager", ar: "مدير نجاح مخصص" },
      { en: "KD Ops — Enterprise", ar: "نظام KD Ops — للمؤسسات" },
    ],
  },
];

/** FAQ items (/faq). */
export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faqItems: FaqItem[] = [
  {
    id: "onboarding",
    question: { en: "How long does onboarding take?", ar: "كم يستغرق التهيئة والانطلاق؟" },
    answer: {
      en: "Most tenants are operating within 14 days of signing, subject to brand licensing.",
      ar: "معظم المستأجرين يعملون خلال ١٤ يوماً من التوقيع، حسب رخصة العلامة.",
    },
  },
  {
    id: "own-brand",
    question: { en: "Can I use my own brand?", ar: "هل يمكنني استخدام علامتي الخاصة؟" },
    answer: {
      en: "Yes. You keep 100% of your brand, menu, pricing, and customer relationships.",
      ar: "نعم. تحتفظ بكامل علامتك وقائمتك وأسعارك وعلاقاتك مع عملائك.",
    },
  },
  {
    id: "multi-brand",
    question: { en: "Can I operate more than one brand?", ar: "هل يمكنني تشغيل أكثر من علامة؟" },
    answer: {
      en: "Yes. Multi-brand operations are supported on Growth and Enterprise plans.",
      ar: "نعم. تشغيل العلامات المتعددة مدعوم في باقات النمو والمؤسسات.",
    },
  },
  {
    id: "equipment",
    question: { en: "What equipment is included?", ar: "ما المعدات المشمولة؟" },
    answer: {
      en: "Commercial cooking equipment, ventilation, cold storage, freezers, and prep stations. Custom equipment can be installed on request.",
      ar: "معدات طبخ تجارية وتهوية وتخزين مبرد وفريزرات ومحطات تحضير. يمكن تركيب معدات مخصصة عند الطلب.",
    },
  },
  {
    id: "hungerstation",
    question: { en: "Can I connect HungerStation?", ar: "هل يمكن ربط هنقرستيشن؟" },
    answer: {
      en: "Yes. Native integration is included with KD Ops.",
      ar: "نعم. التكامل الأصلي مشمول مع نظام KD Ops.",
    },
  },
  {
    id: "jahez",
    question: { en: "Can I connect Jahez?", ar: "هل يمكن ربط جاهز؟" },
    answer: {
      en: "Yes. Native integration is included with KD Ops.",
      ar: "نعم. التكامل الأصلي مشمول مع نظام KD Ops.",
    },
  },
  {
    id: "chefz",
    question: { en: "Can I connect The Chefz?", ar: "هل يمكن ربط الشيفز؟" },
    answer: {
      en: "Yes. Native integration is included with KD Ops.",
      ar: "نعم. التكامل الأصلي مشمول مع نظام KD Ops.",
    },
  },
  {
    id: "storage",
    question: { en: "Do you provide storage?", ar: "هل توفرون التخزين؟" },
    answer: {
      en: "Yes. Cold storage, freezers, and dry storage are provided based on plan.",
      ar: "نعم. تخزين مبرد وفريزرات وتخزين جاف حسب الباقة.",
    },
  },
  {
    id: "expand",
    question: { en: "Can I expand later?", ar: "هل يمكنني التوسع لاحقاً؟" },
    answer: {
      en: "Yes. You can add stations, upgrade plans, or move to a larger kitchen at any time.",
      ar: "نعم. يمكنك إضافة محطات أو ترقية الباقة أو الانتقال إلى مطبخ أكبر في أي وقت.",
    },
  },
];

/** Company values (/about). */
export interface AboutValue {
  icon: string;
  title: Localized;
  body: Localized;
}

export const aboutValues: AboutValue[] = [
  {
    icon: "verified",
    title: { en: "Operational excellence", ar: "التميز التشغيلي" },
    body: {
      en: "We are measured by our tenants' uptime.",
      ar: "نُقاس بمدى استمرار عمل مستأجرينا.",
    },
  },
  {
    icon: "architecture",
    title: { en: "Design & standards", ar: "التصميم والمعايير" },
    body: {
      en: "Every facility meets a single, high specification.",
      ar: "كل مرفق يلتزم بمواصفة واحدة عالية.",
    },
  },
  {
    icon: "memory",
    title: { en: "Technology first", ar: "التقنية أولاً" },
    body: {
      en: "Software is a product, not a byproduct.",
      ar: "البرمجيات منتج، لا منتج ثانوي.",
    },
  },
  {
    icon: "handshake",
    title: { en: "Partnership", ar: "الشراكة" },
    body: {
      en: "Our success is a function of our tenants' success.",
      ar: "نجاحنا مرتبط بنجاح مستأجرينا.",
    },
  },
];

/** Contact channels (/contact). Values are placeholders until real details are provided. */
export interface ContactChannel {
  icon: string;
  labelKey: "whatsapp" | "phone" | "email" | "hours" | "location";
  value?: string;
  href?: string;
}

export const contactChannels: ContactChannel[] = [
  {
    icon: "chat",
    labelKey: "whatsapp",
    value: "+966 50 000 0000",
    href: "https://wa.me/966500000000",
  },
  { icon: "call", labelKey: "phone", value: "+966 12 000 0000", href: "tel:+966120000000" },
  {
    icon: "mail",
    labelKey: "email",
    value: "hello@kitchendistrict.sa",
    href: "mailto:hello@kitchendistrict.sa",
  },
  { icon: "schedule", labelKey: "hours" },
  { icon: "location_on", labelKey: "location" },
];

/** Preferred-branch options for the contact form. */
export const contactBranches: Localized[] = [
  { en: "Al Safa Branch", ar: "فرع الصفا" },
  { en: "North Obhur Branch", ar: "فرع أبحر الشمالية" },
];

/** Facility / brand imagery (Unsplash — royalty free). */
export const media = {
  investors:
    "https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56?auto=format&fit=crop&w=1400&q=80",
} as const;
