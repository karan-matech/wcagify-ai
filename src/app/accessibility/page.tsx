"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Keyboard, Zap } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1 outline-none py-16 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded-md px-3 py-1.5 border border-indigo-200 hover:border-indigo-300"
        aria-label="Back to home page"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      {/* Header */}
      <header className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Accessibility Statement
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Our commitment to creating a digitally inclusive web presence where assistive technologies and human-centered design meet.
        </p>
      </header>

      {/* Core Principles Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg h-fit">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">WCAG 2.2 AA Compliant</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tested against the Web Content Accessibility Guidelines (WCAG) 2.2 AA standards to ensure compatibility with screen readers, refreshable braille displays, and switch access controls.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg h-fit">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Zero Overlay Policy</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We strictly reject generic, third-party accessibility widgets or overlay scripts. We believe true accessibility must be engineered directly into the source code structure.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-lg h-fit">
            <Keyboard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Full Keyboard Navigation</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every interactive element, form, tab panel, and navigation flow is accessible using only standard keyboard sequences with high-contrast, prominent focus indicators.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-sky-50 text-sky-700 rounded-lg h-fit">
            <Zap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Fail-Closed Quality Gates</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Our automated build pipeline integrates Axe-Core and Playwright audits. No codebase changes can be deployed if they introduce any WCAG violations.
            </p>
            <Link
              href="/#gatekeeper"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none rounded"
            >
              <span>Explore Gatekeeper Simulator</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Narrative Sections */}
      <section className="space-y-10 text-slate-700 leading-relaxed">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Conformity Status</h3>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. <strong>WCAGify.ai</strong> is fully conformant with WCAG 2.2 Level AA. This means that all primary content, interactive features, and document engines meet the strict requirements of level AA natively.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Feedback & Accessibility Coordinator</h3>
          <p>
            We welcome your feedback on the accessibility of our platform. If you encounter any barriers, find any content hard to access, or have suggestions for improvements, please reach out directly:
          </p>
          <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
            <p className="font-semibold text-slate-900 mb-1">Accessibility Support Team</p>
            <p className="text-sm text-slate-600">Email: <a href="mailto:accessibility@wcagify.ai" className="text-indigo-600 hover:underline">accessibility@wcagify.ai</a></p>
            <p className="text-sm text-slate-600 mt-2">
              We aim to respond to feedback within 2 business days.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Assistive Technologies Support</h3>
          <p>
            Our web platform has been designed and tested to be compatible with standard assistive technologies, including:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>JAWS, NVDA, and VoiceOver screen readers on native desktop web browsers.</li>
            <li>VoiceOver and TalkBack screen readers on mobile devices (iOS and Android).</li>
            <li>Keyboard-only navigation utilities and switch access devices.</li>
            <li>Browser-native zoom and high-contrast styling adjustments.</li>
          </ul>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-xs text-slate-500">
            This statement was created on August 5, 2026.
          </p>
        </div>
      </section>
    </main>
  );
}
