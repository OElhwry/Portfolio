"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { peerfitV1Screenshots as SCREENSHOTS } from "@/lib/project-media";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 36 : -36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -36 : 36, opacity: 0 }),
};
const slideTransition = { duration: 0.27, ease: [0.4, 0, 0.2, 1] as const };

export default function PeerFitV1Page() {
  const [cursor, setCursor]               = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const [current, setCurrent]     = useState(0);
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
    const sections = ["about", "images", "lessons"];
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

  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    activeThumb.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  return (
    <main
      className="relative text-slate-400 antialiased selection:bg-amber-300 selection:text-slate-900"
      style={{
        background: `
          radial-gradient(ellipse 80% 45% at 50% -5%,  rgba(251,191,36,0.10) 0%, transparent 100%),
          radial-gradient(ellipse 45% 35% at 8%  85%,  rgba(245,158,11,0.05) 0%, transparent 100%),
          #0d0b07
        `,
      }}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(251,191,36,0.14) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-500 transition hover:text-amber-400">
          &larr; Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(550px at ${cursor.x}px ${cursor.y}px, rgba(251,191,36,0.08), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-400/55">
              Origin
            </p>
            <h1
              className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
              style={{ textShadow: "0 0 45px rgba(251,191,36,0.22), 0 0 90px rgba(245,158,11,0.10)" }}
            >
              PeerFit v1
            </h1>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-amber-400/70 to-transparent" />

            <h2 className="mt-4 text-lg font-mono font-medium text-amber-300/70 sm:text-xl">
              Where it started.
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              A sports matchmaking platform built from scratch in PHP and MySQL — no frameworks, no shortcuts.
            </p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {[
                { name: "PHP",        color: "#777bb4" },
                { name: "MySQL",      color: "#00758f" },
                { name: "JavaScript", color: "#f7df1e" },
                { name: "HTML / CSS", color: "#e34f26" },
                { name: "XAMPP",      color: "#fb923c" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-amber-400/35 hover:bg-amber-950/30"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: tech.color }} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-16 hidden lg:block" aria-label="Page sections">
              <ul className="space-y-2">
                {["about", "images", "lessons"].map((id) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-amber-300" : "text-slate-500"}`}
                      >
                        <span className={`mr-4 h-px transition-all ${active ? "w-16 bg-amber-400" : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"}`} />
                        <span className={`text-xs font-semibold uppercase tracking-widest transition-colors ${active ? "text-amber-300" : "group-hover:text-slate-200"}`}>
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
              href="https://github.com/OElhwry/Peerfit"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 self-start border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm transition hover:border-amber-400/55 hover:bg-amber-500/15 hover:text-white focus-visible:outline-none"
              style={{ borderRadius: "3px" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:animate-pulse" />
              View on GitHub
              <span className="inline-block text-amber-600 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-400">→</span>
            </Link>
            <Link
              href="/peerfitv2"
              className="inline-block text-sm font-medium text-amber-400/55 transition hover:text-amber-300"
            >
              See PeerFit v2 &rarr;
            </Link>
          </div>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="lg:w-[54%] py-24 space-y-24">

          {/* About */}
          <section id="about" className="scroll-mt-24 space-y-4">
            <div className="mb-6 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400/45">Origin</p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">About</h3>
            </div>
            <p>
              PeerFit v1 was the project that started everything. A social sports platform built
              entirely from scratch — user accounts, profile management, activity matching, friend
              requests, and real-time chat, all running on{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.php.net/" target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">PHP</a>
              </span>{" "}
              and{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.mysql.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">MySQL</a>
              </span>{" "}
              through{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.apachefriends.org/" target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-300">XAMPP</a>
              </span>.
              No frameworks. No abstractions to hide behind.
            </p>
            <p>
              Users could create an account, set their sports and skill levels, browse nearby
              players, send friend requests, and message each other once matched. An activity
              system let people post sessions and find others to join them. Every feature was
              hand-rolled: form validation, session handling, SQL queries, the lot.
            </p>
            <p>
              Building without a framework made every decision explicit. How a form submits,
              how a session persists, how a query returns the right rows — nothing was handled
              for me. That constraint was the best possible education before touching React.
            </p>
          </section>

          {/* Gallery */}
          <motion.section
            id="images"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400/45">
                Interface
              </p>
              <h3 className="text-2xl font-semibold tracking-wide text-slate-100">Screenshots</h3>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                The original interface — plain HTML and CSS, every pixel placed by hand.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-amber-400/65 to-transparent" />
            </div>

            <div
              className="rounded-2xl p-4 shadow-xl sm:p-5"
              style={{
                background: "rgba(13,11,7,0.75)",
                border: "1px solid rgba(251,191,36,0.13)",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Featured image */}
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "16/9", background: "#0a0803" }}
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
                      style={{ background: "linear-gradient(to top, rgba(10,8,3,0.80) 0%, transparent 100%)" }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev */}
                <button
                  onClick={goPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-amber-300 focus-visible:outline-none"
                  style={{ background: "rgba(10,8,3,0.60)", border: "1px solid rgba(251,191,36,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next */}
                <button
                  onClick={goNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-300 backdrop-blur-sm transition hover:text-amber-300 focus-visible:outline-none"
                  style={{ background: "rgba(10,8,3,0.60)", border: "1px solid rgba(251,191,36,0.18)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter */}
                <div
                  className="absolute top-3 right-3 z-10 rounded px-2 py-0.5 font-mono text-[11px] text-amber-200"
                  style={{ background: "rgba(10,8,3,0.65)", border: "1px solid rgba(251,191,36,0.18)" }}
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
                          ? "2px solid rgba(251,191,36,0.80)"
                          : "2px solid rgba(251,191,36,0.10)",
                        opacity: isActive ? 1 : 0.45,
                        boxShadow: isActive ? "0 0 10px rgba(251,191,36,0.25)" : "none",
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
              <div className="mt-3 h-px w-full rounded-full" style={{ background: "rgba(251,191,36,0.10)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, rgba(251,191,36,0.60), rgba(253,224,71,0.85))" }}
                  animate={{ width: `${((current + 1) / SCREENSHOTS.length) * 100}%` }}
                  transition={{ duration: 0.27, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          </motion.section>

          {/* Lessons */}
          <section id="lessons" className="scroll-mt-24 space-y-4">
            <div className="mb-6 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400/45">Takeaways</p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Lessons</h3>
            </div>
            <p>
              v1 taught me how the web actually works at the request level. Every session
              cookie, form submission, and database join had to be reasoned through manually.
              That groundwork made picking up React and TypeScript significantly faster — I
              already had a mental model for what the framework was doing underneath.
            </p>
            <p>
              It also made the case for structure. As the project grew, mixing layout, logic,
              and SQL in the same PHP file made iteration painful. That friction directly
              shaped how I approached{" "}
              <Link href="/peerfitv2">
                <span className="font-medium text-amber-300 transition-colors hover:text-amber-200">PeerFit v2</span>
              </Link>
              {" "}— separation of concerns, typed data contracts, and a proper auth layer
              weren&apos;t nice-to-haves. They were the things I&apos;d learned to miss.
            </p>
            <p>
              The core idea survived both versions: find people to play sport with, match by
              skill, and make it easy to connect. Getting from a PHP monolith to a production
              Next.js app with Supabase auth was the whole journey. v1 is where it started.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
