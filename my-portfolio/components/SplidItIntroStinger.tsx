"use client";

import { useEffect, useState } from "react";

/**
 * SplidItIntroStinger — cold-open that visualises the app's core mechanic.
 *
 *   0.0s   container fades in over a subtly emerald-tinted void
 *   0.3s   "TOTAL" eyebrow + "£120.00" amount fade up
 *   0.9s   emerald bar grows outward from centre (scaleX 0 → 1)
 *   1.5s   3 divider lines flash across the bar, showing the split lines
 *   1.7s   bar fades out as 4 equal segments fade in over it,
 *          then snap outward to create visible gaps (with subtle overshoot)
 *   2.0s   "£30 · £30 · £30 · £30" labels fade up under each segment
 *   2.4s   "✓ Settled" check appears with an emerald pulse — held longer
 *   3.0s   bar stage fades down
 *   3.2s   "SplidIt" wordmark fades up + clears blur
 *   3.6s   hairline rule + "Call it even" tagline appear
 *   3.9s   stinger lifts up + fades; page revealed beneath
 *   4.3s   done
 *
 * Plays once per mount. Skippable on click / keypress. Respects reduced-motion.
 */

const TOTAL_MS = 4300;

type Phase = "playing" | "done";

const SEGMENT_COUNT = 4;
const BAR_WIDTH = 320; // px
const SEGMENT_WIDTH = 72; // px

/** Lateral offset each segment travels when the bar snaps apart (-18, -6, +6, +18 px) */
function segmentOffset(i: number): number {
  const mid = (SEGMENT_COUNT - 1) / 2;
  return (i - mid) * 12;
}

