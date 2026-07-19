import type { Locale } from "./i18n";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export type NavKey = "solutions" | "facilities" | "locations" | "investors";

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
    icon: "bolt",
    title: { en: "Faster launch", ar: "إطلاق أسرع" },
    body: { en: "Open in weeks, not quarters.", ar: "افتح خلال أسابيع لا أرباع سنة." },
  },
  {
    icon: "savings",
    title: { en: "Lower capital", ar: "رأس مال أقل" },
    body: { en: "Skip the build-out. Skip the risk.", ar: "تجاوز التجهيز. تجاوز المخاطرة." },
  },
  {
    icon: "speed",
    title: { en: "Operational efficiency", ar: "كفاءة تشغيلية" },
    body: { en: "Shared services, lower unit cost.", ar: "خدمات مشتركة وتكلفة وحدة أقل." },
  },
  {
    icon: "stacks",
    title: { en: "Scalable locations", ar: "مواقع قابلة للتوسّع" },
    body: { en: "Multi-site rollout, one platform.", ar: "انتشار متعدد المواقع بمنصة واحدة." },
  },
  {
    icon: "event_available",
    title: { en: "Flexible leasing", ar: "تأجير مرن" },
    body: { en: "Terms that flex with your growth.", ar: "شروط تتكيّف مع نموّك." },
  },
  {
    icon: "location_on",
    title: { en: "Strategic sites", ar: "مواقع استراتيجية" },
    body: {
      en: "Optimised for delivery radius and demand.",
      ar: "مُحسّنة لنطاق التوصيل والطلب.",
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
      en: "Commercial kitchen spaces built for high-volume delivery — engineered for flow, food safety, and reliable operations.",
      ar: "مساحات مطابخ تجارية مجهّزة للتوصيل عالي الحجم، مصممة للانسيابية وسلامة الغذاء وموثوقية التشغيل.",
    },
    bullets: [
      {
        text: {
          en: "Premium appliances & ventilation",
          ar: "أجهزة وتهوية فاخرة",
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
      en: "One dashboard to manage orders, track inventory, and analyze performance across every delivery platform.",
      ar: "لوحة تحكم واحدة لإدارة الطلبات وتتبع المخزون وتحليل الأداء عبر جميع منصات التوصيل.",
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
    district: { en: "Al Zahra District Hub", ar: "مركز حي الزهراء" },
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
  { value: "−40%", label: { en: "Capex vs. standalone", ar: "توفير رأس المال مقابل المستقل" } },
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
      ar: "نموذج أحياء قابل للتكرار يرفع معدّل الاستفادة عبر العلامات ومنصات التوصيل.",
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

/** Facility / brand imagery (Unsplash — royalty free). */
export const media = {
  investors:
    "https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56?auto=format&fit=crop&w=1400&q=80",
} as const;
