"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const currentView = pathname === '/accessibility' ? 'accessibility' : 'home';

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle hash scrolling when navigating across pages or landing on hash URLs
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const scrollToElement = () => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        };
        // Run immediately and after slight delay to ensure Next.js route has rendered
        scrollToElement();
        const t1 = setTimeout(scrollToElement, 100);
        const t2 = setTimeout(scrollToElement, 300);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  const navLinks = [
    { name: 'Engine', href: '#pipeline' },
    { name: 'Native vs Overlay', href: '#comparison' },
    { name: 'Assets', href: '#assets' },
    { name: 'Gatekeeper', href: '#gatekeeper' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
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
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
          : 'bg-white/90 border-slate-200/80 backdrop-blur-sm'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 flex-nowrap"
      >
        {/* Brand Logo Link */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateHome) onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 shrink-0 rounded-md p-1 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none whitespace-nowrap group"
          aria-label="WCAGify.ai Home"
        >
          <img
            src="/logo.svg"
            alt="WCAGify.ai logo"
            className="h-7 sm:h-8 w-auto object-contain"
            width={160}
            height={32}
          />
          <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 ml-1">
            WCAG 2.2 AA
          </span>
        </a>

        {/* Desktop Navigation Links - End to End, Non-wrapping */}
        <div className="hidden xl:flex items-center gap-1 xl:gap-3 shrink min-w-0 flex-nowrap whitespace-nowrap mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none shrink-0"
            >
              {link.name}
            </a>
          ))}
          
          <Link
            href="/accessibility"
            className={`px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-medium rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none flex items-center gap-1.5 shrink-0 ${
              currentView === 'accessibility'
                ? 'text-indigo-700 bg-indigo-50 font-semibold'
                : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
            }`}
            aria-current={currentView === 'accessibility' ? 'page' : undefined}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true" />
            <span>a11y Statement</span>
          </Link>
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0 whitespace-nowrap ml-auto">
          <a
            href="#demo-request"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#demo-request');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none group shrink-0"
          >
            <span>Request Demo</span>
            <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="xl:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-150"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Navigation
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                WCAG 2.2 AA Compliant
              </span>
            </div>

            <nav aria-label="Mobile Navigation Links" className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none"
                >
                  {link.name}
                </a>
              ))}

              <Link
                href="/accessibility"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-left px-3 py-2.5 text-base font-medium text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                  Accessibility Statement
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Verified
                </span>
              </Link>
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a
                href="#demo-request"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#demo-request');
                }}
                className="flex items-center justify-center w-full px-4 py-3 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition-colors"
              >
                Request Platform Demo
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
