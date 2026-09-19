import React from "react";
import { XCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { Reveal } from "./Reveal";

export const OverlayVsNative: React.FC = () => {
  const comparisonData = [
    {
      criterion: "Remediation Depth",
      overlay:
        "Surface-level JS injection (does not change source code or PDF tags)",
      manual: "Manual coding per file (slow, expensive, breaks on updates)",
      wcagify:
        "Native Source Remediation: Reconstructs AST, DOM, and PDF/UA tag trees natively",
    },
    {
      criterion: "Screen Reader Compatibility",
      overlay:
        "Frequently conflicts with VoiceOver/NVDA; blocked by adblockers",
      manual: "Compatible until next code release or CMS edit",
      wcagify:
        "100% Native compatibility; works on any assistive device without scripts",
    },
    {
      criterion: "Legal & Regulatory Standing",
      overlay:
        "Rejected by courts (EAA & ADA Title II explicitly penalize overlays)",
      manual: "Compliant until next unvetted release",
      wcagify:
        "Full Legal Audit Compliance (EAA EN 301 549 & US ADA Title II / Sec 508)",
    },
    {
      criterion: "Scalability & CI/CD Guard",
      overlay: "None (Floating widget on top of broken sites)",
      manual: "Manual QA bottleneck (weeks per document or release)",
      wcagify:
        "Fail-Closed Build Gatekeeper: Halts non-compliant builds automatically in CI/CD",
    },
    {
      criterion: "Asset Coverage Scope",
      overlay:
        "Web pages only (cannot remediate PDFs, EPUBs, or Knowledge Bases)",
      manual: "Fragmented vendors for Web vs PDFs vs EPUBs",
      wcagify:
        "Universal Scope: Web & SaaS, Tagged PDFs, EPUB 3, & Enterprise Docs",
    },
  ];

  return (
    <section
      id="comparison"
      className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-600">
            The Architectural Shift
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Native source remediation vs. the "overlay trap"
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Accessibility cannot be achieved with floating JavaScript toolbars
            or superficial overlays. True accessibility lives natively inside
            the source code, DOM structure, and tag tree of the digital asset
            itself.
          </p>
        </Reveal>

        {/* Global Regulatory Enforcement Banner */}
        <Reveal
          id="regulatory"
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <ShieldAlert
              className="w-5 h-5 text-indigo-600 shrink-0"
              aria-hidden="true"
            />
            <h3 className="text-lg font-bold text-slate-900">
              Global Legal Mandates & Compliance Drivers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 text-sm">
                European Accessibility Act (EAA EN 301 549)
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mandates strict WCAG 2.2 AA accessibility across all
                e-commerce, banking, ebooks, and public digital services
                operating in the EU. Fines and operational bans apply to
                non-compliant digital assets.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 text-sm">
                US ADA Title II & Section 508
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                The US Department of Justice enforces WCAG 2.2 AA compliance
                for public entities, healthcare, and higher education across
                both web platforms and enterprise PDF documents.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Technical Principles Grid */}
        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-indigo-600">01</span>
            <h3 className="text-lg font-bold text-slate-900">
              Accessibility Belongs Inside the Asset
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessibility is an intrinsic property of the digital asset
              itself—not a surface overlay, not a third-party widget, and not a
              floating toolbar that breaks assistive tools.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-indigo-600">02</span>
            <h3 className="text-lg font-bold text-slate-900">
              Native Source Remediation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Reconstruct accessibility directly into the source code, DOM
              structure, tag trees, and semantic tokens rather than masking
              problems with temporary JavaScript patches.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-semibold text-indigo-600">03</span>
            <h3 className="text-lg font-bold text-slate-900">
              Fail-Closed Build Gatekeeper
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessibility is an unbroken guarantee. Non-compliant code or
              assets MUST halt the compilation process with clear diagnostic
              feedback before hitting production.
            </p>
          </div>
        </Reveal>

        {/* Detailed Comparison Matrix Table */}
        <Reveal className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Methodology Comparison Matrix
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              Evaluating accessibility remediation strategies against
              enterprise requirements
            </p>
          </div>

          {/* Focusable so keyboard users can scroll the table horizontally */}
          <div
            className="overflow-x-auto focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
            tabIndex={0}
            role="region"
            aria-label="Remediation approach comparison, scrollable table"
          >
            <table
              className="w-full text-left text-sm"
              aria-label="Remediation Approach Comparison"
            >
              <thead className="text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="p-4 w-1/4">
                    Evaluation Criterion
                  </th>
                  <th scope="col" className="p-4 w-1/4">
                    <span className="flex items-center gap-1.5">
                      <XCircle
                        className="w-4 h-4 text-slate-400"
                        aria-hidden="true"
                      />
                      Superficial Overlays
                    </span>
                  </th>
                  <th scope="col" className="p-4 w-1/4">
                    Manual Services
                  </th>
                  <th
                    scope="col"
                    className="p-4 w-1/4 bg-indigo-50/60 text-indigo-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      WCAGify Native AI
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {comparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <th scope="row" className="p-4 font-semibold text-slate-900">
                      {row.criterion}
                    </th>
                    <td className="p-4 text-xs leading-relaxed">
                      {row.overlay}
                    </td>
                    <td className="p-4 text-xs leading-relaxed">
                      {row.manual}
                    </td>
                    <td className="p-4 font-medium text-slate-900 bg-indigo-50/40 text-xs leading-relaxed border-l-2 border-indigo-600">
                      {row.wcagify}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
