import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-6 text-slate-400 antialiased"
      style={{ background: "#070a12" }}
    >
      {/* Aurora orbs */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(60% 45% at 85% 8%, rgba(129,140,248,0.16) 0%, transparent 70%),
            radial-gradient(50% 40% at 8% 92%, rgba(14,165,233,0.10) 0%, transparent 70%)
          `,
        }}
      />

      {/* Dot field */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.22) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #000 50%, transparent 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(3,6,14,0.7) 100%)",
        }}
      />

      <div className="relative z-10 max-w-md text-center">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-indigo-300/60">
          Error · 404
        </p>
        <h1
          className="text-6xl font-bold tracking-tight sm:text-7xl"
          style={{
            background:
              "linear-gradient(135deg, #f1f5f9 0%, #c7d2fe 55%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Lost the trail.
        </h1>
        <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-indigo-400/70 to-transparent" />
        <p className="mt-5 text-sm leading-relaxed text-slate-400">
          The page you&apos;re after either moved, got renamed, or never existed
          in the first place. No harm done — the rest of the portfolio is still
          a click away.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 border border-indigo-400/30 bg-indigo-400/10 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-200 backdrop-blur-sm transition hover:border-indigo-300/55 hover:bg-indigo-400/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            style={{ borderRadius: "3px" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 group-hover:animate-pulse" />
            Back to portfolio
            <span className="inline-block text-indigo-500 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-300">
              →
            </span>
          </Link>
          <Link
            href="/#projects"
            className="text-sm font-medium text-slate-400 transition hover:text-indigo-300 focus-visible:outline-none focus-visible:text-indigo-300"
          >
            See projects &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
