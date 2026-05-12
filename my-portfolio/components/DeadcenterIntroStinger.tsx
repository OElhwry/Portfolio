"use client";

import { useEffect, useState } from "react";

/**
 * DeadcenterIntroStinger — arcade cold-open that mirrors the game's mechanic.
 *
 *   0.0s   container fades in over a CRT-scanline void
 *   0.2s   concentric target rings draw in (stroke-dashoffset)
 *   0.5s   N/S/E/W crosshair lines extend out from centre
 *   0.7s   "INITIATE" eyebrow types in like an arcade HUD prompt
 *   0.9s   the dot enters from the left, starts oscillating wildly —
 *          wide slow sweeps → tighter rapid ones → SNAP to dead centre
 *   2.3s   HIT — shockwave bursts, screen flashes orange, target pulses
 *   2.6s   "DEADCENTER" wordmark slams up with heavy orange glow
 *   3.2s   tagline "One rule. Stop the dot." fades in
 *   3.5s   stinger lifts up + fades; page revealed beneath
 *   4.0s   done
 *
 * Plays once per mount. Skippable on click / keypress. Respects reduced-motion.
 */

const TOTAL_MS = 4000;

type Phase = "playing" | "done";

const HEADER = "// initiate // align // shoot";

export default function DeadcenterIntroStinger() {
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

  // Target ring radii + circumferences (for stroke-dashoffset draw)
  const R1 = 64;
  const R2 = 100;
  const R3 = 140;
  const C = (r: number) => 2 * Math.PI * r;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes dc-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes dc-fade-up {
              0%   { opacity: 0; transform: translateY(14px); filter: blur(6px); }
              100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
            }
            @keyframes dc-fade-up-hard {
              0%   { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(8px); }
              40%  { opacity: 1; transform: translateY(0)    scale(1.04); filter: blur(0); }
              100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
            }
            @keyframes dc-ring-draw {
              to { stroke-dashoffset: 0; }
            }
            @keyframes dc-line-extend-v {
              0%   { transform: scaleY(0); }
              100% { transform: scaleY(1); }
            }
            @keyframes dc-line-extend-h {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes dc-type {
              from { width: 0; }
              to   { width: 100%; }
            }
            @keyframes dc-blink {
              0%, 49%   { opacity: 1; }
              50%, 100% { opacity: 0.15; }
            }
            @keyframes dc-rule {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes dc-lift {
              0%   { opacity: 1; transform: translateY(0);    filter: blur(0); }
              100% { opacity: 0; transform: translateY(-12%); filter: blur(2px); }
            }
            /* Dot motion: wide sweeps → tighter → SNAP. Decreasing amplitude
               and shorter intervals build the "precision-game" tension. */
            @keyframes dc-dot-oscillate {
              0%   { opacity: 0; transform: translateX(-280px) scale(0.6); }
              4%   { opacity: 1; transform: translateX(-280px) scale(1); }
              /* slow wide sweeps */
              14%  { transform: translateX(280px); }
              24%  { transform: translateX(-260px); }
              /* faster, narrower */
              32%  { transform: translateX(230px); }
              39%  { transform: translateX(-210px); }
              46%  { transform: translateX(180px); }
              52%  { transform: translateX(-140px); }
              58%  { transform: translateX(95px); }
              64%  { transform: translateX(-55px); }
              70%  { transform: translateX(30px); }
              76%  { transform: translateX(-15px); }
              82%  { transform: translateX(6px); }
              /* SNAP — locks dead centre with a bright flare */
              90%  { transform: translateX(0) scale(1.45); opacity: 1; }
              100% { transform: translateX(0) scale(1);    opacity: 1; }
            }
            /* HIT shockwaves — expanding ring */
            @keyframes dc-shockwave {
              0%   { transform: scale(0.2); opacity: 0.85; }
              100% { transform: scale(6);   opacity: 0;    }
            }
            /* Screen flash on HIT */
            @keyframes dc-flash {
              0%   { opacity: 0; }
              4%   { opacity: 0.45; }
              35%  { opacity: 0; }
              100% { opacity: 0; }
            }
            /* Target pulse on HIT */
            @keyframes dc-target-pulse {
              0%   { transform: scale(1); }
              30%  { transform: scale(1.08); filter: drop-shadow(0 0 18px rgba(251,146,60,0.85)); }
              100% { transform: scale(1); }
            }
          `,
        }}
      />

      <div
        aria-hidden
        onClick={skip}
        className="fixed inset-0 z-[9999] cursor-pointer overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 90% 45% at 50% -5%, rgba(249,115,22,0.08) 0%, transparent 100%),
            radial-gradient(ellipse 60% 40% at 50% 110%, rgba(234,88,12,0.05) 0%, transparent 100%),
            #0c0806
          `,
          animation: "dc-lift 700ms cubic-bezier(.7,0,.3,1) 3500ms forwards",
        }}
      >
        {/* CRT scanline overlay — same texture as the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgba(0,0,0,0.10) 2px, rgba(0,0,0,0.10) 3px)",
          }}
        />

        {/* HIT screen flash — fires when dot snaps to centre */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(251,146,60,0.55) 0%, transparent 70%)",
            opacity: 0,
            mixBlendMode: "screen",
            animation: "dc-flash 1.4s ease-out 2300ms forwards",
          }}
        />

        {/* ── Target zone (crosshair + rings + dot) ─────────────── */}
        <div className="absolute inset-0 flex items-start justify-center" style={{ paddingTop: "22vh" }}>
          <div
            className="relative"
            style={{
              width: 320,
              height: 320,
              animation: "dc-target-pulse 600ms ease-out 2300ms forwards",
              transformOrigin: "center",
            }}
          >
            {/* Concentric target rings */}
            <svg
              viewBox="-160 -160 320 320"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              style={{ opacity: 0, animation: "dc-fade-in 400ms 200ms forwards" }}
            >
              {/* Outer ring */}
              <circle
                cx={0} cy={0} r={R3}
                fill="none"
                stroke="rgba(251,146,60,0.22)"
                strokeWidth={1.2}
                strokeDasharray={C(R3)}
                strokeDashoffset={C(R3)}
                style={{ animation: "dc-ring-draw 700ms cubic-bezier(.22,1,.36,1) 200ms forwards" }}
              />
              {/* Mid ring */}
              <circle
                cx={0} cy={0} r={R2}
                fill="none"
                stroke="rgba(251,146,60,0.35)"
                strokeWidth={1.2}
                strokeDasharray={C(R2)}
                strokeDashoffset={C(R2)}
                style={{ animation: "dc-ring-draw 600ms cubic-bezier(.22,1,.36,1) 320ms forwards" }}
              />
              {/* Inner ring — bullseye boundary */}
              <circle
                cx={0} cy={0} r={R1}
                fill="none"
                stroke="rgba(251,146,60,0.55)"
                strokeWidth={1.4}
                strokeDasharray={C(R1)}
                strokeDashoffset={C(R1)}
                style={{ animation: "dc-ring-draw 500ms cubic-bezier(.22,1,.36,1) 440ms forwards" }}
              />
              {/* Tiny centre target dot — the destination */}
              <circle
                cx={0} cy={0} r={3}
                fill="rgba(251,146,60,0.85)"
                style={{
                  opacity: 0,
                  animation: "dc-fade-in 400ms 600ms forwards, dc-blink 1.1s steps(2, end) 600ms infinite",
                }}
              />
            </svg>

            {/* Crosshair lines — scale-out from centre */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 origin-bottom -translate-x-1/2"
              style={{
                width: 1,
                height: 70,
                bottom: "50%",
                top: "auto",
                background:
                  "linear-gradient(to top, rgba(251,146,60,0.5), transparent)",
                transform: "translateX(-50%) scaleY(0)",
                transformOrigin: "bottom center",
                animation: "dc-line-extend-v 500ms cubic-bezier(.22,1,.36,1) 500ms forwards",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2"
              style={{
                width: 1,
                height: 70,
                background:
                  "linear-gradient(to bottom, rgba(251,146,60,0.5), transparent)",
                transform: "translateX(-50%) scaleY(0)",
                transformOrigin: "top center",
                animation: "dc-line-extend-v 500ms cubic-bezier(.22,1,.36,1) 500ms forwards",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2"
              style={{
                height: 1,
                width: 70,
                right: "50%",
                left: "auto",
                background:
                  "linear-gradient(to left, rgba(251,146,60,0.5), transparent)",
                transform: "translateY(-50%) scaleX(0)",
                transformOrigin: "right center",
                animation: "dc-line-extend-h 500ms cubic-bezier(.22,1,.36,1) 550ms forwards",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2"
              style={{
                height: 1,
                width: 70,
                background:
                  "linear-gradient(to right, rgba(251,146,60,0.5), transparent)",
                transform: "translateY(-50%) scaleX(0)",
                transformOrigin: "left center",
                animation: "dc-line-extend-h 500ms cubic-bezier(.22,1,.36,1) 550ms forwards",
              }}
            />

            {/* The dot — oscillates then snaps to centre.
                Travels along translateX; vertical position locked at target row. */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, #fff5e8 0%, #fb923c 45%, #c2410c 100%)",
                boxShadow:
                  "0 0 18px rgba(251,146,60,0.9), 0 0 36px rgba(251,146,60,0.55), 0 0 72px rgba(234,88,12,0.35)",
                opacity: 0,
                animation:
                  "dc-dot-oscillate 1500ms cubic-bezier(.55,0,.45,1) 900ms forwards",
                willChange: "transform, opacity",
              }}
            />

            {/* HIT shockwaves — three expanding rings, staggered */}
            {[
              { delay: 2300, dur: 700, opacity: 0.95 },
              { delay: 2380, dur: 820, opacity: 0.65 },
              { delay: 2460, dur: 950, opacity: 0.40 },
            ].map((sw, i) => (
              <span
                key={i}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  border: "2px solid rgba(251,146,60,0.9)",
                  boxShadow: "0 0 24px rgba(251,146,60,0.6)",
                  opacity: 0,
                  animation: `dc-shockwave ${sw.dur}ms cubic-bezier(.16,1,.3,1) ${sw.delay}ms forwards`,
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Top HUD eyebrow — types in like an arcade prompt ──── */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 inline-flex items-center gap-2 sm:top-[12%]"
          style={{
            fontFamily:
              "var(--font-geist-mono), ui-monospace, 'Courier New', monospace",
            color: "rgba(251,146,60,0.85)",
            fontSize: "10px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            opacity: 0,
            animation: "dc-fade-in 250ms 700ms forwards",
          }}
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "rgb(251,146,60)",
              boxShadow: "0 0 8px rgba(251,146,60,0.9)",
              animation: "dc-blink 0.55s steps(2, end) infinite",
            }}
          />
          <span
            className="overflow-hidden whitespace-nowrap"
            style={{
              display: "inline-block",
              width: 0,
              animation: "dc-type 700ms steps(28, end) 800ms forwards",
            }}
          >
            {HEADER}
          </span>
        </div>

        {/* ── Wordmark + rule + tagline — anchored below crosshair ── */}
        <div className="absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center sm:bottom-[20%]">
          <h1
            className="font-bold uppercase text-slate-100"
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: "clamp(48px, 10vw, 124px)",
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              opacity: 0,
              textShadow:
                "0 0 28px rgba(251,146,60,0.55), 0 0 56px rgba(234,88,12,0.30), 0 0 96px rgba(234,88,12,0.18)",
              animation:
                "dc-fade-up-hard 900ms cubic-bezier(.22,1,.36,1) 2600ms forwards",
            }}
          >
            Deadcenter
          </h1>

          <span
            aria-hidden
            className="mt-4 block h-px w-24 origin-center sm:mt-5 sm:w-32"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(251,146,60,0.85), transparent)",
              transform: "scaleX(0)",
              animation: "dc-rule 600ms cubic-bezier(.22,1,.36,1) 3000ms forwards",
            }}
          />

          <p
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.30em] sm:mt-4 sm:text-xs"
            style={{
              color: "rgba(251,146,60,0.75)",
              opacity: 0,
              animation:
                "dc-fade-up 500ms cubic-bezier(.22,1,.36,1) 3200ms forwards",
            }}
          >
            One rule · Stop the dot
          </p>
        </div>

        {/* Skip hint */}
        <p
          className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400/45 sm:bottom-6 sm:right-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "dc-fade-in 400ms 800ms forwards",
          }}
        >
          tap to skip
        </p>

        {/* Build tag */}
        <p
          className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-orange-400/45 sm:bottom-6 sm:left-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "dc-fade-in 400ms 800ms forwards",
          }}
        >
          deadcenter · level 01
        </p>
      </div>
    </>
  );
}
