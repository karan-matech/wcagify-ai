import React from "react";
import { Reveal } from "./Reveal";

const stats = [
  { value: "WCAG 2.2", label: "Level AA Standard" },
  { value: "ISO 14289", label: "PDF/UA Tag Trees" },
  { value: "EPUB 3", label: "MathML & Reflow" },
  { value: "EN 301 549", label: "EU Accessibility Act" },
];

export const StatsBand: React.FC = () => {
  return (
    <section
      aria-label="Standards WCAGify is built to"
      className="bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Reveal>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 text-center">
            {stats.map((stat) => (
              <li key={stat.label}>
                <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};
