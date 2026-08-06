import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layout,
  FileText,
  BookOpen,
  Database,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Wand2,
  RotateCcw,
  Volume2,
  ShieldCheck,
  Code2,
  ArrowRight,
  Eye,
  FileCheck,
  Layers,
  Check
} from 'lucide-react';

interface AssetCategory {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  headline: string;
  simpleDescription: string;
  beforeProblem: string;
  afterSolution: string;
  speechScript: string;
  visualPreview: {
    beforeTitle: string;
    beforeDetails: string[];
    afterTitle: string;
    afterDetails: string[];
  };
  sampleOutputCode: string;
}

export const FeatureTabs: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('web-saas');
  const [isTransformed, setIsTransformed] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showTechCode, setShowTechCode] = useState<boolean>(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const categories: AssetCategory[] = [
    {
      id: 'web-saas',
      name: 'Websites & Apps',
      badge: 'HTML5 + ARIA',
      icon: <Layout className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />,
      headline: 'Fix Web Forms, Buttons & Dashboards Natively',
      simpleDescription: 'Reconstructs web pages so everyone can register, pay, and navigate—using a mouse, keyboard, or screen reader.',
      beforeProblem: 'Inaccessible buttons made from <div> tags, missing label connections, and unreadable faint grey text.',
      afterSolution: 'Native semantic elements with clear focus outlines, high-contrast text, and screen reader announcements.',
      speechScript: 'Checkout Page. Cardholder Name field required. Complete Purchase button, focused.',
      visualPreview: {
        beforeTitle: 'Broken Web Form',
        beforeDetails: ['Mouse-only click handler', 'Contrast ratio 1.8:1 (Unreadable)', 'No screen reader labels'],
        afterTitle: 'Natively Fixed Web Form',
        afterDetails: ['Full keyboard focus ring', 'WCAG 7.2:1 contrast ratio', 'ARIA live regions for dynamic updates']
      },
      sampleOutputCode: `<button type="button" aria-label="Complete Purchase">
  <span class="text-slate-900 font-bold">Complete Purchase</span>
</button>`
    },
    {
      id: 'documents',
      name: 'PDFs & Documents',
      badge: 'PDF/UA ISO 14289',
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />,
      headline: 'Transform Untagged Scanned PDFs into Tagged Documents',
      simpleDescription: 'Scans contracts, financial reports, and forms to build structured reading orders and alt text automatically.',
      beforeProblem: 'Screen readers read PDF text out of order or report the document as a completely blank image.',
      afterSolution: 'Programmatic ISO 14289 tag tree added directly to the PDF structure, ensuring veraPDF compliance.',
      speechScript: 'Document Title: Q3 Financial Statement. Heading Level 1: Revenue Overview. Table with 4 columns and 12 rows.',
      visualPreview: {
        beforeTitle: 'Raw Untagged PDF',
        beforeDetails: ['Scanned image with no text', 'Columns read out of logical order', 'Tables missing headers'],
        afterTitle: 'ISO 14289 PDF/UA Compliant',
        afterDetails: ['Logical reading order tree', 'Tagged headers <h1> to <h3>', 'Alt-text on charts & diagrams']
      },
      sampleOutputCode: `%PDF-1.7 /PDFUA-1
1 0 obj << /Type /Catalog /StructTreeRoot 2 0 R >>
2 0 obj << /Type /StructTreeRoot /K [3 0 R 4 0 R] >>
<!-- ISO 14289 Programmatic Tag Tree -->`
    },
    {
      id: 'publishing',
      name: 'E-Books & Publishing',
      badge: 'EPUB 3 & MathML',
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />,
      headline: 'Accessible Educational Textbooks & Academic Journals',
      simpleDescription: 'Converts textbooks and manuscripts into accessible EPUB e-books with spoken MathML math formulas.',
      beforeProblem: 'Scientific formulas and math equations are flattened images that screen readers cannot pronounce.',
      afterSolution: 'Equations converted to native MathML for natural speech synthesis and reflowable text on e-readers.',
      speechScript: 'Schrodinger equation: i times h-bar times partial derivative of psi over partial t.',
      visualPreview: {
        beforeTitle: 'Flattened E-Book Image',
        beforeDetails: ['Math formulas as unreadable PNGs', 'Fixed non-reflowable font sizes', 'Missing table of contents'],
        afterTitle: 'Accessible EPUB 3 E-Book',
        afterDetails: ['Native MathML spoken equations', 'Reflowable typography for large text', 'Synchronized voice narration']
      },
      sampleOutputCode: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mrow><mi>i</mi><mi>&#x210F;</mi><mfrac><mo>&#x2202;</mo><mrow><mo>&#x2202;</mo><mi>t</mi></mrow></mfrac><mi>&#x03C8;</mi></mrow>
</math>`
    },
    {
      id: 'knowledge',
      name: 'Portals & Knowledge Bases',
      badge: 'Wikis & Portals',
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />,
      headline: 'Equal Access for Internal Employee Knowledge Systems',
      simpleDescription: 'Remediates internal help desks, training portals, and wikis so all employees can work without barriers.',
      beforeProblem: 'Keyboard users cannot open search dropdowns or copy code snippets in company portals.',
      afterSolution: 'Accessible keyboard navigation, searchable tags, and high-contrast dark/light mode compatibility.',
      speechScript: 'Search results: 3 articles found. Article 1: Security Access Control Policy. Press enter to open.',
      visualPreview: {
        beforeTitle: 'Inaccessible Company Wiki',
        beforeDetails: ['Search dropdown unreachable via Tab key', 'Copy code button gives no feedback', 'Fails Section 508 standards'],
        afterTitle: 'Accessible Knowledge Base',
        afterDetails: ['Accessible search announcements', 'Voice-over friendly navigation', 'Fully Section 508 compliant']
      },
      sampleOutputCode: `# Enterprise Knowledge Portal
> WCAG 2.2 AA Verified Hierarchy
## 1. Authentication Protocols`
    }
  ];

  const activeCategory = categories.find((c) => c.id === activeTabId) || categories[0];

  const triggerTransform = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsTransformed(true);
    }, 1000);
  };

  const handleToggleState = () => {
    if (!isTransformed) {
      triggerTransform();
    } else {
      setIsTransformed(false);
    }
  };

  const speakNarration = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % categories.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + categories.length) % categories.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = categories.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTabId(categories[newIndex].id);
    setIsTransformed(true);
    // Focus the tab directly rather than through a timer. The button is already
    // in the DOM — only its tabIndex changes on re-render — so deferring the
    // call just raced the commit, and a second arrow press arriving before the
    // timer fired left focus on the old tab.
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <section id="assets" className="py-12 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Friendly Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" aria-hidden="true" />
            Universal Asset Transformation
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            One Engine. <span className="text-indigo-600">Every Asset Format.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Select a digital format below to see how WCAGify automatically converts inaccessible files, e-books, and web apps into natively compliant assets.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div 
          role="tablist" 
          aria-label="Universal Asset Format Selector"
          className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto mb-8"
        >
          {categories.map((cat, idx) => {
            const isSelected = cat.id === activeTabId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`tab-${cat.id}`}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                aria-selected={isSelected}
                aria-controls={`panel-${cat.id}`}
                tabIndex={isSelected ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onClick={() => {
                  setActiveTabId(cat.id);
                  setIsTransformed(true);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="shrink-0">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-indigo-500/30 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Transformation Display */}
        <div
          id={`panel-${activeCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory.id}`}
          className="bg-slate-900 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 text-white max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0 text-indigo-400" aria-hidden="true" />
                {activeCategory.headline}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleState}
                disabled={isScanning}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing File...</span>
                  </>
                ) : isTransformed ? (
                  <>
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>View Unremediated</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" aria-hidden="true" />
                    <span>Run AI Transformation</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowTechCode(!showTechCode)}
                aria-expanded={showTechCode}
                aria-label={showTechCode ? 'Hide developer view' : 'Show developer view'}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{showTechCode ? 'Hide Code' : 'Developer View'}</span>
              </button>
            </div>
          </div>

          {/* AI Scanning Beam Overlay Effect */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.0, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_#818cf8] z-30 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Main Visual Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Card Representation */}
            <div className="lg:col-span-7 bg-slate-950 p-5 sm:p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              
              {/* Header Status */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-400 shrink-0" aria-hidden="true" />
                  Format: <strong className="text-white">{activeCategory.name}</strong>
                </span>

                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isTransformed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {isTransformed ? '✓ Accessible Output' : '⚠️ Inaccessible Input'}
                </span>
              </div>

              {/* Before/After Visual Display */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {isTransformed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span>
                      {isTransformed
                        ? activeCategory.visualPreview.afterTitle
                        : activeCategory.visualPreview.beforeTitle}
                    </span>
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {isTransformed
                      ? activeCategory.afterSolution
                      : activeCategory.beforeProblem}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    {isTransformed ? 'Accessibility Capabilities Added:' : 'Known Accessibility Blockers:'}
                  </span>
                  <ul className="space-y-2">
                    {(isTransformed
                      ? activeCategory.visualPreview.afterDetails
                      : activeCategory.visualPreview.beforeDetails
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                        {isTransformed ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        )}
                        <span className={isTransformed ? 'text-slate-200' : 'text-rose-300'}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Explanation & Audio Preview Box */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <FileCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <h4 className="text-base font-bold text-white">How WCAGify Fixes This</h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeCategory.simpleDescription}
                </p>

                {/* Speech Synthesis Narration Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => speakNarration(activeCategory.speechScript)}
                    className="w-full py-2.5 px-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{isPlayingAudio ? 'Speaking Voice Sample...' : '🔊 Listen to Audio Preview'}</span>
                  </button>
                </div>
              </div>

              {/* Regulatory Compliance Badge */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-xs font-bold text-white">Guaranteed Compliance</span>
                  <span className="text-xs text-slate-400">WCAG 2.2 AA, ADA Title II & EAA EN 301 549</span>
                </div>
              </div>

            </div>

          </div>

          {/* Optional Code View Drawer */}
          {showTechCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-6 border-t border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  AST Reconstructed Source Output
                </span>
                <span className="text-[11px] text-slate-400">{activeCategory.badge}</span>
              </div>

              <pre className="p-4 bg-slate-950 text-emerald-300 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{activeCategory.sampleOutputCode}</code>
              </pre>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
