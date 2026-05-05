"use client";

/**
 * CSS-rendered project thumbnails with unique geometric identities.
 * Each project gets a distinctive icon + gradient — no screenshot images needed.
 */

type ProjectKey = "emplorio" | "peerfitV2" | "deadcenter" | "splidit" | "aphelion" | "peerfitV1";

interface Props {
  project: ProjectKey;
}

/* ── colour palettes per project ── */
const palette: Record<
  ProjectKey,
  { bg: string; glow: string; icon: string; accent: string; pattern: string }
> = {
  emplorio: {
    bg: "from-violet-950/85 via-indigo-900/40 to-slate-950/95",
    glow: "rgba(139,92,246,0.20)",
    icon: "text-violet-300",
    accent: "rgba(139,92,246,0.14)",
    pattern: "rgba(167,139,250,0.07)",
  },
  peerfitV2: {
    bg: "from-teal-950/80 via-teal-900/40 to-slate-950/90",
    glow: "rgba(45,212,191,0.18)",
    icon: "text-teal-400",
    accent: "rgba(45,212,191,0.12)",
    pattern: "rgba(45,212,191,0.07)",
  },
  deadcenter: {
    bg: "from-orange-950/80 via-orange-900/40 to-slate-950/90",
    glow: "rgba(251,146,60,0.18)",
    icon: "text-orange-400",
    accent: "rgba(251,146,60,0.12)",
    pattern: "rgba(251,146,60,0.07)",
  },
  splidit: {
    bg: "from-emerald-950/80 via-emerald-900/40 to-slate-950/90",
    glow: "rgba(52,211,153,0.18)",
    icon: "text-emerald-400",
    accent: "rgba(52,211,153,0.12)",
    pattern: "rgba(52,211,153,0.07)",
  },
  aphelion: {
    bg: "from-sky-950/80 via-sky-900/40 to-slate-950/90",
    glow: "rgba(56,189,248,0.18)",
    icon: "text-sky-400",
    accent: "rgba(56,189,248,0.12)",
    pattern: "rgba(56,189,248,0.07)",
  },
  peerfitV1: {
    bg: "from-amber-950/80 via-amber-900/40 to-slate-950/90",
    glow: "rgba(251,191,36,0.18)",
    icon: "text-amber-400",
    accent: "rgba(251,191,36,0.12)",
    pattern: "rgba(251,191,36,0.07)",
  },
};

/* ── icon SVGs ── */

function EmplorioIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Form with AI sparkle — autofill + Claude */}
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      {/* Filled field with check */}
      <line x1="16" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <polyline points="42,21 44.5,23.5 49,19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Filled field with check */}
      <line x1="16" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <polyline points="42,29 44.5,31.5 49,27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      {/* Field being filled — caret */}
      <line x1="16" y1="38" x2="30" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <line x1="30" y1="35" x2="30" y2="41" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
      {/* Sparkle / AI mark, top-right corner */}
      <path d="M48 6 L49.2 9.5 L52.5 10.5 L49.2 11.5 L48 15 L46.8 11.5 L43.5 10.5 L46.8 9.5 Z" fill="currentColor" opacity="0.85" />
      <circle cx="42" cy="46" r="0.9" fill="currentColor" opacity="0.4" />
      <circle cx="46" cy="44" r="0.7" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function PeerfitV2Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Connected-people / social-sports network */}
      <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="48" cy="40" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="52" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="22" x2="19" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="22" x2="45" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="20" y1="43" x2="29" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="43" x2="35" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="18" r="2" fill="currentColor" opacity="0.4" />
      <circle cx="16" cy="40" r="1.8" fill="currentColor" opacity="0.3" />
      <circle cx="48" cy="40" r="1.8" fill="currentColor" opacity="0.3" />
      <circle cx="32" cy="52" r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function DeadcenterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Crosshair / concentric target rings */}
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <circle cx="32" cy="32" r="15" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" opacity="0.8" />
      {/* Crosshair lines */}
      <line x1="32" y1="6" x2="32" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="32" y1="40" x2="32" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="6" y1="32" x2="24" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="32" x2="58" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function SplidItIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Split / divide receipt */}
      <rect x="16" y="10" width="32" height="44" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      {/* Dashed split line */}
      <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
      {/* Amount lines left */}
      <line x1="20" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="20" y1="26" x2="27" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="20" y1="32" x2="28" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      {/* Amount lines right */}
      <line x1="36" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="36" y1="26" x2="43" y2="26" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="36" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      {/* Total line */}
      <line x1="20" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="46" x2="40" y2="46" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
    </svg>
  );
}

function AphelionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Planet with orbit rings */}
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.25" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      {/* Orbital ellipses */}
      <ellipse cx="32" cy="32" rx="24" ry="10" stroke="currentColor" strokeWidth="0.8" opacity="0.25" transform="rotate(-20 32 32)" />
      <ellipse cx="32" cy="32" rx="20" ry="14" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(15 32 32)" />
      {/* Tiny moons */}
      <circle cx="52" cy="26" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="14" cy="38" r="1.2" fill="currentColor" opacity="0.4" />
      {/* Stars */}
      <circle cx="8" cy="12" r="0.8" fill="currentColor" opacity="0.3" />
      <circle cx="54" cy="10" r="0.6" fill="currentColor" opacity="0.25" />
      <circle cx="56" cy="52" r="0.7" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="54" r="0.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function PeerfitV1Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* Terminal / code origin */}
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Title bar dots */}
      <circle cx="18" cy="19" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="23" cy="19" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="19" r="1.5" fill="currentColor" opacity="0.2" />
      {/* Divider */}
      <line x1="10" y1="24" x2="54" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* Prompt lines */}
      <polyline points="16,30 21,34 16,38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <line x1="24" y1="34" x2="38" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <polyline points="16,42 21,46 16,50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <line x1="24" y1="46" x2="34" y2="46" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

const icons: Record<ProjectKey, React.FC<{ className?: string }>> = {
  emplorio: EmplorioIcon,
  peerfitV2: PeerfitV2Icon,
  deadcenter: DeadcenterIcon,
  splidit: SplidItIcon,
  aphelion: AphelionIcon,
  peerfitV1: PeerfitV1Icon,
};

export default function ProjectThumbnail({ project }: Props) {
  const p = palette[project];
  const Icon = icons[project];

  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${p.bg}`}
      style={{
        border: `1px solid ${p.accent}`,
      }}
    >
      {/* Radial glow behind icon */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${p.glow}, transparent 70%)`,
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(${p.pattern} 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />

      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            135deg,
            currentColor 0px,
            currentColor 1px,
            transparent 1px,
            transparent 16px
          )`,
        }}
      />

      {/* Icon */}
      <Icon className={`relative z-10 h-12 w-12 drop-shadow-lg ${p.icon}`} />
    </div>
  );
}
