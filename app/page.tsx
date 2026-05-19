import HeroSection from "@/components/HeroSection";
import FloatingNav from "@/components/FloatingNav";
import ContextSection from "@/components/ContextSection";
import BookSection from "@/components/BookSection";
import DebateSection from "@/components/DebateSection";
import AugustanProgram from "@/components/AugustanProgram";
import ReceiptSection from "@/components/ReceiptSection";
import BibliographySection from "@/components/BibliographySection";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <HeroSection />
        <ContextSection />
        <BookSection variant="I" />
        <BookSection variant="II" />
        <BookSection variant="III" />
        <BookSection variant="IV" />
        <DebateSection />
        <AugustanProgram />
        <ReceiptSection />
        <BibliographySection />
      </main>
    </>
  );
}
