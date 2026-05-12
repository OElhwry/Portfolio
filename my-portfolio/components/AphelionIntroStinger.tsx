"use client";

import { useEffect, useState } from "react";

/**
 * AphelionIntroStinger — cinematic cold-open for the Aphelion case study.
 *
 *   0.0s   container fades in over a star-flecked void
 *   0.2s   three concentric orbital rings draw in (stroke-dashoffset)
 *   0.5s   Earth fades in + scales up softly, begins a slow rotation
 *   1.2s   small Orbitron HUD eyebrow types in: "// MISSION 01 :: SOLAR SYSTEM"
 *   1.7s   APHELION wordmark (Playfair Display) fades up + clears blur
 *   2.4s   hairline rule scales out beneath the wordmark
 *   2.7s   distance HUD readout fades in: "5.9 BILLION KM · SUN → PLUTO"
 *   3.0s   stinger lifts up + fades; page revealed beneath
 *   3.5s   done
 *
 * Plays once per mount. Skippable on click / keypress. Respects reduced-motion.
 */

const TOTAL_MS = 3500;

type Phase = "playing" | "done";

const HEADER = "// mission 01 :: solar system";

export default function AphelionIntroStinger() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    setPhase("playing");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = previousOverflow;
    }, TOTAL_MS);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const skip = () => {
    if (phase !== "playing") return;
    setPhase("done");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = () => skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase !== "playing") return null;

  // Ring radii (svg units). Circumference = 2πr — used for dash-offset draw.
  const R1 = 130;
  const R2 = 185;
  const R3 = 245;
  const C = (r: number) => 2 * Math.PI * r;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes aph-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes aph-fade-up {
              0%   { opacity: 0; transform: translateY(14px); filter: blur(6px); }
              100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
            }
            @keyframes aph-ring-draw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes aph-ring-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes aph-earth-in {
              0%   { opacity: 0; transform: scale(0.92); filter: blur(4px); }
              100% { opacity: 1; transform: scale(1);    filter: blur(0); }
            }
            @keyframes aph-earth-scroll {
              0%   { background-position-x: 0%; }
              100% { background-position-x: 200%; }
            }
            @keyframes aph-type {
              from { width: 0; }
              to   { width: 100%; }
            }
            @keyframes aph-rule {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes aph-twinkle {
              0%, 100% { opacity: 0.25; }
              50%      { opacity: 0.85; }
            }
            @keyframes aph-lift {
              0%   { opacity: 1; transform: translateY(0);    filter: blur(0); }
              100% { opacity: 0; transform: translateY(-10%); filter: blur(2px); }
            }
            @keyframes aph-orbiter {
              from { transform: rotate(0deg) translateX(var(--aph-orbit-r)) rotate(0deg); }
              to   { transform: rotate(360deg) translateX(var(--aph-orbit-r)) rotate(-360deg); }
            }
          `,
        }}
      />

      <div
        aria-hidden
        onClick={skip}
        className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden"
        style={{
          // Same near-black void as the page itself, with a faint Earth-horizon glow
          background: `
            radial-gradient(ellipse 60% 35% at 50% 110%, rgba(80,170,255,0.10) 0%, transparent 70%),
            radial-gradient(ellipse 90% 50% at 50% -10%, rgba(8,16,32,0.55) 0%, transparent 100%),
            #02040a
          `,
          animation: "aph-lift 700ms cubic-bezier(.7,0,.3,1) 3000ms forwards",
        }}
      >
        {/* ── Twinkling starfield (positioned dots) ───────────────── */}
        <div className="pointer-events-none absolute inset-0">
          {[
            ["8%",  "12%", 1.5, 0],   ["18%", "78%", 2,   0.4],
            ["28%", "22%", 1,   1.1], ["32%", "60%", 1.5, 1.8],
            ["44%", "8%",  2,   0.6], ["54%", "88%", 1,   2.2],
            ["62%", "32%", 1.5, 1.4], ["72%", "70%", 2,   0.2],
            ["78%", "18%", 1,   2.6], ["86%", "52%", 1.5, 0.9],
            ["92%", "82%", 1,   1.7], ["12%", "44%", 1,   2.0],
            ["38%", "92%", 1.5, 0.5], ["68%", "10%", 1,   2.3],
            ["88%", "30%", 1.5, 0.8], ["22%", "30%", 1,   3.0],
          ].map(([left, top, size, delay], i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: left as string,
                top: top as string,
                width: `${size}px`,
                height: `${size}px`,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 0 4px rgba(255,255,255,0.6)",
                animation: `aph-twinkle 3.2s ease-in-out ${delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Centre stack ────────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

          {/* Earth + rings — relative wrapper for absolute centring */}
          <div className="relative flex items-center justify-center" style={{ width: 520, height: 520, maxWidth: "92vw", maxHeight: "70vh" }}>

            {/* Concentric orbital rings — SVG draws them in via dash-offset */}
            <svg
              viewBox="-260 -260 520 520"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              style={{ opacity: 0, animation: "aph-fade-in 600ms 100ms forwards" }}
            >
              {/* Inner ring — fastest spin */}
              <g
                style={{
                  transformOrigin: "center",
                  animation: "aph-ring-spin 80s linear infinite",
                }}
              >
                <circle
                  cx={0} cy={0} r={R1}
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth={0.7}
                  strokeDasharray={C(R1)}
                  strokeDashoffset={C(R1)}
                  style={{ animation: `aph-ring-draw 1100ms cubic-bezier(.22,1,.36,1) 200ms forwards` }}
                />
              </g>

              {/* Middle ring — medium spin (counter direction for visual life) */}
              <g
                style={{
                  transformOrigin: "center",
                  animation: "aph-ring-spin 130s linear infinite reverse",
                }}
              >
                <circle
                  cx={0} cy={0} r={R2}
                  fill="none"
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth={0.7}
                  strokeDasharray={C(R2)}
                  strokeDashoffset={C(R2)}
                  style={{ animation: `aph-ring-draw 1300ms cubic-bezier(.22,1,.36,1) 320ms forwards` }}
                />
                {/* Tick marks every 30° to feel schematic */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = Math.cos(angle) * (R2 - 4);
                  const y1 = Math.sin(angle) * (R2 - 4);
                  const x2 = Math.cos(angle) * (R2 + 4);
                  const y2 = Math.sin(angle) * (R2 + 4);
                  return (
                    <line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth={0.6}
                      strokeLinecap="round"
                      style={{
                        opacity: 0,
                        animation: `aph-fade-in 400ms ${1300 + i * 35}ms forwards`,
                      }}
                    />
                  );
                })}
              </g>

              {/* Outer ring — slowest spin */}
              <g
                style={{
                  transformOrigin: "center",
                  animation: "aph-ring-spin 200s linear infinite",
                }}
              >
                <circle
                  cx={0} cy={0} r={R3}
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={0.6}
                  strokeDasharray={C(R3)}
                  strokeDashoffset={C(R3)}
                  style={{ animation: `aph-ring-draw 1500ms cubic-bezier(.22,1,.36,1) 440ms forwards` }}
                />
                {/* Cyan orbiter dot — a "planet" moving along the orbit */}
                <circle
                  cx={R3} cy={0} r={3}
                  fill="rgba(120,200,255,0.95)"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(80,170,255,0.85))",
                    opacity: 0,
                    animation: "aph-fade-in 600ms 1700ms forwards",
                  }}
                />
              </g>
            </svg>

            {/* Earth — CSS-rendered sphere using equirectangular textures.
                Surface + clouds scroll horizontally to fake rotation, with
                spherical shading and a cyan atmospheric halo on top. */}
            <div
              className="relative"
              style={{
                width: 220,
                height: 220,
                opacity: 0,
                animation: "aph-earth-in 900ms cubic-bezier(.22,1,.36,1) 500ms forwards",
              }}
            >
              {/* Outer atmospheric halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  inset: "-16px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, transparent 47%, rgba(80,170,255,0.40) 50.5%, rgba(80,170,255,0.18) 55%, rgba(80,170,255,0.04) 64%, transparent 75%)",
                  filter: "blur(3px)",
                }}
              />

              {/* Clipped sphere — surface + clouds + shading layered inside */}
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  borderRadius: "50%",
                  boxShadow:
                    "inset 0 0 32px rgba(0,0,0,0.55), 0 0 28px rgba(80,170,255,0.22)",
                }}
              >
                {/* Surface — equirectangular daymap, scrolls 1 image width per 90s */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url('/images/projects/Aphelion/texture/2k_earth_daymap.jpg')",
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 50%",
                    animation: "aph-earth-scroll 90s linear 1500ms infinite",
                  }}
                />

                {/* Cloud layer — slightly faster, screen-blended white tone */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url('/images/projects/Aphelion/texture/2k_earth_clouds.jpg')",
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 50%",
                    mixBlendMode: "screen",
                    opacity: 0.55,
                    animation: "aph-earth-scroll 70s linear 1500ms infinite",
                  }}
                />

                {/* Spherical shading — light from upper-left, terminator bottom-right */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 28%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 22%, transparent 45%, transparent 55%, rgba(0,0,0,0.38) 72%, rgba(0,0,0,0.78) 100%)",
                  }}
                />

                {/* Inner cyan rim — atmosphere viewed from inside the sphere edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: "50%",
                    boxShadow: "inset 0 0 22px rgba(120,200,255,0.42)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Top eyebrow — types in like a HUD command */}
          <div
            className="absolute top-[12%] inline-flex items-center gap-2 sm:top-[14%]"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
              color: "rgba(120,200,255,0.85)",
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              opacity: 0,
              animation: "aph-fade-in 300ms 1100ms forwards",
            }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "rgb(120,200,255)",
                boxShadow: "0 0 8px rgba(80,170,255,0.95)",
              }}
            />
            <span
              className="overflow-hidden whitespace-nowrap"
              style={{
                display: "inline-block",
                width: 0,
                animation: "aph-type 800ms steps(29, end) 1200ms forwards",
              }}
            >
              {HEADER}
            </span>
          </div>

          {/* Wordmark + rule + readout — anchored below earth */}
          <div className="absolute bottom-[14%] flex flex-col items-center text-center sm:bottom-[16%]">
            <h1
              className="uppercase text-white"
              style={{
                fontFamily:
                  "var(--font-playfair), 'Playfair Display', 'Cormorant Garamond', 'Times New Roman', serif",
                fontWeight: 500,
                letterSpacing: "0.18em",
                fontSize: "clamp(40px, 8vw, 96px)",
                lineHeight: 1,
                opacity: 0,
                animation:
                  "aph-fade-up 900ms cubic-bezier(.22,1,.36,1) 1700ms forwards",
              }}
            >
              Aphelion
            </h1>

            <span
              aria-hidden
              className="mt-4 block h-px w-24 origin-center sm:mt-5 sm:w-32"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.85), transparent)",
                transform: "scaleX(0)",
                animation:
                  "aph-rule 700ms cubic-bezier(.22,1,.36,1) 2400ms forwards",
              }}
            />

            <p
              className="mt-3 sm:mt-4"
              style={{
                fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
                color: "rgba(255,255,255,0.55)",
                fontSize: "10px",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                opacity: 0,
                animation: "aph-fade-up 600ms cubic-bezier(.22,1,.36,1) 2700ms forwards",
              }}
            >
              5.9 Billion km · Sun → Pluto
            </p>
          </div>
        </div>

        {/* Skip hint — bottom right */}
        <p
          className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
            color: "rgba(255,255,255,0.35)",
            fontSize: "9px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            opacity: 0,
            animation: "aph-fade-in 400ms 700ms forwards",
          }}
        >
          tap to skip
        </p>

        {/* Mission tag — bottom left */}
        <p
          className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', system-ui, sans-serif",
            color: "rgba(120,200,255,0.45)",
            fontSize: "9px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            opacity: 0,
            animation: "aph-fade-in 400ms 700ms forwards",
          }}
        >
          aphelion · v1
        </p>
      </div>
    </>
  );
}
