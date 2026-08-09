import { HeroSection } from "./components/HeroSection";
import { HeroTransformationPreview } from "./components/HeroTransformationPreview";
import { FeatureTabs } from "./components/FeatureTabs";
import { ArchitectureTriPillar } from "./components/ArchitectureTriPillar";
import { BuildGatekeeperDemo } from "./components/BuildGatekeeperDemo";
import { DemoRequestForm } from "./components/DemoRequestForm";
import { OverlayVsNative } from "./components/OverlayVsNative";
import { SkipLink } from "./components/SkipLink";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <HeroTransformationPreview />
        <OverlayVsNative />
        <FeatureTabs />
        <ArchitectureTriPillar />
        <BuildGatekeeperDemo />
        <DemoRequestForm />
      </main>
    </>
  );
}
