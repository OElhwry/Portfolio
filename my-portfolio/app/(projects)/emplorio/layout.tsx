import type { Metadata } from "next";

const TITLE = "Emplorio";
const DESCRIPTION =
  "A Manifest V3 Chrome extension that auto-fills job applications across nine major ATS platforms and drafts tailored cover letters with Claude.";
const URL = "/emplorio";
const IMAGE = "/images/projects/emplorio/signup_login.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Omar El Hawary`,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: IMAGE, alt: "Emplorio sign-in screen" }],
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
