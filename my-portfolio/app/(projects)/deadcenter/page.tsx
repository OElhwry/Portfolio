"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { deadcenterScreenshots as SCREENSHOTS } from "@/lib/project-media";

// Direction-aware slide-fade
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};
const slideTransition = { duration: 0.27, ease: [0.4, 0, 0.2, 1] as const };

export default function DeadcenterPage() {
  const [cursor, setCursor]               = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Slideshow
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);
  const thumbsRef    = useRef<HTMLDivElement>(null);
  const activeThumb  = useRef<HTMLButtonElement>(null);
  const didMount     = useRef(false);

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
    const sections = ["about", "images", "design"];
    sections.forEach((id) => { sectionsRef.current[id] = document.getElementById(id); });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((id) => { const el = sectionsRef.current[id]; if (el) observer.observe(el); });
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

  // Keep active thumbnail centred in the strip (skip on first mount to avoid scrolling page to gallery)
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    activeThumb.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-orange-500 selection:text-white"
      style={{
        background: `
          radial-gradient(ellipse 90% 45% at 50% -5%,  rgba(249,115,22,0.07) 0%, transparent 100%),
          radial-gradient(ellipse 50% 30% at 10% 90%,  rgba(234,88,12,0.04)  0%, transparent 100%),
          #0c0806
        `,
      }}
    >
      {/* Scanline overlay — very faint CRT / arcade-monitor texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 3px)",
        }}
      />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-500 transition hover:text-orange-400">
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(550px at ${cursor.x}px ${cursor.y}px, rgba(249,115,22,0.11), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1
              className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
              style={{ textShadow: "0 0 45px rgba(249,115,22,0.28), 0 0 90px rgba(234,88,12,0.12)" }}
            >
              Deadcenter
            </h1>

            <h2 className="mt-3 text-lg font-mono font-medium text-orange-400/70 sm:text-xl">
              Stop the dot.
            </h2>

            <p className="mt-4 max-w-xs leading-relaxed text-slate-400">
              A browser precision timing game. One input, 20 levels, four tiers: Warmup through to Impossible.
            </p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "React 19",       color: "#61dafb" },
                { name: "JavaScript",     color: "#f7df1e" },
                { name: "Vite 8",         color: "#646cff" },
                { name: "Web Audio API",  color: "#fb923c" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-orange-400/35 hover:bg-orange-950/30"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: tech.color }} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-16 hidden lg:block" aria-label="Page sections">
              <ul className="space-y-2">
                {["about", "images", "design"].map((id) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-orange-300" : "text-slate-500"}`}
                      >
                        <span className={`mr-4 h-px transition-all ${active ? "w-16 bg-orange-400" : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"}`} />
                        <span className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-orange-300" : "group-hover:text-slate-200"}`}>
                          {id.charAt(0).toUpperCase() + id.slice(1)}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* CTAs — play button as primary, GitHub secondary */}
          <div className="mt-10 flex flex-col gap-3">
            <Link
              href="https://deadcenter.fun/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300 backdrop-blur-sm transition hover:border-orange-400/55 hover:bg-orange-500/15 hover:text-white focus-visible:outline-none"
              style={{ borderRadius: "3px" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 group-hover:animate-pulse" />
              Play Now
              <span className="inline-block text-orange-600 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-400">→</span>
            </Link>
            <Link
              href="https://github.com/OElhwry/deadcenter"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-medium text-orange-400/55 transition hover:text-orange-300"
            >
              View on GitHub &rarr;
            </Link>
          </div>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="lg:w-[54%] py-24 space-y-24">

          {/* About */}
          <section id="about" className="space-y-4 scroll-mt-24">
            <p>
              Deadcenter is built around one rule: stop a moving dot as close to the target as possible. One click, one tap, one press of Space. Your score grades how close you got:{" "}
              <span className="text-slate-200 font-medium">Dead Center</span> (90–100) down through Sharp, Decent, and Shaky, to{" "}
              <span className="text-orange-400/80 font-medium">Needs Work</span>.
            </p>
            <p>
              Twenty levels span four tiers: <span className="text-slate-200 font-medium">I, II, III, and ∞</span>. Each introduces movement patterns that change the challenge completely. The early levels ease you in with steady bounces and sine drifts. By Impossible, you&apos;re chasing a near-invisible ghost dot through patterns that shift faster than you can read them.
            </p>
            <p>
              Built with{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://react.dev/" target="_blank" rel="noreferrer">React 19</a>
              </span>{" "}
              and the{" "}
              <span className="text-slate-200 font-medium">Web Audio API</span>.
              The synth soundtrack, written without any audio library, intensifies tier by tier, keeping the atmosphere tight without a single UI cue. Press Space from the menu and you&apos;re straight in.
            </p>
            <p>
              A run builder lets you pick individual levels or full tiers, so each session can be a casual warmup, a personal record chase, or a grudge match with the level that got you last time.
            </p>
          </section>

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
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-400/45">
                Level Select
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">Screenshots</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                20 levels. 4 tiers. One input.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-orange-400/65 to-transparent" />
            </div>

            {/* Slideshow card */}
            <div
              className="rounded-2xl p-4 shadow-xl sm:p-5"
              style={{
                background: "rgba(12,8,6,0.72)",
                border: "1px solid rgba(249,115,22,0.13)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Featured image */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#080402" }}
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
                    {/* Bottom fade */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-20"
                      style={{ background: "linear-gradient(to top, rgba(8,4,2,0.80) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-orange-300 focus-visible:outline-none"
                  style={{ background: "rgba(8,4,2,0.60)", border: "1px solid rgba(249,115,22,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-orange-300 focus-visible:outline-none"
                  style={{ background: "rgba(8,4,2,0.60)", border: "1px solid rgba(249,115,22,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter */}
                <div
                  className="absolute top-3 right-3 z-10 rounded px-2 py-0.5 font-mono text-[11px] text-orange-200"
                  style={{ background: "rgba(8,4,2,0.65)", border: "1px solid rgba(249,115,22,0.18)" }}
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
                          ? "2px solid rgba(249,115,22,0.80)"
                          : "2px solid rgba(249,115,22,0.10)",
                        opacity: isActive ? 1 : 0.45,
                        boxShadow: isActive ? "0 0 10px rgba(249,115,22,0.30)" : "none",
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
              <div className="mt-3 h-px w-full rounded-full" style={{ background: "rgba(249,115,22,0.10)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(249,115,22,0.6), rgba(251,146,60,0.85))" }}
                  animate={{ width: `${((current + 1) / SCREENSHOTS.length) * 100}%` }}
                  transition={{ duration: 0.27, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </motion.section>

          {/* Design */}
          <section id="design" aria-label="Design" className="space-y-4 scroll-mt-24">
            <p>
              The single input constraint meant every layer of depth had to come from level design, not controls. The momentum system scales dot speed up to 4× on Impossible, so the same gesture that works on level five is completely unreadable by level fifteen. The rules don&apos;t change. Everything else does.
            </p>
            <p>
              Audio is written directly with the Web Audio API, with no library in the chain. That kept the bundle small and gave precise control over how the synth shifts between tiers. The soundtrack isn&apos;t background music, it&apos;s paced to match difficulty, so the tension builds without any UI signalling it. The entire game lives in a single{" "}
              <span className="text-slate-200 font-medium">App.jsx</span> file, which kept iteration fast and the build minimal.
            </p>
            <p>
              Day mode and a mute toggle keep it usable in different settings. The spacebar shortcut, which skips the menu and launches straight into play, was a deliberate call: the fewer steps between deciding to play and actually playing, the better the experience feels.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