export default function SplidItIntroStinger() {
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

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes sp-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes sp-fade-up {
              0%   { opacity: 0; transform: translateY(10px); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0);    filter: blur(0); }
            }
            @keyframes sp-fade-up-hard {
              0%   { opacity: 0; transform: translateY(16px) scale(0.96); filter: blur(6px); }
              100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
            }
            @keyframes sp-fade-down {
              0%   { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-8px); filter: blur(3px); }
            }
            @keyframes sp-rule {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes sp-lift {
              0%   { opacity: 1; transform: translateY(0);    filter: blur(0); }
              100% { opacity: 0; transform: translateY(-10%); filter: blur(2px); }
            }
            /* Bar grows from centre, holds, then fades out as segments take over */
            @keyframes sp-bar-grow {
              0%   { opacity: 0; transform: scaleX(0); }
              25%  { opacity: 1; transform: scaleX(1); }
              80%  { opacity: 1; transform: scaleX(1); }
              100% { opacity: 0; transform: scaleX(1); }
            }
            /* Divider lines flash across the bar */
            @keyframes sp-divider {
              0%   { opacity: 0; transform: scaleY(0); }
              50%  { opacity: 0.85; transform: scaleY(1); }
              100% { opacity: 0; transform: scaleY(1); }
            }
            /* Each segment: fades in over the bar, then translates outward with subtle overshoot */
            @keyframes sp-segment {
              0%   { opacity: 0; transform: translateX(0); }
              25%  { opacity: 1; transform: translateX(0); }
              55%  { opacity: 1; transform: translateX(calc(var(--sp-seg-tx) * 1.5)); }
              75%  { opacity: 1; transform: translateX(var(--sp-seg-tx)); }
              100% { opacity: 0; transform: translateX(var(--sp-seg-tx)) translateY(-6px); }
            }
            /* Settled check — soft scale-in pulse */
            @keyframes sp-check-in {
              0%   { opacity: 0; transform: scale(0.7); }
              50%  { opacity: 1; transform: scale(1.1); }
              75%  { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(1); }
            }
            /* Emerald glow halo behind the check */
            @keyframes sp-check-halo {
              0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
              50%      { box-shadow: 0 0 0 14px rgba(52,211,153,0.20); }
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
            radial-gradient(ellipse 85% 45% at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 100%),
            radial-gradient(ellipse 55% 35% at 92% 65%, rgba(5,150,105,0.06) 0%, transparent 100%),
            #060c08
          `,
          animation: "sp-lift 700ms cubic-bezier(.7,0,.3,1) 3900ms forwards",
        }}
      >
        {/* Fine emerald dot grid — same texture as the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.60]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(52,211,153,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 65% at 50% 50%, #000 40%, transparent 100%)",
          }}
        />

        {/* ── Centre stage ─────────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">

          {/* Bar stage — fades down once the wordmark is ready to enter */}
          <div
            className="flex flex-col items-center"
            style={{
              animation: "sp-fade-down 400ms cubic-bezier(.7,0,.3,1) 3000ms forwards",
            }}
          >
            {/* TOTAL eyebrow */}
            <p
              className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-300/65"
              style={{
                opacity: 0,
                animation:
                  "sp-fade-up 500ms cubic-bezier(.22,1,.36,1) 300ms forwards",
              }}
            >
              Total
            </p>

            {/* Total amount */}
            <p
              className="mb-7 font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              style={{
                opacity: 0,
                animation:
                  "sp-fade-up 600ms cubic-bezier(.22,1,.36,1) 400ms forwards",
                textShadow:
                  "0 0 18px rgba(52,211,153,0.30), 0 0 36px rgba(16,185,129,0.15)",
              }}
            >
              £120.00
            </p>

            {/* Bar stage — fixed width container holding the bar + segments + dividers */}
            <div
              className="relative"
              style={{
                width: BAR_WIDTH,
                height: 14,
                maxWidth: "90vw",
              }}
            >
              {/* The continuous bar — grows from centre, then fades */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0.85) 0%, rgba(52,211,153,0.95) 50%, rgba(16,185,129,0.85) 100%)",
                  boxShadow:
                    "0 0 18px rgba(52,211,153,0.45), inset 0 0 0 1px rgba(255,255,255,0.10)",
                  transformOrigin: "center",
                  opacity: 0,
                  animation:
                    "sp-bar-grow 1500ms cubic-bezier(.22,1,.36,1) 900ms forwards",
                }}
              />

              {/* Divider hint lines — 3 vertical strokes at 25/50/75% that flash briefly */}
              {[25, 50, 75].map((pct, i) => (
                <span
                  key={pct}
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px origin-center"
                  style={{
                    left: `${pct}%`,
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 0 6px rgba(255,255,255,0.55)",
                    opacity: 0,
                    transform: "scaleY(0)",
                    animation: `sp-divider 500ms cubic-bezier(.22,1,.36,1) ${
                      1500 + i * 60
                    }ms forwards`,
                  }}
                />
              ))}

              {/* 4 equal segments — fade in over the bar, then snap outward */}
              {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
                const slotLeft = (BAR_WIDTH / SEGMENT_COUNT) * i;
                const segMargin =
                  (BAR_WIDTH / SEGMENT_COUNT - SEGMENT_WIDTH) / 2;
                return (
                  <span
                    key={i}
                    aria-hidden
                    className="absolute top-0 rounded-full"
                    style={
                      {
                        left: `${slotLeft + segMargin}px`,
                        width: `${SEGMENT_WIDTH}px`,
                        height: 14,
                        background:
                          "linear-gradient(180deg, rgba(110,231,183,0.95) 0%, rgba(16,185,129,0.95) 100%)",
                        boxShadow:
                          "0 0 14px rgba(52,211,153,0.40), inset 0 0 0 1px rgba(255,255,255,0.12)",
                        opacity: 0,
                        "--sp-seg-tx": `${segmentOffset(i)}px`,
                        animation: `sp-segment 1900ms cubic-bezier(.22,1,.36,1) 1700ms forwards`,
                      } as React.CSSProperties
                    }
                  />
                );
              })}
            </div>

            {/* Per-segment labels (£30 × 4) — appear under each segment */}
            <div
              className="mt-4 grid"
              style={{
                width: BAR_WIDTH,
                maxWidth: "90vw",
                gridTemplateColumns: `repeat(${SEGMENT_COUNT}, 1fr)`,
              }}
            >
              {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
                <span
                  key={i}
                  className="text-center font-mono text-xs font-medium tracking-tight text-emerald-300/90 sm:text-sm"
                  style={{
                    opacity: 0,
                    animation: `sp-fade-up 500ms cubic-bezier(.22,1,.36,1) ${
                      2000 + i * 70
                    }ms forwards`,
                  }}
                >
                  £30
                </span>
              ))}
            </div>

            {/* Settled check — final beat before the wordmark */}
            <div
              className="mt-6 inline-flex items-center gap-2"
              style={{
                opacity: 0,
                animation: "sp-check-in 900ms cubic-bezier(.22,1,.36,1) 2400ms forwards",
              }}
            >
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{
                  background: "rgba(16,185,129,0.18)",
                  border: "1px solid rgba(52,211,153,0.55)",
                  animation: "sp-check-halo 1100ms ease-out 2500ms forwards",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(110,231,183)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/85">
                Settled
              </span>
            </div>
          </div>

          {/* Wordmark stack — sits absolutely centred so the bar stage handover is seamless */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <h1
              className="font-bold tracking-tight text-slate-100"
              style={{
                fontSize: "clamp(56px, 11vw, 132px)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                opacity: 0,
                textShadow:
                  "0 0 24px rgba(52,211,153,0.35), 0 0 56px rgba(16,185,129,0.22)",
                animation:
                  "sp-fade-up-hard 800ms cubic-bezier(.22,1,.36,1) 3200ms forwards",
              }}
            >
              SplidIt
            </h1>

            <span
              aria-hidden
              className="mt-4 block h-px w-24 origin-center sm:mt-5 sm:w-32"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(110,231,183,0.85), transparent)",
                transform: "scaleX(0)",
                animation:
                  "sp-rule 600ms cubic-bezier(.22,1,.36,1) 3600ms forwards",
              }}
            />

            <p
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.30em] sm:mt-4 sm:text-xs"
              style={{
                color: "rgba(110,231,183,0.80)",
                opacity: 0,
                animation:
                  "sp-fade-up 500ms cubic-bezier(.22,1,.36,1) 3700ms forwards",
              }}
            >
              Call it even
            </p>
          </div>
        </div>

        {/* Skip hint */}
        <p
          className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400/45 sm:bottom-6 sm:right-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "sp-fade-in 400ms 600ms forwards",
          }}
        >
          tap to skip
        </p>

        {/* Build tag */}
        <p
          className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-400/45 sm:bottom-6 sm:left-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "sp-fade-in 400ms 600ms forwards",
          }}
        >
          splidit · settled
        </p>
      </div>
    </>
  );
}
