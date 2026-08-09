"use client";
import React from "react";
import {
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  ArrowUp,
  Heart,
} from "lucide-react";

interface FooterProps {
  onNavigateToAccessibility?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToAccessibility,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                scrollToTop();
              }}
              className="inline-block focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 outline-none rounded-md"
              aria-label="WCAGify.ai Home"
            >
              <img
                src="/logo.svg"
                alt="WCAGify.ai logo"
                className="h-10 w-auto filter invert brightness-200"
                width={200}
                height={40}
              />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              "WCAGify is building the AI infrastructure for digital
              accessibility across Web, Documents, Publishing, and Enterprise
              Knowledge. Reconstructing accessibility directly at the source."
            </p>

            <address className="not-italic text-xs text-slate-300 space-y-2 border-l-2 border-indigo-600 pl-3">
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4 text-indigo-400 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  WCAGify.ai Global Headquarters, 100 Accessibility Way, Suite
                  400, San Francisco, CA 94105
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail
                  className="w-4 h-4 text-indigo-400 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:accessibility@wcagify.ai"
                  className="hover:text-white underline decoration-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded"
                >
                  accessibility@wcagify.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 text-indigo-400 shrink-0"
                  aria-hidden="true"
                />
                <span>+1 (800) 555-WCAG (9224)</span>
              </div>
            </address>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Platform & Pipeline
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateHome) onNavigateHome();
                    scrollToTop();
                    const el = document.querySelector("#pipeline");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  4-Step Transformation Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#comparison");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  Native vs. Overlay Trap
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#assets");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  Universal Asset Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#architecture");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  Tri-Pillar AI Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#gatekeeper");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  Fail-Closed Build Gatekeeper
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance Drivers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Regulatory Standards
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#regulatory");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  WCAG 2.2 Level AA Standard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#regulatory");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  European Accessibility Act (EN 301 549)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#regulatory");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  US ADA Title II & Section 508
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#assets");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  ISO 14289-1 PDF/UA Specifications
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#assets");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  EPUB 3.3 Publication Guidelines
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Company & Policies
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onNavigateToAccessibility}
                  className="hover:text-white text-indigo-400 font-bold transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5 flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  Accessibility Statement
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    const el = document.querySelector("#demo-request");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded inline-flex items-center min-h-[24px] py-1 text-left"
                >
                  Request Platform Demo
                </button>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Privacy Policy (SOC-2 Type II)
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Terms of Platform Service
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Security & Data Governance
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                WCAG 2.2 AA Compliant
              </span>
              <span>Natively Built — Zero Overlay Dependencies.</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 text-[11px] pl-0.5">
              <span>Engineered in India with</span>
              <Heart
                className="w-3 h-3 text-rose-500 fill-rose-500 inline shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">love</span>
              <span>by</span>
              <a
                href="https://moveahead.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-300 hover:text-indigo-400 underline decoration-slate-600 underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded px-0.5"
                aria-label="MoveAhead (opens in new tab)"
              >
                MoveAhead
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none"
              aria-label="WCAGify.ai on LinkedIn (opens in new tab)"
            >
              <Linkedin className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none"
              aria-label="WCAGify.ai on X / Twitter (opens in new tab)"
            >
              <Twitter className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Twitter / X</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none"
              aria-label="WCAGify.ai on GitHub (opens in new tab)"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none ml-2"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
