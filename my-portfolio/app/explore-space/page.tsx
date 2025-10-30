"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect,useRef, useState } from "react";
import spacePreview from "../../public/space.png";
import { motion } from "framer-motion";

type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

const SCREENSHOTS: Screenshot[] = [
      { src: spacePreview, alt: "Explore-Space - landing", caption: "Landing / Browse" },
];

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Track mouse for glow effect
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Track scroll position to highlight active section
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
      { rootMargin: "-50% 0px -50% 0px" } // triggers when section center enters view
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
          if (e.key === "ArrowLeft")
            setOpenIndex((i) => (i === null ? null : (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length));
          if (e.key === "ArrowRight")
            setOpenIndex((i) => (i === null ? null : (i + 1) % SCREENSHOTS.length));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
      }, [openIndex]);

  return (
<main className="relative bg-slate-900 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
  {/* Back to Portfolio */}
  <div className="fixed top-6 left-6 z-50">
    <Link
      href="/"
      className="text-sm font-medium text-slate-400 hover:text-teal-300 transition"
    >
      ← Back to Portfolio
    </Link>
  </div>
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
      />

  {/* Starfield Background (covers full width now) */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="stars animate-[starDrift_240s_linear_infinite]" />
    <div className="stars2 animate-[starDrift_300s_linear_infinite]" />
    <div className="stars3 animate-[starDrift_400s_linear_infinite]" />
  </div>

 <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">
        {/* LEFT PANEL */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              <a href="/">Explore Space</a>
            </h1>
            <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
              To Infinity and Beyond!
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
              Built to entertain and educate space enthusiasts, the app explores planets in order, showing distances, facts, and interactive quizzes. 
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2 max-w-xs"
            >
              {["TypeScript", "Tailwind CSS", "v0.dev", "NASA API"].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5 text-xs text-slate-100 inline-flex items-center gap-2 hover:scale-[1.05] hover:border-indigo-400/30 transition"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      background:
                        tech === "TypeScript"
                          ? "#3178c6"
                          : tech === "Tailwind CSS"
                          ? "#06b6d4"
                          : tech === "v0.dev"
                          ? "#8b5cf6"
                          : "#fbbf24", // NASA API (gold)
                    }}
                  />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </motion.div>


            {/* Navigation */}
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
           {/* GitHub link */}
      <div className="mt-10">
        <Link
          href="https://github.com/OElhwry/Explore-Space"
          target="_blank"
          className="inline-block text-sm font-medium text-teal-300 hover:text-teal-200 transition"
        >
          View on GitHub →
        </Link>
      </div>
          </header>

    {/* RIGHT SCROLLABLE COLUMN */}
     <div className="lg:w-[54%] py-24 space-y-24">
      {/* ABOUT */}
      <section id="about" className="space-y-4 scroll-mt-24">
        <p>
          Explore Space is an interactive web app designed to make astronomy fun,
           accessible, and visually captivating for everyone — from curious
            beginners to lifelong space enthusiasts. The app uses real
            {" "}
            <span className="text-slate-200 font-medium">
              <a href="https://www.nasa.gov/">NASA</a>
            </span>{" "} data and imagery to take users on a journey through our solar
             system, displaying each planet in order, their distances from the Sun,
              and how far apart they are from each other.
        </p>
        <p>
            Each planet can be explored in detail, revealing fascinating facts, imagery,
             and even interactive quizzes to test what users have learned. The goal is
              to turn complex astronomical data into an engaging, educational experience
               that feels both immersive and intuitive.
        </p>
        <p>
          Built with <span className="text-slate-200 font-medium">
              <a href="https://react.dev/">React,</a>
            </span>{" "}
            <span className="text-slate-200 font-medium">
              <a href="https://www.typescriptlang.org/">TypeScript</a>
            </span>{" "} and 
            <span className="text-slate-200 font-medium">
              <a href="https://tailwindcss.com/"> Tailwind CSS</a>
            </span>{" "} and prototyped using
            <span className="text-slate-200 font-medium">
              <a href="https://v0.app/"> v0.dev</a>
            </span>{" "}Explore Space emphasizes performance, responsiveness, and a smooth,
             modern interface. The project reflects my passion for space exploration and my
              commitment to transforming raw data into something approachable, inspiring,
               and fun to interact with.
        </p>
      </section>

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
    <h3 className="text-2xl font-semibold text-slate-100">Explore Space Gallery</h3>
    <p className="mt-2 text-sm text-slate-400 max-w-lg">
      Discover the Explore Space interface — designed for curiosity, creativity, and seamless exploration through immersive visuals.
    </p>
    <div className="mt-4 h-px w-24 bg-gradient-to-r from-indigo-500/40 via-indigo-400/80 to-indigo-500/40 rounded-full" />
  </div>

  {/* Framed Container */}
  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10 hover:border-indigo-400/20 transition-all duration-500">
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
          className="group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-indigo-400/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300"
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
          <div className="absolute top-3 right-3 bg-indigo-400/10 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full text-indigo-300 font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all">
            View
          </div>
        </motion.button>
              ))}
            </div>
          </div>
        </motion.section>


      {/* INSIGHTS */}
<section id="insights" aria-label="Insights" className="space-y-4 scroll-mt-24">
  <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
    Insights
  </h2>

  <p>
    Building Explore Space gave me a deeper understanding of how design, data, and
    interactivity can work together to create a memorable user experience. I learned how
    to connect real-time{" "}
    <span className="text-slate-200 font-medium">
      <a href="https://api.nasa.gov/" target="_blank" rel="noreferrer">
        NASA APIs
      </a>
    </span>{" "}
    with a clean, responsive interface — ensuring that each piece of planetary
    information not only loaded efficiently but also felt engaging and visually grounded.
  </p>

  <p>
    On the front-end side, I refined my approach to animation timing and user
    feedback, focusing on how subtle motion can guide attention and create flow
    rather than distraction. The process also helped me appreciate how visual hierarchy
    and layout choices can turn complex datasets into a story that users actually want
    to explore.
  </p>

  <p>
    Looking ahead, I plan to expand the project with{" "}
    <span className="text-slate-200 font-medium">
      <a href="https://supabase.com/" target="_blank" rel="noreferrer">
        Supabase
      </a>
    </span>{" "}
    authentication, personalized dashboards, and real-time mission tracking.
    Another exciting step will be introducing an interactive 3D solar system map,
    allowing users to navigate between planets and see live orbital data. These
    features will take the app beyond static visualization into a truly dynamic
    exploration tool.
  </p>
</section>

    </div>
  </div>




      {/* Starfield styling */}
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
            .map(
              () =>
                `${Math.random() * 2000}px ${Math.random() * 2000}px #fff`
            )
            .join(",")};
        }
        .stars2 {
          box-shadow: ${Array(150)
            .fill(0)
            .map(
              () =>
                `${Math.random() * 2000}px ${Math.random() * 2000}px #ccc`
            )
            .join(",")};
          animation: starDrift 300s linear infinite;
        }
        .stars3 {
          box-shadow: ${Array(150)
            .fill(0)
            .map(
              () =>
                `${Math.random() * 2000}px ${Math.random() * 2000}px #999`
            )
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
