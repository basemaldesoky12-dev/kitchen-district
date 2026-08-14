import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/about/AboutContent";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutContent />
      <Footer />
    </>
  );
}
