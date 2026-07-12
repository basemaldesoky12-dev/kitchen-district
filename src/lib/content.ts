import type { Locale } from "./i18n";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export interface NavLink {
  id: string;
  href: string;
  labelKey: "network" | "solutions" | "facilities" | "expansion";
}

export const navLinks: NavLink[] = [
  { id: "network", href: "#expansion", labelKey: "network" },
  { id: "solutions", href: "#solutions", labelKey: "solutions" },
  { id: "facilities", href: "#facilities", labelKey: "facilities" },
  { id: "expansion", href: "#expansion", labelKey: "expansion" },
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
  variant: "hero" | "standard" | "cta";
  title: Localized;
  body: Localized;
  bullets?: SolutionBullet[];
  /** Ordered onboarding steps (cta variant). */
  steps?: Localized[];
  linkLabel?: Localized;
}

export const solutions: Solution[] = [
  {
    id: "kd-core",
    icon: "restaurant_menu",
    accent: "primary",
    span: "wide",
    variant: "hero",
    title: { en: "KD Core", ar: "كيه دي كور" },
    body: {
      en: "State-of-the-art commercial kitchen spaces optimized for high-volume delivery. Engineered for flow, safety, and operational excellence.",
      ar: "مساحات مطابخ تجارية متطورة مُحسّنة للتوصيل عالي الحجم، مصممة للانسيابية والسلامة والتميّز التشغيلي.",
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
    title: { en: "KD Ops", ar: "كيه دي أوبس" },
    body: {
      en: "Unified dashboard to manage orders, track inventory, and analyze performance across all aggregators.",
      ar: "لوحة تحكم موحّدة لإدارة الطلبات وتتبع المخزون وتحليل الأداء عبر جميع منصات التجميع.",
    },
    linkLabel: { en: "Explore dashboard", ar: "استكشف لوحة التحكم" },
  },
  {
    id: "kd-intelligence",
    icon: "psychology",
    accent: "tertiary",
    span: "single",
    variant: "standard",
    title: { en: "KD Intelligence", ar: "كيه دي إنتليجنس" },
    body: {
      en: "AI-powered demand forecasting and inventory management to minimize waste and maximize profitability.",
      ar: "توقّع الطلب وإدارة المخزون بالذكاء الاصطناعي لتقليل الهدر وزيادة الربحية.",
    },
    linkLabel: { en: "View insights", ar: "عرض الرؤى" },
  },
  {
    id: "kd-launch",
    icon: "rocket_launch",
    accent: "primary",
    span: "wide",
    variant: "cta",
    title: { en: "KD Launch", ar: "كيه دي لانش" },
    body: {
      en: "From concept to first order in weeks, not months. Our onboarding team handles every step.",
      ar: "من الفكرة إلى أول طلب خلال أسابيع لا أشهر. يتولى فريق الإعداد كل خطوة.",
    },
    steps: [
      { en: "Licensing", ar: "التراخيص" },
      { en: "Aggregator setup", ar: "ربط المنصات" },
      { en: "Staff training", ar: "تدريب الطاقم" },
      { en: "Go live", ar: "الإطلاق" },
    ],
    linkLabel: { en: "Start your journey", ar: "ابدأ رحلتك" },
  },
];

/** Facility highlights (Infrastructure section). */
export interface FacilityHighlight {
  icon: string;
  title: Localized;
  body: Localized;
}

export const facilityHighlights: FacilityHighlight[] = [
  {
    icon: "eco",
    title: { en: "Sustainable Operations", ar: "عمليات مستدامة" },
    body: {
      en: "Smart energy management and waste reduction systems built into every district.",
      ar: "إدارة ذكية للطاقة وأنظمة لتقليل الهدر مدمجة في كل حي.",
    },
  },
  {
    icon: "security",
    title: { en: "Uncompromised Safety", ar: "سلامة بلا تنازلات" },
    body: {
      en: "Industry-leading hygiene standards, continuous monitoring, and secure access control.",
      ar: "معايير نظافة رائدة، ومراقبة مستمرة، وتحكّم آمن بالدخول.",
    },
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

/** Facility & logistics imagery (Unsplash — royalty free). */
export const media = {
  facilities:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80",
  logistics:
    "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
} as const;

export const stats = {
  dispatchMinutes: 2.4,
} as const;
