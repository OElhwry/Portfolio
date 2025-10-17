"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaticImageData } from "next/image"

import peerfitV2 from "../../public/peerfitv2.png";
import peerfitV2Feed from "../../public/peerfitv2feed.png";
import peerfitV2Feed2 from "../../public/peerfitv2feed2.png";
import peerfitV2Login from "../../public/peerfitv2login.png";
import peerfitV2Profile from "../../public/peerfitv2profile.png";
import peerfitV2Settings from "../../public/peerfitv2settings.png";
import peerfitV2Signup from "../../public/peerfitv2signup.png";
import peerfitV1Preview from "../../public/peerfitv1.png"; // for evolution compare

type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
  w?: number;
  h?: number;
};

const SCREENSHOTS: Screenshot[] = [
  { src: peerfitV2, alt: "PeerFit v2 - landing", caption: "Landing / Browse" },
  { src: peerfitV2Feed, alt: "PeerFit v2 - feed", caption: "Logged-in Feed" },
  { src: peerfitV2Feed2, alt: "PeerFit v2 - feed scrolled", caption: "Feed — Features" },
  { src: peerfitV2Login, alt: "PeerFit v2 - login", caption: "Auth (Login)" },
  { src: peerfitV2Signup, alt: "PeerFit v2 - signup", caption: "Auth (Signup)" },
  { src: peerfitV2Profile, alt: "PeerFit v2 - profile", caption: "Profile" },
  { src: peerfitV2Settings, alt: "PeerFit v2 - settings", caption: "Settings" },
];


