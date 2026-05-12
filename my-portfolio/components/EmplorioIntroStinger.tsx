"use client";

import { useEffect, useState } from "react";

/**
 * EmplorioIntroStinger — branded cold-open for the Emplorio case study.
 *
 *   0.0s   container fades in, shapes spawn at their off-centre positions
 *   0.2s   four floating shapes glide toward centre, rotations relax to 0°
 *   1.1s   shapes briefly cluster, then burst outward (scale up + rotate + fade)
 *   1.5s   "Emplorio" wordmark fades up + clears blur where the cluster was
 *   2.1s   hairline rule scales out beneath
 *   2.4s   Chrome Web Store badge fades up (Chrome icon + "Available on the Chrome Web Store")
 *   3.4s   stinger lifts up + fades; page revealed beneath
 *   3.9s   done
 *
 * Plays once per mount. Skippable on click / keypress. Respects reduced-motion.
 */

const TOTAL_MS = 3900;

type Phase = "playing" | "done";

type Shape = {
  /** initial position (vw / vh strings) */
  from: { left?: string; right?: string; top?: string; bottom?: string };
  size: number;
  radius: number;
  rotate: number;
  /** burst direction at the end (px) */
  burstX: number;
  burstY: number;
  burstRot: number;
  delay: number; // converge stagger
  tint: string;
};

const SHAPES: Shape[] = [
  {
    from: { left: "8%", top: "14%" },
    size: 180,
    radius: 28,
    rotate: -8,
    burstX: -520,
    burstY: -340,
    burstRot: -42,
    delay: 0,
    tint: "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.10))",
  },
  {
    from: { right: "6%", top: "22%" },
    size: 130,
    radius: 36,
    rotate: 14,
    burstX: 560,
    burstY: -260,
    burstRot: 58,
    delay: 80,
    tint: "linear-gradient(135deg, rgba(167,139,250,0.24), rgba(99,102,241,0.10))",
  },
  {
    from: { left: "16%", bottom: "16%" },
    size: 220,
    radius: 9999,
    rotate: 0,
    burstX: -480,
    burstY: 360,
    burstRot: 24,
    delay: 160,
    tint: "radial-gradient(circle at 30% 30%, rgba(196,181,253,0.20), rgba(139,92,246,0.08) 60%, transparent 75%)",
  },
  {
    from: { right: "18%", bottom: "20%" },
    size: 110,
    radius: 24,
    rotate: 6,
    burstX: 460,
    burstY: 320,
    burstRot: -36,
    delay: 220,
    tint: "linear-gradient(135deg, rgba(129,140,248,0.22), rgba(167,139,250,0.10))",
  },
];

