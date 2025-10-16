"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import peerfitMain from "../../public/peerfitmain.png";
import peerfitSignup from "../../public/peerfitsignup.png";
import peerfitInterests from "../../public/peerfitinterests.png";
import peerfitV1 from "../../public/peerfitv1.png";

export default function PeerFitV1Page() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Track mouse for glow
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Track scroll position to highlight nav links
  useEffect(() => {
    const sections = ["about", "images", "lessons"];
    sections.forEach((id) => {
      sectionsRef.current[id] = document.getElementById(id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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

  return (
    <main className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-400 antialiased selection:bg-amber-300 selection:text-slate-900">
      {/* Back to Portfolio */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 hover:text-amber-300 transition"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Retro cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(500px at ${cursor.x}px ${cursor.y}px, rgba(234,179,8,0.08), transparent 80%)`,
        }}
      />

      {/* Layout */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">
        {/* LEFT PANEL */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              PeerFit v1
            </h1>
            <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
              The Beginning of the Journey
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
              My first attempt at creating a community fitness platform — coded
              entirely in HTML, CSS, JavaScript, and PHP, powered by XAMPP.
            </p>

            {/* Navigation */}
            <nav className="mt-16 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "images", "lessons"].map((id) => {
                  const label = id.charAt(0).toUpperCase() + id.slice(1);
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 ${
                          active ? "text-amber-300" : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`mr-4 h-px transition-all ${
                            active
                              ? "w-16 bg-amber-300"
                              : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-amber-300"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            active ? "text-amber-300" : "group-hover:text-amber-300"
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

          {/* GitHub link (optional if public repo) */}
          <div className="mt-10">
            <Link
              href="https://github.com/your-username/peerfit-v1"
              target="_blank"
              className="inline-block text-sm font-medium text-amber-300 hover:text-amber-200 transition"
            >
              View on GitHub →
            </Link>
          </div>
        </header>

        {/* RIGHT PANEL */}
        <div className="lg:w-[54%] py-24 space-y-24">
          {/* ABOUT */}
          <section id="about" className="space-y-4 scroll-mt-24">
            <p>
              PeerFit v1 was my first major web development project — a
              self-built fitness matching platform that connected people based
              on sport interests, skill levels, and availability. It was coded
              entirely from scratch using{" "}
              <span className="text-slate-200 font-medium">
              <a href="https://www.php.net/">PHP,</a>
            </span>{" "}
            <span className="text-slate-200 font-medium">
              <a href="https://tailwindcss.com/">CSS</a>
            </span>{" "} and 
            <span className="text-slate-200 font-medium">
              <a href="https://www.javascript.com/"> Javascript</a>
            </span>{" "} and ran locally with 
            <span className="text-slate-200 font-medium">
              <a href="https://www.apachefriends.org/"> XAMPP </a></span>
            </p>
            <p>
              The goal was to allow users to create accounts, browse sports
              events, and connect with players in their area. I implemented
              login systems, basic form validation, and dynamic data handling —
              all without any frameworks.
            </p>
            <p>
              This project taught me how the web really works behind the scenes:
              handling HTTP requests, working with MySQL databases, and
              debugging through sheer persistence. It’s where I learned to
              appreciate how important clean structure and scalability are in
              real projects.
            </p>
          </section>

          {/* IMAGES */}
          <section id="images" className="scroll-mt-24 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[peerfitV1, peerfitSignup, peerfitInterests, peerfitMain].map(
                (img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`PeerFit v1 screenshot ${i + 1}`}
                    className="rounded-lg border border-slate-700 object-cover shadow-md hover:shadow-amber-500/10 transition-shadow duration-300"
                  />
                )
              )}
            </div>
            <p className="text-sm text-slate-500 text-center">
              *Screenshots from the original PeerFit v1 web app.*
            </p>
          </section>

          {/* LESSONS */}
          <section id="lessons" className="space-y-4 scroll-mt-24">
            <p>
              Looking back, PeerFit v1 was the project that really shaped how I think about development. 
              It might have been simple in design, but it taught me a lot about problem-solving, structure, 
              and how small details can make a big difference in the user experience. 
              Working with core technologies like{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://www.php.net/" target="_blank" rel="noreferrer">PHP</a>
              </span>{" "},
              <span className="text-slate-200 font-medium">
                <a href="https://www.javascript.com/" target="_blank" rel="noreferrer">JavaScript</a>
              </span>{" "} and 
              <span className="text-slate-200 font-medium">
                <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> MySQL</a>
              </span>{" "} helped me understand how the web truly works behind the scenes. 
              From sending requests to handling data, every challenge pushed me to learn by doing.
            </p>

            <p>
              I learned how to approach{" "}
              <span className="text-slate-200 font-medium">backend logic</span>, manage user flow, 
              and build systems that felt intuitive, even with limited tools. 
              Debugging errors on a local{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://www.apachefriends.org/" target="_blank" rel="noreferrer">XAMPP</a>
              </span>{" "} server taught me patience, persistence, and the importance of keeping code organized. 
              It was a reminder that creativity and discipline go hand in hand when building anything from scratch.
            </p>

            <p>
              That first version laid the foundation for{" "}
              <Link href="/peerfitv2">
                <span className="text-amber-300 font-medium"> PeerFit v2 </span>
              </Link>
              where I reimagined the same idea with modern tools like{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a>
              </span>
              ,{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">TypeScript</a>
              </span>
              ,{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS</a>
              </span>{" "} and{" "}
              <span className="text-slate-200 font-medium">
                <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a>
              </span>. 
              Seeing how far it evolved reminded me how every small project plays a big part in becoming a stronger developer. 
              PeerFit v1 wasn’t just a starting point — it was the foundation that built everything after.
            </p>
          </section>
        </div>
      </div>

      {/* Retro screen glow overlay */}
      <style jsx global>{`
        main::before {
          content: "";
          position: fixed;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.02) 0%,
            rgba(0, 0, 0, 0.9) 100%
          );
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </main>
  );
}
