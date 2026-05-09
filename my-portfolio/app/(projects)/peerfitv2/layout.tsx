import type { Metadata } from "next";

const TITLE = "PeerFit v2";
const DESCRIPTION =
  "A social sports platform built with Next.js 15, Supabase, and TypeScript. Find local pickup games, build a player profile, and connect with people who play.";
const URL = "/peerfitv2";
const IMAGE = "/images/projects/peerfit-v2/landingPage.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "PeerFit v2 landing page" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  alternates: { canonical: URL },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
