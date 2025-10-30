"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

import peerfitMain from "../../public/peerfitmain.png";
import peerfitSignup from "../../public/peerfitsignup.png";
import peerfitInterests from "../../public/peerfitinterests.png";
import peerfitV1 from "../../public/peerfitv1.png";
import { motion } from "framer-motion";

type Screenshot = {
  src: StaticImageData;
  alt: string;
  caption: string;
};

const SCREENSHOTS: Screenshot[] = [
    { src: peerfitV1, alt: "PeerFit v1 - landing", caption: "Landing / Browse" },
    { src: peerfitMain, alt: "PeerFit v1 - feed", caption: "Logged-in Feed" },
    { src: peerfitSignup, alt: "PeerFit v1 - signup", caption: "Auth (Signup)" },
    { src: peerfitInterests, alt: "PeerFit v1 - interests", caption: "Interests" },
];

export default function PeerFitV1Page() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("about");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2 max-w-xs"
            >
              {["PHP", "HTML", "CSS", "JavaScript", "XAMPP"].map((tech) => (
                <div
                  key={tech}
                  className="px-3 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5 text-xs text-slate-100 inline-flex items-center gap-2 hover:scale-[1.05] hover:border-orange-400/30 transition"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      background:
                        tech === "PHP"
                          ? "#777bb4"
                          : tech === "HTML"
                          ? "#e34f26"
                          : tech === "CSS"
                          ? "#264de4"
                          : tech === "JavaScript"
                          ? "#f7df1e"
                          : "#f97316", // XAMPP (orange)
                    }}
                  />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </motion.div>


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
              href="https://github.com/OElhwry/Peerfit"
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
<motion.section
  id="images"
  className="scroll-mt-24"
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {/* Header */}
  <div className="flex flex-col items-center text-center mb-10">
    <h3 className="text-2xl font-semibold text-slate-100">PeerFit v1 Gallery</h3>
    <p className="mt-2 text-sm text-slate-400 max-w-lg">
      Explore the original PeerFit v1 interface — the foundation of the idea, with
      early UI concepts for browsing, signup, and community discovery.
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
</motion.section>



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
