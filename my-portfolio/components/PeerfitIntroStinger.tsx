"use client";

import { useEffect, useState } from "react";

/**
 * PeerfitIntroStinger — terminal-boot reveal for the PeerFit v2 case study.
 *
 *   0.0s   crosshair scan lines draw across the screen on a graph-paper grid
 *   0.4s   mono header line types in: "// peerfit.system :: v2.0"
 *   1.0s   wordmark "PeerFit" fades up + clears blur, "_v2" cursor blinks
 *   1.7s   teal hairline draws beneath the wordmark
 *   1.9s   mono tagline appears: "FIND PEOPLE · PLAY SPORTS · STAY ACTIVE"
 *   2.3s   status row appears: "[ READY ]"
 *   2.9s   whole stinger lifts up + fades; page revealed beneath
 *   3.5s   done
 *
 * Plays once per mount. Skippable on click / keypress. Respects reduced-motion.
 */

const TOTAL_MS = 3500;

type Phase = "playing" | "done";

const HEADER = "// peerfit.system :: v2.0";
const TAGLINE = "FIND PEOPLE · PLAY SPORTS · STAY ACTIVE";
const TAGLINE_MOBILE = "FIND · PLAY · CONNECT";

export default function PeerfitIntroStinger() {
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
            @keyframes pf-scan-x {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes pf-scan-y {
              0%   { transform: scaleY(0); }
              100% { transform: scaleY(1); }
            }
            @keyframes pf-type {
              from { width: 0; }
              to   { width: 100%; }
            }
            @keyframes pf-fade-up {
              0%   { opacity: 0; transform: translateY(8px); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
            }
            @keyframes pf-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes pf-blink {
              0%, 49%   { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            @keyframes pf-rule {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes pf-lift {
              0%   { opacity: 1; transform: translateY(0); filter: blur(0); }
              100% { opacity: 0; transform: translateY(-12%); filter: blur(2px); }
            }
            @keyframes pf-caret-blink {
              0%, 50%   { opacity: 1; }
              51%, 100% { opacity: 0.2; }
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
            radial-gradient(ellipse 80% 55% at 50% 50%, rgba(20,184,166,0.10) 0%, transparent 70%),
            #060d12
          `,
          animation: "pf-lift 600ms cubic-bezier(.7,0,.3,1) 2900ms forwards",
        }}
      >
        {/* Graph-paper grid — same as the page, anchors the intro to the project */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20,184,166,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,184,166,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 75% at 50% 50%, #000 30%, transparent 100%)",
          }}
        />

        {/* Crosshair scan lines — draw in from origin */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px origin-left"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(20,184,166,0.55) 20%, rgba(94,234,212,0.85) 50%, rgba(20,184,166,0.55) 80%, transparent)",
            transform: "scaleX(0)",
            animation: "pf-scan-x 900ms cubic-bezier(.22,1,.36,1) 100ms forwards",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px origin-top"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(20,184,166,0.35) 30%, rgba(20,184,166,0.55) 50%, rgba(20,184,166,0.35) 70%, transparent)",
            transform: "scaleY(0)",
            animation: "pf-scan-y 800ms cubic-bezier(.22,1,.36,1) 250ms forwards",
          }}
        />

        {/* Corner brackets — schematic feel */}
        <CornerBracket pos="top-left" />
        <CornerBracket pos="top-right" />
        <CornerBracket pos="bottom-left" />
        <CornerBracket pos="bottom-right" />

        {/* Center stack */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          {/* Header — types in like a terminal */}
          <div
            className="mb-7 sm:mb-10 inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-tight"
            style={{
              color: "rgba(94,234,212,0.85)",
              opacity: 0,
              animation: "pf-fade-in 250ms 350ms forwards",
            }}
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "rgb(94,234,212)",
                boxShadow: "0 0 10px rgba(20,184,166,0.9)",
                animation: "pf-blink 1s steps(2, end) infinite",
              }}
            />
            <span
              className="overflow-hidden whitespace-nowrap"
              style={{
                display: "inline-block",
                width: 0,
                animation: "pf-type 700ms steps(25, end) 400ms forwards",
              }}
            >
              {HEADER}
            </span>
          </div>

          {/* Wordmark — mono-styled, no fancy gradient revamp */}
          <div className="relative inline-flex items-baseline">
            <span
              className="font-mono"
              style={{
                color: "#f1f5f9",
                fontSize: "clamp(40px, 11vw, 132px)",
                fontWeight: 600,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                opacity: 0,
                animation:
                  "pf-fade-up 700ms cubic-bezier(.22,1,.36,1) 1000ms forwards",
              }}
            >
              PeerFit
            </span>
            <span
              className="ml-1 font-mono"
              style={{
                color: "rgb(94,234,212)",
                fontSize: "clamp(22px, 6vw, 72px)",
                fontWeight: 500,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                opacity: 0,
                animation:
                  "pf-fade-up 700ms cubic-bezier(.22,1,.36,1) 1200ms forwards",
              }}
            >
              _v2
            </span>
            <span
              aria-hidden
              className="ml-0.5 inline-block"
              style={{
                width: "0.4em",
                height: "0.9em",
                background: "rgb(94,234,212)",
                opacity: 0,
                animation:
                  "pf-fade-in 200ms 1400ms forwards, pf-caret-blink 0.9s steps(2, end) 1400ms infinite",
              }}
            />
          </div>

          {/* Hairline rule */}
          <span
            aria-hidden
            className="mt-6 block h-px w-32 origin-center sm:mt-8"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(20,184,166,0.85), transparent)",
              transform: "scaleX(0)",
              animation:
                "pf-rule 700ms cubic-bezier(.22,1,.36,1) 1700ms forwards",
            }}
          />

          {/* Tagline — shorter on mobile to avoid wide tracking overflow */}
          <p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] sm:mt-6 sm:text-xs sm:tracking-[0.32em]"
            style={{
              color: "rgba(148,163,184,0.7)",
              opacity: 0,
              animation:
                "pf-fade-up 600ms cubic-bezier(.22,1,.36,1) 1900ms forwards",
            }}
          >
            <span className="sm:hidden">{TAGLINE_MOBILE}</span>
            <span className="hidden sm:inline">{TAGLINE}</span>
          </p>

          {/* Status row */}
          <div
            className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase sm:mt-8 sm:text-xs"
            style={{
              color: "rgba(94,234,212,0.85)",
              letterSpacing: "0.28em",
              opacity: 0,
              animation:
                "pf-fade-in 400ms 2300ms forwards",
            }}
          >
            <span style={{ color: "rgba(148,163,184,0.5)" }}>[</span>
            <span
              aria-hidden
              className="h-1 w-1 rounded-full"
              style={{
                background: "rgb(94,234,212)",
                boxShadow: "0 0 8px rgba(20,184,166,0.9)",
              }}
            />
            ready
            <span style={{ color: "rgba(148,163,184,0.5)" }}>]</span>
          </div>
        </div>

        {/* Skip hint — device-agnostic, shrinks on mobile */}
        <p
          className="absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.20em] sm:bottom-6 sm:right-6 sm:text-[10px] sm:tracking-[0.24em]"
          style={{
            color: "rgba(148,163,184,0.4)",
            opacity: 0,
            animation: "pf-fade-in 400ms 600ms forwards",
          }}
        >
          tap to skip
        </p>

        {/* Build tag — bottom left */}
        <p
          className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.20em] sm:bottom-6 sm:left-6 sm:text-[10px] sm:tracking-[0.24em]"
          style={{
            color: "rgba(94,234,212,0.45)",
            opacity: 0,
            animation: "pf-fade-in 400ms 600ms forwards",
          }}
        >
          build · 2026
        </p>
      </div>
    </>
  );
}

function CornerBracket({
  pos,
}: {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const isTop = pos.startsWith("top");
  const isLeft = pos.endsWith("left");
  const positionClass =
    pos === "top-left"
      ? "top-5 left-5"
      : pos === "top-right"
        ? "top-5 right-5"
        : pos === "bottom-left"
          ? "bottom-5 left-5"
          : "bottom-5 right-5";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${positionClass} h-5 w-5`}
      style={{
        opacity: 0,
        animation: "pf-fade-in 600ms 200ms forwards",
      }}
    >
      <span
        className="absolute h-px w-full"
        style={{
          background: "rgba(20,184,166,0.7)",
          top: isTop ? 0 : "auto",
          bottom: isTop ? "auto" : 0,
          left: 0,
        }}
      />
      <span
        className="absolute h-full w-px"
        style={{
          background: "rgba(20,184,166,0.7)",
          top: 0,
          left: isLeft ? 0 : "auto",
          right: isLeft ? "auto" : 0,
        }}
      />
    </div>
  );
}
