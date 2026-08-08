// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
// import WcagifyWidget from "./components/accessibility-widget/WcagifyWidget";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wcagify.ai"),
  title: "WCAGify.ai — One Platform. Universal Accessibility.",
  description:
    "WCAGify is building the AI infrastructure for digital accessibility across Web, Documents, Publishing, and Enterprise Knowledge. Reconstructing accessibility directly at the source.",
  alternates: {
    canonical: "https://wcagify.ai",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    title: "WCAGify.ai — One Platform. Universal Accessibility.",
    description:
      "Native source-level remediation for websites, enterprise PDFs, EPUB3 publications, and knowledge bases.",
    url: "https://wcagify.ai",
    images: [{ url: "/logo.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCAGify.ai — One Platform. Universal Accessibility.",
    description:
      "Native source-level remediation for websites, enterprise PDFs, EPUB3 publications, and knowledge bases.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://wcagify.ai/#organization",
        name: "WCAGify.ai",
        url: "https://wcagify.ai",
        logo: "https://wcagify.ai/logo.svg",
        slogan: "One Platform. Universal Accessibility.",
        description:
          "WCAGify is building the AI infrastructure for digital accessibility, reconstructing accessibility directly within digital assets at the source level.",
      },
      {
        "@type": "SoftwareApplication",
        name: "WCAGify Accessibility Engine",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        description:
          "AI-powered native accessibility transformation engine for Web, Tagged PDF/UA, EPUB 3, and Enterprise Knowledge Systems.",
        complianceCode: [
          "WCAG 2.2 Level AA",
          "EAA EN 301 549",
          "US ADA Title II",
          "Section 508",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          src="https://wcagify-widget.s3.ap-south-1.amazonaws.com/wcagify-1.0.0.min.js"
          defer={true}
          data-wcagify-root=""
        />
      </head>
      <body
        className={`${inter.className} ${inter.variable} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        {/* <WcagifyWidget /> */}
      </body>
    </html>
  );
}
