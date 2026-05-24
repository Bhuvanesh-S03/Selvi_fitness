import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import TransformationsSection from "@/components/TransformationsSection";
import TrainingInfoSection from "@/components/TrainingInfoSection";
import FooterContact from "@/components/FooterContact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <Navbar />
      <div id="hero-programs-wrapper" className="relative w-full">
        <HeroSection />
        <ProgramsSection />
      </div>
      <TransformationsSection />
      <TrainingInfoSection />
      <FooterContact />
    </main>
  );
}
