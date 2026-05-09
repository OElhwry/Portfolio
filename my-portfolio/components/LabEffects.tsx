"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type CursorEffect =
  | "trail"
  | "spotlight"
  | "constellation"
  | "crosshair"
  | "goo"
  | "ripple"
  | "echo";
export type BackgroundEffect =
  | "aurora"
  | "wildwest"
  | "space"
  | "solar"
  | "particle"
  | "grasssky"
  | "earthblackhole"
  | "cityskyline";

export const BG_VIDEOS: Record<Exclude<BackgroundEffect, "aurora">, string> = {
  wildwest: "/images/projects/lab/wildwest.mp4",
  space: "/images/projects/lab/spaceanimation.mp4",
  solar: "/images/projects/lab/solarsystem.mp4",
  particle: "/images/projects/lab/particle.mp4",
  grasssky: "/images/projects/lab/grassandskysceneary.mp4",
  earthblackhole: "/images/projects/lab/earthAndBlackhole.mp4",
  cityskyline: "/images/projects/lab/cityAndPaintingsky.mp4",
};

// ── Cursor: trail of fading dots ─────────────────────────────────────────────
export function CursorTrail() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastRef.current < 28) return;
      lastRef.current = now;
      idRef.current += 1;
      const id = idRef.current;
      setDots((d) => [...d.slice(-14), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]">
      <AnimatePresence>
        {dots.map((d) => (
          <motion.span
            key={d.id}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            onAnimationComplete={() =>
              setDots((arr) => arr.filter((x) => x.id !== d.id))
            }
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: d.x,
              top: d.y,
              background: "rgba(165,180,252,0.9)",
              boxShadow: "0 0 12px rgba(129,140,248,0.55)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Cursor: spotlight (dim everything except a circle around cursor) ────────
export function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{
        background: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, transparent 0%, rgba(2,4,10,0.55) 50%, rgba(2,4,10,0.88) 100%)`,
      }}
    />
  );
}

// ── Cursor: ripple (water-style rings expand from each click) ───────────────
export function CursorRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const idRef = useRef(0);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      idRef.current += 1;
      const id = idRef.current;
      setRipples((arr) => [
        ...arr.slice(-7),
        { id, x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55]">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border border-indigo-300/60"
            style={{
              left: r.x,
              top: r.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ width: 240, height: 240, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            onAnimationComplete={() =>
              setRipples((arr) => arr.filter((x) => x.id !== r.id))
            }
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Cursor: echo (drop a fading word at every click) ────────────────────────
const ECHO_WORDS = [
  "hi.",
  "click!",
  "again?",
  "nice",
  "tap",
  "→",
  "✦",
  "wow",
  "yep",
  "ok",
];
export function CursorEcho() {
  const [labels, setLabels] = useState<
    { id: number; x: number; y: number; word: string }[]
  >([]);
  const idRef = useRef(0);
  const wordIdxRef = useRef(0);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      idRef.current += 1;
      const id = idRef.current;
      const word = ECHO_WORDS[wordIdxRef.current % ECHO_WORDS.length];
      wordIdxRef.current += 1;
      const dx = (Math.random() - 0.5) * 14;
      setLabels((arr) => [
        ...arr.slice(-9),
        { id, x: e.clientX + dx, y: e.clientY, word },
      ]);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55]">
      <AnimatePresence>
        {labels.map((l) => (
          <motion.span
            key={l.id}
            className="absolute font-mono text-sm font-medium text-indigo-200"
            style={{
              left: l.x,
              top: l.y,
              translateX: "-50%",
              translateY: "-50%",
              textShadow: "0 0 10px rgba(129,140,248,0.6)",
            }}
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [6, 0, -32, -64],
              scale: [0.85, 1.08, 1, 0.95],
            }}
            transition={{
              duration: 1.6,
              ease: "easeOut",
              times: [0, 0.15, 0.55, 1],
            }}
            onAnimationComplete={() =>
              setLabels((arr) => arr.filter((x) => x.id !== l.id))
            }
          >
            {l.word}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Cursor: constellation (click to drop stars, lines auto-connect) ─────────
export function CursorConstellation() {
  type Star = { id: number; x: number; y: number };
  const [stars, setStars] = useState<Star[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      idRef.current += 1;
      const next: Star = { id: idRef.current, x: e.clientX, y: e.clientY };
      setStars((s) => [...s.slice(-29), next]);
    };
    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  // Each star connects to its 2 nearest neighbours; dedupe edges.
  const lines: { from: Star; to: Star; key: string }[] = [];
  stars.forEach((s, i) => {
    const nearest = stars
      .map((o, j) => ({ o, d: (o.x - s.x) ** 2 + (o.y - s.y) ** 2, j }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    nearest.forEach(({ o }) => {
      const key = [s.id, o.id].sort((a, b) => a - b).join("-");
      if (!lines.some((l) => l.key === key)) lines.push({ from: s, to: o, key });
    });
  });

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] h-full w-full"
    >
      {lines.map((l) => (
        <motion.line
          key={l.key}
          x1={l.from.x}
          y1={l.from.y}
          x2={l.to.x}
          y2={l.to.y}
          stroke="rgba(165,180,252,0.32)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
      {stars.map((s) => (
        <motion.circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r="3"
          fill="rgba(199,210,254,0.95)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          style={{ filter: "drop-shadow(0 0 6px rgba(129,140,248,0.7))" }}
        />
      ))}
    </svg>
  );
}

// ── Cursor: crosshair HUD (full-screen hairlines + live coords) ─────────────
export function CursorCrosshair() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  const labelLeft = pos.x > window.innerWidth - 140 ? pos.x - 110 : pos.x + 14;
  const labelTop = pos.y > window.innerHeight - 40 ? pos.y - 24 : pos.y + 14;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55]">
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: pos.x,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(165,180,252,0.45) 50%, transparent)",
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{
          top: pos.y,
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(165,180,252,0.45) 50%, transparent)",
        }}
      />
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-300/65"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="absolute font-mono text-[10px] tracking-[0.16em] text-indigo-200/85"
        style={{ left: labelLeft, top: labelTop }}
      >
        X{String(Math.max(0, Math.round(pos.x))).padStart(4, "0")} · Y
        {String(Math.max(0, Math.round(pos.y))).padStart(4, "0")}
      </div>
    </div>
  );
}

// ── Cursor: gooey blobs (mercury-like merging trail) ────────────────────────
export function CursorGoo() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);
  const lastRef = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastRef.current < 30) return;
      lastRef.current = now;
      idRef.current += 1;
      const id = idRef.current;
      setDots((d) => [...d.slice(-9), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] h-full w-full"
    >
      <defs>
        <filter id="lab-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          />
        </filter>
      </defs>
      <g filter="url(#lab-goo)">
        <AnimatePresence>
          {dots.map((d) => (
            <motion.circle
              key={d.id}
              cx={d.x}
              cy={d.y}
              r="14"
              fill="rgba(165,180,252,0.95)"
              initial={{ opacity: 0.95, scale: 1 }}
              animate={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.95, ease: "easeOut" }}
              onAnimationComplete={() =>
                setDots((arr) => arr.filter((x) => x.id !== d.id))
              }
            />
          ))}
        </AnimatePresence>
      </g>
    </svg>
  );
}

// ── Background: drifting orbs + geometric shapes + twinkling dots ───────────
const AURORA_DOTS = [
  { left: "12%", top: "18%" },
  { left: "78%", top: "11%" },
  { left: "52%", top: "30%" },
  { left: "8%",  top: "72%" },
  { left: "92%", top: "55%" },
  { left: "36%", top: "88%" },
  { left: "64%", top: "76%" },
  { left: "22%", top: "44%" },
];

export function BackgroundAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Glowing orbs */}
      <span className="lab-orb lab-orb-1" />
      <span className="lab-orb lab-orb-2" />
      <span className="lab-orb lab-orb-3" />
      <span className="lab-orb lab-orb-4" />

      {/* Drifting geometric shapes */}
      <span className="lab-shape lab-shape-1" />
      <span className="lab-shape lab-shape-2" />
      <span className="lab-shape lab-shape-3" />
      <span className="lab-shape lab-shape-4" />
      <span className="lab-shape lab-shape-5" />

      {/* Twinkling dots */}
      {AURORA_DOTS.map((d, i) => (
        <span key={i} className="lab-dot" style={d} />
      ))}

      {/* Faint dot grid overlay to anchor the page */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(167,139,250,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <style jsx>{`
        .lab-dot {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 999px;
          background: rgba(196, 181, 253, 0.55);
          box-shadow: 0 0 6px rgba(167, 139, 250, 0.5);
          animation: lab-twinkle 6s ease-in-out infinite;
        }
        .lab-dot:nth-child(8n + 2) { animation-delay: -1.2s; }
        .lab-dot:nth-child(8n + 3) { animation-delay: -2.4s; }
        .lab-dot:nth-child(8n + 4) { animation-delay: -3.6s; }
        .lab-dot:nth-child(8n + 5) { animation-delay: -4.8s; }
        .lab-dot:nth-child(8n + 6) { animation-delay: -5.4s; }
        .lab-dot:nth-child(8n + 7) { animation-delay: -2.0s; }
        .lab-dot:nth-child(8n + 8) { animation-delay: -3.0s; }

        .lab-orb {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.6;
          will-change: transform;
        }
        .lab-orb-1 {
          left: -6%;
          top: 10%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.42), transparent 70%);
          animation: lab-drift-a 28s ease-in-out infinite;
        }
        .lab-orb-2 {
          right: -10%;
          top: 55%;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%);
          animation: lab-drift-b 36s ease-in-out infinite;
        }
        .lab-orb-3 {
          left: 35%;
          bottom: -12%;
          width: 360px;
          height: 360px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.32), transparent 70%);
          animation: lab-drift-c 32s ease-in-out infinite;
        }
        .lab-orb-4 {
          right: 25%;
          top: -8%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.18), transparent 70%);
          animation: lab-drift-d 40s ease-in-out infinite;
        }

        .lab-shape {
          position: absolute;
          border: 1px solid rgba(165, 180, 252, 0.18);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.04));
          backdrop-filter: blur(2px);
          will-change: transform;
        }
        .lab-shape-1 {
          left: 8%;
          top: 14%;
          width: 180px;
          height: 180px;
          border-radius: 28px;
          animation: lab-float-a 44s ease-in-out infinite;
        }
        .lab-shape-2 {
          right: 6%;
          top: 26%;
          width: 130px;
          height: 130px;
          border-radius: 36px;
          animation: lab-float-b 56s ease-in-out infinite;
        }
        .lab-shape-3 {
          left: 22%;
          bottom: 14%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          animation: lab-float-c 64s ease-in-out infinite;
        }
        .lab-shape-4 {
          right: 18%;
          bottom: 22%;
          width: 90px;
          height: 90px;
          border-radius: 18px;
          animation: lab-float-d 50s ease-in-out infinite;
        }
        .lab-shape-5 {
          left: 48%;
          top: 8%;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          animation: lab-float-e 38s ease-in-out infinite;
        }

        @keyframes lab-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50%      { opacity: 0.85; transform: scale(1.2); }
        }
        @keyframes lab-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(80px, 60px, 0); }
        }
        @keyframes lab-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(-90px, 60px, 0); }
        }
        @keyframes lab-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(50px, -70px, 0); }
        }
        @keyframes lab-drift-d {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(-60px, 80px, 0); }
        }
        @keyframes lab-float-a {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-8deg); }
          50%      { transform: translate3d(70px, 50px, 0) rotate(6deg); }
        }
        @keyframes lab-float-b {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(14deg); }
          50%      { transform: translate3d(-80px, 60px, 0) rotate(28deg); }
        }
        @keyframes lab-float-c {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50%      { transform: translate3d(60px, -70px, 0) rotate(-12deg); }
        }
        @keyframes lab-float-d {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(20deg); }
          50%      { transform: translate3d(-50px, -60px, 0) rotate(-10deg); }
        }
        @keyframes lab-float-e {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(40px, 70px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .lab-dot, .lab-orb, .lab-shape { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ── Background: looping video (used for all Lab video backgrounds) ───────────
export function BackgroundVideo({ src }: { src: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04060d]">
      <motion.video
        key={src}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.85) brightness(0.55)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Dimming overlay + vignette to fuse the video with the page chrome */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,6,13,0.35)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% 50%, transparent 30%, rgba(4,6,13,0.92) 100%)",
        }}
      />
    </div>
  );
}
