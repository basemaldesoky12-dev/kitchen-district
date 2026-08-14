import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InvestorsContent } from "@/components/investors/InvestorsContent";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "investors");
}

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <InvestorsContent />
      <Footer />
    </>
  );
}
