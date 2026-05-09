import type { Metadata } from "next";

const TITLE = "Deadcenter";
const DESCRIPTION =
  "A fast, minimal precision timing game with one rule: stop the dot. Twenty hand-designed levels across four difficulty tiers, with synth audio.";
const URL = "/deadcenter";
const IMAGE = "/images/projects/deadcenter/landingPage.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "Deadcenter landing page" }],
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
