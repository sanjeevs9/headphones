import Navbar from "@/components/Navbar";
import KeyboardScroll from "@/components/KeyboardScroll";
import Features from "@/components/Features";
import Specs from "@/components/Specs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#08080a] min-h-screen">
      <Navbar />
      <KeyboardScroll />
      <Features />
      <Specs />
      <Gallery />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
