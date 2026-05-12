import type { Metadata } from "next";
import { Orbitron, Playfair_Display } from "next/font/google";

// Two fonts the live aphelion.website actually uses, exposed as CSS variables
// scoped to this page only:
//   - Playfair Display: editorial serif for the "Aphelion" wordmark + section headings
//   - Orbitron: technical / HUD labels (counters, eyebrows, planet stat readouts)
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

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
  return (
    <div className={`${orbitron.variable} ${playfair.variable}`}>
      {children}
    </div>
  );
}
