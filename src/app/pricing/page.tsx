import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingContent } from "@/components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Kitchen District",
  description:
    "Simple plans, engineered to scale. Pick the kitchen footprint you need today — upgrade as your brand grows.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PricingContent />
      <Footer />
    </>
  );
}
