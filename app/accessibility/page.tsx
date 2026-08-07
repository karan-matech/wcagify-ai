import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Globe,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

export const metadata = {
  title: "Accessibility Statement - WCAGify.ai",
  description:
    "WCAGify.ai is committed to making its digital products and services accessible, including the WCAGify.ai website, platform, and documentation.",
};

export default function AccessibilityStatementPage() {
  const complianceStandards = [
    {
      name: "WCAG 2.2 Level AA",
      description:
        "Web Content Accessibility Guidelines 2.2 Level AA - The international standard for web accessibility.",
      icon: <Globe className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "European Accessibility Act (EN 301 549)",
      description:
        "EU regulation mandating accessibility for products and services in the European market.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "US ADA Title II & Section 508",
      description:
        "Americans with Disabilities Act and Section 508 of the Rehabilitation Act for US public entities.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "ISO 14289-1 PDF/UA",
      description:
        "International standard for accessible PDF/UA tagged documents.",
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "EPUB 3 Accessibility",
      description:
        "Accessibility requirements for EPUB 3 digital publications.",
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
    },
  ];

  // const accessibilityPrinciples = [
  //   {
  //     title: "Perceivable",
  //     description:
  //       "Information and user interface components must be presentable to users in ways they can perceive.",
  //     icon: <Eye className="w-4 h-4 text-emerald-600" />,
  //   },
  //   {
  //     title: "Operable",
  //     description: "User interface components and navigation must be operable.",
  //     icon: <Keyboard className="w-4 h-4 text-emerald-600" />,
  //   },
  //   {
  //     title: "Understandable",
  //     description:
  //       "Information and the operation of user interface must be understandable.",
  //     icon: <Brain className="w-4 h-4 text-emerald-600" />,
  //   },
  //   {
  //     title: "Robust",
  //     description:
  //       "Content must be robust enough that it can be interpreted reliably by a wide variety of user agents.",
  //     icon: <Settings className="w-4 h-4 text-emerald-600" />,
  //   },
  // ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <ShieldCheck
              className="w-3.5 h-3.5 text-emerald-600"
              aria-hidden="true"
            />
            Accessibility Statement
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            WCAGify.ai Accessibility Statement
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            WCAGify.ai is committed to making its digital products and services
            accessible, including the WCAGify.ai website, platform, and
            documentation.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck
              className="w-6 h-6 text-indigo-600"
              aria-hidden="true"
            />
            Our Commitment
          </h2>
          <div className="text-slate-700 leading-relaxed space-y-4">
            <p>
              WCAGify.ai is committed to ensuring digital accessibility for our
              products and services, including our website, platform, and
              documentation. We are actively working to improve the
              accessibility of our digital content and services.
            </p>
            <p>
              This statement applies to all WCAGify.ai digital properties,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
              <li>wcagify.ai website and blog</li>
              <li>WCAGify.ai platform dashboard and documentation</li>
              <li>Developer APIs and integration guides</li>
              <li>Marketing materials and presentations</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckCircle2
              className="w-6 h-6 text-emerald-600"
              aria-hidden="true"
            />
            Compliance Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceStandards.map((standard, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0">
                    {standard.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {standard.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {standard.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <AlertTriangle
              className="w-6 h-6 text-amber-600"
              aria-hidden="true"
            />
            Our Approach
          </h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            WCAGify.ai is built from the ground up with accessibility as a core
            principle. We use native source remediation rather than overlays to
            ensure true accessibility.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">
                Native Source Remediation
              </h3>
              <p className="text-sm text-emerald-800">
                We reconstruct accessibility directly into the source code, DOM
                structure, and tag trees rather than masking problems with
                surface-level overlays.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-2">
                Fail-Closed Build Gatekeeper
              </h3>
              <p className="text-sm text-indigo-800">
                Our CI/CD pipeline automatically halts non-compliant builds,
                ensuring accessibility is never compromised in production.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle
              className="w-6 h-6 text-rose-600"
              aria-hidden="true"
            />
            Feedback & Contact
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We welcome your feedback on the accessibility of WCAGify.ai. If you
            encounter accessibility barriers, please let us know.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-800">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:accessibility@wcagify.ai"
                className="text-indigo-600 hover:underline"
              >
                accessibility@wcagify.ai
              </a>
            </p>
            <p className="text-sm text-slate-800 mt-2">
              <strong>Response Time:</strong> Within 2 business days
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
