import type { Metadata } from "next";

const TITLE = "SplidIt";
const DESCRIPTION =
  "A no-friction expense splitter that finds the smallest set of transfers to settle up. Runs offline, no signup.";
const URL = "/splidit";
const IMAGE = "/images/projects/Splidit/landingPage.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "SplidIt landing page" }],
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
