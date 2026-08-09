"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Keyboard,
  Eye,
  Wand2,
  Check,
  Code2,
} from "lucide-react";

type PersonaMode = "contrast" | "keyboard" | "screenreader";

export const HeroTransformationPreview: React.FC = () => {
  const [activePersona, setActivePersona] =
    useState<PersonaMode>("screenreader");
  const [isTransformed, setIsTransformed] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showTechCode, setShowTechCode] = useState<boolean>(false);

  const triggerTransform = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsTransformed(true);
    }, 1200);
  };

  const handleToggleState = () => {
    if (!isTransformed) {
      triggerTransform();
    } else {
      setIsTransformed(false);
    }
  };

  const speakNarration = (text: string) => {
    if (!("speechSynthesis" in window)) return;
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
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      id="pipeline"
      className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Sparkles
              className="w-3.5 h-3.5 text-indigo-600 shrink-0"
              aria-hidden="true"
            />
            Simple Animated Breakdown
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How WCAGify Fixes Your Website{" "}
            <span className="text-indigo-600">In Seconds</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            No complicated code knowledge required. See how WCAGify
            automatically removes barriers for real people—whether they use
            screen readers, keyboard navigation, or high-contrast display modes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            type="button"
            onClick={() => {
              setActivePersona("screenreader");
              setIsTransformed(true);
            }}
            className={`px-3.5 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none ${
              activePersona === "screenreader"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Screen Reader (Blind Users)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePersona("keyboard");
              setIsTransformed(true);
            }}
            className={`px-3.5 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none ${
              activePersona === "keyboard"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <Keyboard className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Keyboard Only (Motor Impaired)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePersona("contrast");
              setIsTransformed(true);
            }}
            className={`px-3.5 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none ${
              activePersona === "contrast"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Low Vision & High Contrast</span>
          </button>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 text-white max-w-5xl mx-auto relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isTransformed
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                }`}
              >
                {isTransformed ? (
                  <>
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Status: WCAGify Repaired (100% Accessible)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle
                      className="w-3.5 h-3.5 text-rose-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Status: Original Website (Inaccessible)</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleState}
                disabled={isScanning}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>AI Repairing Website...</span>
                  </>
                ) : isTransformed ? (
                  <>
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Show Broken Original</span>
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
                aria-label={
                  showTechCode ? "Hide developer view" : "Show developer view"
                }
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Toggle code view"
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">
                  {showTechCode ? "Hide Code" : "Developer View"}
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_20px_#818cf8] z-30 pointer-events-none"
              />
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-slate-950 p-5 sm:p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-xs text-slate-500">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 font-mono text-[11px] text-slate-400 truncate">
                  https://my-store.com/checkout
                </span>
              </div>

              <div className="space-y-5">
                <div className="space-y-1">
                  <h3
                    className={`text-xl font-bold transition-all ${
                      !isTransformed && activePersona === "contrast"
                        ? "text-slate-600/40"
                        : "text-white"
                    }`}
                  >
                    Checkout & Payment Confirmation
                  </h3>

                  {!isTransformed && activePersona === "contrast" && (
                    <span className="inline-block text-[11px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                      ⚠️ Failure: Contrast ratio 1.8:1 (Unreadable grey)
                    </span>
                  )}
                  {isTransformed && (
                    <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      ✓ Fixed: High contrast WCAG 7.2:1 ratio
                    </span>
                  )}
                </div>

                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-indigo-900/50 rounded-lg flex items-center justify-center shrink-0 border border-indigo-700/30">
                    <Sparkles
                      className="w-8 h-8 text-indigo-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200">
                      Order Summary Chart
                    </p>

                    {!isTransformed ? (
                      <p className="text-xs text-rose-400 font-mono">
                        alt="IMG_4021.PNG" (No description for screen readers)
                      </p>
                    ) : (
                      <p className="text-xs text-emerald-300 font-medium">
                        alt="Quarterly summary showing 3 items totaling $142.00"
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    {isTransformed ? (
                      <span className="flex items-center justify-between">
                        <span>Cardholder Name</span>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          Explicit &lt;label&gt; tag
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-between text-rose-400">
                        <span>(Unlinked label div)</span>
                        <span className="text-[10px] font-bold">
                          Unlabelled Input
                        </span>
                      </span>
                    )}
                  </label>

                  <input
                    type="text"
                    readOnly
                    aria-label="Full name (demonstration field)"
                    value="John Doe"
                    tabIndex={
                      activePersona === "keyboard" && isTransformed ? 0 : -1
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-sm text-slate-200 border transition-all ${
                      activePersona === "keyboard" && isTransformed
                        ? "border-indigo-500 ring-2 ring-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                        : activePersona === "keyboard" && !isTransformed
                          ? "border-slate-800 ring-0 opacity-50"
                          : "border-slate-800"
                    }`}
                  />
                  {activePersona === "keyboard" && (
                    <p
                      className={`text-xs ${isTransformed ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {isTransformed
                        ? "✓ Keyboard focus trap fixed! Tab key highlights this input with glowing ring."
                        : "❌ Cannot focus via Tab key! Keyboard users are trapped."}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  {!isTransformed ? (
                    <div className="p-3 bg-slate-900 border border-rose-900/50 rounded-xl text-center cursor-not-allowed">
                      <span className="text-xs text-rose-400 font-mono block whitespace-pre-wrap">
                        {`<div class="btn" onclick="checkout()">
  <br />
  <img src="chart_42.png" />
  <br />
  <span>Checkout</span>
</div>`}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        (Div button cannot be activated by keyboard Enter key)
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Complete Purchase ($142.00)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  {activePersona === "screenreader" && (
                    <Volume2 className="w-5 h-5 shrink-0" />
                  )}
                  {activePersona === "keyboard" && (
                    <Keyboard className="w-5 h-5 shrink-0" />
                  )}
                  {activePersona === "contrast" && (
                    <Eye className="w-5 h-5 shrink-0" />
                  )}
                  <h4 className="text-base font-bold text-white">
                    {activePersona === "screenreader" &&
                      "Screen Reader Experience"}
                    {activePersona === "keyboard" &&
                      "Keyboard Navigation Experience"}
                    {activePersona === "contrast" &&
                      "Visual Contrast Experience"}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activePersona === "screenreader" &&
                    (isTransformed
                      ? "WCAGify synthesized descriptive alt-text and structured headings. Blind users hear exact details rather than confusing image filenames."
                      : "Without WCAGify, blind users hear 'Image 4021 PNG' and unlabelled buttons, making purchase completion impossible.")}

                  {activePersona === "keyboard" &&
                    (isTransformed
                      ? "WCAGify converted fake <div> elements into native <button> tags with clear visual focus rings. Users without a mouse can easily press Tab and Enter."
                      : "Without WCAGify, mouse-only click handlers skip keyboard users entirely, leaving them stuck.")}

                  {activePersona === "contrast" &&
                    (isTransformed
                      ? "WCAGify adjusted text contrast variables to exceed WCAG 2.2 Level AA requirements (7.2:1 ratio), ensuring clarity in bright sunlight or low vision."
                      : "Without WCAGify, faint light-grey text fails WCAG standards and cannot be read by millions with visual limitations.")}
                </p>

                {activePersona === "screenreader" && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        speakNarration(
                          isTransformed
                            ? "Heading level 3: Checkout and Payment Confirmation. Order summary chart showing 3 items totaling $142.00. Cardholder name edit text. Complete purchase button."
                            : "Unlabelled text... Image_4021.PNG... Unlabelled div button... Warning: No accessible name.",
                        )
                      }
                      className="w-full py-2.5 px-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>
                        {isPlayingAudio
                          ? "Speaking Voice Narration..."
                          : "🔊 Click to Listen (Audio Simulation)"}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What WCAGify Reconstructed
                </h5>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Native Source Code Fixes (No surface overlays)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Context-Aware AI Alt Text Generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Guaranteed WCAG 2.2 AA & ADA Legal Compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {showTechCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-6 border-t border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Under the Hood Code Diff
                </span>
                <span className="text-[11px] text-slate-400">
                  Source level AST transformation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 text-xs font-mono text-rose-300/90 overflow-x-auto">
                  <span className="text-rose-400 font-bold block mb-1">
                    ❌ Inaccessible Raw Source:
                  </span>
                  <code>{`<div class="btn" onclick="checkout()">
  <img src="chart_42.png" />
  <span>Checkout</span>
</div>`}</code>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 text-xs font-mono text-emerald-300 overflow-x-auto">
                  <span className="text-emerald-400 font-bold block mb-1">
                    ✓ WCAGify Reconstructed Output:
                  </span>
                  <code>{`<button type="button" onclick="checkout()" aria-label="Complete Purchase">
  <img src="chart_42.png" alt="Quarterly summary chart" />
  <span>Checkout</span>
</button>`}</code>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
