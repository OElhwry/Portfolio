import type { Metadata } from "next";

const TITLE = "Aphelion";
const DESCRIPTION =
  "A cinematic interactive solar system. Scroll-driven storytelling, animated planet exploration, NASA imagery, and an integrated quiz.";
const URL = "/aphelion";
const IMAGE = "/images/projects/Aphelion/landingPage.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "Aphelion landing page" }],
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
