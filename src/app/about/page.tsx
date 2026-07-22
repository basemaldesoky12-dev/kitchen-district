import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — Kitchen District",
  description:
    "Kitchen District builds and operates the professional kitchens the next generation of Saudi food brands are launching from.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutContent />
      <Footer />
    </>
  );
}
