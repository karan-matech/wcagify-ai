import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import WcagifyWidget from "./components/accessibility-widget/WcagifyWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "WCAGify.ai",
  description:
    "Native AI Accessibility Remediation for Websites, PDFs, EPUBs, and Enterprise Documents",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased`}
      >
        {children}
      </body>
      <WcagifyWidget />
    </html>
  );
}
