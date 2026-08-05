import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-indigo-600 focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl focus:ring-4 focus:ring-indigo-300 transition-all text-sm uppercase tracking-wider"
    >
      Skip to main content
    </a>
  );
};
