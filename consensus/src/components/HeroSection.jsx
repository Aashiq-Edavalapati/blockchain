import { ArrowRight, Shield, Cpu, Code, Zap, ArrowUpRight } from "lucide-react";
import algorithms from "../data/algorithms";
import families from "../data/families";

// Drop-in font stack. If IBM Plex Sans / Mono are already aliased in your
// tailwind config (fontFamily.sans / fontFamily.mono), you can delete the
// <style> block below and the inline fontFamily overrides.
const FONT_SANS = "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace";

function ConsensusDiagram() {
  const nodes = [
    { x: 200, y: 68 },
    { x: 313, y: 135 },
    { x: 313, y: 265 },
    { x: 200, y: 332 },
    { x: 87, y: 265 },
    { x: 87, y: 135 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 select-none">
      <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden="true">
        {/* static base lines */}
        {nodes.map((n, i) => (
          <line
            key={`base-${i}`}
            x1={n.x}
            y1={n.y}
            x2="200"
            y2="200"
            stroke="#232326"
            strokeWidth="1"
          />
        ))}

        {/* traveling pulses */}
        {nodes.map((n, i) => (
          <line
            key={`pulse-${i}`}
            x1={n.x}
            y1={n.y}
            x2="200"
            y2="200"
            stroke="#2FD98A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 140"
            className="consensus-pulse"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
        ))}

        {/* outer nodes */}
        {nodes.map((n, i) => (
          <circle
            key={`node-${i}`}
            cx={n.x}
            cy={n.y}
            r="6"
            fill="#0A0A0B"
            stroke="#4B4B52"
            strokeWidth="1.5"
          />
        ))}

        {/* finalization ring */}
        <circle
          cx="200"
          cy="200"
          r="16"
          fill="none"
          stroke="#2FD98A"
          strokeWidth="2"
          className="consensus-ring"
        />

        {/* center node */}
        <circle cx="200" cy="200" r="15" fill="#111113" stroke="#5A5A62" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="4" fill="#8F8F97" />
      </svg>

      <p
        className="consensus-label text-center text-[11px] tracking-[0.2em] uppercase mt-2"
        style={{ fontFamily: FONT_MONO, color: "#2FD98A" }}
      >
        Block finalized
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .consensus-pulse {
          animation: consensus-travel 1.8s linear infinite;
        }
        .consensus-ring {
          transform-origin: 200px 200px;
          animation: consensus-flash 3s ease-out infinite;
        }
        .consensus-label {
          animation: consensus-label-flash 3s ease-out infinite;
        }

        @keyframes consensus-travel {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -146; }
        }
        @keyframes consensus-flash {
          0%   { r: 15; opacity: 0; }
          78%  { opacity: 0; }
          88%  { r: 15; opacity: 0.9; }
          100% { r: 34; opacity: 0; }
        }
        @keyframes consensus-label-flash {
          0%, 82% { opacity: 0.25; }
          90% { opacity: 1; }
          100% { opacity: 0.25; }
        }

        @media (prefers-reduced-motion: reduce) {
          .consensus-pulse, .consensus-ring, .consensus-label {
            animation: none !important;
          }
          .consensus-ring { opacity: 0.5; }
          .consensus-label { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

function SpecRow({ icon: Icon, index, title, description, tags, onClick }) {
  const interactive = Boolean(onClick);
  return (
    <div
      onClick={onClick}
      className={`group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start md:items-center py-7 border-t border-[#1D1D20] ${
        interactive ? "cursor-pointer hover:bg-[#111113]" : ""
      } transition-colors duration-150 px-2 -mx-2 rounded-md`}
    >
      <div className="flex items-center gap-3 md:w-40">
        <span
          className="text-[11px] tracking-widest"
          style={{ fontFamily: FONT_MONO, color: "#5A5A62" }}
        >
          §{index}
        </span>
        <span className="w-8 h-8 flex items-center justify-center border border-[#232326] text-[#A1A1AA] rounded-md">
          <Icon size={15} strokeWidth={1.75} />
        </span>
      </div>

      <div className="max-w-xl">
        <h3 className="text-[15px] font-semibold text-white flex items-center gap-1.5">
          {title}
          {interactive && (
            <ArrowUpRight
              size={14}
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#8F8F97]"
            />
          )}
        </h3>
        <p className="text-[13px] leading-relaxed mt-1.5 text-[#8F8F97]">{description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 md:justify-end md:w-56">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded border border-[#232326] text-[#8F8F97]"
            style={{ fontFamily: FONT_MONO }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection({ navigate }) {
  const totalAlgos = algorithms.length;
  const totalFamilies = families.length;

  return (
    <div
      className="bg-[#09090B] text-white"
      style={{ fontFamily: FONT_SANS }}
    >
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#1D1D20]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <div
              className="inline-block text-[11px] tracking-[0.15em] uppercase text-[#8F8F97] border border-[#232326] rounded px-2.5 py-1 mb-8"
              style={{ fontFamily: FONT_MONO }}
            >
              Interactive reference · v1.2.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] mb-6">
              The architecture of
              <br />
              <span
                className="font-medium text-[0.92em]"
                style={{ fontFamily: FONT_MONO }}
              >
                decentralized_consensus
              </span>
            </h1>

            <p className="text-[15px] text-[#8F8F97] max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              Compare and take apart the consensus mechanisms behind modern block
              and graph-based networks — trade-offs, failure modes, and the
              chains that run each one.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-14">
              <button
                onClick={() => navigate("/explorer")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-[#E4E4E7] rounded-md transition-colors cursor-pointer group"
              >
                Start exploring
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("spec-index");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#D4D4D8] hover:text-white border border-[#232326] hover:border-[#3A3A3E] rounded-md transition-colors cursor-pointer"
              >
                How it works
              </button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[12px] text-[#6E6E76] border-t border-[#1D1D20] pt-6"
              style={{ fontFamily: FONT_MONO }}
            >
              <span>{totalAlgos} algorithms</span>
              <span className="text-[#3A3A3E]">/</span>
              <span>{totalFamilies} families</span>
              <span className="text-[#3A3A3E]">/</span>
              <span>100% open source</span>
              <span className="text-[#3A3A3E]">/</span>
              <span>20+ chains mapped</span>
            </div>
          </div>

          {/* Right: signature diagram */}
          <ConsensusDiagram />
        </div>
      </div>

      {/* Spec index */}
      <section id="spec-index" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">What's in the index</h2>
          <p className="text-[13px] text-[#8F8F97] mt-1.5">
            Four ways to read every protocol in the reference.
          </p>
        </div>

        <div>
          <SpecRow
            index="01"
            icon={Shield}
            title="Trilemma scorecard"
            description="Compare decentralization, security, and scalability trade-offs, along with failure modes and security budgets, for every algorithm."
            tags={["Decentralization", "Security", "Scalability"]}
          />
          <SpecRow
            index="02"
            icon={Zap}
            title="Protocol explorer"
            description="Filter by consensus family or search directly. Inspect leader election, finality rules, and fault tolerance for each entry."
            tags={["Filter", "Search"]}
            onClick={() => navigate("/explorer")}
          />
          <SpecRow
            index="03"
            icon={Cpu}
            title="Real-world mapping"
            description="See which production blockchains run which algorithm — Bitcoin on Proof of Work, Solana on Proof of History, Cosmos on Tendermint."
            tags={["Bitcoin", "Ethereum", "Solana", "Cosmos"]}
          />
          <SpecRow
            index="04"
            icon={Code}
            title="Execution languages"
            description="Check client implementations across major languages, plus a compatibility matrix for cross-client consensus."
            tags={["Go", "Rust", "C++", "Solidity"]}
          />
        </div>
      </section>
    </div>
  );
}