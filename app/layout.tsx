import type { Metadata, Viewport } from "next";
import { Inter_Tight, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GrainOverlay } from "@/components/portfolio/grain-overlay";
import { profile } from "@/data/portfolio";

const inter = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://rupakacharya.com.np";
const siteTitle = "Rupak Acharya — Full-Stack & Web3 Engineer";
const siteDescription =
  "Senior full-stack web developer with 4+ years building React, Next.js, Node.js, and Web3 platforms. Currently senior frontend developer at Bivo, building creator-focused CRM, and frontend & Web3 developer at Minestarters.";
const socialImage = `${siteUrl}/og.jpg`;
const socialImageAlt = "Rupak Acharya — Full-Stack & Web3 Engineer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f1ed" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e10" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s — Rupak Acharya",
  },
  description: siteDescription,
  keywords: [
    "Rupak Acharya",
    "Full Stack Developer",
    "Web3 Developer",
    "React Developer",
    "Next.js Developer",
    "Smart Contracts",
    "Solidity",
    "Kathmandu",
    "Nepal",
    "Frontend Engineer",
  ],
  applicationName: "Rupak Acharya Portfolio",
  category: "technology",
  classification: "Personal portfolio and professional profile",
  authors: [{ name: "Rupak Acharya", url: siteUrl }],
  creator: "Rupak Acharya",
  publisher: "Rupak Acharya",
  alternates: {
    canonical: siteUrl,
    languages: { "en-US": siteUrl },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Rupak Acharya — Portfolio",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@acharyarupak391",
    creator: "@acharyarupak391",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: socialImage, alt: socialImageAlt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml", sizes: "512x512" },
    ],
    shortcut: ["/favicon.svg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: siteUrl,
      image: `${siteUrl}/profile.png`,
      jobTitle: profile.role,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kathmandu",
        addressCountry: "NP",
      },
      description: siteDescription,
      sameAs: [profile.githubUrl, profile.linkedinUrl],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Web3",
        "Solidity",
        "Smart Contracts",
        "Machine Learning",
        "Python",
        "Golang",
      ],
      worksFor: [
        { "@type": "Organization", name: "Bivo" },
        { "@type": "Organization", name: "Minestarters" },
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Malla Reddy College of Engineering & Technology",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${display.variable} ${mono.variable} antialiased bg-canvas text-ink`}
      >
        <GrainOverlay />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-surface-deep focus:text-ink-inverse focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
