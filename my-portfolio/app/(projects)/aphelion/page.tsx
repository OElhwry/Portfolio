"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { aphelionScreenshots as SCREENSHOTS } from "@/lib/project-media";
import {
  AquariusConstellation,
  CapricornConstellation,
  LeoConstellation,
} from "@/components/Constellations";
import AphelionIntroStinger from "@/components/AphelionIntroStinger";

// Seeded PRNG so server and client produce identical star positions (fixes hydration mismatch)
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);

// Drifting layers (slow upward scroll)
const STAR_SHADOWS_SM = Array.from({ length: 320 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(255,255,255,${(rand() * 0.55 + 0.3).toFixed(2)})`
).join(",");
const STAR_SHADOWS_MD = Array.from({ length: 130 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(200,215,255,${(rand() * 0.5 + 0.25).toFixed(2)})`
).join(",");
const STAR_SHADOWS_LG = Array.from({ length: 60 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(180,205,255,${(rand() * 0.4 + 0.2).toFixed(2)})`
).join(",");

// Twinkling layers — stationary, opacity-pulse at different rates
const TWINKLE_A = Array.from({ length: 35 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(255,255,255,0.9)`
).join(",");
const TWINKLE_B = Array.from({ length: 35 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(210,225,255,0.85)`
).join(",");
const TWINKLE_C = Array.from({ length: 45 }, () =>
  `${(rand() * 2000).toFixed(0)}px ${(rand() * 2000).toFixed(0)}px rgba(255,255,255,0.75)`
).join(",");

// Direction-aware slide + fade
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0, scale: 0.99 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0, scale: 0.99 }),
};
const slideTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

/* ── Viewport-aware shooting stars ── */
function ShootingStars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawn = () => {
      const el = document.createElement("div");
      // Position relative to current scroll so stars appear in the viewport
      const scrollY = window.scrollY;
      const vpH = window.innerHeight;
      const top = scrollY + Math.random() * vpH;
      const left = Math.random() * 70; // start in the left 70% so the trail stays on screen
      const width = 100 + Math.random() * 120; // 100–220px trail
      const angle = 18 + Math.random() * 18;   // 18–36 deg
      const duration = 1.4 + Math.random() * 1; // 1.4–2.4s visible travel

      el.style.cssText = `
        position:absolute;
        top:${top}px;
        left:${left}%;
        width:${width}px;
        height:${1 + Math.random() * 1.2}px;
        border-radius:999px;
        pointer-events:none;
        opacity:0;
        background:linear-gradient(90deg,transparent 0%,rgba(148,180,255,0.5) 35%,rgba(210,228,255,0.92) 70%,rgba(255,255,255,1) 100%);
        transform:rotate(${angle}deg) translateX(0);
      `;

      container.appendChild(el);

      // Animate: fade in → travel → fade out
      const anim = el.animate(
        [
          { opacity: 0, transform: `rotate(${angle}deg) translateX(0)` },
          { opacity: 0.85, transform: `rotate(${angle}deg) translateX(${width * 0.3}px)`, offset: 0.12 },
          { opacity: 0.7, transform: `rotate(${angle}deg) translateX(${width * 2.5}px)`, offset: 0.75 },
          { opacity: 0, transform: `rotate(${angle}deg) translateX(${width * 3.5}px)` },
        ],
        { duration: duration * 1000, easing: "ease-out", fill: "forwards" }
      );

      anim.onfinish = () => el.remove();
    };

    // Spawn one immediately, then on a recurring interval
    spawn();
    const id = setInterval(spawn, 2400 + Math.random() * 1800); // every ~2.4–4.2s
    return () => clearInterval(id);
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}

export default function AphelionPage() {
  const [cursor, setCursor]           = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Slideshow state
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const thumbsRef   = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const hasInteracted = useRef(false);

  const goTo = (index: number) => {
    hasInteracted.current = true;
    setDirection(index >= current ? 1 : -1);
    setCurrent(index);
  };
  const goNext = () => goTo((current + 1) % SCREENSHOTS.length);
  const goPrev = () => goTo((current - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

  // Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Section observer
  useEffect(() => {
    const sections = ["about", "images", "insights"];
    sections.forEach((id) => { sectionsRef.current[id] = document.getElementById(id); });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((id) => { const el = sectionsRef.current[id]; if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Keyboard nav for slideshow
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Keep active thumbnail in view when navigating (skip the initial mount)
  useEffect(() => {
    if (!hasInteracted.current) return;
    activeThumb.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <main
      className="relative text-white/55 antialiased selection:bg-white selection:text-black"
      style={{
        // Matches the live aphelion.website landing — near-black void, faint warm glow
        // from below (suggesting an unseen Earth horizon), starfield carries the rest.
        background: `
          radial-gradient(ellipse 60% 35% at 50% 110%, rgba(80,170,255,0.10) 0%, transparent 70%),
          radial-gradient(ellipse 90% 50% at 50% -10%, rgba(8,16,32,0.55) 0%, transparent 100%),
          #02040a
        `,
      }}
    >
      <AphelionIntroStinger />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-white/45 transition hover:text-white">
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow — soft white, matches the editorial restraint */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{ background: `radial-gradient(560px at ${cursor.x}px ${cursor.y}px, rgba(120,180,255,0.06), transparent 80%)` }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Drifting layers */}
        <div className="stars  animate-[starDrift_240s_linear_infinite]" />
        <div className="stars2 animate-[starDrift_300s_linear_infinite]" />
        <div className="stars3 animate-[starDrift_400s_linear_infinite]" />
        {/* Twinkling layers — stationary, pulse in opacity at different rates */}
        <div className="twinkle-a" />
        <div className="twinkle-b" />
        <div className="twinkle-c" />
        {/* Shooting stars — JS-driven so they spawn near the viewport */}
        <ShootingStars />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <p
              className="mb-5 text-[10px] uppercase tracking-[0.38em] text-white/75 sm:text-xs"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
            >
              Solar System Explorer
            </p>
            <h1
              className="text-5xl uppercase text-white sm:text-6xl"
              style={{
                fontFamily:
                  "var(--font-playfair), 'Playfair Display', 'Cormorant Garamond', 'Times New Roman', serif",
                fontWeight: 500,
                letterSpacing: "0.14em",
                lineHeight: 1.05,
              }}
            >
              Aphelion
            </h1>
            <div className="mt-5 h-px w-20 bg-white/30" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              A cinematic, interactive journey through the solar system. Ten worlds, fifty questions, 5.9&nbsp;billion kilometres.
            </p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "Next.js 14",    color: "#e2e8f0" },
                { name: "TypeScript",    color: "#3178c6" },
                { name: "Tailwind CSS",  color: "#06b6d4" },
                { name: "Framer Motion", color: "#f72585" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/85 backdrop-blur-sm transition hover:scale-[1.05] hover:border-white/30 hover:bg-white/10"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: tech.color }} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-16 hidden lg:block" aria-label="Page sections">
              <ul className="space-y-2">
                {["about", "images", "insights"].map((id) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-white" : "text-white/40"}`}
                      >
                        <span className={`mr-4 h-px transition-all ${active ? "w-16 bg-white/85" : "w-8 bg-white/15 group-hover:w-16 group-hover:bg-white/55"}`} />
                        <span
                          className={`text-[10px] font-medium uppercase tracking-[0.32em] transition-colors ${active ? "text-white" : "group-hover:text-white/85"}`}
                          style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
                        >
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* CTAs — matches the live site's white pill "GET STARTED" */}
          <div className="mt-10 flex flex-col items-start gap-4">
            <Link
              href="https://aphelion.website"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-black transition hover:bg-white/90 sm:px-10"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
                boxShadow: "0 0 45px rgba(80,170,255,0.20)",
              }}
            >
              Get Started
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="https://github.com/OElhwry/Aphelion"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[11px] uppercase tracking-[0.28em] text-white/45 transition hover:text-white/85"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
            >
              View on GitHub &rarr;
            </Link>
          </div>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="lg:w-[54%] py-24 space-y-24">

          {/* About */}
          <section id="about" className="relative isolate space-y-4 scroll-mt-24">
            <AquariusConstellation className="-top-16 right-[-3rem] h-[440px] w-[440px] -z-10 opacity-60" />
            <p>
              Aphelion frames the solar system as a journey, not a reference. You arrive at a launch sequence, get addressed as Commander, and from the moment you click Begin Mission you&apos;re moving through the Sun&apos;s corona, past the inner planets, outward into the gas giants, and all the way to the cold edge of the system.
            </p>
            <p>
              Scroll pacing drives everything. Each planet appears in sequence, with its own facts, orbital data, and a set of quiz questions before you continue. Fifty questions in total, spread across ten worlds, with a{" "}
              <span className="text-white/85 font-medium">distance HUD</span>{" "}
              that tracks your progress in millions of kilometres so the sense of scale stays present throughout.
            </p>
            <p>
              Built with{" "}
              <span className="text-white/85 font-medium">
                <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js 14</a>
              </span>
              ,{" "}
              <span className="text-white/85 font-medium">TypeScript</span>
              , and{" "}
              <span className="text-white/85 font-medium">
                <a href="https://www.framer.com/motion/" target="_blank" rel="noreferrer">Framer Motion</a>
              </span>{" "}
              for scroll-triggered animation. The quiz engine and all planetary content are authored directly, with no external API dependency, keeping the experience fast, consistent, and fully offline-capable.
            </p>
          </section>

          {/* ── KEY FEATURES ── */}
          <motion.section
            className="relative isolate scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CapricornConstellation className="-top-8 -left-16 h-[440px] w-[440px] -z-10 opacity-60" />
            <div className="mb-7">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.38em] text-white/55"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
              >
                What it does
              </p>
              <h3
                className="text-3xl uppercase text-white"
                style={{
                  fontFamily:
                    "var(--font-playfair), 'Playfair Display', 'Cormorant Garamond', serif",
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                }}
              >
                Key features
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  ),
                  title: "Scroll-driven journey",
                  body: "Ten worlds revealed in sequence. Cinematic pacing from the Sun's corona to the frozen edge of the system.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ),
                  title: "50 quiz questions",
                  body: "Questions land after each planet's exploration content — immersion first, testing second.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  ),
                  title: "Distance HUD",
                  body: "Persistent progress tracker in millions of kilometres — the sense of scale stays present throughout.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
                    </svg>
                  ),
                  title: "Fully offline-capable",
                  body: "No external API dependency. All planetary content authored directly — fast, consistent, and cached.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl p-4 transition-all hover:border-white/25"
                  style={{
                    background: "rgba(8,12,22,0.55)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="mb-3 inline-flex items-center justify-center rounded-lg p-2 text-white/85"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    {f.icon}
                  </div>
                  <h4
                    className="mb-2 text-base text-white"
                    style={{
                      fontFamily:
                        "var(--font-playfair), 'Playfair Display', 'Cormorant Garamond', serif",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {f.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-white/55">{f.body}</p>
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
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.38em] text-white/55"
                style={{ fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif" }}
              >
                Mission Briefing
              </p>
              <h3
                className="text-3xl uppercase text-white"
                style={{
                  fontFamily:
                    "var(--font-playfair), 'Playfair Display', 'Cormorant Garamond', serif",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                }}
              >
                Aphelion Gallery
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/55">
                Ten worlds. Fifty questions. 5.9 billion kilometres.
              </p>
              <div className="mt-5 h-px w-24 bg-white/25" />
            </div>

            {/* Slideshow card */}
            <div
              className="rounded-2xl p-4 shadow-xl sm:p-5"
              style={{
                background: "rgba(8,12,22,0.65)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* ── Featured image ── */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#02040a" }}
              >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={current}
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
                      className="object-cover"
                      priority
                    />
                    {/* Bottom fade for caption legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-20"
                      style={{ background: "linear-gradient(to top, rgba(0,5,16,0.85) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/70 backdrop-blur-sm transition hover:text-white focus-visible:outline-none"
                  style={{
                    background: "rgba(2,4,10,0.65)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/70 backdrop-blur-sm transition hover:text-white focus-visible:outline-none"
                  style={{
                    background: "rgba(2,4,10,0.65)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter — keep an Orbitron-styled HUD readout (matches the live site's tickers) */}
                <div
                  className="absolute top-3 right-3 z-10 rounded px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-300/85"
                  style={{
                    fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
                    background: "rgba(2,4,10,0.70)",
                    border: "1px solid rgba(0,212,255,0.25)",
                  }}
                >
                  {current + 1} / {SCREENSHOTS.length}
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-3 pt-6 text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-medium tracking-wide text-white/85"
                    >
                      {SCREENSHOTS[current].caption}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Thumbnail strip ── */}
              <div
                ref={thumbsRef}
                className="mt-4 flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {SCREENSHOTS.map((s, i) => {
                  const isActive = i === current;
                  return (
                    <button
                      key={i}
                      ref={isActive ? activeThumb : undefined}
                      onClick={() => goTo(i)}
                      aria-label={`View ${s.caption}`}
                      className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-none"
                      style={{
                        width: "76px",
                        height: "52px",
                        border: isActive
                          ? "2px solid rgba(255,255,255,0.85)"
                          : "2px solid rgba(255,255,255,0.10)",
                        opacity: isActive ? 1 : 0.45,
                        boxShadow: isActive ? "0 0 12px rgba(255,255,255,0.20)" : "none",
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}
                    >
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        className="object-cover"
                        sizes="76px"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-px w-full rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(255,255,255,0.55), rgba(255,255,255,0.95))" }}
                  animate={{ width: `${((current + 1) / SCREENSHOTS.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </motion.section>

          {/* Insights */}
          <section id="insights" aria-label="Insights" className="relative isolate space-y-4 scroll-mt-24">
            <LeoConstellation className="-top-16 right-[-4rem] h-[440px] w-[440px] -z-10 opacity-60" />
            <p>
              The design challenge wasn&apos;t making it look like a space app. That part is simple enough. The harder part was making it feel like a journey rather than a reference page. Scroll-triggered state, a persistent distance HUD, and a cinematic launch sequence all work toward the same goal: convincing you that you&apos;re moving through something, not just reading about it.
            </p>
            <p>
              The quiz placement was deliberate. Questions arrive after the exploration content for each planet, not before. The intent is to let immersion do some of the teaching first, so the answers are more likely to have already landed by the time you need them.
            </p>
            <p>
              The mission summary screen completes the arc: total score, worlds visited, distance logged. It gives the experience a proper ending rather than just stopping, which is something most educational tools skip. That finishing moment is what makes it feel like you actually went somewhere.
            </p>
          </section>

        </div>
      </div>

      {/* Starfield CSS */}
      <style jsx global>{`
        /* ── Drifting star layers ── */
        .stars, .stars2, .stars3 { position: absolute; background: transparent; }
        .stars  { width: 1px; height: 1px; box-shadow: ${STAR_SHADOWS_SM}; }
        .stars2 { width: 2px; height: 2px; box-shadow: ${STAR_SHADOWS_MD}; }
        .stars3 { width: 3px; height: 3px; box-shadow: ${STAR_SHADOWS_LG}; }

        @keyframes starDrift {
          from { transform: translateY(0); }
          to   { transform: translateY(-1000px); }
        }

        /* ── Twinkling layers (stationary, opacity pulse) ── */
        .twinkle-a, .twinkle-b, .twinkle-c { position: absolute; background: transparent; }
        .twinkle-a { width: 2px; height: 2px; box-shadow: ${TWINKLE_A}; animation: twinkle 2.8s ease-in-out 0.0s infinite alternate; }
        .twinkle-b { width: 2px; height: 2px; box-shadow: ${TWINKLE_B}; animation: twinkle 3.6s ease-in-out 0.9s infinite alternate; }
        .twinkle-c { width: 1px; height: 1px; box-shadow: ${TWINKLE_C}; animation: twinkle 4.3s ease-in-out 1.8s infinite alternate; }

        @keyframes twinkle {
          from { opacity: 0.1; }
          to   { opacity: 1.0; }
        }

        /* Shooting stars are now JS-driven (ShootingStars component) */
      `}</style>
    </main>
  );
}
