import type { Metadata } from "next";

const TITLE = "PeerFit v1";
const DESCRIPTION =
  "The original PeerFit — a sports matchmaking platform built from scratch in PHP and MySQL. The foundation the v2 React rebuild was designed to outgrow.";
const URL = "/peerfitv1";
const IMAGE = "/images/projects/peerfit-v1/landing.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "PeerFit v1 landing page" }],
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
