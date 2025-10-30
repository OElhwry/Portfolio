"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import peerfitv1Preview from "../public/peerfitv1.png";
import peerfitv2Preview from "../public/peerfitv2.png";
import spacePreview from "../public/space.png";

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
    const sections = ["about", "experience", "projects"];
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
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">
        {/* LEFT PANEL */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              <a href="/">Omar El hawary</a>
            </h1>
            <h2 className="mt-3 text-lg font-mono font-medium text-slate-300 sm:text-xl">
              Front End Developer
            </h2>
            <p className="mt-4 max-w-xs leading-relaxed">
              I craft sleek, interactive interfaces that merge performance with visual clarity using React, TypeScript, and Tailwind CSS.
            </p>

            {/* Navigation */}
            <nav className="mt-16 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "experience", "projects"].map((id) => {
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

          {/* Social Links */}
          <ul
            className="ml-1 mt-8 flex items-center space-x-5"
            aria-label="Social links"
          >
            <li>
              <a
                href="https://github.com/OElhwry"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 
                    2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
                    -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                    -.01-.53.63-.01 1.08.58 1.23.82.72 1.21
                    1.87.87 2.33.66.07-.52.28-.87.51-1.07
                    -1.78-.2-3.64-.89-3.64-3.95 
                    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02
                    .08-2.12 0 0 .67-.21 2.2.82.64-.18 
                    1.32-.27 2-.27.68 0 1.36.09 2 
                    .27 1.53-1.04 2.2-.82 2.2-.82.44 
                    1.1.16 1.92.08 2.12.51.56.82 
                    1.27.82 2.15 0 3.07-1.87 3.75
                    -3.65 3.95.29.25.54.73.54 1.48 
                    0 1.07-.01 1.93-.01 2.2 0 
                    .21.15.46.55.38A8.013 8.013 
                    0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="www.linkedin.com/in/oelhawary"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 
                    2.239 5 5 5h14c2.761 0 5-2.239 
                    5-5V5c0-2.761-2.239-5-5-5zm-11 
                    19H5V9h3v10zM6.5 7.732c-.966 
                    0-1.75-.79-1.75-1.765S5.534 
                    4.203 6.5 4.203 8.25 4.993 
                    8.25 5.968s-.784 1.764-1.75 
                    1.764zM20 19h-3v-5.604c0-1.337
                    -.027-3.062-1.865-3.062-1.865 
                    0-2.15 1.459-2.15 2.968V19h-3V9h2.885v1.367h.041
                    c.403-.765 1.388-1.568 2.857-1.568 
                    3.052 0 3.617 2.009 3.617 4.626V19z" />
                </svg>
              </a>
            </li>
          </ul>
        </header>

        {/* RIGHT CONTENT */}
        <div className="lg:w-[54%] py-24 space-y-24">
        {/* About */}
        <section id="about" className="space-y-4 scroll-mt-24">
          <p>
            I’m a London-based software developer who enjoys building fast, intuitive, and visually engaging web experiences. 
            I’ve always been drawn to the overlap between design and technology, taking creative ideas and shaping them into something functional, scalable, and smooth to use.
          </p>
          <p>
            My background in{" "}
            <span className="text-slate-200 font-medium">
              <a href="https://www.qmul.ac.uk/undergraduate/course-info/computer-science">Computer Science</a>
            </span>{" "}
            at <span className="text-slate-200 font-medium">
              <a href="https://www.qmul.ac.uk">Queen Mary University of London</a>
            </span>{" "}
            gave me a strong grounding in logic, algorithms, and software design. But what really pushed me forward was discovering how much I enjoy 
            front end development, bringing design concepts to life through code and creating interfaces that people actually enjoy interacting with.
          </p>
          <p>
            Whether I’m refining a UI system, experimenting with new frameworks, or just trying to make something feel more natural to use, 
            I focus on crafting experiences that balance clarity, speed, and personality.
          </p>
          <p>
            Outside of coding, I spend most of my free time at the gym training calisthenics, getting into chess, or on the court playing tennis and padel.
            Occasionally I’ll pick up a badminton game if I’m in the mood to spoil myself. I also love exploring new tech ideas and side projects—anything that challenges me to build something fresh and meaningful.
          </p>
          <p>
            I’m currently looking to join a team where I can grow as a front-end or full-stack developer, 
            work on projects that have real impact, and keep learning from the people around me.
          </p>
        </section>


          {/* Experience */}
          <section id="experience" className="scroll-mt-24">
            <ol className="group/joblist">
              <li className="mb-12">
                <a
                  href="https://hydeparkwinterwonderland.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4 transition-all"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md lg:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg"></div>
                  <header className="z-10 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                    Nov 2023 – Jan 2024
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 group-hover:text-teal-300">
                      Box Office Assistant · Winter Wonderland
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Provided front-line customer support for one of London’s
                      busiest attractions, handling ticket queries and ensuring
                      smooth guest experiences.
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://www.nhs.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4 transition-all"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md lg:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg"></div>
                  <header className="z-10 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                    Jul 2021 – Sep 2021
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 group-hover:text-teal-300">
                      Call Handler · NHS Test & Trace
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Assisted the UK’s COVID-19 response by delivering clear,
                      empathetic communication and resolving public queries.
                    </p>
                  </div>
                </a>
              </li>
            </ol>
          </section>

          {/* PROJECTS */}
          <section id="projects" aria-label="Projects">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
              Projects
            </h2>

            <ul className="group/list">
              {/* PeerFit V2 (latest) */}
              <li className="mb-12">
                <a
                  href="/peerfitv2"
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:!opacity-100 lg:group-hover/list:opacity-50"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg" />
                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3 className="font-medium leading-tight text-slate-200 group-hover:text-teal-300">
                      PeerFit v2
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      The next evolution of PeerFit — a sports-matching platform that
                      connects players by sport, skill level, and location. Built with
                      modern tooling and powered by{" "}
                      <span className="text-slate-200 font-medium">Supabase</span> for
                      real-time features and authentication.
                    </p>
                    <ul className="mt-2 flex flex-wrap">
                      {["React", "TypeScript", "Tailwind CSS", "Supabase"].map((tag) => (
                        <li key={tag} className="mr-1.5 mt-2">
                          <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                            {tag}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Image
                    src={peerfitv2Preview}
                    alt="PeerFit V2 preview"
                    className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  />
                </a>
              </li>

              {/* Explore Space */}
              <li className="mb-12">
                <a
                  href="/explore-space"
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:!opacity-100 lg:group-hover/list:opacity-50"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg" />
                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3 className="font-medium leading-tight text-slate-200 group-hover:text-teal-300">
                      Explore Space
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      A space visualization app built with{" "}
                      <span className="text-slate-200 font-medium">v0.dev</span> to stay
                      in sync with the latest AI-assisted tools. It uses NASA’s public
                      API to stream live planetary data and imagery — from Mars’ surface
                      to the edge of our solar system — all wrapped in a clean,
                      interactive interface.
                    </p>
                    <ul className="mt-2 flex flex-wrap">
                      {["TypeScript", "Tailwind CSS", "v0.dev", "NASA API"].map((tag) => (
                        <li key={tag} className="mr-1.5 mt-2">
                          <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                            {tag}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Image
                    src={spacePreview}
                    alt="Explore Space preview"
                    className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  />
                </a>
              </li>

              {/* PeerFit V1 (original) */}
              <li>
                <a
                  href="/peerfitv1"
                  className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:!opacity-100 lg:group-hover/list:opacity-50"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:block group-hover:bg-slate-800/50 group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg" />
                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3 className="font-medium leading-tight text-slate-200 group-hover:text-teal-300">
                      PeerFit v1
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      The original version of PeerFit, built with PHP, HTML, CSS, and
                      JavaScript on{" "}
                      <span className="text-slate-200 font-medium">XAMPP</span>. It
                      introduced user accounts, activity posts, and basic matching logic
                      — setting the groundwork for the newer React-powered rebuild.
                    </p>
                    <ul className="mt-2 flex flex-wrap">
                      {["PHP", "HTML", "CSS", "JavaScript", "XAMPP"].map((tag) => (
                        <li key={tag} className="mr-1.5 mt-2">
                          <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                            {tag}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Image
                    src={peerfitv1Preview}
                    alt="PeerFit V1 preview"
                    className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
