import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/fira-code/400.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
  title: "Omar El Hawary",
  description: "Portfolio of Omar El Hawary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Fonts CDN (static export safe) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Fira+Code:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased font-sans bg-slate-900 text-slate-400 selection:bg-teal-300 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
