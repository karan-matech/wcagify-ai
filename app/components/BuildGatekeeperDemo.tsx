"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldAlert,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Wand2,
  Volume2,
  Lock,
  Unlock,
  Check,
  X,
  Code2,
  ArrowRight,
  Shield,
} from "lucide-react";

export const BuildGatekeeperDemo: React.FC = () => {
  const [gateStatus, setGateStatus] = useState<
    "idle" | "scanning" | "blocked" | "fixed"
  >("idle");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showTechCode, setShowTechCode] = useState<boolean>(false);

  const runGatekeeperCheck = () => {
    setGateStatus("scanning");
    setTimeout(() => {
      setGateStatus("blocked");
    }, 1200);
  };

  const autoFixAndRelease = () => {
    setGateStatus("scanning");
    setTimeout(() => {
      setGateStatus("fixed");
    }, 1200);
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
      id="gatekeeper"
      className="py-12 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Friendly Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
            <ShieldAlert
              className="w-3.5 h-3.5 text-rose-600 shrink-0"
              aria-hidden="true"
            />
            Automatic Quality Gatekeeper
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Stop Inaccessible Content{" "}
            <span className="text-rose-600">Before It Goes Live</span>
          </h2>
          <p className="text-sm sm:text:base lg:text-lg text-slate-600 leading-relaxed">
            Think of WCAGify as an automatic security guard for your website. If
            anyone on your team accidentally uploads broken buttons or
            unreadable documents, WCAGify stops the update instantly and fixes
            it before customers see it.
          </p>
        </div>

        {/* Animated Interactive Guard Card */}
        <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 text-white max-w-5xl mx-auto relative overflow-hidden">
          {/* Top Bar Status & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  gateStatus === "fixed"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : gateStatus === "blocked"
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                      : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                }`}
              >
                {gateStatus === "fixed" ? (
                  <>
                    <ShieldCheck
                      className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Guard Status: Approved & Released to Live Site</span>
                  </>
                ) : gateStatus === "blocked" ? (
                  <>
                    <Lock
                      className="w-3.5 h-3.5 text-rose-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      Guard Status: Update Blocked (Inaccessible Content
                      Detected)
                    </span>
                  </>
                ) : (
                  <>
                    <Shield
                      className="w-3.5 h-3.5 text-indigo-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Guard Status: Ready to Scan Release</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {gateStatus === "idle" && (
                <button
                  type="button"
                  onClick={runGatekeeperCheck}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition-all focus-visible:ring-2 focus-visible:ring-rose-400 outline-none"
                >
                  <Play
                    className="w-3.5 h-3.5 fill-current"
                    aria-hidden="true"
                  />
                  <span>Simulate Publishing Inaccessible Page</span>
                </button>
              )}

              {gateStatus === "blocked" && (
                <button
                  type="button"
                  onClick={autoFixAndRelease}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 outline-none"
                >
                  <Wand2 className="w-4 h-4" aria-hidden="true" />
                  <span>Auto-Fix Barriers & Publish Safely</span>
                </button>
              )}

              {(gateStatus === "blocked" || gateStatus === "fixed") && (
                <button
                  type="button"
                  onClick={() => setGateStatus("idle")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset Demo</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowTechCode(!showTechCode)}
                aria-expanded={showTechCode}
                aria-label={
                  showTechCode ? "Hide developer view" : "Show developer view"
                }
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">
                  {showTechCode ? "Hide Logs" : "Developer View"}
                </span>
              </button>
            </div>
          </div>

          {/* Scanning Animation Beam */}
          <AnimatePresence>
            {gateStatus === "scanning" && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_20px_#fb7185] z-30 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Main Animated Visual Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Pipeline Flow Chart */}
            <div className="lg:col-span-7 bg-slate-950 p-5 sm:p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              {/* Step 1: Website Draft */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-indigo-900/60 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-700/40">
                  1
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-white">
                    Team Member Submits Web Update
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    A developer or marketer pushes new marketing pages and PDF
                    reports to the server.
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="w-0.5 h-4 bg-slate-800 mx-7" />

              {/* Step 2: Gatekeeper Checkpoint */}
              <div
                className={`flex items-start gap-3 p-3.5 rounded-xl transition-all border ${
                  gateStatus === "blocked"
                    ? "bg-rose-950/40 border-rose-800/80"
                    : gateStatus === "fixed"
                      ? "bg-emerald-950/40 border-emerald-800/80"
                      : "bg-slate-900 border-slate-800"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    gateStatus === "blocked"
                      ? "bg-rose-600 text-white"
                      : gateStatus === "fixed"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-400"
                  }`}
                >
                  2
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="block text-sm font-bold text-white">
                      WCAGify Safety Gate Checkpoint
                    </span>
                    {gateStatus === "blocked" && (
                      <span className="text-[11px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                        🛑 RELEASE BLOCKED
                      </span>
                    )}
                    {gateStatus === "fixed" && (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        ✓ AUTO-REPAIRED & PASSED
                      </span>
                    )}
                  </div>

                  {gateStatus === "idle" && (
                    <p className="text-xs text-slate-400">
                      Click "Simulate Publishing Inaccessible Page" above to
                      trigger the guard.
                    </p>
                  )}

                  {gateStatus === "blocked" && (
                    <div className="space-y-1.5 text-xs text-rose-300 bg-rose-950/60 p-3 rounded-lg border border-rose-900/50">
                      <p className="font-bold text-rose-200">
                        Barriers Found & Stopped:
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>Broken button missing keyboard navigation</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>
                            Unlabelled image with no screen reader text
                          </span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>PDF file uploaded without accessible tags</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {gateStatus === "fixed" && (
                    <div className="space-y-1.5 text-xs text-emerald-300 bg-emerald-950/60 p-3 rounded-lg border border-emerald-900/50">
                      <p className="font-bold text-emerald-200">
                        AI Repairs Applied in 1.2s:
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>
                            Converted broken buttons to native HTML buttons
                          </span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>
                            Generated accurate AI alt-text descriptions
                          </span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>
                            Injected PDF/UA-1 tags into uploaded documents
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting Line */}
              <div className="w-0.5 h-4 bg-slate-800 mx-7" />

              {/* Step 3: Live Website Release */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    gateStatus === "fixed"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  3
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-white">
                    Live Customer Site
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {gateStatus === "fixed"
                      ? "Guaranteed 100% compliant and accessible for all users and screen readers."
                      : "Protected by WCAGify. No inaccessible content can ever break through to live users."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Non-Tech Explanation & Voice Simulation */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <ShieldAlert
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-bold text-white">
                    Why This Matters
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Most accessibility lawsuits happen when team members publish
                  new content or PDF files without checking accessibility.
                  WCAGify guarantees you never make a mistake by acting as a
                  zero-effort safety filter.
                </p>

                {/* Speech Narration Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      speakNarration(
                        gateStatus === "blocked"
                          ? "Alert. Publishing blocked. Four accessibility barriers detected on checkout page. Auto-remediation recommended."
                          : "Release approved. WCAGify repaired all accessibility barriers. Website is 100% compliant and live.",
                      )
                    }
                    className="w-full py-2.5 px-4 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 outline-none"
                  >
                    <Volume2 className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      {isPlayingAudio
                        ? "Speaking Audio Status..."
                        : "🔊 Listen to Guard Voice Audio"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Legal Peace of Mind Card */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <ShieldCheck
                  className="w-6 h-6 text-emerald-400 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs font-bold text-white">
                    Fail-Closed Security Guarantee
                  </span>
                  <span className="text-xs text-slate-400">
                    Zero non-compliant releases reach customers.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Developer View Log Drawer */}
          {showTechCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 pt-6 border-t border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  CI/CD Gatekeeper Compilation Terminal
                </span>
                <span className="text-[11px] text-slate-400">
                  GitHub Actions / Vercel Build Logs
                </span>
              </div>

              <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 rounded-xl border border-slate-800 space-y-2 overflow-x-auto">
                <div className="text-slate-500">
                  $ wcagify-gatekeeper check --target=./dist --standard=WCAG22AA
                </div>
                <div className="text-indigo-300">
                  {" "}
                  Parsing AST source files, DOM tree, and PDF/UA tag matrices...
                </div>
                {gateStatus === "blocked" && (
                  <div className="text-rose-400 font-bold">
                    [BUILD HALTED] FAIL-CLOSED GATEKEEPER TRIGGERED (4
                    Compliance Violations Found)
                  </div>
                )}
                {gateStatus === "fixed" && (
                  <div className="text-emerald-400 font-bold">
                    [BUILD PASSED] NATIVE REMEDIATION SUCCESSFUL (0 Violations
                    Remaining)
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
