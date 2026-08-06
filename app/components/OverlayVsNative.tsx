import React from "react";
import {
  XCircle,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  Lock,
  ArrowUpRight,
} from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
            <AlertTriangle
              className="w-3.5 h-3.5 text-rose-600"
              aria-hidden="true"
            />
            The Architectural Shift
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Native Source Remediation vs. The "Overlay Trap"
          </h2>
          <p className="text-base sm:text-lg text-slate-700 font-medium">
            Accessibility cannot be achieved with floating JavaScript toolbars
            or superficial overlays. True accessibility lives natively inside
            the source code, DOM structure, and tag tree of the digital asset
            itself.
          </p>
        </div>

        {/* Global Regulatory Enforcement Banner */}
        <div
          id="regulatory"
          className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-900/50 relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"
            aria-hidden="true"
          >
            <ShieldAlert className="w-64 h-64 text-indigo-400" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-800/60 pb-4">
              <div className="flex items-center gap-3">
                <ShieldAlert
                  className="w-6 h-6 text-indigo-400 shrink-0"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold text-white">
                  Global Legal Mandates & Compliance Drivers
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200">
                Strict Legal Liability
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EAA Driver */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-300 text-sm">
                    European Accessibility Act (EAA EN 301 549)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200">
                    Enforced EU-Wide
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mandates strict WCAG 2.2 AA accessibility across all
                  e-commerce, banking, ebooks, and public digital services
                  operating in the EU. Fines and operational bans apply to
                  non-compliant digital assets.
                </p>
              </div>

              {/* US ADA Title II & Sec 508 */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-indigo-300 text-sm">
                    US ADA Title II & Section 508
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-200">
                    DOJ Rule Active
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The US Department of Justice enforces WCAG 2.2 AA compliance
                  for public entities, healthcare, and higher education across
                  both web platforms and enterprise PDF documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Accessibility Belongs Inside the Asset
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessibility is an intrinsic property of the digital asset
              itself—not a surface overlay, not a third-party widget, and not a
              floating toolbar that breaks assistive tools.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Native Source Remediation
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Reconstruct accessibility directly into the source code, DOM
              structure, tag trees, and semantic tokens rather than masking
              problems with temporary JavaScript patches.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Fail-Closed Build Gatekeeper
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessibility is an unbroken guarantee. Non-compliant code or
              assets MUST halt the compilation process with clear diagnostic
              feedback before hitting production.
            </p>
          </div>
        </div>

        {/* Detailed Comparison Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                Methodology Comparison Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluating accessibility remediation strategies against
                enterprise requirements
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <CheckCircle2
                className="w-4 h-4 text-emerald-400"
                aria-hidden="true"
              />
              WCAGify Native AI Engine
            </span>
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
              <thead className="bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="p-4 w-1/4">
                    Evaluation Criterion
                  </th>
                  <th
                    scope="col"
                    className="p-4 w-1/4 text-rose-700 bg-rose-50/50"
                  >
                    <span className="flex items-center gap-1">
                      <XCircle
                        className="w-4 h-4 text-rose-600"
                        aria-hidden="true"
                      />
                      Superficial Overlays
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="p-4 w-1/4 text-amber-800 bg-amber-50/50"
                  >
                    Manual Services
                  </th>
                  <th
                    scope="col"
                    className="p-4 w-1/4 text-indigo-900 bg-indigo-50 font-extrabold"
                  >
                    <span className="flex items-center gap-1 text-indigo-600">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      WCAGify Native AI
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <th
                      scope="row"
                      className="p-4 font-bold text-slate-900 bg-slate-50/50"
                    >
                      {row.criterion}
                    </th>
                    <td className="p-4 text-rose-900 bg-rose-50/20 text-xs leading-relaxed">
                      {row.overlay}
                    </td>
                    <td className="p-4 text-slate-700 bg-amber-50/10 text-xs leading-relaxed">
                      {row.manual}
                    </td>
                    <td className="p-4 font-semibold text-indigo-950 bg-indigo-50/60 text-xs leading-relaxed border-l-2 border-indigo-600">
                      {row.wcagify}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
