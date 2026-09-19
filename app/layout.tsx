// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import Script from "next/script";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101831",
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
      { url: "/assets/brand/wcagify.svg", type: "image/svg+xml" },
      { url: "/assets/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/brand/favicon.ico" },
    ],
    shortcut: "/assets/brand/favicon.ico",
    apple: "/assets/brand/apple-touch-icon.png",
  },
  manifest: "/assets/brand/site.webmanifest",
  openGraph: {
    type: "website",
    title: "WCAGify.ai — One Platform. Universal Accessibility.",
    description:
      "Native source-level remediation for websites, enterprise PDFs, EPUB3 publications, and knowledge bases.",
    url: "https://wcagify.ai",
    images: [{ url: "/assets/brand/wcagify.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WCAGify.ai — One Platform. Universal Accessibility.",
    description:
      "Native source-level remediation for websites, enterprise PDFs, EPUB3 publications, and knowledge bases.",
    images: ["/assets/brand/wcagify.svg"],
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
        logo: "https://wcagify.ai/assets/brand/wcagify.svg",
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
    <html
      lang="en"
      className={`scroll-smooth ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://wcagify-widget.s3.ap-south-1.amazonaws.com/wcagify-1.0.0.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
