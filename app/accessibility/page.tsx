"use client";

import Link from "next/link";
import { ShieldCheck, CheckCircle2, Mail, ArrowLeft } from "lucide-react";

export default function AccessibilityStatementPage() {
  return (
    <main
      id="main-content"
      className="py-12 lg:py-20 bg-slate-50 min-h-screen text-slate-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none max-w-full"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Return to WCAGify.ai Main Platform</span>
          </Link>
        </div>

        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-full overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl sm:rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-200 max-w-full">
            <ShieldCheck
              className="w-4 h-4 text-emerald-600 shrink-0"
              aria-hidden="true"
            />
            <span className="break-words">
              Official Policy & Compliance Standard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 break-words">
            WCAGify.ai Accessibility Statement
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <strong>Last Updated:</strong> August 5, 2026 •{" "}
            <strong>Compliance Target:</strong> WCAG 2.2 Level AA (Compliant
            with EAA EN 301 549 & US ADA Title II / Section 508).
          </p>
        </div>

        <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700 max-w-full overflow-hidden">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2
                className="w-5 h-5 text-indigo-600"
                aria-hidden="true"
              />
              1. Our Commitment to Universal Digital Access
            </h2>
            <p>
              WCAGify.ai is dedicated to ensuring digital accessibility for
              people with disabilities. We continually improve the user
              experience for everyone and apply the relevant accessibility
              standards across all of our web platforms, documentation, and
              asset transformation engines.
            </p>
            <p>
              In accordance with our core principle—
              <em>"Accessibility Belongs Inside the Asset"</em>—this entire
              platform is natively constructed without third-party overlays,
              widgets, or floating toolbars.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900">
              2. Conformance Status
            </h2>
            <p>
              The <strong>Web Content Accessibility Guidelines (WCAG)</strong>{" "}
              defines requirements for designers and developers to improve
              accessibility for people with disabilities. It defines three
              levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
              <span className="font-bold block text-base">
                WCAGify.ai Status: Fully Conformant
              </span>
              <p className="text-xs text-emerald-800">
                Fully conformant means that the content fully conforms to the
                accessibility standard without any known exceptions across WCAG
                2.2 Level AA guidelines.
              </p>
            </div>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900">
              3. Continuous Auditing & Verification Methodologies
            </h2>
            <p>
              WCAGify.ai assesses the accessibility of this website and our
              transformation engine through the following rigorous testing
              frameworks:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-slate-700">
              <li>
                <strong>Automated Code Scans:</strong> Continuous integration
                audits using <code>axe-core</code> and <code>Pa11y</code> across
                all React & Next.js components.
              </li>
              <li>
                <strong>Document Validation:</strong> <code>veraPDF</code> ISO
                14289-1 verification for all generated Tagged PDF/UA outputs.
              </li>
              <li>
                <strong>Screen Reader Compatibility Testing:</strong> Manual
                screen reader evaluation using macOS VoiceOver (Safari), NVDA
                (Firefox), and JAWS (Chrome).
              </li>
              <li>
                <strong>Keyboard Navigation Audits:</strong> 100% focus trap
                prevention and continuous <code>:focus-visible</code> ring
                verification.
              </li>
              <li>
                <strong>Reduced Motion & High Contrast:</strong> Compliance with{" "}
                <code>@media (prefers-reduced-motion: reduce)</code> and WCAG
                4.5:1 text color contrast minimums.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900">
              4. Known Technical Edge Cases & Human Review
            </h2>
            <p>
              While WCAGify strives for 100% automated native source
              remediation, certain complex domain assets (such as highly
              intricate architectural blueprints or 3D mathematical surfaces)
              require human expert review. In such cases, our{" "}
              <strong>Human Expert Workspace (Pillar 3)</strong> provides
              editorial oversight.
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-bold text-slate-900">
              5. Accessibility Feedback & Assistance Mechanism
            </h2>
            <p>
              We welcome your feedback on the accessibility of WCAGify.ai.
              Please let us know if you encounter accessibility barriers on any
              of our digital assets:
            </p>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center gap-3 text-slate-900 font-bold">
                <Mail className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                <span>Primary Accessibility Officer Contact</span>
              </div>
              <p className="text-xs text-slate-600">
                Email:{" "}
                <a
                  href="mailto:accessibility@wcagify.ai"
                  className="text-indigo-600 underline font-bold"
                >
                  accessibility@wcagify.ai
                </a>
              </p>
              <p className="text-xs text-slate-600">
                Phone: +1 (800) 555-WCAG (9224)
              </p>
              <p className="text-xs text-slate-600">
                Postal Address: WCAGify.ai Global Headquarters, 100
                Accessibility Way, Suite 400, San Francisco, CA 94105
              </p>
            </div>

            <p className="text-xs text-slate-500">
              We aim to respond to accessibility feedback within 1 business day
              and propose a resolution within 3 business days.
            </p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to WCAGify.ai Main Platform</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
