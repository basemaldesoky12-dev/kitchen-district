import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Solutions } from "@/components/sections/Solutions";
import { Facilities } from "@/components/sections/Facilities";
import { Logistics } from "@/components/sections/Logistics";
import { Expansion } from "@/components/sections/Expansion";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Solutions />
        <Facilities />
        <Logistics />
        <Expansion />
      </main>
      <Footer />
    </>
  );
}
