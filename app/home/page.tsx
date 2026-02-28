import NavbarClear from "@/components/NavbarClear";
import KeyboardScrollClear from "@/components/KeyboardScrollClear";
import FeaturesClear from "@/components/FeaturesClear";
import SpecsClear from "@/components/SpecsClear";
import GalleryClear from "@/components/GalleryClear";
import TestimonialsClear from "@/components/TestimonialsClear";
import PricingClear from "@/components/PricingClear";
import FooterClear from "@/components/FooterClear";
import { SequenceProvider } from "@/components/SequenceContext";

export default function HomePage() {
  return (
    <SequenceProvider>
      <main style={{ background: "#f5f2ed", minHeight: "100vh" }}>
        <NavbarClear />
        <KeyboardScrollClear />
        <FeaturesClear />
        <SpecsClear />
        <GalleryClear />
        <TestimonialsClear />
        <PricingClear />
        <FooterClear />
      </main>
    </SequenceProvider>
  );
}
