"use client";
import React, { useState } from "react";
import { Cpu, UserCheck, Sparkles, Check, ArrowRight } from "lucide-react";

export const ArchitectureTriPillar: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<number>(1);

  const pillars = [
    {
      id: 1,
      title: "AI Intelligence",
      sub: "Reasoning & Vision",
      icon: <Sparkles className="w-6 h-6 text-indigo-600" aria-hidden="true" />,
      color: "indigo",
      shortDesc:
        "Generates natural language alt-text, understands complex visual layouts, and infers document reading hierarchies.",
      capabilities: [
        "Context-aware visual layout & reading order inference",
        "Automatic semantic image description synthesis (Alt-Text)",
        "Complex chart, diagram, & mathematical formula interpretation",
        "Natural language table matrix comprehension",
      ],
      techSpecs:
        "Powered by Gemini Multi-Modal Vision & Semantic Reasoning Models running server-side in secure Cloud Run containers.",
    },
    {
      id: 2,
      title: "Deterministic Systems",
      sub: "Precision & Rules",
      icon: <Cpu className="w-6 h-6 text-indigo-600" aria-hidden="true" />,
      color: "emerald",
      shortDesc:
        "Enforces strict structural rules for ISO 14289-1 PDF/UA tag trees, ARIA landmarks, and contrast ratios.",
      capabilities: [
        "Programmatic ISO 14289-1 PDF/UA tag tree generation",
        "AST-level DOM mutation and clean HTML5 semantic refactoring",
        "Mathematical WCAG 2.2 color contrast ratio calculation (4.5:1+)",
        "Keyboard focus path validation & landmark constraint checking",
      ],
      techSpecs:
        "Zero hallucination guaranteed through deterministic AST parsers, veraPDF engines, and axe-core compliance rulesets.",
    },
    {
      id: 3,
      title: "Human Expert Workspace",
      sub: "Judgment & QA",
      icon: (
        <UserCheck className="w-6 h-6 text-indigo-600" aria-hidden="true" />
      ),
      color: "amber",
      shortDesc:
        "Empowers accessibility experts with an integrated workspace to review high-complexity edge cases.",
      capabilities: [
        "Alternative text verification & editorial fine-tuning",
        "Complex architectural drawing & vector diagram review",
        "Domain-specific medical, legal, and financial formula checks",
        "Screen reader user panel auditing & sign-off workflows",
      ],
      techSpecs:
        "Collaborative audit interface with real-time screen reader simulation and automated compliance sign-off logs.",
    },
  ];

  const activePillarData =
    pillars.find((p) => p.id === selectedPillar) || pillars[0];

  return (
    <section
      id="architecture"
      className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            Core Technology Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Tri-Pillar Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Blending AI Reasoning, Deterministic Software Precision, and Human
            Judgment to guarantee 100% compliance at scale.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const isSelected = pillar.id === selectedPillar;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-6 rounded-2xl border text-left transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none ${
                  isSelected
                    ? "bg-slate-800 border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[1.02]"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-indigo-950 border border-indigo-800/60">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pillar 0{pillar.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {pillar.title}
                </h3>
                <span className="text-xs font-semibold text-indigo-400 block mb-3">
                  {pillar.sub}
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {pillar.shortDesc}
                </p>

                <div className="flex items-center text-xs font-bold text-indigo-400">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="ml-1 w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Detail Card */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-400">
                Pillar 0{activePillarData.id} In-Depth
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                {activePillarData.title} ({activePillarData.sub})
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Active System Module
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Execution Responsibilities
              </h4>
              <ul className="space-y-3">
                {activePillarData.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-slate-200"
                  >
                    <Check
                      className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400 block mb-2">
                  Technical Implementation Specification
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono break-all">
                  {activePillarData.techSpecs}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Compliance Verification:</span>
                <span className="text-emerald-400 font-bold">
                  100% Zero-Regression Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
