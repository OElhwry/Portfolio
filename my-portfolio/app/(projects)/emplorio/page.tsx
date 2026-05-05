"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { emplorioScreenshots as SCREENSHOTS } from "@/lib/project-media";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0, scale: 0.99 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0, scale: 0.99 }),
};
const slideTransition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };

export default function EmplorioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Slideshow
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const thumbsRef   = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);
  const hasMounted  = useRef(false);

  const goTo = (index: number) => {
    setDirection(index >= current ? 1 : -1);
    setCurrent(index);
  };
  const goNext = () => goTo((current + 1) % SCREENSHOTS.length);
  const goPrev = () => goTo((current - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = ["about", "images", "insights"];
    sections.forEach((id) => {
      sectionsRef.current[id] = document.getElementById(id);
    });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = sectionsRef.current[id];
      if (el) observer.observe(el);
    });
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
  }, [current]);

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    activeThumb.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-violet-500 selection:text-white"
      style={{
        background: `
          radial-gradient(ellipse 80% 45% at 50% 0%,  rgba(139,92,246,0.14) 0%, transparent 100%),
          radial-gradient(ellipse 55% 40% at 92% 70%, rgba(99,102,241,0.10)  0%, transparent 100%),
          radial-gradient(ellipse 50% 35% at 8% 80%, rgba(167,139,250,0.07) 0%, transparent 100%),
          #0b0a18
        `,
      }}
    >
      {/* ── AMBIENT BACKGROUND (drifting orbs + dot field) ── */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        {/* Far layer: sparse dots */}
        <span className="emp-dot" style={{ left: "12%", top: "18%" }} />
        <span className="emp-dot" style={{ left: "78%", top: "11%" }} />
        <span className="emp-dot" style={{ left: "52%", top: "30%" }} />
        <span className="emp-dot" style={{ left: "8%",  top: "72%" }} />
        <span className="emp-dot" style={{ left: "92%", top: "55%" }} />
        <span className="emp-dot" style={{ left: "36%", top: "88%" }} />

        {/* Mid layer: glowing orbs */}
        <span className="emp-orb emp-orb-1" />
        <span className="emp-orb emp-orb-2" />
        <span className="emp-orb emp-orb-3" />

        {/* Near layer: drifting shapes */}
        <span className="emp-shape emp-shape-1" />
        <span className="emp-shape emp-shape-2" />
        <span className="emp-shape emp-shape-3" />
      </div>

      <style jsx>{`
        .emp-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 999px;
          background: rgba(196, 181, 253, 0.55);
          box-shadow: 0 0 6px rgba(167, 139, 250, 0.5);
          animation: emp-twinkle 6s ease-in-out infinite;
        }
        .emp-dot:nth-child(2) { animation-delay: -1.2s; }
        .emp-dot:nth-child(3) { animation-delay: -2.4s; }
        .emp-dot:nth-child(4) { animation-delay: -3.6s; }
        .emp-dot:nth-child(5) { animation-delay: -4.8s; }
        .emp-dot:nth-child(6) { animation-delay: -5.4s; }

        .emp-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.55;
          will-change: transform;
        }
        .emp-orb-1 {
          left: -6%;
          top: 12%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.45), transparent 70%);
          animation: emp-drift-a 28s ease-in-out infinite;
        }
        .emp-orb-2 {
          right: -8%;
          top: 58%;
          width: 460px;
          height: 460px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%);
          animation: emp-drift-b 36s ease-in-out infinite;
        }
        .emp-orb-3 {
          left: 38%;
          bottom: -10%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.32), transparent 70%);
          animation: emp-drift-c 32s ease-in-out infinite;
        }

        .emp-shape {
          position: absolute;
          border: 1px solid rgba(167, 139, 250, 0.18);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.04));
          backdrop-filter: blur(2px);
          will-change: transform;
        }
        .emp-shape-1 {
          left: 8%;
          top: 14%;
          width: 180px;
          height: 180px;
          border-radius: 28px;
          transform: rotate(-8deg);
          animation: emp-float-a 44s ease-in-out infinite;
        }
        .emp-shape-2 {
          right: 6%;
          top: 28%;
          width: 120px;
          height: 120px;
          border-radius: 36px;
          transform: rotate(14deg);
          animation: emp-float-b 56s ease-in-out infinite;
        }
        .emp-shape-3 {
          left: 18%;
          bottom: 14%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          animation: emp-float-c 64s ease-in-out infinite;
        }

        @keyframes emp-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50%      { opacity: 0.85; transform: scale(1.2); }
        }
        @keyframes emp-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(80px, 50px, 0); }
        }
        @keyframes emp-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(-70px, 60px, 0); }
        }
        @keyframes emp-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(40px, -50px, 0); }
        }
        @keyframes emp-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-8deg); }
          50%      { transform: translate3d(60px, 40px, 0) rotate(-2deg); }
        }
        @keyframes emp-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(14deg); }
          50%      { transform: translate3d(-70px, 50px, 0) rotate(20deg); }
        }
        @keyframes emp-float-c {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(50px, -60px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .emp-dot, .emp-orb, .emp-shape { animation: none; }
        }
      `}</style>

      {/* Fine dot grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 transition hover:text-violet-300"
        >
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(520px at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.10), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-16">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-400/50">
              Chrome Extension
            </p>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{
                background:
                  "linear-gradient(135deg, #f1f5f9 0%, #c4b5fd 55%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Emplorio
            </h1>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-violet-400/70 to-transparent" />

            <h2 className="mt-3 text-lg font-mono font-medium text-violet-300/80 sm:text-xl">
              Apply once. Send everywhere.
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              An AI powered Chrome extension that auto fills job applications across every major ATS and drafts tailored cover letters with Claude, in seconds rather than minutes.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "TypeScript", color: "#3178c6" },
                { name: "Next.js 15", color: "#a5b4fc" },
                { name: "Fastify",    color: "#818cf8" },
                { name: "Drizzle",    color: "#c5f74f" },
                { name: "Neon",       color: "#00e599" },
                { name: "Claude API", color: "#d97757" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-violet-400/35 hover:bg-violet-950/30"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: tech.color }}
                  />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-10 hidden lg:block" aria-label="Page sections">
              <ul className="space-y-2">
                {["about", "images", "insights"].map((id) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-violet-300" : "text-slate-500"}`}
                      >
                        <span
                          className={`mr-4 h-px transition-all ${active ? "w-16 bg-violet-400" : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"}`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-violet-300" : "group-hover:text-slate-200"}`}
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

          {/* CTAs — primary button + compact link row underneath */}
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="https://chromewebstore.google.com/detail/emplorio/gjljbmhpdijnjpphnhfbcfobldbhclfc"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-violet-500/30 bg-violet-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200 backdrop-blur-sm transition hover:border-violet-400/55 hover:bg-violet-500/15 hover:text-white focus-visible:outline-none"
              style={{ borderRadius: "3px" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 group-hover:animate-pulse" />
              Add to Chrome
              <span className="inline-block text-violet-500 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-300">→</span>
            </Link>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <Link
                href="https://emplorio.co.uk"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-violet-300/70 transition hover:text-violet-200"
              >
                emplorio.co.uk &rarr;
              </Link>
              <Link
                href="https://github.com/OElhwry/Emplorio"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-violet-300/55 transition hover:text-violet-200"
              >
                GitHub &rarr;
              </Link>
            </div>
          </div>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="lg:w-[54%] py-24 space-y-24">

          {/* About */}
          <section id="about" className="space-y-4 scroll-mt-24">
            <p>
              Serious job hunters fill the same twenty fields across ten applications a day, before they even start tailoring a cover letter. Emplorio collapses that into a single click. It detects an application form, identifies the ATS, and populates every field from a profile you only have to write once.
            </p>
            <p>
              Detection runs in three layers. A bespoke adapter per supported ATS handles the easy ninety percent. Generic heuristics cover the long tail by walking <span className="text-slate-200 font-medium">autocomplete</span>, <span className="text-slate-200 font-medium">name</span>, <span className="text-slate-200 font-medium">id</span>, and adjacent label text against the profile schema. A Claude driven fallback maps anything unfamiliar and caches the result per domain so the model only runs once on a new site.
            </p>
            <p>
              On top of that, Claude handles the writing. Cover letters, question answers, and follow up emails, all grounded in your real CV. The model rewrites and emphasises, it never invents. Your Anthropic key lives only in your browser&apos;s local storage, never logged, never persisted server side.
            </p>
          </section>

          {/* Key Features */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-7">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400/45">
                What it does
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Key features</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                  ),
                  title: "9 ATS adapters",
                  body: "Greenhouse, Lever, Workday, Ashby, LinkedIn, Indeed, Workable, SmartRecruiters, iCIMS, all first class.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  ),
                  title: "AI cover letters",
                  body: "Streamed from Claude, grounded in your CV. Tone-adjustable. Same flow for question answers and follow-ups.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                    </svg>
                  ),
                  title: "Application tracking",
                  body: "Every application logs automatically with company, role, JD snapshot, status, and timestamps.",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                  title: "Privacy first",
                  body: "Bring your own Anthropic key. EU-only storage. No analytics, no tracking, no broad host permissions.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl p-4 transition-all hover:border-violet-400/25"
                  style={{
                    background: "rgba(11,10,24,0.55)",
                    border: "1px solid rgba(139,92,246,0.12)",
                  }}
                >
                  <div
                    className="mb-3 inline-flex items-center justify-center rounded-lg p-2 text-violet-400"
                    style={{ background: "rgba(139,92,246,0.10)" }}
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
            <div className="mb-8 flex flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400/45">
                Product Walk-through
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">Emplorio Gallery</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                From sign-in to auto-fill. Every screen of the extension.
              </p>
              <div className="mt-4 h-px w-32 rounded-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
            </div>

            <div
              className="rounded-2xl p-4 shadow-xl sm:p-5"
              style={{
                background: "rgba(11,10,24,0.70)",
                border: "1px solid rgba(139,92,246,0.16)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Featured image */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#080716" }}
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
                      className="object-contain"
                      priority
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-20"
                      style={{ background: "linear-gradient(to top, rgba(8,7,22,0.82) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-violet-300 focus-visible:outline-none"
                  style={{ background: "rgba(8,7,22,0.60)", border: "1px solid rgba(139,92,246,0.20)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-violet-300 focus-visible:outline-none"
                  style={{ background: "rgba(8,7,22,0.60)", border: "1px solid rgba(139,92,246,0.20)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter */}
                <div
                  className="absolute top-3 right-3 z-10 rounded px-2 py-0.5 font-mono text-[11px] text-violet-200"
                  style={{ background: "rgba(8,7,22,0.65)", border: "1px solid rgba(139,92,246,0.18)" }}
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
                      key={i}
                      ref={isActive ? activeThumb : undefined}
                      onClick={() => goTo(i)}
                      aria-label={`View ${s.caption}`}
                      className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-none"
                      style={{
                        width: "76px",
                        height: "52px",
                        border: isActive
                          ? "2px solid rgba(139,92,246,0.85)"
                          : "2px solid rgba(139,92,246,0.10)",
                        opacity: isActive ? 1 : 0.45,
                        boxShadow: isActive ? "0 0 10px rgba(139,92,246,0.35)" : "none",
                      }}
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}
                    >
                      <Image src={s.src} alt={s.alt} fill className="object-contain" sizes="76px" />
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-px w-full rounded-full" style={{ background: "rgba(139,92,246,0.10)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.85))" }}
                  animate={{ width: `${((current + 1) / SCREENSHOTS.length) * 100}%` }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </motion.section>

          {/* Stack */}
          <section id="stack" className="space-y-4 scroll-mt-24">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300/50">
                Tech stack
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">
                A real backend, not a BaaS.
              </h3>
            </div>
            <p>
              The extension is TypeScript and React 18 on Vite with{" "}
              <span className="text-slate-200 font-medium">@crxjs/vite-plugin</span>{" "}
              for Manifest V3, fully MV3 CSP compliant with no inline scripts and scoped permissions to only the ATS sites it supports. The marketing site at emplorio.co.uk is Next.js 15 on Vercel.
            </p>
            <p>
              The API is hand written{" "}
              <span className="text-slate-200 font-medium">Fastify</span> on Node 22, in a Docker container on{" "}
              <span className="text-slate-200 font-medium">Fly.io London</span>. I picked it over serverless because the AI endpoints stream and prompt cache the profile half of every request. Storage is{" "}
              <span className="text-slate-200 font-medium">Neon Postgres</span> in the EU via{" "}
              <span className="text-slate-200 font-medium">Drizzle</span>. Auth is magic link OTP via{" "}
              <span className="text-slate-200 font-medium">Resend</span> into a JWT cookie. No third party identity provider.
            </p>
          </section>

          {/* Insights */}
          <section id="insights" aria-label="Insights" className="space-y-4 scroll-mt-24">
            <p>
              Emplorio started while job hunting. The first version had two adapters and a profile editor in local storage, and it saved enough time on a single Friday afternoon that the rest of the project became obvious. The product question wasn&apos;t whether autofill was useful, but whether it could be made trustworthy enough to use on every application without checking.
            </p>
            <p>
              Three product calls came out of that. Co Pilot is the default and Auto Apply is opt in and rate limited, restraint over flash. The LLM is grounded, never fabricated, because a single hallucinated employment date is a fatal credibility error. And the API key is yours, which keeps incentives clean. I don&apos;t bill per token, so I have no reason to make the prompts longer than they need to be.
            </p>
            <p>
              The whole thing was built solo in a few weeks, used on the roles I&apos;m interviewing for right now, and saved over forty hours of pure form filling.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
