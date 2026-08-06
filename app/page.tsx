import type { Metadata } from "next";
import { HeroSection } from "./components/HeroSection";
import { HeroTransformationPreview } from "./components/HeroTransformationPreview";
import { FeatureTabs } from "./components/FeatureTabs";
import { ArchitectureTriPillar } from "./components/ArchitectureTriPillar";
import { BuildGatekeeperDemo } from "./components/BuildGatekeeperDemo";
import { DemoRequestForm } from "./components/DemoRequestForm";
import { OverlayVsNative } from "./components/OverlayVsNative";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SkipLink } from "./components/SkipLink";

export const metadata: Metadata = {
  title: "WCAGify.ai - Native AI Accessibility Remediation",
  description:
    "WCAGify transforms inaccessible websites, PDFs, EPUBs, and enterprise documents into natively compliant, born-accessible assets using AI-powered native source remediation.",
  keywords:
    "accessibility, WCAG, ADA, EAA, PDF/UA, EPUB, AI, remediation, compliance",
};

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <HeroTransformationPreview />
        <OverlayVsNative />
        <FeatureTabs />
        <ArchitectureTriPillar />
        <BuildGatekeeperDemo />
        <DemoRequestForm />
      </main>
      <Footer />
    </>
  );
}
