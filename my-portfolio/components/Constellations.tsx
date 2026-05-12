"use client";

import { motion } from "framer-motion";
import { useId } from "react";

// ─── 4-pointed sparkle star (matches the reference art style) ────────────────
function Sparkle({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const i = r * 0.36;
  const d = `M${cx},${cy - r} L${cx + i},${cy - i} L${cx + r},${cy} L${cx + i},${cy + i} L${cx},${cy + r} L${cx - i},${cy + i} L${cx - r},${cy} L${cx - i},${cy - i}Z`;
  return <path d={d} fill={fill} />;
}

// ─── Generic constellation layer ─────────────────────────────────────────────
type Pt  = { x: number; y: number; r?: number; lead?: boolean };
type Ln  = [number, number];

type Props = {
  viewBox: string;
  imageHref: string;
  imageX?: number;
  imageY?: number;
  imageW?: number;
  imageH?: number;
  pts: Pt[];
  lns: Ln[];
  className?: string;
  drawSpan?: number;
  vpAmount?: number;
  vpMargin?: string;
};

function Constellation({
  viewBox,
  imageHref,
  imageX = 0,
  imageY = 0,
  imageW = 400,
  imageH = 400,
  pts,
  lns,
  className = "",
  drawSpan = 1.4,
  vpAmount,
  vpMargin = "-10%",
}: Props) {
  const uid    = useId();
  const gId    = `cg-${uid}`;
  const leadIdx = pts.findIndex((p) => p.lead);

  const VP = vpAmount !== undefined
    ? ({ once: true, amount: vpAmount, margin: vpMargin } as const)
    : ({ once: true, margin: vpMargin } as const);

  // Slowed timings — stars stagger in, lines draw, then the image fades
  const STAR_BASE_DELAY = 0.35;
  const STAR_STAGGER    = 0.11;
  const STAR_DURATION   = 0.7;
  const LINE_BASE_DELAY = 0.9;
  const LINE_DURATION   = 1.0;
  const IMAGE_DURATION  = 2.6;

  const starsDuration = STAR_BASE_DELAY + pts.length * STAR_STAGGER + STAR_DURATION;
  const linesDuration = LINE_BASE_DELAY + drawSpan + LINE_DURATION;
  const buildIn = Math.max(starsDuration, linesDuration);
  const imageDelay = buildIn + 0.4;

  // Gold gradient values per-star based on brightness
  const starColor = (r: number, lead?: boolean) =>
    lead ? "#fef9e7" : r >= 3.5 ? "#e8d98a" : "#c8b96a";

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden lg:block ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VP}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg viewBox={viewBox} className="h-full w-full" preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          {/* Gold gradient for lines */}
          <linearGradient id={`${uid}-line`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d4c070" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#b8a450" stopOpacity="0.22" />
          </linearGradient>
          {/* Glow for lead star */}
          <radialGradient id={gId}>
            <stop offset="0%"   stopColor="#fef9e7" stopOpacity="1" />
            <stop offset="55%"  stopColor="#e8d98a" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#c8a840" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ① Lines draw in progressively */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={{ scale: [1, 1.008, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <g stroke={`url(#${uid}-line)`} strokeWidth="1" strokeLinecap="round" opacity="0.45">
            {lns.map(([a, b], i) => {
              const delay = lns.length > 1 ? (i / (lns.length - 1)) * drawSpan : 0;
              return (
                <motion.line key={i}
                  x1={pts[a].x} y1={pts[a].y} x2={pts[b].x} y2={pts[b].y}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={VP}
                  transition={{ duration: LINE_DURATION, delay: LINE_BASE_DELAY + delay, ease: "easeInOut" }}
                />
              );
            })}
          </g>

          {/* ② Sparkle stars staggered per dot — these "create" first */}
          {pts.map((p, i) => {
            const r = p.r ?? 3;
            return (
              <motion.g key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: p.lead ? 0.65 : r >= 3.5 ? 0.55 : 0.42, scale: 1 }}
                viewport={VP}
                transition={{ duration: STAR_DURATION, delay: STAR_BASE_DELAY + i * STAR_STAGGER, ease: [0.34, 1.56, 0.64, 1] }}
                style={r >= 3.5 ? { filter: "drop-shadow(0 0 4px rgba(232,217,138,0.35))" } : undefined}
              >
                <Sparkle cx={p.x} cy={p.y} r={r} fill={starColor(r, p.lead)} />
              </motion.g>
            );
          })}

          {/* ③ Lead-star halo pulse */}
          {leadIdx >= 0 && (
            <motion.circle
              cx={pts[leadIdx].x} cy={pts[leadIdx].y} r="16"
              fill={`url(#${gId})`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.28, 0], scale: [0.55, 1.7, 1.7] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2, delay: imageDelay + 1.2, ease: "easeOut" }}
            />
          )}
        </motion.g>

        {/* ④ Image fades in AFTER stars + lines finish — the figure "appears" */}
        <motion.image
          href={imageHref}
          x={imageX}
          y={imageY}
          width={imageW}
          height={imageH}
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.14 }}
          viewport={VP}
          transition={{ duration: IMAGE_DURATION, delay: imageDelay, ease: "easeIn" }}
          style={{
            mixBlendMode: "screen",
            filter: "invert(1) brightness(0.85) contrast(1.1) sepia(0.55) hue-rotate(345deg) saturate(1.4)",
          }}
        />
      </svg>
    </motion.div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// AQUARIUS — kneeling water-bearer pouring an urn
