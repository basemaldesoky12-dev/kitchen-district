import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactContent } from "@/components/contact/ContactContent";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}
