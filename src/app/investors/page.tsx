import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InvestorsContent } from "@/components/investors/InvestorsContent";

export const metadata: Metadata = {
  title: "Investors — Kitchen District",
  description:
    "The infrastructure behind the future of food. Kitchen District provides the physical and operational backbone modern food brands need to scale across the GCC.",
};

export default function InvestorsPage() {
  return (
    <>
      <Navbar />
      <InvestorsContent />
      <Footer />
    </>
  );
}
