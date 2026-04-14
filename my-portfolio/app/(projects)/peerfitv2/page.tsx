"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  peerfitV2Screenshots as SCREENSHOTS,
  projectPreviews,
} from "@/lib/project-media";

export default function PeerfitV2Page() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const ids = ["about", "images", "evolution"];
    ids.forEach((id) => {
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

    ids.forEach((id) => {
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

  const glowColor = `hsla(${cursor.x % 360}, 80%, 60%, 0.15)`;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 transition-colors duration-1000">
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-teal-300">
          &larr; Back to Portfolio
        </Link>
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col px-6 md:px-12 lg:flex-row lg:gap-10">
        <header className="py-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
              animate={{ textShadow: "0 0 10px rgba(94,234,212,0.2)" }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              Peerfit v2
            </motion.h1>
            <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
              Find people. Play sports. Stay active.
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed text-slate-300">
              A social sports platform for discovering local players, joining sessions,
              and building a real community around staying active.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex max-w-xs flex-wrap gap-2"
            >
              {["Next.js 15", "TypeScript", "Tailwind CSS 4", "Supabase"].map((tech) => (
                <div
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-100 backdrop-blur-sm transition hover:scale-[1.05] hover:border-teal-400/30"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{
                      background:
                        tech === "Next.js 15"
                          ? "#ffffff"
                          : tech === "TypeScript"
                            ? "#3178c6"
                            : tech === "Tailwind CSS 4"
                              ? "#06b6d4"
                              : "#00F5A0",
                    }}
                  />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </motion.div>

            <nav className="mt-16 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "images", "evolution"].map((id) => {
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
                              ? "w-16 bg-teal-400"
                              : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-teal-300"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            active ? "text-slate-100" : "group-hover:text-slate-200"
                          }`}
                        >
                          {id}
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
              href="https://github.com/OElhwry/Peerfitv2"
              target="_blank"
              className="inline-block text-sm font-medium text-amber-300 transition hover:text-amber-200"
            >
              View on GitHub &rarr;
            </Link>
          </div>
        </header>

        <div className="flex-1 space-y-24 lg:pt-28">
          <motion.section
            id="about"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl space-y-4 text-slate-300">
              <p>
                PeerFit is a social sports platform built to help people find local players,
                join activities, and stay active without the usual friction of filling a team
                or organising a session manually. The product brings together discovery,
                scheduling, and community features into one responsive experience.
              </p>

              <p>
                The app was built with{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                    Next.js 15
                  </a>
                </span>{" "}
                and{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                    TypeScript
                  </a>
                </span>
                , while{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://supabase.com/" target="_blank" rel="noreferrer">
                    Supabase
                  </a>
                </span>{" "}
                powers authentication, storage, and real-time data. The interface was
                redesigned with{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
                    Tailwind CSS 4
                  </a>
                </span>{" "}
                for the UI layer. It also uses{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://www.radix-ui.com/" target="_blank" rel="noreferrer">
                    Radix UI
                  </a>
                </span>{" "}
                and{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://lucide.dev/" target="_blank" rel="noreferrer">
                    Lucide React
                  </a>
                </span>{" "}
                to support a polished, responsive product experience across the landing page,
                feed, profile, calendar, notifications, and settings flows.
              </p>

              <p>
                The platform covers the full activity journey: email authentication,
                profile setup, browsing the feed, creating or joining sessions, managing
                private join requests, handling friend connections, and tracking upcoming
                events through a calendar view. It also includes likes, saves, comments,
                notifications, reviews, avatar uploads, and light/dark theme support.
              </p>

              <p>
                Deployed on{" "}
                <span className="font-medium text-slate-200">
                  <a href="https://peerfit.co.uk" target="_blank" rel="noreferrer">
                    peerfit.co.uk
                  </a>
                </span>{" "}
                with automatic production deployments through Vercel, PeerFit v2 represents
                a shift from concept to product - a more complete system for finding people,
                playing sports, and building momentum around shared activity.
              </p>
            </div>
          </motion.section>

          <motion.section
            id="images"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-semibold text-slate-100">Project Gallery</h3>
              <p className="mt-2 max-w-lg text-sm text-slate-400">
                A closer look at the live product flow across onboarding, feed discovery,
                profiles, requests, settings, and community interactions.
              </p>
              <div className="mt-4 h-px w-24 rounded-full bg-gradient-to-r from-teal-500/40 via-teal-400/80 to-teal-500/40" />
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-teal-400/20">
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
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-teal-400/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
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

                    <div className="absolute top-3 right-3 rounded-full bg-teal-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-teal-300 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
                      View
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-slate-500">
              Click any image to enlarge. Use &larr; &rarr; to navigate, Esc to close.
            </p>
          </motion.section>

          <motion.section
            id="evolution"
            className="scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-12">
              <div className="max-w-3xl space-y-4">
                <h3 className="text-xl font-semibold text-slate-100">Evolution of Peerfit</h3>
                <p>
                  The jump from PeerFit v1 to v2 was a full product rethink. What started
                  as a simpler matching concept in PHP evolved into a modern platform with
                  authentication, activity workflows, friend systems, moderation paths,
                  profile depth, and deployment-ready infrastructure.
                </p>
                <p>
                  Instead of only showing the idea, v2 focuses on delivering the whole user
                  journey from discovery to participation. The newer build is faster,
                  cleaner, and much closer to a real consumer product.
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase text-slate-400">
                  From Listings to a Live Feed
                </h4>
                <p className="mb-4 max-w-3xl text-slate-400">
                  PeerFit v2 expands the browsing experience into a proper activity feed
                  with search, filters, likes, saves, comments, and live activity states.
                  That makes discovery feel active and social rather than static.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV1}
                      alt="Peerfit v1 main feed"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white shadow-md">
                      v1
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV2}
                      alt="Peerfit v2 main feed"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-lime-500/80 px-2 py-1 text-xs font-semibold text-black shadow-lg">
                      v2
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase text-slate-400">
                  From Basic Signup to Full Auth Flow
                </h4>
                <p className="mb-4 max-w-3xl text-slate-400">
                  The new onboarding flow covers sign up, login, forgot password, reset
                  password, and callback handling. It is designed to feel smoother,
                  clearer, and more production-ready than the original experience.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV1Signup}
                      alt="Peerfit v1 signup"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white shadow-md">
                      v1
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV2Signup}
                      alt="Peerfit v2 signup"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-lime-500/80 px-2 py-1 text-xs font-semibold text-black shadow-lg">
                      v2
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase text-slate-400">
                  Expanding the Community Layer
                </h4>
                <p className="mb-4 max-w-3xl text-slate-400">
                  PeerFit v2 goes beyond finding games by adding private join approvals,
                  incoming and sent friend requests, accepted connections, profile stats,
                  achievements, reviews, notifications, and theme-aware settings.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV2Profile}
                      alt="Peerfit v2 profile"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-lime-500/80 px-2 py-1 text-xs font-semibold text-black shadow-lg">
                      v2
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src={projectPreviews.peerfitV2Settings}
                      alt="Peerfit v2 settings"
                      className="w-full rounded-xl border border-white/10 object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-lime-500/80 px-2 py-1 text-xs font-semibold text-black shadow-lg">
                      v2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

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
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 py-3 text-center text-sm text-slate-200">
              {SCREENSHOTS[openIndex].caption}
            </div>
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
            }}
            className="absolute top-1/2 left-6 -translate-y-1/2 select-none text-3xl font-bold text-slate-300 hover:text-white"
          >
            &lsaquo;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
            }}
            className="absolute top-1/2 right-6 -translate-y-1/2 select-none text-3xl font-bold text-slate-300 hover:text-white"
          >
            &rsaquo;
          </button>
        </motion.div>
      )}
    </main>
  );
}
