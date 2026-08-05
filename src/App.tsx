import React, { useState } from 'react';
import { SkipLink } from './components/SkipLink';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import HomePage from './app/page';
import AccessibilityPage from './app/accessibility/page';
import { AccessibilityStatement } from './pages/AccessibilityStatement';
import WcagifyWidget from './components/accessibility-widget/WcagifyWidget';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'accessibility'>('home');

  const handleNavigateToAccessibility = () => {
    setCurrentView('accessibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans flex flex-col selection:bg-indigo-500 selection:text-white antialiased">
      {/* WCAG Requirement: Skip to main content link as first focusable element */}
      <SkipLink />

      {/* Global Navbar */}
      <Navbar
        currentView={currentView}
        onNavigateToAccessibility={handleNavigateToAccessibility}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Content Area rendered via App Router page structure */}
      {currentView === 'home' ? (
        <HomePage />
      ) : (
        <AccessibilityStatement onBackToHome={handleNavigateHome} />
      )}

      {/* Shared Accessible Footer */}
      <Footer
        onNavigateToAccessibility={handleNavigateToAccessibility}
        onNavigateHome={handleNavigateHome}
      />

      {/* Floating user-preference widget (self-contained, portalled outside #root) */}
      <WcagifyWidget />
    </div>
  );
}