export default function EmplorioIntroStinger() {
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
            @keyframes emp-fade-in {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes emp-fade-up {
              0%   { opacity: 0; transform: translateY(14px); filter: blur(6px); }
              100% { opacity: 1; transform: translateY(0);   filter: blur(0); }
            }
            @keyframes emp-rule {
              0%   { transform: scaleX(0); }
              100% { transform: scaleX(1); }
            }
            @keyframes emp-lift {
              0%   { opacity: 1; transform: translateY(0);    filter: blur(0); }
              100% { opacity: 0; transform: translateY(-10%); filter: blur(2px); }
            }
            /* Shape choreography is per-instance via CSS vars, so we only need
               one keyframe definition that resolves the vars at each step. */
            @keyframes emp-shape {
              0% {
                opacity: 0;
                transform:
                  translate3d(var(--emp-from-x), var(--emp-from-y), 0)
                  rotate(var(--emp-from-rot))
                  scale(0.92);
              }
              22% {
                opacity: 1;
                transform:
                  translate3d(var(--emp-from-x), var(--emp-from-y), 0)
                  rotate(var(--emp-from-rot))
                  scale(1);
              }
              60% {
                opacity: 1;
                transform: translate3d(0, 0, 0) rotate(0deg) scale(1.06);
              }
              70% {
                opacity: 1;
                transform: translate3d(0, 0, 0) rotate(0deg) scale(1.10);
              }
              100% {
                opacity: 0;
                transform:
                  translate3d(var(--emp-burst-x), var(--emp-burst-y), 0)
                  rotate(var(--emp-burst-rot))
                  scale(1.30);
                filter: blur(6px);
              }
            }
            @keyframes emp-badge-pulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.0); }
              50%      { box-shadow: 0 0 0 6px rgba(167,139,250,0.10); }
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
            radial-gradient(ellipse 80% 45% at 50% 0%, rgba(139,92,246,0.14) 0%, transparent 100%),
            radial-gradient(ellipse 55% 40% at 92% 70%, rgba(99,102,241,0.10) 0%, transparent 100%),
            radial-gradient(ellipse 50% 35% at 8% 80%, rgba(167,139,250,0.07) 0%, transparent 100%),
            #0b0a18
          `,
          animation: "emp-lift 700ms cubic-bezier(.7,0,.3,1) 3400ms forwards",
        }}
      >
        {/* Fine dot grid — matches the page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(167,139,250,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
          }}
        />

        {/* Stage — shapes get absolute-centred so transform 0,0 = page centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: 0, height: 0 }}>
            {SHAPES.map((s, i) => {
              // Convert "from" positions (vw/vh) into px offsets from centre.
              // We approximate using vw/vh; final centring snap handled by translate3d(0,0,0) at 60% keyframe.
              // For positioning we use CSS vars; the visual "from" point is rendered via translate3d.
              return (
                <span
                  key={i}
                  className="absolute"
                  style={
                    {
                      // Anchor at centre
                      left: -s.size / 2,
                      top: -s.size / 2,
                      width: s.size,
                      height: s.size,
                      borderRadius: s.radius,
                      background: s.tint,
                      border: "1px solid rgba(167,139,250,0.22)",
                      backdropFilter: "blur(2px)",
                      boxShadow:
                        "0 0 32px rgba(139,92,246,0.15), inset 0 0 24px rgba(255,255,255,0.04)",
                      opacity: 0,
                      // CSS vars consumed by the emp-shape keyframe
                      "--emp-from-x": fromPxX(s),
                      "--emp-from-y": fromPxY(s),
                      "--emp-from-rot": `${s.rotate}deg`,
                      "--emp-burst-x": `${s.burstX}px`,
                      "--emp-burst-y": `${s.burstY}px`,
                      "--emp-burst-rot": `${s.burstRot}deg`,
                      animation: `emp-shape 1800ms cubic-bezier(.65,0,.35,1) ${
                        200 + s.delay
                      }ms forwards`,
                      willChange: "transform, opacity, filter",
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Centre stack — wordmark + rule + Chrome Web Store badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          {/* Eyebrow — tiny, sits above the wordmark for context */}
          <p
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-violet-300/65"
            style={{
              opacity: 0,
              animation:
                "emp-fade-up 600ms cubic-bezier(.22,1,.36,1) 1500ms forwards",
            }}
          >
            Chrome Extension
          </p>

          {/* Wordmark — same gradient as the page hero */}
          <h1
            className="font-bold tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #f1f5f9 0%, #c4b5fd 55%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "clamp(56px, 11vw, 132px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              opacity: 0,
              animation:
                "emp-fade-up 900ms cubic-bezier(.22,1,.36,1) 1500ms forwards",
              filter: "drop-shadow(0 0 28px rgba(139,92,246,0.20))",
            }}
          >
            Emplorio
          </h1>

          {/* Hairline rule */}
          <span
            aria-hidden
            className="mt-5 block h-px w-28 origin-center sm:w-36"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(196,181,253,0.85), transparent)",
              transform: "scaleX(0)",
              animation:
                "emp-rule 700ms cubic-bezier(.22,1,.36,1) 2100ms forwards",
            }}
          />

          {/* Chrome Web Store badge */}
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-left transition hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(167,139,250,0.32)",
              backdropFilter: "blur(8px)",
              opacity: 0,
              animation:
                "emp-fade-up 800ms cubic-bezier(.22,1,.36,1) 2400ms forwards, emp-badge-pulse 2.4s ease-in-out 3000ms infinite",
              boxShadow: "0 0 24px -8px rgba(139,92,246,0.35)",
            }}
          >
            <ChromeWebStoreIcon size={36} />
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium tracking-[0.04em] text-white/60">
                Available in the
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white sm:text-base">
                Chrome Web Store
              </span>
            </span>
            <span
              aria-hidden
              className="ml-1 text-violet-300/80 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>

        {/* Skip hint */}
        <p
          className="absolute bottom-5 right-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400/45 sm:bottom-6 sm:right-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "emp-fade-in 400ms 800ms forwards",
          }}
        >
          tap to skip
        </p>

        {/* Build tag */}
        <p
          className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-300/45 sm:bottom-6 sm:left-6 sm:text-[10px]"
          style={{
            opacity: 0,
            animation: "emp-fade-in 400ms 800ms forwards",
          }}
        >
          emplorio · v1
        </p>
      </div>
    </>
  );
}

/* Compute the initial "from" px offset (relative to viewport centre) from
   the vw/vh anchor strings. Done at render time using the current window
   size — only called once per intro mount. */
function fromPxX(s: Shape): string {
  if (typeof window === "undefined") return "0px";
  const w = window.innerWidth;
  if (s.from.left) return `${parseFloat(s.from.left) * w / 100 - w / 2}px`;
  if (s.from.right) return `${w / 2 - parseFloat(s.from.right) * w / 100 - s.size}px`;
  return "0px";
}
function fromPxY(s: Shape): string {
  if (typeof window === "undefined") return "0px";
  const h = window.innerHeight;
  if (s.from.top) return `${parseFloat(s.from.top) * h / 100 - h / 2}px`;
  if (s.from.bottom) return `${h / 2 - parseFloat(s.from.bottom) * h / 100 - s.size}px`;
  return "0px";
}

/* ── Chrome Web Store badge icon — shopping bag with the Chrome wheel
   peeking inside, matching Google's official "Available in the Chrome
   Web Store" graphic. Inline SVG so it scales cleanly on dark bg. ───── */
function ChromeWebStoreIcon({ size = 24 }: { size?: number }) {
  // wedge boundary points (cx=32, cy=56, r=16) — three 120° wedges
  // 210°: (18.14, 48)   330°: (45.86, 48)   90°: (32, 72)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id="emp-cws-bag">
          <rect x="4" y="12" width="56" height="48" rx="3" />
        </clipPath>
      </defs>

      {/* Bag body */}
      <rect x="4" y="12" width="56" height="48" rx="3" fill="#e8eaed" />

      {/* Top handle band — slightly darker grey stripe */}
      <path
        d="M 4 15 Q 4 12 7 12 L 57 12 Q 60 12 60 15 L 60 21 L 4 21 Z"
        fill="#dadce0"
      />

      {/* Handle hole — small oval cutout */}
      <ellipse cx="32" cy="16.6" rx="7.5" ry="1.7" fill="#9aa0a6" />

      {/* Chrome wheel, clipped to bag interior so the bottom is hidden */}
      <g clipPath="url(#emp-cws-bag)">
        {/* Red top wedge (210° → 330° via 270°) */}
        <path
          d="M 32 56 L 18.14 48 A 16 16 0 0 1 45.86 48 Z"
          fill="#EA4335"
        />
        {/* Yellow bottom-right wedge (330° → 90° via 30°) */}
        <path
          d="M 32 56 L 45.86 48 A 16 16 0 0 1 32 72 Z"
          fill="#FBBC04"
        />
        {/* Green bottom-left wedge (90° → 210° via 150°) */}
        <path
          d="M 32 56 L 32 72 A 16 16 0 0 1 18.14 48 Z"
          fill="#34A853"
        />
        {/* White separator ring */}
        <circle cx="32" cy="56" r="8" fill="#ffffff" />
        {/* Inner blue dot */}
        <circle cx="32" cy="56" r="6.2" fill="#1A73E8" />
      </g>
    </svg>
  );
}
