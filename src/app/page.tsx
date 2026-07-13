import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { Solutions } from "@/components/sections/Solutions";
import { Facilities } from "@/components/sections/Facilities";
import { Expansion } from "@/components/sections/Expansion";
import { InvestorTeaser } from "@/components/sections/InvestorTeaser";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhyUs />
        <Solutions />
        <Facilities />
        <Expansion />
        <InvestorTeaser />
        {/* Concept marquee moved to the bottom, per request */}
        <TrustStrip />
      </main>
      <Footer />
    </>
  );
}