export default function PortfolioPage() {
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState("about");

    const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Track mouse for glow effect
    useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
    }, []);

    // Track scroll position to highlight active section
    useEffect(() => {
    const sections = ["about", "images", "evolution"];
    sections.forEach((id) => {
        sectionsRef.current[id] = document.getElementById(id);
    });
    
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            }
        });
        },
        { rootMargin: "-50% 0px -50% 0px" } // triggers when section center enters view
    );

    sections.forEach((id) => {
      const el = sectionsRef.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // keyboard navigation for lightbox
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
        if (openIndex === null) return;
        if (e.key === "Escape") setOpenIndex(null);
        if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
        if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openIndex]);

    // helper to open modal
    const openLightbox = (index: number) => setOpenIndex(index);

    return (
    <main className="relative bg-slate-900 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
        <div className="fixed top-6 left-6 z-50">
        <Link
        href="/"
        className="text-sm font-medium text-slate-400 hover:text-teal-300 transition"
        >
        ← Back to Portfolio
        </Link>
        </div>
        {/* Cursor glow */}
        <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
            background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">
        {/* LEFT PANEL */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
            <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">Peerfit v2</a>
            </h1>
            <h2 className="mt-3 text-lg font-medium text-slate-200 sm:text-xl">
                Turning ‘we’re one short’ into ‘game on.’
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
                A social sports platform for finding partners and filling teams in your area
            , redesigned from the ground up with real-time updates, sleek UI, and code that doesn’t miss its shot.
            </p>
        
                <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap gap-2 max-w-xs"
            >
            {["React", "TypeScript", "Tailwind", "Supabase"].map((tech) => (
                <div
                key={tech}
                className="px-3 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5 text-xs text-slate-100 inline-flex items-center gap-2 shadow-[0_6px_18px_rgba(0,245,160,0.03)] hover:scale-[1.02] transition"
                >
                <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                    background:
                        tech === "React"
                        ? "#61dafb"
                        : tech === "TypeScript"
                        ? "#3178c6"
                        : tech === "Tailwind"
                        ? "#06b6d4"
                        : "#00F5A0",
                    }}
                />
                <span className="font-medium">{tech}</span>
                </div>
            ))}
            </motion.div>


            {/* Navigation */}
            <nav className="mt-16 hidden lg:block" aria-label="Main sections">
                <ul className="space-y-2">
                {["about", "images", "evolution"].map((id) => {
                    const label = id.charAt(0).toUpperCase() + id.slice(1);
                    const active = activeSection === id;
                    return (
                    <li key={id}>
                        <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 ${
                            active ? "text-slate-200" : "text-slate-500"
                        }`}
                        >
                        <span
                            className={`mr-4 h-px transition-all ${
                            active
                                ? "w-16 bg-slate-200"
                                : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200"
                            }`}
                        />
                        <span
                            className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            active ? "text-slate-200" : "group-hover:text-slate-200"
                            }`}
                        >
                            {label}
                        </span>
                        </a>
                    </li>
                    );
                })}
                </ul>
            </nav>
            </div>
        </header>  

        {/* RIGHT PANEL */}
        <div className="mt-8 lg:mt-0 lg:w-2/3">
          {/* ABOUT */}
          <motion.section id="about" className="mb-20 scroll-mt-24" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="mt-4 max-w-3xl text-slate-300 space-y-4">
              <p>
                PeerFit v2 is a modern social fitness platform — built for connections and momentum. I rebuilt the product to be realtime, resilient, and delightful: Supabase handles auth, storage, and DB; React + TypeScript enable component-driven features; Tailwind provides consistent, responsive styling.
              </p>
              <p>
                The product focuses on discoverability (nearby activities), lightweight groups, and a low-friction sign-up/engagement loop — with realtime updates so users see activity as it happens.
              </p>
            </div>
          </motion.section>

          {/* IMAGES - Masonry Grid + Lightbox */}
          <motion.section id="images" className="mb-20 scroll-mt-24" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

            {/* masonry via CSS columns */}
            <div className="mt-6 -mx-2">
              <div className="px-2 columns-1 sm:columns-2 md:columns-3 gap-4 [column-gap:1rem]">
                {SCREENSHOTS.map((s, i) => (
                  <div key={i} className="mb-4 break-inside-avoid transform-gpu transition-all duration-300 hover:scale-[1.02]">
                    <button
                      onClick={() => openLightbox(i)}
                      aria-label={`Open ${s.caption}`}
                      className="group w-full block rounded-xl overflow-hidden border border-white/6 shadow-[0_8px_20px_rgba(0,245,160,0.03)]"
                      style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))" }}
                    >
                      {/* device mock frame */}
                      <div className="relative">
                        <div className="absolute left-3 top-3 w-10 h-6 rounded-md bg-black/20 blur-sm opacity-30 pointer-events-none" />
                        <Image src={s.src} alt={s.alt} className="w-full h-auto object-cover rounded-xl" />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-teal-300/30 transition" />
                      </div>
                      <div className="px-3 py-2 bg-gradient-to-t from-transparent to-white/2 text-left">
                        <div className="text-xs text-slate-200 font-medium">{s.caption}</div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500">Click any image to enlarge. Use ← → to navigate, Esc to close.</p>
          </motion.section>

          {/* EVOLUTION */}
          <motion.section id="evolution" className="mb-20 scroll-mt-24" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* left: bullets */}
              <div className="space-y-4">
                {[
                  { title: "Architecture", body: "Monolith → Component-driven client app, modular APIs via Supabase." },
                  { title: "Realtime", body: "Database and feed updates in realtime — users see posts & RSVPs instantly." },
                  { title: "UX & Accessibility", body: "Cleaner flows, fewer clicks to create/join events, and improved keyboard support." },
                  { title: "Deployment", body: "Local XAMPP → Cloud-hosted with CI & global CDN." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="mt-1 shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-cyan-300 flex items-center justify-center text-black font-bold">✓</div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{item.title}</div>
                      <div className="text-sm text-slate-300">{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* right: visual compare (v1 blurred -> v2 crisp) */}
              <div className="relative rounded-xl overflow-hidden border border-white/6 bg-white/2 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 pointer-events-none" />
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative overflow-hidden rounded-lg border border-white/4">
                    <Image src={peerfitV1Preview} alt="PeerFit v1 preview" className="object-cover w-full h-40 filter grayscale contrast-90 opacity-80" />
                    <div className="absolute left-3 top-3 text-xs px-2 py-1 rounded bg-black/40 text-white">v1 — nostalgia</div>
                  </div>
                  <div className="relative overflow-hidden rounded-lg border border-white/4">
                    <Image src={peerfitV2} alt="PeerFit v2 preview" className="object-cover w-full h-40" />
                    <div className="absolute left-3 top-3 text-xs px-2 py-1 rounded bg-teal-600/20 text-teal-200">v2 — evolution</div>
                  </div>
                </div>
                <div className="p-3 text-sm text-slate-300">
                  A visual metaphor: the left is intentionally nostalgic (soft, muted), while the right is crisp, interactive, and built for modern usage.
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            onClick={() => setOpenIndex(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              className="relative z-50 max-w-[1100px] w-full rounded-2xl overflow-hidden"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on inner click
            >
              <div className="bg-[#03121a] p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-slate-100">Preview</div>
                  <div className="text-xs text-slate-400"> — {SCREENSHOTS[openIndex].caption}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous"
                    onClick={() => setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length))}
                    className="rounded-md px-3 py-1 bg-white/5 text-slate-200 hover:bg-white/6 transition"
                  >
                    ←
                  </button>
                  <button
                    aria-label="Next"
                    onClick={() => setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length))}
                    className="rounded-md px-3 py-1 bg-white/5 text-slate-200 hover:bg-white/6 transition"
                  >
                    →
                  </button>
                  <button
                    aria-label="Close"
                    onClick={() => setOpenIndex(null)}
                    className="rounded-md px-3 py-1 bg-white/5 text-slate-200 hover:bg-white/6 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="bg-[#04171e] p-6 flex items-center justify-center">
                <Image src={SCREENSHOTS[openIndex].src} alt={SCREENSHOTS[openIndex].alt} className="object-contain max-h-[75vh] w-auto" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes bgShift {
          0% { transform: translate3d(0,0,0) }
          50% { transform: translate3d(-5%, 2%, 0) }
          100% { transform: translate3d(0,0,0) }
        }
        @keyframes bgShift2 {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        @keyframes bgShift3 {
          0% { transform: translateY(0px) }
          50% { transform: translateY(-20px) }
          100% { transform: translateY(0px) }
        }
        /* animate the radial ambient layer */
        .animate-[bgShift_16s_linear_infinite] {
          animation: bgShift2 20s linear infinite;
          background-size: 400% 400%;
        }
        /* Accessibility: reduced motion respect */
        @media (prefers-reduced-motion: reduce) {
          .animate-[bgShift_16s_linear_infinite] { animation: none; }
        }
      `}</style>
    </main>
  );
}
    