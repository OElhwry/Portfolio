"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { aphelionScreenshots as SCREENSHOTS } from "@/lib/project-media";

export default function AphelionPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
      }
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <main className="relative bg-slate-900 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-teal-300">
          &larr; Back to Portfolio
        </Link>
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="stars animate-[starDrift_240s_linear_infinite]" />
        <div className="stars2 animate-[starDrift_300s_linear_infinite]" />
        <div className="stars3 animate-[starDrift_400s_linear_infinite]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              <a href="/">Aphelion</a>
            </h1>
            <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
              Space exploration, reimagined
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
              An immersive astronomy experience focused on planetary discovery, visual learning, and interactive quizzes.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {["TypeScript", "Tailwind CSS", "v0.dev", "NASA API"].map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-100 backdrop-blur-sm transition hover:scale-[1.05] hover:border-indigo-400/30"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background:
                        tech === "TypeScript"
                          ? "#3178c6"
                          : tech === "Tailwind CSS"
                            ? "#06b6d4"
                            : tech === "v0.dev"
                              ? "#8b5cf6"
                              : "#fbbf24",
                    }}
                  />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </motion.div>

            <nav className="mt-16 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "images", "insights"].map((id) => {
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

          <div className="mt-10">
            <Link
              href="https://github.com/OElhwry/Explore-Space"
              target="_blank"
              className="inline-block text-sm font-medium text-teal-300 transition hover:text-teal-200"
            >
              View on GitHub &rarr;
            </Link>
          </div>
        </header>

        <div className="lg:w-[54%] py-24 space-y-24">
          <section id="about" className="space-y-4 scroll-mt-24">
            <p>
              Aphelion is an interactive space app designed to make astronomy feel cinematic,
              approachable, and genuinely fun to explore. It guides users through the solar system
              with rich visuals, layered facts, and a more immersive sense of progression than a
              traditional reference app.
            </p>
            <p>
              The experience is built around discovery. Users can move between planets, inspect
              key information, and absorb large concepts through clear visuals rather than walls
              of text. The goal is to turn space education into something that feels intuitive
              and memorable.
            </p>
            <p>
              Built with{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://react.dev/">React</a>
              </span>
              ,{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://www.typescriptlang.org/">TypeScript</a>
              </span>
              ,{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://tailwindcss.com/">Tailwind CSS</a>
              </span>{" "}
              and prototyped with{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://v0.app/">v0.dev</a>
              </span>
              , Aphelion combines polished UI work with live public space data to create a more
              engaging learning experience.
            </p>
          </section>

          <motion.section
            id="images"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold text-slate-100">Aphelion Gallery</h3>
              <p className="mt-2 max-w-lg text-sm text-slate-400">
                A closer look at Aphelion&apos;s planetary views, fact panels, and quiz flow.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-indigo-500/40 via-indigo-400/80 to-indigo-500/40" />
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all duration-500 hover:border-indigo-400/20">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SCREENSHOTS.map((s, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setOpenIndex(i)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="border-t border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-200">
                      {s.caption}
                    </div>

                    <div className="absolute top-3 right-3 rounded-full bg-indigo-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-indigo-300 opacity-0 transition-all group-hover:opacity-100">
                      View
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>

          <section id="insights" aria-label="Insights" className="space-y-4 scroll-mt-24">
            <p>
              Building Aphelion pushed the project beyond a simple space showcase and toward
              a more complete product experience. The newer screens focus on clarity, layered
              information, and stronger visual storytelling across exploration and quiz moments.
            </p>
            <p>
              The updated image set also made the direction of the project much clearer:
              less like a static demo, and more like a polished interactive learning tool.
              That helped refine both the visual hierarchy and the pacing of the experience.
            </p>
            <p>
              Next steps could include account-based progress tracking, saved discoveries,
              and more dynamic 3D interactions so the product feels even more alive over time.
            </p>
          </section>
        </div>
      </div>

      <style jsx global>{`
        .stars,
        .stars2,
        .stars3 {
          position: absolute;
          width: 1px;
          height: 1px;
          background: transparent;
        }
        .stars {
          box-shadow: ${Array(150)
            .fill(0)
            .map(() => `${Math.random() * 2000}px ${Math.random() * 2000}px #fff`)
            .join(",")};
        }
        .stars2 {
          box-shadow: ${Array(150)
            .fill(0)
            .map(() => `${Math.random() * 2000}px ${Math.random() * 2000}px #ccc`)
            .join(",")};
          animation: starDrift 300s linear infinite;
        }
        .stars3 {
          box-shadow: ${Array(150)
            .fill(0)
            .map(() => `${Math.random() * 2000}px ${Math.random() * 2000}px #999`)
            .join(",")};
          animation: starDrift 400s linear infinite;
        }
        @keyframes starDrift {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-1000px);
          }
        }
      `}</style>

      {openIndex !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          onClick={() => setOpenIndex(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={SCREENSHOTS[openIndex].src}
              alt={SCREENSHOTS[openIndex].alt}
              className="h-full w-full bg-slate-900 object-contain"
              priority
            />
            <div className="absolute top-3 right-3">
              <button
                onClick={() => setOpenIndex(null)}
                className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 py-3 text-center text-sm text-slate-200">
              {SCREENSHOTS[openIndex].caption}
            </div>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 select-none text-3xl font-bold text-slate-300 hover:text-white"
          >
            &lsaquo;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 select-none text-3xl font-bold text-slate-300 hover:text-white"
          >
            &rsaquo;
          </button>
        </motion.div>
      )}
    </main>
  );
}
