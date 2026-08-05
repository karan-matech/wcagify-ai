import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu, Sparkles, FileCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/60">
      {/* Decorative Accessible Ambient Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/5 blur-3xl pointer-events-none -z-10 rounded-full" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6 w-full">
          
          {/* Tagline Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-2xl sm:rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-900 text-xs sm:text-sm font-medium shadow-sm max-w-full text-center mx-auto">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true" />
              <span>One Platform. Universal Accessibility.</span>
            </div>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" aria-hidden="true" />
            <span className="text-indigo-700 font-semibold">Native Source Remediation</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-[1.15] break-words px-1">
            {/* Kept `inline` at every breakpoint: as an inline-block the
                preceding space was dropped from the text content, so the
                heading read as "…Infrastructure forDigital Accessibility". */}
            Building the AI Infrastructure for{' '}
            <span className="text-indigo-600 underline decoration-indigo-300 decoration-wavy decoration-2 underline-offset-4 sm:underline-offset-8 inline">Digital Accessibility</span>
          </h1>

          {/* Subheading Narrative */}
          <p className="text-sm sm:text-lg lg:text-xl text-slate-800 font-medium leading-relaxed max-w-3xl mx-auto px-1">
            Millions face digital barriers every day. WCAGify transforms inaccessible websites, enterprise documents, and digital publications into natively compliant, born-accessible assets—reconstructing accessibility directly at the source.
          </p>

          {/* CTA Group */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <button
              type="button"
              onClick={() => scrollTo('#pipeline')}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-5 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none group"
            >
              <span>Transform Your Digital Assets</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('#gatekeeper')}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
            >
              <span>Explore Build Gatekeeper</span>
            </button>
          </div>

          {/* Core Guarantees Bar */}
          <div className="pt-6 sm:pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left max-w-4xl mx-auto border-t border-slate-200/80">
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white/90 border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">100% Native Code</span>
                <span className="text-xs text-slate-700 block font-medium">Remediated at source, never masked</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white/90 border border-slate-200 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">WCAG 2.2 AA & ADA</span>
                <span className="text-xs text-slate-700 block font-medium">EAA EN 301 549 Law compliant</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white/90 border border-slate-200 shadow-sm">
              <Cpu className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">AST & Tag Trees</span>
                <span className="text-xs text-slate-700 block font-medium">PDF/UA, EPUB3, DOM trees</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white/90 border border-slate-200 shadow-sm">
              <FileCheck className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">Fail-Closed Gate</span>
                <span className="text-xs text-slate-700 block font-medium">CI/CD compilation guard</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
