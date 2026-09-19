"use client";
import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="bg-slate-50 pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-4"
        >
          Native Source Remediation
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          Building the AI infrastructure for digital accessibility
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
          className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
        >
          WCAGify transforms inaccessible websites, documents, and
          publications into natively compliant, born-accessible assets—
          reconstructed directly at the source.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("#pipeline")}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none group"
          >
            <span>Transform Your Digital Assets</span>
            <ArrowRight
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollTo("#gatekeeper")}
            className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none rounded-lg"
          >
            <span>Explore Build Gatekeeper</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
