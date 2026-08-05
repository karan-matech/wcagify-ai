"use client";

import React from 'react';
import { ShieldCheck, Mail, MapPin, Phone, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onNavigateHome = () => {
    if (pathname !== '/') {
      router.push('/');
    }
  };

  const onNavigateToAccessibility = () => {
    if (pathname !== '/accessibility') {
      router.push('/accessibility');
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetHash = href.startsWith('/') ? href : `/${href}`;
    if (pathname !== '/') {
      router.push(targetHash);
    } else {
      const selector = href.startsWith('/') ? href.slice(1) : href;
      const el = document.querySelector(selector);
      if (el) {
        window.history.pushState(null, '', selector);
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(targetHash);
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-12">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1 & 2: Brand & Address Block */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="#"
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
            </a>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              "WCAGify is building the AI infrastructure for digital accessibility across Web, Documents, Publishing, and Enterprise Knowledge. Reconstructing accessibility directly at the source."
            </p>

            {/* Semantic Address Block */}
            <address className="not-italic text-xs text-slate-300 space-y-2 border-l-2 border-indigo-600 pl-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
                <span>WCAGify.ai Global Headquarters, 100 Accessibility Way, Suite 400, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:accessibility@wcagify.ai" 
                  className="hover:text-white underline decoration-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded"
                >
                  accessibility@wcagify.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
                <span>+1 (800) 555-WCAG (9224)</span>
              </div>
            </address>
          </div>

          {/* Column 3: Platform Scope */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Platform & Pipeline
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#pipeline" onClick={(e) => handleLinkClick(e, '/#pipeline')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  4-Step Transformation Engine
                </a>
              </li>
              <li>
                <a href="/#comparison" onClick={(e) => handleLinkClick(e, '/#comparison')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  Native vs. Overlay Trap
                </a>
              </li>
              <li>
                <a href="/#assets" onClick={(e) => handleLinkClick(e, '/#assets')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  Universal Asset Engine
                </a>
              </li>
              <li>
                <a href="/#architecture" onClick={(e) => handleLinkClick(e, '/#architecture')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  Tri-Pillar AI Architecture
                </a>
              </li>
              <li>
                <a href="/#gatekeeper" onClick={(e) => handleLinkClick(e, '/#gatekeeper')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  Fail-Closed Build Gatekeeper
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance Drivers */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Regulatory Standards
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/#regulatory" onClick={(e) => handleLinkClick(e, '/#regulatory')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  WCAG 2.2 Level AA Standard
                </a>
              </li>
              <li>
                <a href="/#regulatory" onClick={(e) => handleLinkClick(e, '/#regulatory')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  European Accessibility Act (EN 301 549)
                </a>
              </li>
              <li>
                <a href="/#regulatory" onClick={(e) => handleLinkClick(e, '/#regulatory')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  US ADA Title II & Section 508
                </a>
              </li>
              <li>
                <a href="/#assets" onClick={(e) => handleLinkClick(e, '/#assets')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  ISO 14289-1 PDF/UA Specifications
                </a>
              </li>
              <li>
                <a href="/#assets" onClick={(e) => handleLinkClick(e, '/#assets')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  EPUB 3.3 Publication Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Formal Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Company & Policies
            </h3>
            <ul className="space-y-2 text-xs">
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
                <a href="/#demo-request" onClick={(e) => handleLinkClick(e, '/#demo-request')} className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none rounded py-0.5">
                  Request Platform Demo
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Privacy Policy (SOC-2 Type II)</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Platform Service</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Security & Data Governance</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Social Links & Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              WCAG 2.2 AA Compliant
            </span>
            <span>Natively Built — Zero Overlay Dependencies.</span>
          </div>

          {/* Accessible Social Media Links */}
          <div className="flex items-center gap-4">
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
