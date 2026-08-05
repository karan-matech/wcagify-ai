import React from 'react';
import { AccessibilityStatement } from '../../src/pages/AccessibilityStatement';

export default function AccessibilityPage() {
  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return <AccessibilityStatement onBackToHome={handleBackToHome} />;
}
