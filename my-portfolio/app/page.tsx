"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="relative bg-slate-900 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      {/* Spotlight Cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(29,78,216,0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:flex lg:justify-between lg:gap-4 lg:py-0">
        {/* LEFT SIDEBAR */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
              <a href="/">Omar Elhawary</a>
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
              Front-End Developer
            </h2>
            <p className="mt-4 max-w-xs leading-normal">
              I build responsive, interactive, and accessible web applications with
              React, TypeScript, and Tailwind CSS.
            </p>

            {/* Navigation */}
            <nav className="nav hidden lg:block" aria-label="In-page links">
              <ul className="mt-16 w-max">
                {["About", "Experience", "Projects"].map((item) => (
                  <li key={item}>
                    <a
                      className="group flex items-center py-3"
                      href={`#${item.toLowerCase()}`}
                    >
                      <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200" />
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social links */}
          <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
            <li className="mr-5">
              <a
                className="hover:text-slate-200"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                {/* GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54..."></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                className="hover:text-slate-200"
                href="#"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                {/* LinkedIn SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M4.98 3.5C4.98 4.88..."></path>
                </svg>
              </a>
            </li>
          </ul>
        </header>

        {/* RIGHT CONTENT */}
        <div className="lg:w-[52%] py-24 space-y-24">
          {/* ABOUT */}
          <section id="about">
            <div className="sticky top-0 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
                About
              </h2>
            </div>
            <div>
              <p className="mb-4">
                I’m a <span className="text-slate-200 font-medium">front-end developer</span> from London with
                a passion for creating seamless and visually engaging user
                experiences. My approach blends design awareness with technical
                precision — I love translating creative concepts into elegant,
                performant code.
              </p>
              <p className="mb-4">
                After earning a First-Class degree in Computer Science from{" "}
                <span className="text-slate-200 font-medium">Queen Mary University of London</span>, I
                focused on building real-world projects that merge usability and
                interactivity. Whether it’s a data-driven app or a visually rich
                interface, I’m driven by problem-solving and attention to detail.
              </p>
              <p className="mb-4">
                I’ve worked across both technical and customer-facing roles, which
                taught me to communicate clearly and adapt quickly. My technical
                strengths include{" "}
                <span className="text-slate-200 font-medium">
                  React, TypeScript, Firebase, and Tailwind CSS
                </span>
                , and I enjoy experimenting with new frameworks that improve
                developer productivity and user experience.
              </p>
              <p>
                Outside of work, I’m into tennis, design experimentation, and
                exploring innovative interfaces — always looking for ways to make
                the web more interactive, expressive, and human.
              </p>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" aria-label="Work experience">
            <div className="sticky top-0 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
                Experience
              </h2>
            </div>

            <ol className="group/list">
              {/* Winter Wonderland */}
              <li className="mb-12">
                <div className="relative grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                    Nov 2023 – Jan 2024
                  </header>
                  <div className="sm:col-span-6">
                    <h3 className="font-medium text-slate-200">
                      <a
                        href="https://hydeparkwinterwonderland.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                      >
                        Box Office Assistant · Winter Wonderland
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      Delivered high-volume customer service and resolved ticketing
                      issues, supporting over 300 visitors daily during London’s
                      largest seasonal event. Strengthened communication and
                      problem-solving skills while working in a fast-paced, dynamic
                      environment.
                    </p>
                    <ul className="mt-2 flex flex-wrap">
                      {["Customer Service", "Problem Solving", "Teamwork"].map(
                        (tag) => (
                          <li key={tag} className="mr-1.5 mt-2">
                            <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                              {tag}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </li>

              {/* NHS */}
              <li>
                <div className="relative grid pb-1 sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <header className="text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                    Jul 2021 – Sep 2021
                  </header>
                  <div className="sm:col-span-6">
                    <h3 className="font-medium text-slate-200">
                      <a
                        href="https://www.nhs.uk/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                      >
                        Call Handler · NHS Test & Trace
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-normal">
                      Supported the UK’s national COVID-19 response by assisting
                      callers and maintaining a 98%+ completion rate. Built strong
                      communication and empathy skills through handling sensitive
                      cases and ensuring high user satisfaction.
                    </p>
                    <ul className="mt-2 flex flex-wrap">
                      {["Communication", "Crisis Management", "Empathy"].map(
                        (tag) => (
                          <li key={tag} className="mr-1.5 mt-2">
                            <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                              {tag}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            </ol>
          </section>

          {/* PROJECTS */}
          <section id="projects" aria-label="Projects">
            <div className="sticky top-0 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
                Projects
              </h2>
            </div>

            <ul className="space-y-10">
              {[
                {
                  name: "PeerFit",
                  desc: "A sports-matching web app that connects players by skill level and location. Includes real-time activity posting, applications, and notifications.",
                  tech: ["React", "Firebase", "Tailwind CSS"],
                },
                {
                  name: "SolarView",
                  desc: "A space visualization web app that uses NASA APIs to show live planetary data, star positions, and real imagery.",
                  tech: ["JavaScript", "API Integration", "CSS Animations"],
                },
                {
                  name: "RentSmart",
                  desc: "A property comparison tool helping users evaluate rental costs and housing options through an interactive search and filtering UI.",
                  tech: ["React", "Data Parsing", "UI Design"],
                },
              ].map((p) => (
                <li key={p.name}>
                  <h3 className="font-medium text-slate-200">{p.name}</h3>
                  <p className="mt-2 text-sm leading-normal">{p.desc}</p>
                  <ul className="mt-2 flex flex-wrap">
                    {p.tech.map((tag) => (
                      <li key={tag} className="mr-1.5 mt-2">
                        <div className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                          {tag}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
