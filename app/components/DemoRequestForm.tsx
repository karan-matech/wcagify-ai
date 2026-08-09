"use client";
import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const DemoRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orgType: "enterprise",
    assetScope: "all",
    details: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required for demo scheduling.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Work email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid work email address.";
    }

    if (!formData.details.trim()) {
      newErrors.details =
        "Please briefly outline your digital asset remediation volume.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setLiveAnnouncement(
        "Demo request submitted successfully. A WCAGify accessibility engineer will reach out within 24 hours.",
      );
    } else {
      setLiveAnnouncement(
        "Form submission failed due to validation errors. Please fix highlighted fields.",
      );
    }
  };

  return (
    <section
      id="demo-request"
      className="py-16 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Region for Screen Reader Announcements */}
        <div className="sr-only" aria-live="polite" role="status">
          {liveAnnouncement}
        </div>

        <div className="max-w-3xl mx-auto bg-slate-50 p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-lg space-y-8">
          {/* Form Header */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
              <Sparkles
                className="w-3.5 h-3.5 text-indigo-600"
                aria-hidden="true"
              />
              Schedule Platform Demonstration
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Transform Your Digital Assets at Scale
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Request a live demonstration of the WCAGify AI engine on your
              organization's websites, PDFs, EPUB publications, or enterprise
              docs.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 animate-in fade-in duration-200">
              <CheckCircle2
                className="w-16 h-16 text-emerald-600 mx-auto"
                aria-hidden="true"
              />
              <h3 className="text-2xl font-bold text-emerald-950">
                Demo Request Received!
              </h3>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. A WCAGify
                digital accessibility architect will contact you at{" "}
                <strong>{formData.email}</strong> to set up your tailored
                transformation demo.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      orgType: "enterprise",
                      assetScope: "all",
                      details: "",
                    });
                    setLiveAnnouncement("Form reset.");
                  }}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 outline-none"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-bold text-slate-900"
                >
                  Full Name{" "}
                  <span className="text-rose-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  aria-required="true"
                  aria-describedby={
                    errors.fullName ? "fullName-error" : "fullName-help"
                  }
                  aria-invalid={!!errors.fullName}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border text-slate-900 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none ${
                    errors.fullName
                      ? "border-rose-500 bg-rose-50/20"
                      : "border-slate-300"
                  }`}
                  placeholder="e.g. Eleanor Vance"
                />
                <span
                  id="fullName-help"
                  className="text-xs text-slate-700 font-medium block"
                >
                  Your primary contact name for scheduling.
                </span>
                {errors.fullName && (
                  <span
                    id="fullName-error"
                    role="alert"
                    className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {errors.fullName}
                  </span>
                )}
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-900"
                >
                  Work Email Address{" "}
                  <span className="text-rose-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                  aria-invalid={!!errors.email}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border text-slate-900 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none ${
                    errors.email
                      ? "border-rose-500 bg-rose-50/20"
                      : "border-slate-300"
                  }`}
                  placeholder="eleanor@organization.gov"
                />
                <span
                  id="email-help"
                  className="text-xs text-slate-700 font-medium block"
                >
                  Please use your corporate, government, or institutional email.
                </span>
                {errors.email && (
                  <span
                    id="email-error"
                    role="alert"
                    className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Organization Type & Asset Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="orgType"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Organization Type
                  </label>
                  <select
                    id="orgType"
                    name="orgType"
                    value={formData.orgType}
                    onChange={(e) =>
                      setFormData({ ...formData, orgType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
                  >
                    <option value="enterprise">
                      Enterprise SaaS / Tech Company
                    </option>
                    <option value="government">
                      Government / Public Sector Entity
                    </option>
                    <option value="publishing">
                      Publishing House / Media Group
                    </option>
                    <option value="education">
                      Higher Education / Academic Institution
                    </option>
                    <option value="healthcare">
                      Healthcare / Financial Services
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="assetScope"
                    className="block text-sm font-bold text-slate-900"
                  >
                    Primary Digital Asset Focus
                  </label>
                  <select
                    id="assetScope"
                    name="assetScope"
                    value={formData.assetScope}
                    onChange={(e) =>
                      setFormData({ ...formData, assetScope: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none"
                  >
                    <option value="all">
                      Universal (Web, PDFs, EPUB, Docs)
                    </option>
                    <option value="web">Websites & SaaS Web Apps</option>
                    <option value="pdfs">
                      Enterprise Tagged PDFs (PDF/UA)
                    </option>
                    <option value="epub">EPUB 3 E-Books & Journals</option>
                    <option value="knowledge">
                      Internal Knowledge Portals
                    </option>
                  </select>
                </div>
              </div>

              {/* Project Volume Details */}
              <div className="space-y-1.5">
                <label
                  htmlFor="details"
                  className="block text-sm font-bold text-slate-900"
                >
                  Asset Volume & Remediation Timeline{" "}
                  <span className="text-rose-600" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  aria-required="true"
                  aria-describedby={
                    errors.details ? "details-error" : "details-help"
                  }
                  aria-invalid={!!errors.details}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg border text-slate-900 bg-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none ${
                    errors.details
                      ? "border-rose-500 bg-rose-50/20"
                      : "border-slate-300"
                  }`}
                  placeholder="e.g. We have ~5,000 untagged annual PDFs and a Next.js web portal that needs EAA EN 301 549 compliance by Q2..."
                />
                <span
                  id="details-help"
                  className="text-xs text-slate-700 font-medium block"
                >
                  Helps our engineers prepare relevant live transformation
                  samples for your demo.
                </span>
                {errors.details && (
                  <span
                    id="details-error"
                    role="alert"
                    className="text-xs font-bold text-rose-600 flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    {errors.details}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 outline-none flex items-center justify-center gap-2 group"
                >
                  Submit Demo Request
                  <Send
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
