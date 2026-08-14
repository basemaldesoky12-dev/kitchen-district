import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingContent } from "@/components/pricing/PricingContent";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "pricing");
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PricingContent />
      <Footer />
    </>
  );
}
