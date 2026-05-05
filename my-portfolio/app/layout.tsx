import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";  
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const SITE_URL = "https://oelhawary.com";
const SITE_TITLE = "Omar El Hawary | Software Developer";
const SITE_DESCRIPTION =
  "Software developer based in London. Building polished digital products with React, Next.js, and TypeScript. Explore selected projects and get in touch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Omar El Hawary",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Omar El Hawary",
  authors: [{ name: "Omar El Hawary" }],
  creator: "Omar El Hawary",
  keywords: [
    "Omar El Hawary",
    "software developer",
    "front-end developer",
    "full-stack developer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Supabase",
    "London developer",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Omar El Hawary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
