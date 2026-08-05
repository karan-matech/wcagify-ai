import React from 'react';
import '../index.css';
import { SkipLink } from '../components/SkipLink';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string | string[];
}

export const metadata: Metadata = {
  title: 'WCAGify.ai — The AI Infrastructure for Digital Accessibility',
  description: 'WCAGify.ai transforms inaccessible websites, SaaS applications, PDFs, EPUBs, and enterprise content into natively compliant digital assets directly at the source code level.',
  keywords: 'Digital Accessibility, WCAG 2.2 AA, EAA EN 301 549, ADA Title II, Section 508, AI Accessibility, PDF/UA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white antialiased">
        <SkipLink />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
