"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProjectThumbnail from "@/components/ProjectThumbnail";
import {
  BackgroundAurora,
  BackgroundVideo,
  BG_VIDEOS,
  CursorConstellation,
  CursorCrosshair,
  CursorEcho,
  CursorGoo,
  CursorRipple,
  CursorSpotlight,
  CursorTrail,
  type BackgroundEffect,
  type CursorEffect,
} from "@/components/LabEffects";

const LAB_EFFECTS: {
  id: CursorEffect | BackgroundEffect;
  kind: "cursor" | "background";
  title: string;
  description: string;
}[] = [
  { id: "constellation",  kind: "cursor",     title: "Constellation",description: "Click to draw stars" },
  { id: "crosshair",      kind: "cursor",     title: "Crosshair",    description: "Live x,y readout" },
  { id: "goo",            kind: "cursor",     title: "Mercury",      description: "Gooey trail" },
  { id: "ripple",         kind: "cursor",     title: "Ripple",       description: "Water rings on click" },
  { id: "echo",           kind: "cursor",     title: "Echo",         description: "Click for a word" },
  { id: "trail",          kind: "cursor",     title: "Comet",        description: "Pointer trail" },
  { id: "spotlight",      kind: "cursor",     title: "Spotlight",    description: "Dim outside cursor" },
  { id: "aurora",         kind: "background", title: "Aurora",       description: "Drifting blobs" },
  { id: "space",          kind: "background", title: "Nebula",       description: "Deep space" },
  { id: "solar",          kind: "background", title: "Orbits",       description: "Solar system" },
  { id: "earthblackhole", kind: "background", title: "Event horizon",description: "Earth & black hole" },
  { id: "particle",       kind: "background", title: "Quanta",       description: "Drifting particles" },
  { id: "grasssky",       kind: "background", title: "Meadow",       description: "Grass under sky" },
  { id: "cityskyline",    kind: "background", title: "Skyline",      description: "Painted dusk" },
  { id: "wildwest",       kind: "background", title: "Frontier",     description: "Desert horizon" },
];

const PROJECTS = [
  {
    href: "/emplorio",
    title: "Emplorio",
    eyebrow: "Chrome extension",
    description:
      "Apply once, send everywhere. A Manifest V3 Chrome extension that auto-fills job applications across nine major ATS platforms — Greenhouse, Lever, Workday, Ashby, LinkedIn, and more — and drafts tailored cover letters, answers, and follow-ups with Claude. Bring-your-own API key, EU-only data, no telemetry. Live at emplorio.co.uk.",
    tags: ["TypeScript", "Next.js 15", "Fastify", "Claude API"],
    thumbnail: "emplorio" as const,
    accentHover: "group-hover:text-violet-300",
    tagColor: "bg-violet-400/10 text-violet-300 border border-violet-400/20",
  },
  {
    href: "/peerfitv2",
    title: "PeerFit v2",
    eyebrow: "Flagship project",
    description:
      "A social sports platform that connects nearby players for pickup games across 15+ activities. Post a session, find teammates, build reliability through peer ratings, and let the app handle the coordination. Full production build on Next.js 15 with Supabase auth, SSR sessions, and a numbered, editorial landing page. Live at peerfit.co.uk.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Tailwind 4"],
    thumbnail: "peerfitV2" as const,
    accentHover: "group-hover:text-teal-300",
    tagColor: "bg-teal-400/10 text-teal-300 border border-teal-400/20",
  },
  {
    href: "/aphelion",
    title: "Aphelion",
    eyebrow: "Interactive",
    description:
      "A cinematic interactive solar system. Scroll driven storytelling, animated planet exploration, Mars imagery, and an integrated quiz, all in a clean visual first interface. Live at aphelion.website.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    thumbnail: "aphelion" as const,
    accentHover: "group-hover:text-sky-300",
    tagColor: "bg-sky-400/10 text-sky-300 border border-sky-400/20",
  },
  {
    href: "/deadcenter",
    title: "Deadcenter",
    eyebrow: "Browser game",
    description:
      "A fast, minimal precision timing game with one rule. Stop the dot. Twenty hand designed levels across four difficulty tiers layer in bounces, orbits, escalating patterns, and synth audio that turns a single mechanic into something genuinely brutal. Live at deadcenter.fun.",
    tags: ["React 19", "JavaScript", "Vite 8", "Web Audio API"],
    thumbnail: "deadcenter" as const,
    accentHover: "group-hover:text-orange-300",
    tagColor: "bg-orange-400/10 text-orange-300 border border-orange-400/20",
  },
  {
    href: "/splidit",
    title: "SplidIt",
    eyebrow: "Utility",
    description:
      "A no friction expense splitter built for the moment the waiter brings the card machine. Enter who spent what, pick equal or custom splits, and it works out the smallest set of transfers to settle up. Runs offline, no signup. Live at splidit.co.uk.",
    tags: ["React 19", "Vite", "Lucide React", "html2canvas"],
    thumbnail: "splidit" as const,
    accentHover: "group-hover:text-emerald-300",
    tagColor: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20",
  },
  {
    href: "/peerfitv1",
    title: "PeerFit v1",
    eyebrow: "Origin",
    description:
      "The original version of PeerFit, built with PHP and MySQL on XAMPP. It proved the concept of accounts, activity posts, and basic matching, and became the foundation the v2 React rebuild was designed to outgrow.",
    tags: ["PHP", "MySQL", "JavaScript", "XAMPP"],
    thumbnail: "peerfitV1" as const,
    accentHover: "group-hover:text-amber-300",
    tagColor: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  },
];