// Stars trace: head → urn → arm → torso → knee, plus the water stream
// ═════════════════════════════════════════════════════════════════════════════
const AQ_PTS: Pt[] = [
  { x: 158, y: 78,  r: 3.2 },              //  0 head
  { x: 215, y: 70,  r: 4.5, lead: true },  //  1 top of urn (brightest)
  { x: 248, y: 110, r: 3.5 },              //  2 urn front lip
  { x: 195, y: 120, r: 3 },                //  3 hand on urn
  { x: 130, y: 138, r: 2.8 },              //  4 shoulder / back
  { x: 175, y: 178, r: 3 },                //  5 torso
  { x: 110, y: 245, r: 3 },                //  6 knee / leg
  { x: 235, y: 195, r: 3.2 },              //  7 water spout
  { x: 260, y: 255, r: 2.6 },              //  8 water mid-stream
  { x: 285, y: 320, r: 3.5 },              //  9 water pool
];
const AQ_LNS: Ln[] = [
  [0, 1], [1, 2], [2, 3], [3, 0],   // head + urn
  [3, 4], [4, 5], [5, 6],           // body to knee
  [2, 7], [7, 8], [8, 9],           // water stream
];

export function AquariusConstellation({ className = "" }: { className?: string }) {
  return (
    <Constellation
      viewBox="0 0 400 400"
      imageHref="/images/projects/constellation/aquarius.png"
      pts={AQ_PTS}
      lns={AQ_LNS}
      className={className}
      drawSpan={1.3}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// CAPRICORN — sea-goat: horns top-right, body center, fish-tail curling lower-left
// ═════════════════════════════════════════════════════════════════════════════
const CP_PTS: Pt[] = [
  { x: 215, y: 70,  r: 3 },                //  0 left-curling horn tip
  { x: 258, y: 95,  r: 4.5, lead: true },  //  1 head crown / between horns (brightest)
  { x: 250, y: 50,  r: 2.8 },              //  2 right horn tip
  { x: 295, y: 145, r: 3.2 },              //  3 snout
  { x: 250, y: 195, r: 3 },                //  4 beard / chest
  { x: 280, y: 270, r: 3 },                //  5 front leg / hoof
  { x: 195, y: 240, r: 2.8 },              //  6 belly
  { x: 165, y: 175, r: 3.5 },              //  7 back / spine
  { x: 110, y: 195, r: 3 },                //  8 tail attachment
  { x: 60,  y: 155, r: 3.5 },              //  9 upper fin tip
  { x: 70,  y: 230, r: 2.8 },              // 10 lower tail mid
  { x: 105, y: 270, r: 2.6 },              // 11 lower fin flick
];
const CP_LNS: Ln[] = [
  [2, 1], [0, 1],            // both horns into crown
  [1, 3], [3, 4],            // head down to chest
  [4, 5],                    // chest to front hoof
  [4, 6], [6, 7], [7, 1],    // belly → back → close to head
  [7, 8], [8, 9],            // back to upper fin
  [8, 10], [10, 11],         // tail flowing down
];

export function CapricornConstellation({ className = "" }: { className?: string }) {
  return (
    <Constellation
      viewBox="0 0 400 400"
      imageHref="/images/projects/constellation/capricorn.png"
      pts={CP_PTS}
      lns={CP_LNS}
      className={className}
      drawSpan={1.1}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// LEO — lion in profile, mane on right, tail far-left
// ═════════════════════════════════════════════════════════════════════════════
const LEO_PTS: Pt[] = [
  { x: 280, y: 105, r: 3.2 },              //  0 top of mane
  { x: 312, y: 138, r: 3 },                //  1 forehead
  { x: 332, y: 175, r: 2.8 },              //  2 nose / muzzle
  { x: 298, y: 198, r: 3 },                //  3 chin / jaw
  { x: 262, y: 215, r: 4.6, lead: true },  //  4 chest / heart (Regulus)
  { x: 268, y: 285, r: 2.8 },              //  5 front foot
  { x: 200, y: 240, r: 3 },                //  6 belly
  { x: 148, y: 290, r: 3 },                //  7 hind foot
  { x: 125, y: 215, r: 4 },                //  8 rump (Denebola)
  { x: 200, y: 180, r: 3 },                //  9 back ridge
  { x: 245, y: 158, r: 3 },                // 10 mane back
  { x: 65,  y: 195, r: 2.8 },              // 11 tail tuft
];
const LEO_LNS: Ln[] = [
  // Sickle (mane curl)
  [0, 10], [10, 1], [1, 2], [2, 3],
  // Body quadrilateral
  [3, 4], [4, 5],          // chest down to front foot
  [4, 6], [6, 7],          // belly to hind foot
  [6, 8], [8, 9], [9, 10], // rump back to mane
  // Tail
  [8, 11],
];

export function LeoConstellation({ className = "" }: { className?: string }) {
  return (
    <Constellation
      viewBox="0 0 400 400"
      imageHref="/images/projects/constellation/leo.png"
      pts={LEO_PTS}
      lns={LEO_LNS}
      className={className}
      drawSpan={1.3}
      vpAmount={0.35}
    />
  );
}
