import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqContent } from "@/components/faq/FaqContent";

export const metadata: Metadata = {
  title: "FAQ — Kitchen District",
  description:
    "Answers to the questions we hear most from new tenants — onboarding, equipment, delivery integrations, storage, and scaling.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <FaqContent />
      <Footer />
    </>
  );
}
