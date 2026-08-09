import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { WebVitals } from "@/components/web-vitals";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Rupak Acharya",
  description:
    "This is a portfolio website of Rupak Acharya; developer, computer science enthusiast.",
  alternates: {
    canonical: "https://rupakacharya.com.np",
  },
  openGraph: {
    type: "website",
    locale: "en",
    url: "https://rupakacharya.com.np",
    title: "Rupak Acharya",
    description:
      "Hi there, I'm Rupak. I'm a computer science engineer and a full time programmer. I like to learn about things & code. Et tu? 🙂",
    images: ["https://rupakacharya.com.np/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@acharyarupak391",
    creator: "@acharyarupak391",
    title: "Rupak Acharya",
    description:
      "Hi there, I'm Rupak. I'm a computer science engineer and a full time programmer. I like to learn about things & code. Et tu? 🙂",
    images: ["https://rupakacharya.com.np/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <WebVitals />

        {children}

        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""}
        />
      </body>
    </html>
  );
}
