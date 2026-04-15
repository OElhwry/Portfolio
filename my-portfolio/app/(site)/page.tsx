"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectPreviews } from "@/lib/project-media";

const PROJECTS = [
  {
    href: "/peerfitv2",
    title: "PeerFit v2",
    eyebrow: "Flagship project",
    description:
      "A social sports platform where users discover local sessions, match by skill level, and build a profile with stats, badges, and peer reviews. Full production rebuild with Next.js 15, Supabase auth, SSR sessions, and light/dark theming. Live at peerfit.co.uk.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "Tailwind 4"],
    preview: "peerfitV2" as const,
    previewAlt: "PeerFit v2 preview",
    accentHover: "group-hover:text-teal-300",
    tagColor: "bg-teal-400/10 text-teal-300 border border-teal-400/20",
  },
  {
    href: "/deadcenter",
    title: "Deadcenter",
    eyebrow: "Browser game",
    description:
      "A precision reaction game with one rule: stop the dot. Twenty hand-designed levels across four difficulty tiers layer in bounces, orbits, and near-chaotic movement to keep a single mechanic endlessly engaging.",
    tags: ["React 19", "JavaScript", "Vite 8", "Web Audio API"],
    preview: "deadcenter" as const,
    previewAlt: "Deadcenter preview",
    accentHover: "group-hover:text-orange-300",
    tagColor: "bg-orange-400/10 text-orange-300 border border-orange-400/20",
  },
  {
    href: "/kvit",
    title: "Kvit",
    eyebrow: "Utility",
    description:
      "A zero-friction bill splitter built for the moment the waiter brings the card machine. Enter who spent what, pick equal or custom splits, and it calculates the smallest set of transfers to settle up. Works offline, no sign-up.",
    tags: ["React 19", "Vite", "Lucide React", "html2canvas"],
    preview: "kvit" as const,
    previewAlt: "Kvit preview",
    accentHover: "group-hover:text-emerald-300",
    tagColor: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20",
  },
  {
    href: "/aphelion",
    title: "Aphelion",
    eyebrow: "Interactive",
    description:
      "An interactive space app that turns planetary exploration into something cinematic. Surfaces Mars imagery, solar system data, and planetary facts in a clean, visual-first interface, with an integrated quiz to test what you have learned.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    preview: "aphelion" as const,
    previewAlt: "Aphelion preview",
    accentHover: "group-hover:text-sky-300",
    tagColor: "bg-sky-400/10 text-sky-300 border border-sky-400/20",
  },
  {
    href: "/peerfitv1",
    title: "PeerFit v1",
    eyebrow: "Origin",
    description:
      "The original version of PeerFit, built with PHP and MySQL on XAMPP. It proved the concept (accounts, activity posts, basic matching) and became the foundation the v2 React rebuild was designed to outgrow.",
    tags: ["PHP", "MySQL", "JavaScript", "XAMPP"],
    preview: "peerfitV1" as const,
    previewAlt: "PeerFit v1 preview",
    accentHover: "group-hover:text-amber-300",
    tagColor: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  },
];

