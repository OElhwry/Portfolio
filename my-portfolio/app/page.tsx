"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#0d1224] via-[#0b132b] to-[#1a1f3a] text-slate-300 flex items-center justify-center px-8 overflow-hidden">
      {/* cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-transform duration-200"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(80, 115, 255, 0.15), transparent 80%)`,
        }}
      ></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
        {/* LEFT SIDE */}
        <section className="space-y-6">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-100">
              Omar Elhawary
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium text-slate-400 mt-2">
              Front End Engineer
            </h2>
            <p className="mt-4 text-slate-400 text-base max-w-sm">
              I build accessible, pixel-perfect digital experiences for the web.
            </p>
          </div>

          <nav className="mt-12 flex flex-col gap-4 font-medium text-sm tracking-wide uppercase text-slate-400">
            {["About", "Experience", "Projects"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group inline-flex items-center gap-2"
              >
                <span className="w-10 h-[1px] bg-slate-600 group-hover:bg-slate-300 transition-all"></span>
                <span className="group-hover:text-slate-100">{item}</span>
              </a>
            ))}
          </nav>

          <div className="flex gap-4 mt-10 text-slate-500">
            {["github", "linkedin", "instagram", "codepen"].map((icon) => (
              <a
                key={icon}
                href="#"
                aria-label={icon}
                className="hover:text-slate-200 transition-colors"
              >
                <i className={`fa-brands fa-${icon} text-xl`} />
              </a>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="space-y-4 leading-relaxed text-slate-400 text-[15px]">
          <p>
            I’m a developer passionate about crafting accessible, pixel-perfect
            user interfaces that blend thoughtful design with robust engineering.
            My favorite work lies at the intersection of design and development,
            creating experiences that not only look great but are meticulously
            built for performance and usability.
          </p>
          <p>
            Currently, I’m a Front-End Developer focused on building sleek,
            interactive, and performant web apps that emphasize usability and
            accessibility.
          </p>
          <p>
            In the past, I’ve worked on multiple projects ranging from web apps
            and dashboards to small digital experiences for clients and
            startups.
          </p>
          <p>
            In my spare time, I enjoy tennis, coding side projects, and exploring
            creative digital design.
          </p>
        </section>
      </div>
    </main>
  );
}
