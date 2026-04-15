"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { kvitScreenshots as SCREENSHOTS } from "@/lib/project-media";

// Subtle slide-fade — lighter than Aphelion to match Kvit's precision feel
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0 }),
};
const slideTransition = { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const };

export default function KvitPage() {
  const [cursor, setCursor]               = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Slideshow
  const [current, setCurrent]     = useState(0);
  const [direction, setDirection] = useState(1);

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

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-emerald-500 selection:text-white"
      style={{
        background: `
          radial-gradient(ellipse 85% 45% at 50% 0%,  rgba(16,185,129,0.08) 0%, transparent 100%),
          radial-gradient(ellipse 55% 35% at 92% 65%, rgba(5,150,105,0.05)  0%, transparent 100%),
          #060c08
        `,
      }}
    >
      {/* Dot-grid overlay — evokes ledgers, balance sheets, fintech precision */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(52,211,153,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-500 transition hover:text-emerald-400">
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(500px at ${cursor.x}px ${cursor.y}px, rgba(16,185,129,0.09), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            {/* Title — clean and sharp, no glow: the tool is the statement */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
              Kvit
            </h1>
            <div className="mt-1.5 h-0.5 w-10 rounded-full bg-emerald-400/60" />

            <h2 className="mt-4 text-lg font-mono font-medium text-emerald-400/70 sm:text-xl">
              Call it even.
            </h2>

            <p className="mt-4 max-w-xs leading-relaxed text-slate-400">
              A no-friction expense splitter that finds the shortest path to settled, with no account required.
            </p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "React 19",     color: "#61dafb" },
                { name: "Vite",         color: "#646cff" },
                { name: "Lucide React", color: "#34d399" },
                { name: "html2canvas",  color: "#f59e0b" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-emerald-400/35 hover:bg-emerald-950/30"
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
                        className={`group flex items-center py-2 transition-colors ${active ? "text-emerald-300" : "text-slate-500"}`}
                      >
                        <span className={`mr-4 h-px transition-all ${active ? "w-16 bg-emerald-400" : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"}`} />
                        <span className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-emerald-300" : "group-hover:text-slate-200"}`}>
                          {id.charAt(0).toUpperCase() + id.slice(1)}
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
              href="https://oelhwry.github.io/Kvit/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm transition hover:border-emerald-400/55 hover:bg-emerald-500/15 hover:text-white focus-visible:outline-none"
              style={{ borderRadius: "3px" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:animate-pulse" />
              Try Kvit
              <span className="inline-block text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-400">→</span>
            </Link>
            <Link
              href="https://github.com/OElhwry/Kvit"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-medium text-emerald-400/55 transition hover:text-emerald-300"
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
              Kvit takes the friction out of splitting bills. Add who was involved, enter what was spent, and it works out the most efficient way for everyone to settle. A smart settlements algorithm minimises the number of transfers needed, so nobody ends up making more payments than necessary.
            </p>
            <p>
              Two modes: equal splits for simple situations, and custom percentage breakdowns when contributions aren&apos;t the same. The balance view updates live as you adjust values, colour-coded so it&apos;s immediately clear who owes and who gets paid back. No mental arithmetic required.
            </p>
            <p>
              Results can be shared three ways: copied as plain text, exported as a screenshot via{" "}
              <span className="text-slate-200 font-medium">html2canvas</span>, or sent as a shareable link. The whole thing runs in the browser with no account, no backend, and no delay. You open it, enter the numbers, and it&apos;s done.
            </p>
            <p>
              Built with{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://react.dev/" target="_blank" rel="noreferrer">React 19</a>
              </span>{" "}
              and{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a>
              </span>
              , with{" "}
              <span className="text-slate-200 font-medium">Lucide React</span>{" "}
              for icons and custom CSS variables for theming. The visual style is fintech-adjacent: clean, legible, and designed to feel trustworthy at a glance.
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
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-400/45">
                Screenshots
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">The App</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Custom splits and shareable results.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
            </div>

            {/* Slideshow card */}
            <div
              className="rounded-2xl p-4 shadow-xl sm:p-5"
              style={{
                background: "rgba(6,14,9,0.72)",
                border: "1px solid rgba(52,211,153,0.13)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Featured image */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#040a06" }}
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
                    {/* Bottom fade for caption */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-20"
                      style={{ background: "linear-gradient(to top, rgba(4,10,6,0.82) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev arrow */}
                <button
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-emerald-300 focus-visible:outline-none"
                  style={{ background: "rgba(4,10,6,0.62)", border: "1px solid rgba(52,211,153,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next arrow */}
                <button
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-emerald-300 focus-visible:outline-none"
                  style={{ background: "rgba(4,10,6,0.62)", border: "1px solid rgba(52,211,153,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Animated caption */}
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

              {/* Pill indicators — cleaner than a thumbnail strip for 2 images */}
              <div className="mt-4 flex items-center justify-center gap-2.5">
                {SCREENSHOTS.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    animate={{
                      width: i === current ? 28 : 8,
                      opacity: i === current ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="h-2 focus-visible:outline-none"
                    style={{
                      borderRadius: "999px",
                      background: i === current
                        ? "rgba(52,211,153,0.9)"
                        : "rgba(52,211,153,0.4)",
                      boxShadow: i === current ? "0 0 8px rgba(52,211,153,0.55)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* Insights */}
          <section id="insights" aria-label="Insights" className="space-y-4 scroll-mt-24">
            <p>
              Kvit started as a practical tool, something to pull up at the end of a dinner rather than debate the maths. The design process reflected that. The challenge wasn&apos;t the settlement logic; it was making every step feel frictionless enough that you&apos;d actually reach for it in the moment rather than defaulting to a notes app.
            </p>
            <p>
              Building offline-first shaped most of the decisions. No loading states, no auth flows, no server to depend on. Everything needed to work the instant the page opened. That constraint kept the scope tight and the interface direct, which turned out to be exactly what the tool needed.
            </p>
            <p>
              The screenshot export via html2canvas was a deliberate call. A clean image is often the fastest way to resolve a group chat: more readable than a wall of numbers, more immediate than a link. Small feature, meaningful difference in practice.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