const TECH_BADGES = [
  { name: "React",      color: "#61dafb" },
  { name: "Next.js",    color: "#ffffff" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind",   color: "#06b6d4" },
  { name: "Supabase",   color: "#3ecf8e" },
  { name: "Node.js",    color: "#84cc16" },
  { name: "Framer",     color: "#f472b6" },
  { name: "Figma",      color: "#a78bfa" },
];

export default function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "projects"];
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
    <main
      className="relative text-slate-400 antialiased selection:bg-sky-300 selection:text-slate-900"
      style={{
        background: `
          radial-gradient(ellipse 80% 55% at 50% -8%,  rgba(56,189,248,0.13)  0%, transparent 100%),
          radial-gradient(ellipse 55% 45% at 95% 72%,  rgba(99,102,241,0.09)  0%, transparent 100%),
          radial-gradient(ellipse 45% 40% at 5%  65%,  rgba(56,189,248,0.06)  0%, transparent 100%),
          #0b1120
        `,
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${cursor.x}px ${cursor.y}px, rgba(56,189,248,0.10), transparent 80%)`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-xl flex-col px-6 py-12 font-sans md:px-12 md:py-16 lg:flex-row lg:justify-between lg:gap-6 lg:py-0">

        {/* ── LEFT PANEL ── */}
        <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-16">
          <div>
            {/* Eyebrow */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-sky-400/55">
              Portfolio · 2026
            </p>

            {/* Gradient name */}
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              style={{
                background: "linear-gradient(135deg, #f1f5f9 0%, #bae6fd 55%, #7dd3fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <a href="/">Omar El Hawary</a>
            </h1>
            <div className="mt-2 h-px w-16 bg-gradient-to-r from-sky-400/70 to-transparent" />

            <h2 className="mt-4 text-lg font-mono font-medium text-sky-300/80 sm:text-xl">
              Front End Developer
            </h2>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              I build fast, interactive web products that feel as good to use as they look.
              Focused on the space where <span className="font-medium text-slate-200">design</span> meets{" "}
              <span className="font-medium text-slate-200">engineering</span>.
            </p>

            {/* Status + stat pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium text-emerald-300"
                style={{
                  border: "1px solid rgba(16,185,129,0.25)",
                  background: "rgba(16,185,129,0.08)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for work
              </span>
              {["London / Remote", "Front-end · Full-stack"].map((stat) => (
                <span
                  key={stat}
                  className="rounded-full px-3 py-1 text-[11px] font-medium text-sky-300/75"
                  style={{
                    border: "1px solid rgba(56,189,248,0.18)",
                    background: "rgba(56,189,248,0.06)",
                  }}
                >
                  {stat}
                </span>
              ))}
            </div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 flex max-w-xs flex-wrap gap-2"
            >
              {TECH_BADGES.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-md border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur-sm transition hover:scale-[1.05] hover:border-sky-400/35 hover:bg-sky-950/30"
                >
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: tech.color }} />
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Section nav */}
            <nav className="mt-6 hidden lg:block" aria-label="Main sections">
              <ul className="space-y-2">
                {["about", "experience", "projects"].map((id) => {
                  const label = id.charAt(0).toUpperCase() + id.slice(1);
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`group flex items-center py-2 transition-colors ${active ? "text-sky-300" : "text-slate-500"}`}
                      >
                        <span
                          className={`mr-4 h-px transition-all ${
                            active
                              ? "w-16 bg-sky-400"
                              : "w-8 bg-slate-700 group-hover:w-16 group-hover:bg-slate-400"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            active ? "text-sky-300" : "group-hover:text-slate-200"
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
          <ul className="mt-8 flex items-center gap-4" aria-label="Social links">
            <li>
              <a
                href="https://github.com/OElhwry"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-sky-400/35 hover:bg-sky-950/30 hover:text-sky-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/oelhawary"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-sky-400/35 hover:bg-sky-950/30 hover:text-sky-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5zm-11 19H5V9h3v10zM6.5 7.732c-.966 0-1.75-.79-1.75-1.765S5.534 4.203 6.5 4.203 8.25 4.993 8.25 5.968s-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-1.337-.027-3.062-1.865-3.062-1.865 0-2.15 1.459-2.15 2.968V19h-3V9h2.885v1.367h.041c.403-.765 1.388-1.568 2.857-1.568 3.052 0 3.617 2.009 3.617 4.626V19z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="mailto:omar.elhawary@hotmail.co.uk"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-slate-400 backdrop-blur-sm transition hover:border-sky-400/35 hover:bg-sky-950/30 hover:text-sky-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </a>
            </li>
            <li className="ml-auto">
              <Link
                href="mailto:omar.elhawary@hotmail.co.uk"
                className="group inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300 backdrop-blur-sm transition hover:border-sky-400/55 hover:bg-sky-500/15 hover:text-white focus-visible:outline-none"
                style={{ borderRadius: "3px" }}
              >
                Get in touch
                <span className="inline-block text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-400">→</span>
              </Link>
            </li>
          </ul>
        </header>

        {/* ── RIGHT CONTENT ── */}
        <div className="space-y-24 py-24 lg:w-[54%]">

          {/* ── ABOUT ── */}
          <section id="about" className="scroll-mt-24 space-y-5">
            <p className="leading-relaxed text-slate-300">
              Hi, I&apos;m Omar — a London-based developer who builds web products that feel as good to use
              as they look. My work sits at the intersection of design and engineering: thoughtful
              interfaces, snappy interactions, and the kind of small details users notice but rarely
              mention.
            </p>
            <p className="leading-relaxed">
              I studied{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.qmul.ac.uk/undergraduate/course-info/computer-science" target="_blank" rel="noreferrer" className="transition-colors hover:text-sky-300">Computer Science</a>
              </span>{" "}
              at{" "}
              <span className="font-medium text-slate-200">
                <a href="https://www.qmul.ac.uk" target="_blank" rel="noreferrer" className="transition-colors hover:text-sky-300">Queen Mary University of London</a>
              </span>
              , where I picked up the fundamentals in algorithms, systems, and software design. What
              really clicked for me was front-end work. The immediacy of shipping something people can
              click, break, and actually use turned a degree into a craft I wanted to keep getting
              better at.
            </p>
            <p className="leading-relaxed">
              I&apos;m currently looking for a role where I can grow as a{" "}
              <span className="font-medium text-slate-200">front-end or full-stack developer</span>,
              work on products with real users, and learn from a team that cares about its craft. Open
              to junior and mid-level positions, in London or remote.
            </p>
            <p className="leading-relaxed">
              Outside of code you&apos;ll usually find me at the gym training calisthenics, playing
              tennis and padel, or getting steadily worse at chess. This portfolio is one of my
              favourite side projects, so feel free to poke around.
            </p>
          </section>

          {/* ── EXPERIENCE ── */}
          <section id="experience" className="scroll-mt-24">
            <div className="mb-6 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Career
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Experience</h3>
            </div>
            <ol className="group/joblist space-y-2">
              <li>
                <a
                  href="https://hydeparkwinterwonderland.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.12)] group-hover:drop-shadow-lg" />
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0">
                    Nov 2023 – Jan 2024
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 transition group-hover:text-sky-300">
                      Box Office Assistant · Winter Wonderland
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Front-line customer support for one of London&apos;s busiest seasonal attractions.
                      Handled ticket queries, resolved issues on the spot, and kept guests moving through
                      the gates during peak demand.
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://www.nhs.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.12)] group-hover:drop-shadow-lg" />
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:mb-0">
                    Jul 2021 – Sep 2021
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium text-slate-200 transition group-hover:text-sky-300">
                      Call Handler · NHS Test &amp; Trace
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      Supported the UK&apos;s COVID-19 response with clear, empathetic communication.
                      Resolved public queries under pressure and learned how much the right words matter
                      when people are anxious.
                    </p>
                  </div>
                </a>
              </li>
            </ol>
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects" className="scroll-mt-24" aria-label="Projects">
            <div className="mb-8 lg:hidden">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Selected work
              </p>
              <h3 className="text-xl font-semibold tracking-wide text-slate-100">Projects</h3>
            </div>

            <ul className="group/list space-y-2">
              {PROJECTS.map((project, idx) => (
                <li key={project.href} className={idx < PROJECTS.length - 1 ? "mb-10" : ""}>
                  <a
                    href={project.href}
                    className="group relative grid gap-4 pb-1 transition-all hover:!opacity-100 sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50"
                  >
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition lg:block group-hover:bg-sky-500/5 group-hover:shadow-[inset_0_1px_0_0_rgba(56,189,248,0.14)] group-hover:drop-shadow-lg" />

                    {/* Thumbnail */}
                    <div className="relative z-10 sm:order-1 sm:col-span-2">
                      <div className="relative overflow-hidden rounded-lg border-2 border-slate-200/10 transition group-hover:border-sky-400/35">
                        <Image
                          src={projectPreviews[project.preview]}
                          alt={project.previewAlt}
                          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="z-10 sm:order-2 sm:col-span-6">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-400/50">
                        {project.eyebrow}
                      </p>
                      <h3 className={`flex items-center gap-2 font-medium leading-tight text-slate-200 transition ${project.accentHover}`}>
                        {project.title}
                        <span className="inline-block text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-current">
                          →
                        </span>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <div className={`rounded-full px-3 py-1 text-xs font-medium ${project.tagColor}`}>
                              {tag}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ── FOOTER / CLOSING NOTE ── */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="scroll-mt-24"
          >
            <div
              className="rounded-2xl p-8 text-center"
              style={{
                background: "rgba(11,17,32,0.60)",
                border: "1px solid rgba(56,189,248,0.14)",
              }}
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400/45">
                Let&apos;s build something
              </p>
              <h3 className="text-xl font-semibold text-slate-100">Open to new opportunities</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                Got a role, project, or just want to chat about front-end work? The inbox is open
                and I reply to every message.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="mailto:omar.elhawary@hotmail.co.uk"
                  className="group inline-flex items-center gap-3 border border-sky-500/30 bg-sky-500/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300 backdrop-blur-sm transition hover:border-sky-400/55 hover:bg-sky-500/15 hover:text-white focus-visible:outline-none"
                  style={{ borderRadius: "3px" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 group-hover:animate-pulse" />
                  Email me
                  <span className="inline-block text-sky-600 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-400">→</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/oelhawary"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-sky-300"
                >
                  Connect on LinkedIn &rarr;
                </Link>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
