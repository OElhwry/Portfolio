"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import peerfitV2 from "../../public/peerfitv2.png";
import peerfitV2Feed from "../../public/peerfitv2feed.png";
import peerfitV2Feed2 from "../../public/peerfitv2feed2.png";
import peerfitV2Login from "../../public/peerfitv2login.png";
import peerfitV2Profile from "../../public/peerfitv2profile.png";
import peerfitV2Settings from "../../public/peerfitv2settings.png";
import peerfitV2Signup from "../../public/peerfitv2signup.png";
import peerfitV1Preview from "../../public/peerfitv1.png";
import peerfitV1Signup from "../../public/peerfitsignup.png";

type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
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

export default function PeerfitV2Page() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Cursor glow effect (color-shifting)
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = ["about", "images", "evolution"];
    ids.forEach((id) => (sectionsRef.current[id] = document.getElementById(id)));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    ids.forEach((id) => {
      const el = sectionsRef.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
      if (e.key === "ArrowRight")
        setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  // Generate glow color based on cursor position
let glowColor = "hsla(210, 80%, 60%, 0.15)";
if (typeof window !== "undefined") {
  const hue = (cursor.x / window.innerWidth) * 360;
  glowColor = `hsla(${hue}, 80%, 60%, 0.15)`;
}


  return (
    <main
      className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 transition-colors duration-1000"
    >
      {/* Back link */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="text-sm font-medium text-slate-400 hover:text-teal-300 transition">
          ← Back to Portfolio
        </Link>
      </div>

      {/* Cursor glow — now color-shifting */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, ${glowColor}, transparent 80%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col lg:flex-row lg:gap-10 px-6 md:px-12">
        {/* LEFT PANEL */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[45%] lg:flex-col lg:justify-between py-16 lg:py-24">
          <div>
        <motion.h1
        className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl"
        animate={{ textShadow: "0 0 10px rgba(94,234,212,0.2)" }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
        Peerfit v2
        </motion.h1>
        <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
        Because every game deserves a full team
        </h2>
        <p className="mt-4 max-w-xs leading-relaxed text-slate-300">
        A redesigned social sports app that connects local players in seconds — 
        turning missed matches into full courts and new connections.
        </p>


            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2 max-w-xs"
            >
              {["React", "TypeScript", "Tailwind", "Supabase"].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5 text-xs text-slate-100 inline-flex items-center gap-2 hover:scale-[1.05] hover:border-teal-400/30 transition"
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
        </header>

        {/* RIGHT PANEL */}
        <div className="flex-1 lg:pt-28 space-y-24">
          {/* ABOUT */}
<motion.section
  id="about"
  className="scroll-mt-24"
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <div className="max-w-3xl text-slate-300 space-y-4">
    <p>
      PeerFit began with a simple idea — people love playing sports, but finding
      that one last player or completing a team can be harder than expected.
      Whether it’s a quick five-a-side game, a doubles tennis match, or a
      weekend basketball run, there’s always someone missing. PeerFit was built
      to bridge that gap, matching players by shared interests, location, and
      availability to make spontaneous games easier to organize.
    </p>

    <p>
      In PeerFit v2, the entire platform was reimagined and rebuilt from scratch.
      The frontend was developed using{" "}
      <span className="text-slate-200 font-medium">
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          React
        </a>
      </span>{" "}
      and{" "}
      <span className="text-slate-200 font-medium">
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          TypeScript
        </a>
      </span>, while{" "}
      <span className="text-slate-200 font-medium">
        <a href="https://supabase.com/" target="_blank" rel="noreferrer">
          Supabase
        </a>
      </span>{" "}
      powers authentication, storage, and real-time data. The interface was
      redesigned with{" "}
      <span className="text-slate-200 font-medium">
        <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
          Tailwind CSS
        </a>
      </span>{" "}
      to emphasize clean hierarchy, motion feedback, and improved accessibility
      across all devices.
    </p>

    <p>
      Beyond connecting players, PeerFit v2 introduces a richer social layer.
      Users can now browse activity feeds, send quick RSVPs, and receive
      personalized match recommendations based on past activity. Live updates
      show when matches fill up, new players join, or events are modified,
      turning PeerFit into an active community rather than a static listing app.
    </p>

    <p>
      The goal wasn’t just a redesign — it was an evolution of purpose. PeerFit
      v2 delivers faster performance, smoother navigation, and a far more
      engaging experience. It represents both a technical leap and a creative
      step forward in how people connect through sport.
    </p>
  </div>
</motion.section>



{/* IMAGES */}
<motion.section
  id="images"
  className="scroll-mt-24"
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* Header */}
  <div className="flex flex-col items-center text-center mb-10">
    <h3 className="text-2xl font-semibold text-slate-100">Project Gallery</h3>
    <p className="mt-2 text-sm text-slate-400 max-w-lg">
      Explore the redesigned PeerFit v2 interface — from login to feed — built for clarity, connection, and real-time sports matching.
    </p>
    <div className="mt-4 h-px w-24 bg-gradient-to-r from-teal-500/40 via-teal-400/80 to-teal-500/40 rounded-full" />
  </div>

  {/* Framed Container */}
  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 hover:border-teal-400/20 transition-all duration-500">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {SCREENSHOTS.map((s, i) => (
        <motion.button
          key={i}
          onClick={() => setOpenIndex(i)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-teal-400/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={s.src}
              alt={s.alt}
              className="object-cover w-full h-full rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          </div>

          {/* Caption below image */}
          <div className="px-3 py-2 bg-white/5 text-left text-xs text-slate-200 font-medium border-t border-white/10">
            {s.caption}
          </div>

          {/* Floating hover label */}
          <div className="absolute top-3 right-3 bg-teal-400/10 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full text-teal-300 font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">
            View
          </div>
        </motion.button>
      ))}
    </div>
  </div>

  {/* Footer tip */}
  <p className="mt-6 text-sm text-slate-500 text-center">
    Click any image to enlarge. Use ← → to navigate, Esc to close.
  </p>
</motion.section>


          {/* EVOLUTION */}
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
                The journey from Peerfit v1 to v2 was more than just a facelift — it was a complete transformation 
                in technology, design, and user experience. What began as a static prototype built with PHP and 
                XAMPP evolved into a dynamic, real-time platform powered by React, TypeScript, Tailwind, and Supabase.
            </p>
            <p>
                Every screen was redesigned from the ground up to emphasize speed, clarity, and usability. 
                Let’s take a look at how Peerfit matured across different stages of its interface.
            </p>
            </div>

            {/* 1️⃣ Main feed evolution */}
            <div>
            <h4 className="text-sm font-semibold uppercase text-slate-400 mb-2">
                From Static to Real-Time Interaction
            </h4>
            <p className="text-slate-400 mb-4 max-w-3xl">
                The original feed displayed fixed posts that required full-page refreshes. 
                In v2, the feed updates in real time — showing new matches, activity joins, 
                and recommendations instantly with a sleek, card-based UI.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                <Image
                    src={peerfitV1Preview}
                    alt="Peerfit v1 main feed"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-xs px-2 py-1 rounded-full text-white shadow-md">
                    v1
                </div>
                </div>
                <div className="relative">
                <Image
                    src={peerfitV2}
                    alt="Peerfit v2 main feed"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-lime-500/80 text-xs px-2 py-1 rounded-full text-black font-semibold shadow-lg">
                    v2
                </div>
                </div>
            </div>
            </div>

            {/* 2️⃣ Signup evolution */}
            <div>
            <h4 className="text-sm font-semibold uppercase text-slate-400 mb-2">
                From Clunky to Effortless Onboarding
            </h4>
            <p className="text-slate-400 mb-4 max-w-3xl">
                The old signup process was functional but felt slow and heavy. 
                Peerfit v2 simplifies this into a clean, two-step form with instant validation, 
                dynamic error handling, and responsive layout that feels natural across devices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                <Image
                    src={peerfitV1Signup}
                    alt="Peerfit v1 signup"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-xs px-2 py-1 rounded-full text-white shadow-md">
                    v1
                </div>
                </div>
                <div className="relative">
                <Image
                    src={peerfitV2Signup}
                    alt="Peerfit v2 signup"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-lime-500/80 text-xs px-2 py-1 rounded-full text-black font-semibold shadow-lg">
                    v2
                </div>
                </div>
            </div>
            </div>

            {/* 3️⃣ Profiles & Settings */}
            <div>
            <h4 className="text-sm font-semibold uppercase text-slate-400 mb-2">
                Expanding the Social Core
            </h4>
            <p className="text-slate-400 mb-4 max-w-3xl">
                Peerfit v1 was all about finding games. Peerfit v2 added depth — player profiles, 
                personal stats, and customizable settings that give each user a sense of identity 
                and control. The visual hierarchy makes editing fast and intuitive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                <Image
                    src={peerfitV2Profile}
                    alt="Peerfit v2 profile"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-lime-500/80 text-xs px-2 py-1 rounded-full text-black font-semibold shadow-lg">
                    v2
                </div>
                </div>
                <div className="relative">
                <Image
                    src={peerfitV2Settings}
                    alt="Peerfit v2 settings"
                    className="rounded-xl border border-white/10 object-cover w-full"
                />
                <div className="absolute top-3 left-3 bg-lime-500/80 text-xs px-2 py-1 rounded-full text-black font-semibold shadow-lg">
                    v2
                </div>
                </div>
            </div>
            </div>

        </div>
        </motion.section>
        </div>
      </div>
      {/* Lightbox Modal */}
{openIndex !== null && (
  <motion.div
    key="lightbox"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
    onClick={() => setOpenIndex(null)}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={SCREENSHOTS[openIndex].src}
        alt={SCREENSHOTS[openIndex].alt}
        className="object-contain w-full h-full bg-slate-900"
        priority
      />
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setOpenIndex(null)}
          className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 py-3 text-center text-slate-200 text-sm">
        {SCREENSHOTS[openIndex].caption}
      </div>
    </motion.div>

    {/* Navigation arrows */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length
        );
      }}
      className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-3xl font-bold select-none"
    >
      ‹
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        setOpenIndex((i) =>
          i === null ? null : (i + 1) % SCREENSHOTS.length
        );
      }}
      className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-3xl font-bold select-none"
    >
      ›
    </button>
  </motion.div>
)}

    </main>
  );
}
