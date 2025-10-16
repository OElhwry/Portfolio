"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect,useRef, useState } from "react";
import spacePreview from "../../public/space.png";

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

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
            <h2 className="mt-3 text-lg font-medium text-slate-200 sm:text-xl">
              To Infinity and Beyond!
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
              Built to entertain and educate space enthusiasts, the app explores planets in order, showing distances, facts, and interactive quizzes. 
            </p>

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
          href="https://github.com/your-username/explore-space"
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
      <section id="images" className="scroll-mt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Image
            src={spacePreview}
            alt="Explore Space interface"
            className="rounded-lg border border-slate-700 object-cover shadow-md hover:shadow-teal-500/10 transition-shadow duration-300"
          />
          <Image
            src={spacePreview}
            alt="Explore Space dashboard"
            className="rounded-lg border border-slate-700 object-cover shadow-md hover:shadow-teal-500/10 transition-shadow duration-300"
          />
        </div>
        <p className="text-sm text-slate-500 text-center">
          *Preview images from the Explore Space interface.*
        </p>
      </section>

      {/* INSIGHTS */}
      <section id="insights" aria-label="Insights">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Insights
        </h2>
        <p>
          Working on this project helped me refine API integration, animation
          control, and UI responsiveness. I also learned how visual hierarchy
          can transform technical data into a more meaningful story.
        </p>
        <p>
          Future plans include adding Supabase authentication, real-time mission
          tracking, and an interactive solar system map.
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
    </main>
  );
}