const LAB_TIPS: Partial<Record<CursorEffect, string>> = {
  constellation: "Click anywhere to drop a star.",
  echo: "Click anywhere to leave a word.",
};

const LAB_FADE_UP = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LAB_CHIP = {
  hidden: { opacity: 0, y: 8, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function LabChip({
  title,
  description,
  active,
  onClick,
}: {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={description}
      className="group relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400/60"
      style={{
        background: active
          ? "rgba(129,140,248,0.12)"
          : "rgba(15,18,36,0.55)",
        border: active
          ? "1px solid rgba(129,140,248,0.55)"
          : "1px solid rgba(99,102,241,0.18)",
        color: active ? "rgb(199,210,254)" : "rgb(203,213,225)",
        boxShadow: active
          ? "inset 0 0 0 1px rgba(129,140,248,0.10), 0 0 18px -6px rgba(129,140,248,0.45)"
          : "none",
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full transition"
        style={{
          background: active ? "rgb(165,180,252)" : "rgb(71,85,105)",
          boxShadow: active ? "0 0 8px rgba(129,140,248,0.8)" : "none",
        }}
      />
      <span className="leading-none tracking-wide">{title}</span>
      <span
        className="text-[10px] uppercase tracking-[0.18em] transition"
        style={{ color: active ? "rgb(129,140,248)" : "rgb(100,116,139)" }}
      >
        {active ? "on" : "off"}
      </span>
    </button>
  );
}

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const EMAIL = "omar@oelhawary.com";

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [copied, setCopied] = useState(false);
  const [activeCursorFx, setActiveCursorFx] = useState<CursorEffect | null>(null);
  const [activeBgFx, setActiveBgFx] = useState<BackgroundEffect | null>(null);
  const [activeTip, setActiveTip] = useState<string | null>(null);

  useEffect(() => {
    const tip = activeCursorFx ? LAB_TIPS[activeCursorFx] : null;
    if (!tip) {
      setActiveTip(null);
      return;
    }
    setActiveTip(tip);
    const t = setTimeout(() => setActiveTip(null), 4500);
    return () => clearTimeout(t);
  }, [activeCursorFx]);

  const toggleLab = (effect: (typeof LAB_EFFECTS)[number]) => {
    if (effect.kind === "cursor") {
      setActiveCursorFx((curr) =>
        curr === effect.id ? null : (effect.id as CursorEffect)
      );
    } else {
      setActiveBgFx((curr) =>
        curr === effect.id ? null : (effect.id as BackgroundEffect)
      );
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    // Skip the cursor-glow listener on touch devices and when reduced motion is preferred
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "projects"];
    sections.forEach((id) => {
      sectionsRef.current[id] = document.getElementById(id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = sectionsRef.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-sky-300 selection:text-slate-900"
      style={{
        background: "#070a12",
      }}
    >
      {/* Default backgrounds — replaced by Lab background effects when active */}
      {activeBgFx === null && (
        <>
          {/* Aurora orbs — indigo/violet, distinct from project pages */}
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
              background: `
                radial-gradient(60% 45% at 85% 8%, rgba(129,140,248,0.16) 0%, transparent 70%),
                radial-gradient(50% 40% at 8% 92%, rgba(14,165,233,0.10) 0%, transparent 70%),
                radial-gradient(40% 35% at 50% 50%, rgba(167,139,250,0.05) 0%, transparent 80%)
              `,
            }}
          />

          {/* Fine dot field (replaces the grid) */}
          <div
            className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(148,163,184,0.22) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 90% 70% at 50% 40%, #000 50%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 70% at 50% 40%, #000 50%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Lab background effects */}
      {activeBgFx === "aurora" && <BackgroundAurora />}
      {activeBgFx && activeBgFx !== "aurora" && (
        <BackgroundVideo src={BG_VIDEOS[activeBgFx]} />
      )}

      {/* Film grain */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG, backgroundSize: "240px 240px" }}
      />

      {/* Default cursor spotlight — replaced by Lab cursor effects when active */}
      {activeCursorFx === null && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition duration-500"
          style={{
            background: `radial-gradient(520px at ${cursor.x}px ${cursor.y}px, rgba(165,180,252,0.07), transparent 75%)`,
          }}
        />
      )}

      {/* Lab cursor effects */}
      {activeCursorFx === "trail" && <CursorTrail />}
      {activeCursorFx === "spotlight" && <CursorSpotlight />}
      {activeCursorFx === "constellation" && <CursorConstellation />}
      {activeCursorFx === "crosshair" && <CursorCrosshair />}
      {activeCursorFx === "goo" && <CursorGoo />}
      {activeCursorFx === "ripple" && <CursorRipple />}
      {activeCursorFx === "echo" && <CursorEcho />}

      {/* Lab effect tip */}
      <AnimatePresence mode="wait">
        {activeTip && (
          <motion.div
            key={activeTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium text-indigo-100 backdrop-blur-md"
            style={{
              background: "rgba(15,18,36,0.78)",
              border: "1px solid rgba(129,140,248,0.4)",
              boxShadow: "0 8px 24px -8px rgba(129,140,248,0.45)",
            }}
          >
            <span
              className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-indigo-300 align-middle"
              style={{ boxShadow: "0 0 8px rgba(129,140,248,0.8)" }}
            />
            {activeTip}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vignette to anchor the page */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(3,6,14,0.7) 100%)",
        }}
      />

      {/* Mobile sticky section nav — hidden on desktop (left panel handles it there) */}
      <nav
        aria-label="Section navigation"
        className="sticky top-0 z-40 lg:hidden"
        style={{
          background: "rgba(7,10,18,0.82)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(129,140,248,0.14)",
        }}
      >
        <ul className="mx-auto flex max-w-screen-xl items-center justify-center gap-1 px-6 py-2.5">
          {["about", "experience", "projects"].map((id) => {
            const active = activeSection === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                    active
                      ? "text-indigo-200"
                      : "text-slate-500 hover:text-slate-200"
                  }`}
                  style={
                    active
                      ? {
                          background: "rgba(129,140,248,0.12)",
                          border: "1px solid rgba(129,140,248,0.32)",
                        }
                      : {
                          border: "1px solid transparent",
                        }
                  }
                >
                  {id}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 pt-8 pb-10 font-sans sm:px-6 sm:pt-10 md:px-12 md:pt-14 md:pb-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400/55">
              Portfolio · 2026
            </p>

            {/* Gradient name */}
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #c7d2fe 55%, #a5b4fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <a href="/">Omar El Hawary</a>
            </h1>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-indigo-400/70 to-transparent" />

            <h2 className="mt-4 text-lg font-mono font-medium text-indigo-200/80 sm:text-xl">
              Software Developer
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              I build digital products with a sharp eye for{" "}
              <span className="font-medium text-slate-200">usability</span>,{" "}
              <span className="font-medium text-slate-200">polish</span>, and the small
              interactions that make software feel alive.
            </p>

            {/* Status + stat pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-emerald-300"
                style={{
                  border: "1px solid rgba(16,185,129,0.25)",
                  background: "rgba(16,185,129,0.08)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
              {["London / Remote", "Junior to Mid Level"].map((stat) => (
                <span
                  key={stat}
                  className="rounded-full px-3 py-1 text-[11px] font-medium text-indigo-200/80"
                  style={{
                    border: "1px solid rgba(129,140,248,0.22)",
                    background: "rgba(129,140,248,0.06)",
                  }}
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* Section nav */}
            <nav className="mt-6 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "experience", "projects"].map((id) => {
                  const label = id.charAt(0).toUpperCase() + id.slice(1);
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-sky-300" : "text-slate-500"}`}
                      >
                        <span
                          className={`mr-4 h-px transition-all ${
                            active
                              ? "w-16 bg-sky-400"
                              : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            active ? "text-sky-300" : "group-hover:text-slate-200"
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
          </motion.div>

          {/* Social Links */}
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            aria-label="Social links"
          >
            <li>
              <a
                href="https://github.com/OElhwry"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-sky-400/35 hover:bg-sky-950/30 hover:text-sky-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/oelhawary"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-sky-400/35 hover:bg-sky-950/30 hover:text-sky-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11 19H5V9h3v10zM6.5 7.732c-.966 0-1.75-.79-1.75-1.765S5.534 4.203 6.5 4.203 8.25 4.993 8.25 5.968s-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-1.337-.027-3.062-1.865-3.062-1.865 0-2.15 1.459-2.15 2.968V19h-3V9h2.885v1.367h.041c.403-.765 1.388-1.568 2.857-1.568 3.052 0 3.617 2.009 3.617 4.626V19z" />
                </svg>
              </a>
            </li>
            <li className="relative">
              <button
                onClick={copyEmail}
                aria-label={copied ? "Copied!" : "Copy email address"}
                title={copied ? "Copied!" : EMAIL}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-indigo-400/35 hover:bg-indigo-950/30 hover:text-indigo-300"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                )}
              </button>
              {copied && (
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-medium text-emerald-300 shadow">
                  Copied!
                </span>
              )}
            </li>
            <li>
              {/* CV download — replace href with your CV file (e.g. "/omar-elhawary-cv.pdf" once placed in /public) */}
              <a
                href="/omar-elhawary-cv-software.pdf"
                target="_blank"
                rel="noreferrer"
                aria-label="Download CV"
                title="Download CV"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-indigo-400/35 hover:bg-indigo-950/30 hover:text-indigo-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </a>
            </li>
            <li className="order-last w-full sm:order-none sm:ml-auto sm:w-auto">
              <Link
                href="mailto:omar@oelhawary.com"
                className="group inline-flex w-full items-center justify-center gap-2 border border-sky-500/30 bg-sky-500/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300 backdrop-blur-sm transition hover:border-sky-400/55 hover:bg-sky-500/15 hover:text-white focus-visible:outline-none sm:w-auto sm:py-2"
                style={{ borderRadius: "3px" }}
              >
                Get in touch
                <span className="inline-block text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-400">→</span>
              </Link>
            </li>
          </motion.ul>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="space-y-16 pt-10 pb-14 md:space-y-20 md:pt-12 md:pb-20 lg:space-y-24 lg:py-24 lg:w-[54%]">

          {/* ── ABOUT ── */}
          <motion.section
            id="about"
            className="relative isolate scroll-mt-24 space-y-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="leading-relaxed text-slate-300">
              I&apos;m Omar, a London-based developer building digital products with a strong
              focus on <span className="font-medium text-slate-200">usability</span>,{" "}
              <span className="font-medium text-slate-200">polish</span>, and the interaction
              details that make software feel considered rather than assembled.
            </p>
            <p className="leading-relaxed">
              I studied{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.qmul.ac.uk/undergraduate/course-info/computer-science" target="_blank" rel="noreferrer" className="transition-colors hover:text-indigo-300">Computer Science</a>
              </span>{" "}
              at{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.qmul.ac.uk" target="_blank" rel="noreferrer" className="transition-colors hover:text-indigo-300">Queen Mary University of London</a>
              </span>
              , where the fundamentals clicked across algorithms, systems, and software design.
              Frontend is what grabbed me first, driven by the speed of shipping something people can
              actually touch, but I&apos;m just as interested in the wider craft of building
              software.
            </p>
            <p className="leading-relaxed">
              I&apos;m looking for <span className="font-medium text-slate-200">junior to mid level</span>{" "}
              opportunities in London or remote. Frontend and full stack roles are the obvious
              fit, but I&apos;m open to anything across software and computing where I can keep
              levelling up alongside a team that cares about its work.
            </p>
            <p className="leading-relaxed">
              Away from the screen I&apos;m usually training calisthenics, playing tennis or padel,
              or losing at chess in increasingly creative ways. This portfolio is one of my
              favourite side projects, so feel free to poke around.
            </p>
          </motion.section>

          {/* ── EXPERIENCE ── */}
          <motion.section
            id="experience"
            className="relative isolate scroll-mt-24"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Career
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Experience</h3>
            </div>
            <ol className="group/joblist space-y-2">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="https://hydeparkwinterwonderland.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.12)] group-hover:drop-shadow-lg" />
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0">
                    Nov 2023 – Jan 2024
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 transition group-hover:text-sky-300">
                      Box Office Assistant · Winter Wonderland
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Frontline support at one of London&apos;s busiest seasonal attractions.
                      Thought on my feet to solve ticketing issues, calmed frustrated guests, and
                      kept thousands of people moving through the gates without the queue breaking down.
                    </p>
                  </div>
                </a>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="https://www.nhs.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.12)] group-hover:drop-shadow-lg" />
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0">
                    Jul 2021 – Sep 2021
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 transition group-hover:text-sky-300">
                      Call Handler · NHS Test &amp; Trace
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Handled a high volume of public calls during the UK&apos;s COVID-19 response.
                      Worked through unclear situations with structured questioning, clear
                      explanations, and the patience to talk anxious people through the answer
                      they actually needed.
                    </p>
                  </div>
                </a>
              </motion.li>
            </ol>
          </motion.section>

          {/* ── PROJECTS ── */}
          <section id="projects" className="scroll-mt-24" aria-label="Projects">
            <div className="mb-6 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Selected work
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Projects</h3>
            </div>

            {/* CTA — sets the expectation that each card opens its own page */}
            <motion.p
              className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-400"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
              }}
            >
              <motion.span
                aria-hidden="true"
                className="inline-block h-px origin-left"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(129,140,248,0.55))",
                }}
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  show: {
                    width: "1.5rem",
                    opacity: 1,
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              />
              {[
                { text: "Tap any project", className: "text-slate-300" },
                { text: "for the full breakdown" },
              ].map((part) => (
                <motion.span
                  key={part.text}
                  className={part.className}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {part.text}
                </motion.span>
              ))}
              <motion.span
                aria-hidden="true"
                className="inline-block text-sky-400/70"
                variants={{
                  hidden: { opacity: 0, x: -6 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                >
                  →
                </motion.span>
              </motion.span>
            </motion.p>

            <div className="relative isolate">
              <ul className="group/list space-y-2">
                {PROJECTS.map((project, idx) => (
                  <motion.li
                    key={project.href}
                    className={idx < PROJECTS.length - 1 ? "mb-10" : ""}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8% 0px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={project.href}
                      className="group relative grid gap-4 pb-1 transition-all hover:!opacity-100 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.14)] group-hover:drop-shadow-lg" />

                      {/* Thumbnail */}
                      <div className="relative z-10 sm:order-1 sm:col-span-2">
                        <div className="transition group-hover:scale-[1.04] duration-500">
                          <ProjectThumbnail project={project.thumbnail} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/50">
                          {project.eyebrow}
                        </p>
                        <h3 className={`flex items-center gap-2 font-medium leading-tight text-slate-200 transition ${project.accentHover}`}>
                          {project.title}
                          <span className="inline-block text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-current">
                            →
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <li key={tag}>
                              <div className={`rounded-full px-3 py-1 text-xs font-medium ${project.tagColor}`}>
                                {tag}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div
                          className={`mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 transition ${project.accentHover}`}
                        >
                          View case study
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FOOTER / CLOSING NOTE ── */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(11,17,32,0.60)",
                border: "1px solid rgba(56,189,248,0.14)",
              }}
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Let&apos;s build something
              </p>
              <h3 className="text-xl font-semibold text-slate-100">Open to new opportunities</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Got a role, a project, or just want to trade notes on building software? The
                inbox is open and I reply to every message.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="mailto:omar@oelhawary.com"
                  className="group inline-flex items-center gap-3 border border-sky-500/30 bg-sky-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300 backdrop-blur-sm transition hover:border-sky-400/55 hover:bg-sky-500/15 hover:text-white focus-visible:outline-none"
                  style={{ borderRadius: "3px" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 group-hover:animate-pulse" />
                  Email me
                  <span className="inline-block text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-400">→</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/oelhawary"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-sky-300"
                >
                  LinkedIn &rarr;
                </Link>
              </div>
            </div>
          </motion.section>

          {/* ── LAB ── */}
          <motion.section
            aria-label="Lab"
            className="scroll-mt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.22, delayChildren: 0.15 } },
            }}
          >
            {/* Drawing-in divider — first signal something new is here */}
            <motion.div
              aria-hidden="true"
              className="mb-6 h-px origin-left"
              style={{
                background:
                  "linear-gradient(to right, rgba(129,140,248,0.55), rgba(56,189,248,0.35) 40%, transparent)",
              }}
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            />

            <motion.p
              className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/55"
              variants={LAB_FADE_UP}
            >
              Lab
            </motion.p>

            {/* Heading: each word pops in with a blur-clear */}
            <motion.h3
              className="text-xl font-semibold tracking-wide text-slate-100"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
              }}
            >
              {["You", "made", "it", "this", "far?"].map((word) => (
                <motion.span
                  key={word}
                  className="mr-[0.28em] inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h3>

            <motion.p
              className="mt-2 mb-6 text-sm leading-relaxed text-slate-400"
              variants={LAB_FADE_UP}
            >
              Tap a tile to try it on the page. Tap again to turn it off. One
              cursor and one background can run at a time.
            </motion.p>

            {/* Cursor group */}
            <motion.div className="mb-5" variants={LAB_FADE_UP}>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Cursor
                </span>
                <motion.span
                  aria-hidden="true"
                  className="h-px flex-1 origin-left"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(99,102,241,0.25), transparent)",
                  }}
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                />
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {LAB_EFFECTS.filter((e) => e.kind === "cursor").map((effect) => {
                  const active = activeCursorFx === effect.id;
                  return (
                    <motion.div key={effect.id} variants={LAB_CHIP}>
                      <LabChip
                        title={effect.title}
                        description={effect.description}
                        active={active}
                        onClick={() => toggleLab(effect)}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Background group */}
            <motion.div variants={LAB_FADE_UP}>
              <div className="mb-2 flex items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Background
                </span>
                <motion.span
                  aria-hidden="true"
                  className="h-px flex-1 origin-left"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(99,102,241,0.25), transparent)",
                  }}
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                />
              </div>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {LAB_EFFECTS.filter((e) => e.kind === "background").map(
                  (effect) => {
                    const active = activeBgFx === effect.id;
                    return (
                      <motion.div key={effect.id} variants={LAB_CHIP}>
                        <LabChip
                          title={effect.title}
                          description={effect.description}
                          active={active}
                          onClick={() => toggleLab(effect)}
                        />
                      </motion.div>
                    );
                  }
                )}
              </motion.div>
            </motion.div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
