"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  peerfitV2Screenshots as ALL_SCREENSHOTS,
  projectPreviews,
} from "@/lib/project-media";

// Direction-aware slide-fade
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};
const slideTransition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };

// Gallery groups — indices into ALL_SCREENSHOTS (21 total after home2–5 were added)
// 0–4:  Homepage (x5)   5: Feed   6: Feed Cards   7: Filters   8: Night Mode
// 9: Calendar   10: Friends   11–15: Auth (5)   16–18: Profile (3)   19–20: Settings (2)
const GALLERY_GROUPS = [
  { id: "all",      label: "All",      shots: ALL_SCREENSHOTS              },
  { id: "feed",     label: "Feed",     shots: ALL_SCREENSHOTS.slice(0, 11) },
  { id: "auth",     label: "Auth",     shots: ALL_SCREENSHOTS.slice(11, 16)},
  { id: "profile",  label: "Profile",  shots: ALL_SCREENSHOTS.slice(16, 19)},
  { id: "settings", label: "Settings", shots: ALL_SCREENSHOTS.slice(19)    },
];

export default function PeerfitV2Page() {
  const [cursor, setCursor]               = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Gallery
  const [activeGroup, setActiveGroup] = useState("all");
  const [current, setCurrent]         = useState(0);
  const [direction, setDirection]     = useState(1);
  const thumbsRef      = useRef<HTMLDivElement>(null);
  const activeThumb    = useRef<HTMLButtonElement>(null);
  const hasMounted     = useRef(false);

  const SCREENSHOTS = GALLERY_GROUPS.find((g) => g.id === activeGroup)!.shots;

  const goTo = (index: number) => {
    setDirection(index >= current ? 1 : -1);
    setCurrent(index);
  };
  const goNext = () => goTo((current + 1) % SCREENSHOTS.length);
  const goPrev = () => goTo((current - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

  const switchGroup = (id: string) => {
    setActiveGroup(id);
    setCurrent(0);
    setDirection(1);
  };

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const ids = ["about", "features", "images", "evolution"];
    ids.forEach((id) => { sectionsRef.current[id] = document.getElementById(id); });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = sectionsRef.current[id]; if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, activeGroup]);

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    activeThumb.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-teal-400 selection:text-slate-900"
      style={{
        background: `
          radial-gradient(ellipse 80% 55% at 50% -8%,  rgba(20,184,166,0.13) 0%, transparent 100%),
          radial-gradient(ellipse 50% 40% at 95% 75%,  rgba(6,182,212,0.07)  0%, transparent 100%),
          radial-gradient(ellipse 40% 35% at 5%  60%,  rgba(20,184,166,0.05) 0%, transparent 100%),
          #060d12
        `,
      }}
    >
      {/* Graph-paper grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,184,166,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "52px 52px",
        }}
      />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-500 transition hover:text-teal-400">
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(20,184,166,0.10), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-16">
          <div>
            {/* Eyebrow label */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400/50">
              Flagship Project
            </p>

            {/* Gradient title */}
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #99f6e4 55%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PeerFit v2
            </h1>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-teal-400/70 to-transparent" />

            <h2 className="mt-4 text-lg font-mono font-medium text-teal-400/80 sm:text-xl">
              Find people. Play sports. Stay active.
            </h2>

            <div className="mt-3 max-w-xs">
              <p className="text-sm leading-relaxed text-slate-400">
                <span className="font-medium text-slate-200">Post</span> activities,{" "}
                <span className="font-medium text-slate-200">join</span> local sessions,{" "}
                <span className="font-medium text-slate-200">build</span> a sports profile, and{" "}
                <span className="font-medium text-slate-200">connect</span> with people who
                play the same games as you.
              </p>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
                {["No group chats", "No manual scheduling"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                    <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 flex-shrink-0 text-rose-400/50">
                      <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["Open source", "Full auth flow", "Night mode", "Production deployed"].map((stat) => (
                <span
                  key={stat}
                  className="rounded-full px-3 py-1 text-[11px] font-medium text-teal-300/75"
                  style={{
                    border: "1px solid rgba(20,184,166,0.18)",
                    background: "rgba(20,184,166,0.06)",
                  }}
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "Next.js 15",  color: "#ffffff" },
                { name: "TypeScript",  color: "#3178c6" },
                { name: "Tailwind 4",  color: "#06b6d4" },
                { name: "Supabase",    color: "#3ecf8e" },
                { name: "Radix UI",    color: "#a78bfa" },
                { name: "Zod",         color: "#f87171" },
                { name: "next-themes", color: "#fbbf24" },
                { name: "Recharts",    color: "#60a5fa" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-teal-400/35 hover:bg-teal-950/30"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: tech.color }} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-6 hidden lg:block" aria-label="Page sections">
              <ul className="space-y-2">
                {[
                  { id: "about",     label: "Overview"  },
                  { id: "images",    label: "Gallery"   },
                  { id: "evolution", label: "Evolution" },
                ].map(({ id, label }) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-teal-300" : "text-slate-500"}`}
                      >
                        <span className={`mr-4 h-px transition-all ${active ? "w-16 bg-teal-400" : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"}`} />
                        <span className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-teal-300" : "group-hover:text-slate-200"}`}>
                          {label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="https://peerfit.co.uk"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-teal-500/30 bg-teal-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300 backdrop-blur-sm transition hover:border-teal-400/55 hover:bg-teal-500/15 hover:text-white focus-visible:outline-none"
              style={{ borderRadius: "3px" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 group-hover:animate-pulse" />
              Visit PeerFit
              <span className="inline-block text-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-400">→</span>
            </Link>
            <Link
              href="https://github.com/OElhwry/Peerfitv2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-teal-300"
            >
              View on GitHub &rarr;
            </Link>
          </div>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="lg:w-[54%] space-y-28 py-24">

          {/* ── OVERVIEW ── */}
          <section id="about" className="scroll-mt-24 space-y-5">
            <p className="leading-relaxed text-slate-300">
              PeerFit is a social sports platform built around one problem: finding other people to play
              with. Not a booking system, not a team-management tool. A place to discover nearby sessions
              and players for the sports you actually play, without the friction of group chats and manual
              scheduling.
            </p>
            <p className="leading-relaxed">
              The product covers the full activity journey. A scrollable feed of local sessions can be
              filtered by sport, skill level, and date. Each listing supports likes, saves, comments, and
              join requests, with organisers able to approve or decline members for private sessions. An
              activities calendar built with{" "}
              <span className="font-medium text-slate-200">react-day-picker</span> gives users a
              persistent view of upcoming events across the platform.
            </p>
            <p className="leading-relaxed">
              Auth is handled end to end by{" "}
              <span className="font-medium text-slate-200">
                <a href="https://supabase.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-teal-300">Supabase</a>
              </span>
              : email and SMS verification, forgot-password and reset-password flows, and persistent
              sessions through the SSR client. All forms use{" "}
              <span className="font-medium text-slate-200">React Hook Form</span> with{" "}
              <span className="font-medium text-slate-200">Zod</span> validation. Profile pages support
              avatar uploads, a badge achievement system, player stats, and reviews from other users.
              Light and dark themes are managed by{" "}
              <span className="font-medium text-slate-200">next-themes</span> and persist across
              sessions.
            </p>
            <p className="leading-relaxed">
              Built with{" "}
              <span className="font-medium text-slate-200">
                <a href="https://nextjs.org/" target="_blank" rel="noreferrer" className="transition-colors hover:text-teal-300">Next.js 15</a>
              </span>{" "}
              and TypeScript, deployed to{" "}
              <span className="font-medium text-slate-200">
                <a href="https://peerfit.co.uk" target="_blank" rel="noreferrer" className="transition-colors hover:text-teal-300">peerfit.co.uk</a>
              </span>{" "}
              via Vercel with automatic production deployments on every push.
            </p>
          </section>

          {/* ── KEY FEATURES ── */}
          <motion.section
            id="features"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-7">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/45">
                What it does
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Key features</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  ),
                  title: "Activity Feed",
                  body: "Scrollable sessions filtered by sport, skill, and date. Like, save, comment, and request to join. Organisers approve or decline members.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                  title: "Full Auth Stack",
                  body: "Email and SMS verification, forgot and reset password, OAuth callbacks, and SSR session persistence through Supabase.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  ),
                  title: "Player Profiles",
                  body: "Stats, badge achievements, peer reviews, avatar uploads, and a full friend request system with request management.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  ),
                  title: "Calendar and Themes",
                  body: "Persistent activities calendar via react-day-picker. Light and dark mode with next-themes, preserved across sessions.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl p-4 transition-all hover:border-teal-400/25"
                  style={{
                    background: "rgba(6,13,18,0.60)",
                    border: "1px solid rgba(20,184,166,0.10)",
                  }}
                >
                  <div
                    className="mb-3 inline-flex items-center justify-center rounded-lg p-2 text-teal-400"
                    style={{ background: "rgba(20,184,166,0.10)" }}
                  >
                    {f.icon}
                  </div>
                  <h4 className="mb-1.5 text-sm font-semibold text-slate-200">{f.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-400">{f.body}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── SLIDESHOW GALLERY ── */}
          <motion.section
            id="images"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="mb-8 flex flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/45">
                Product Walk-through
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">Product Screens</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Browse every part of the platform: homepage, feed, auth flows, profiles, and settings.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
            </div>

            {/* Group filter pills */}
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              {GALLERY_GROUPS.map((g) => {
                const isActive = activeGroup === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => switchGroup(g.id)}
                    className="rounded-full px-3.5 py-1 text-xs font-medium transition-all focus-visible:outline-none"
                    style={{
                      background: isActive ? "rgba(20,184,166,0.18)" : "rgba(20,184,166,0.04)",
                      border: isActive ? "1px solid rgba(20,184,166,0.55)" : "1px solid rgba(20,184,166,0.10)",
                      color: isActive ? "rgba(94,234,212,0.95)" : "rgba(148,163,184,0.7)",
                    }}
                  >
                    {g.label}
                    {g.id !== "all" && (
                      <span className="ml-1.5 opacity-50">{g.shots.length}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Slideshow card */}
            <div
              className="rounded-2xl p-4 shadow-2xl sm:p-5"
              style={{
                background: "rgba(6,13,18,0.78)",
                border: "1px solid rgba(20,184,166,0.14)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Featured image */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#030a0d" }}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`${activeGroup}-${current}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SCREENSHOTS[current].src}
                      alt={SCREENSHOTS[current].alt}
                      fill
                      className="object-contain"
                      priority
                    />
                    {/* Bottom fade for caption */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-24"
                      style={{ background: "linear-gradient(to top, rgba(3,10,13,0.88) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-teal-300 focus-visible:outline-none"
                  style={{ background: "rgba(3,10,13,0.65)", border: "1px solid rgba(20,184,166,0.20)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-teal-300 focus-visible:outline-none"
                  style={{ background: "rgba(3,10,13,0.65)", border: "1px solid rgba(20,184,166,0.20)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter */}
                <div
                  className="absolute right-3 top-3 z-10 rounded px-2 py-0.5 font-mono text-[11px] text-teal-200"
                  style={{ background: "rgba(3,10,13,0.65)", border: "1px solid rgba(20,184,166,0.20)" }}
                >
                  {current + 1} / {SCREENSHOTS.length}
                </div>

                {/* Active group badge */}
                {activeGroup !== "all" && (
                  <div
                    className="absolute left-3 top-3 z-10 rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300"
                    style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.28)" }}
                  >
                    {GALLERY_GROUPS.find((g) => g.id === activeGroup)!.label}
                  </div>
                )}

                {/* Animated caption */}
                <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-3 pt-8 text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${activeGroup}-${current}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      className="text-xs font-medium tracking-wide text-slate-200"
                    >
                      {SCREENSHOTS[current].caption}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div
                ref={thumbsRef}
                className="mt-4 flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {SCREENSHOTS.map((s, i) => {
                  const isActive = i === current;
                  return (
                    <button
                      key={`${activeGroup}-${i}`}
                      ref={isActive ? activeThumb : undefined}
                      onClick={() => goTo(i)}
                      aria-label={`View ${s.caption}`}
                      className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-none"
                      style={{
                        width: "72px",
                        height: "50px",
                        border: isActive
                          ? "2px solid rgba(20,184,166,0.85)"
                          : "2px solid rgba(20,184,166,0.10)",
                        opacity: isActive ? 1 : 0.42,
                        boxShadow: isActive ? "0 0 10px rgba(20,184,166,0.32)" : "none",
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.72"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.42"; }}
                    >
                      <Image src={s.src} alt={s.alt} fill className="object-contain" sizes="72px" />
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-px w-full rounded-full" style={{ background: "rgba(20,184,166,0.10)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(20,184,166,0.65), rgba(94,234,212,0.90))" }}
                  animate={{ width: `${((current + 1) / SCREENSHOTS.length) * 100}%` }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </motion.section>

          {/* ── EVOLUTION ── */}
          <section id="evolution" className="scroll-mt-24 space-y-16">

            {/* Build decisions */}
            <div className="space-y-5">
              <div className="mb-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/45">
                  Why it was rebuilt
                </p>
                <h3 className="text-xl font-semibold tracking-wide text-slate-100">
                  From PHP prototype to production product
                </h3>
              </div>
              <p className="leading-relaxed">
                PeerFit v2 started where v1 ran out of road. The original was a PHP prototype with a MySQL
                backend and no deployment infrastructure, useful for proving the concept but not for
                shipping it to real users. The rewrite was not incremental; it was a full rebuild around a
                different set of assumptions.
              </p>
              <p className="leading-relaxed">
                The first call was choosing{" "}
                <span className="font-medium text-slate-200">Supabase</span> over a custom backend. Auth,
                file storage, row-level security, and real-time subscriptions in one hosted service removed
                a category of infrastructure work that would have delayed everything else. The trade-off
                was worth it: more time on product, less time managing a server.
              </p>
              <p className="leading-relaxed">
                Using{" "}
                <span className="font-medium text-slate-200">Radix UI</span> primitives alongside Tailwind
                gave a consistent, accessible component base across dialogs, dropdowns, tabs, toasts, and
                overlays without hand-rolling keyboard behaviour or ARIA attributes for each one. That
                mattered across a product with 15 distinct routes. Toast notifications are handled by{" "}
                <span className="font-medium text-slate-200">Sonner</span>, charts by{" "}
                <span className="font-medium text-slate-200">Recharts</span>, and the calendar by{" "}
                <span className="font-medium text-slate-200">react-day-picker</span>, each chosen to stay
                out of the way of the product itself.
              </p>
            </div>

            {/* v1 vs v2 comparisons */}
            <div className="space-y-14">

              {/* Feed */}
              <div>
                <div className="mb-5">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400/45">
                    Before / After
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    From static listings to a live feed
                  </h4>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-400">
                    v1 showed a static grid of activities with no interaction. v2 replaced it with a social
                    feed: filters, likes, saves, comments, night mode, and live activity states.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.07)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV1} alt="PeerFit v1 feed" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-300"
                      style={{ background: "rgba(0,0,0,0.70)" }}
                    >
                      v1
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(20,184,166,0.18)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV2} alt="PeerFit v2 feed" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-300 backdrop-blur-sm"
                      style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.30)" }}
                    >
                      v2
                    </span>
                  </div>
                </div>
              </div>

              {/* Auth */}
              <div>
                <div className="mb-5">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400/45">
                    Before / After
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    From a basic form to a complete auth flow
                  </h4>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-400">
                    v1 had a single signup page with no verification. v2 ships with email confirmation,
                    SMS verification, forgot-password, reset-password, and OAuth callback handling through
                    Supabase SSR.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.07)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV1Signup} alt="PeerFit v1 signup" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-300"
                      style={{ background: "rgba(0,0,0,0.70)" }}
                    >
                      v1
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(20,184,166,0.18)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV2Signup} alt="PeerFit v2 signup" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-300 backdrop-blur-sm"
                      style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.30)" }}
                    >
                      v2
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile + Settings */}
              <div>
                <div className="mb-5">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400/45">
                    New in v2
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">
                    Profiles, achievements, and settings
                  </h4>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-400">
                    v1 had no profile system. v2 adds player stats, badge achievements, reviews, friend
                    requests, avatar uploads, and a settings page with theme switching and notification
                    controls.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(20,184,166,0.18)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV2Profile} alt="PeerFit v2 profile page" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-300 backdrop-blur-sm"
                      style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.30)" }}
                    >
                      Profile
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", border: "1px solid rgba(20,184,166,0.18)", background: "#060d12" }}>
                    <Image src={projectPreviews.peerfitV2Settings} alt="PeerFit v2 settings page" fill className="object-contain" />
                    <span
                      className="absolute left-2.5 top-2.5 rounded-sm px-2 py-0.5 text-[10px] font-semibold tracking-wide text-teal-300 backdrop-blur-sm"
                      style={{ background: "rgba(20,184,166,0.15)", border: "1px solid rgba(20,184,166,0.30)" }}
                    >
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CLOSING CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 text-center"
            style={{
              background: "rgba(6,13,18,0.60)",
              border: "1px solid rgba(20,184,166,0.14)",
            }}
          >
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-teal-300/75"
              style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.20)" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
              Live on peerfit.co.uk
            </div>
            <h3 className="mt-2 text-xl font-semibold text-slate-100">See it in action</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">
              The full app is live, deployed on Vercel, and available to use right now.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="https://peerfit.co.uk"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-teal-500/30 bg-teal-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300 backdrop-blur-sm transition hover:border-teal-400/55 hover:bg-teal-500/15 hover:text-white focus-visible:outline-none"
                style={{ borderRadius: "3px" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 group-hover:animate-pulse" />
                Visit PeerFit
                <span className="inline-block text-teal-600 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-400">→</span>
              </Link>
              <Link
                href="https://github.com/OElhwry/Peerfitv2"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-teal-300"
              >
                View on GitHub &rarr;
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
