"use client";

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HeroTransformationPreview } from '../components/HeroTransformationPreview';
import { OverlayVsNative } from '../components/OverlayVsNative';
import { FeatureTabs } from '../components/FeatureTabs';
import { ArchitectureTriPillar } from '../components/ArchitectureTriPillar';
import { BuildGatekeeperDemo } from '../components/BuildGatekeeperDemo';
import { DemoRequestForm } from '../components/DemoRequestForm';

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
      {/* Section 1: Hero with Tagline & Empathy Narrative */}
      <HeroSection />

      {/* Section 2: Interactive 4-Step Transformation Pipeline Preview */}
      <HeroTransformationPreview />

      {/* Section 3: Native Root vs Overlay Trap & Regulatory Drivers */}
      <OverlayVsNative />

      {/* Section 4: Universal Digital Asset Engine (Accessible ARIA Tabs) */}
      <FeatureTabs />

      {/* Section 5: Tri-Pillar Architecture Breakdown */}
      <ArchitectureTriPillar />

      {/* Section 6: Fail-Closed CI/CD Build Gatekeeper Simulator */}
      <BuildGatekeeperDemo />

      {/* Section 7: Accessible Demo Request Form */}
      <DemoRequestForm />
    </main>
  );
}
