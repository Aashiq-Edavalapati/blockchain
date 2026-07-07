import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Cpu,
  Code,
  Zap,
  Lock,
  RefreshCw,
  Users,
  Copy,
  Triangle,
  Coins,
  GitBranch,
} from "lucide-react";
// Adjust these imports to your project structure
import algorithms from "../data/algorithms";
import families from "../data/families";

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
    <div className="relative w-full max-w-md mx-auto lg:mx-0 select-none group">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[#2FD98A]/10 blur-[80px] rounded-full opacity-50 transition-opacity duration-700 group-hover:opacity-80" />
      
      {/* Geometric Container */}
      <div className="relative border border-white/10 bg-zinc-950/50 backdrop-blur-xl rounded-xl p-8 shadow-2xl">
        <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-lg" aria-hidden="true">
          {nodes.map((n, i) => (
            <line
              key={`base-${i}`}
              x1={n.x}
              y1={n.y}
              x2="200"
              y2="200"
              stroke="#27272A"
              strokeWidth="1"
            />
          ))}

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

          {nodes.map((n, i) => (
            <circle
              key={`node-${i}`}
              cx={n.x}
              cy={n.y}
              r="6"
              fill="#09090B"
              stroke="#52525B"
              strokeWidth="1.5"
              className="transition-colors duration-300 group-hover:stroke-zinc-400"
            />
          ))}

          <circle
            cx="200"
            cy="200"
            r="16"
            fill="none"
            stroke="#2FD98A"
            strokeWidth="2"
            className="consensus-ring"
          />

          <circle cx="200" cy="200" r="15" fill="#18181B" stroke="#71717A" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="4" fill="#A1A1AA" className="group-hover:fill-white transition-colors" />
        </svg>

        <p
          className="consensus-label text-center text-[11px] tracking-[0.2em] uppercase mt-4"
          style={{ fontFamily: FONT_MONO, color: "#2FD98A" }}
        >
          Block finalized
        </p>
      </div>

      <style>{`
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

function SectionEyebrow({ hex, label }) {
  return (
    <div
      className="inline-flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-zinc-500 mb-6"
      style={{ fontFamily: FONT_MONO }}
    >
      <span className="text-[#2FD98A]">{hex}</span>
      <span className="w-6 h-px bg-white/10" />
      <span className="font-medium text-zinc-400">{label}</span>
    </div>
  );
}

function SpecRow({ hex, icon: Icon, title, description, tags, onClick }) {
  const interactive = Boolean(onClick);
  return (
    <div
      onClick={onClick}
      className={`group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start md:items-center py-6 border-b border-white/5 last:border-0 ${
        interactive ? "cursor-pointer hover:bg-white/[0.02]" : ""
      } transition-all duration-200 px-4 -mx-4 rounded-xl`}
    >
      <div className="flex items-center gap-4 md:w-40">
        <span
          className="text-[11px] tracking-widest text-zinc-600"
          style={{ fontFamily: FONT_MONO }}
        >
          {hex}
        </span>
        <span className="w-10 h-10 flex items-center justify-center border border-white/10 bg-zinc-900/50 text-zinc-400 rounded-lg group-hover:text-zinc-200 group-hover:border-white/20 transition-all">
          <Icon size={16} strokeWidth={1.5} />
        </span>
      </div>

      <div className="max-w-xl">
        <h3 className="text-[15px] font-medium text-zinc-200 flex items-center gap-1.5 group-hover:text-white transition-colors">
          {title}
          {interactive && (
            <ArrowUpRight
              size={14}
              className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-zinc-400"
            />
          )}
        </h3>
        <p className="text-[14px] leading-relaxed mt-1 text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 md:justify-end md:w-64 mt-2 md:mt-0">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2.5 py-1 rounded-md border border-white/10 bg-zinc-900/30 text-zinc-400"
            style={{ fontFamily: FONT_MONO }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function PropertyCard({ icon: Icon, term, tagline, description }) {
  return (
    <div className="group relative border border-white/10 rounded-2xl p-6 bg-zinc-950/50 hover:bg-zinc-900/50 hover:border-white/20 transition-all duration-300">
      <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-zinc-900 rounded-lg text-[#2FD98A] mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <h4 className="text-[15px] font-medium text-zinc-100 tracking-wide">{term}</h4>
      <p
        className="text-[11px] uppercase tracking-[0.1em] text-zinc-500 mt-1 mb-4"
        style={{ fontFamily: FONT_MONO }}
      >
        {tagline}
      </p>
      <p className="text-[14px] leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}

function ProblemCard({ icon: Icon, title, children }) {
  return (
    <div className="flex gap-5 py-8 border-t border-white/5">
      <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-white/10 bg-zinc-900/50 rounded-lg text-zinc-400">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="text-[15px] font-medium text-zinc-100 mb-2">{title}</h4>
        <p className="text-[14px] leading-relaxed text-zinc-400 max-w-xl">{children}</p>
      </div>
    </div>
  );
}

function FamilyCard({ icon: Icon, name, mechanism, examples, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group text-left border border-white/10 rounded-2xl p-6 bg-zinc-950/50 hover:bg-zinc-900/80 hover:border-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex items-start justify-between mb-5">
        <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <ArrowUpRight
          size={16}
          className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-zinc-400"
        />
      </div>
      <h4 className="relative z-10 text-[15px] font-medium text-zinc-100">{name}</h4>
      <p className="relative z-10 text-[14px] leading-relaxed mt-2 text-zinc-400">{mechanism}</p>
      <div className="relative z-10 flex flex-wrap gap-2 mt-5">
        {examples.map((ex) => (
          <span
            key={ex}
            className="text-[10px] px-2.5 py-1 rounded-md border border-white/10 bg-zinc-900/50 text-zinc-400"
            style={{ fontFamily: FONT_MONO }}
          >
            {ex}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function HeroSection({ navigate }) {
  // Fallbacks if data arrays aren't hooked up yet
  const totalAlgos = algorithms?.length || 26;
  const totalFamilies = families?.length || 6;

  return (
    <div className="bg-[#030303] text-zinc-200 min-h-screen selection:bg-[#2FD98A]/30" style={{ fontFamily: FONT_SANS }}>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Modern ultra-subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        {/* Soft top-center glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left z-10">
            <div
              className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase text-zinc-400 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-full px-3.5 py-1.5 mb-8 shadow-sm"
              style={{ fontFamily: FONT_MONO }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FD98A] shadow-[0_0_8px_#2FD98A] animate-pulse" />
              Interactive reference · v1.2.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-semibold tracking-tight leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
              The architecture of
              <br />
              <span className="font-medium text-[0.92em] text-white" style={{ fontFamily: FONT_MONO }}>
                decentralized_consensus
              </span>
            </h1>

            <p className="text-[16px] text-zinc-400 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              Compare and take apart the consensus mechanisms behind modern block
              and graph-based networks — trade-offs, failure modes, and the
              chains that run each one.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-14">
              <button
                onClick={() => navigate("/explorer")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-black bg-white rounded-lg hover:bg-zinc-200 hover:scale-[0.98] active:scale-95 transition-all cursor-pointer group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Start exploring
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("fundamentals");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium text-zinc-300 bg-white/[0.03] border border-white/10 rounded-lg hover:bg-white/[0.08] hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                What is consensus?
              </button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 text-[12px] text-zinc-500 pt-6"
              style={{ fontFamily: FONT_MONO }}
            >
              <span className="flex items-center gap-2"><Cpu size={14}/> {totalAlgos} algorithms</span>
              <span className="text-zinc-700">/</span>
              <span className="flex items-center gap-2"><GitBranch size={14}/> {totalFamilies} families</span>
              <span className="text-zinc-700">/</span>
              <span className="flex items-center gap-2"><Code size={14}/> Open source</span>
            </div>
          </div>

          {/* Right: signature diagram */}
          <ConsensusDiagram />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Fundamentals */}
      {/* ============================================================ */}
      <section id="fundamentals" className="border-b border-white/10 bg-zinc-950/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <SectionEyebrow hex="0x00" label="Fundamentals" />
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-100 max-w-2xl">
            Why decentralized networks need consensus
          </h2>
          <p className="text-[15px] leading-relaxed text-zinc-400 max-w-2xl mt-5">
            A blockchain is, at its core, a ledger with no single owner. Thousands of
            independent computers around the world each hold a copy of the same
            history, and none of them is in charge. A{" "}
            <span className="text-zinc-200 font-medium">consensus mechanism</span> is the set of
            rules that lets all of these strangers — who don't trust each other, can't
            verify each other's identity, and may be offline, slow, or actively lying —
            agree on a single, canonical version of that history anyway.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-12">
            <ProblemCard icon={Users} title="The Byzantine Generals Problem">
              The classic thought experiment behind every consensus algorithm: several
              generals surround a city and can only coordinate by messenger. They must
              all attack together or all retreat together — a split decision is a
              disaster. Consensus mechanisms allow honest actors to agree on a single plan
              even when participants are actively working against them.
            </ProblemCard>
            <ProblemCard icon={Copy} title="The Double-Spend Problem">
              Digital information is trivially copyable, so what stops someone from
              spending the same coin twice? A decentralized network requires every node 
              to independently agree on one strict, ordered history
              of transactions, allowing provable rejection of duplicate actions.
            </ProblemCard>
          </div>

          <div className="mt-24">
            <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-zinc-500 mb-8">
              Core Guarantees
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PropertyCard
                icon={Lock}
                term="Safety"
                tagline="Nothing bad happens"
                description="All honest nodes agree on the same value and the same order. Once a transaction is finalized, it can never be reversed."
              />
              <PropertyCard
                icon={RefreshCw}
                term="Liveness"
                tagline="Something good happens"
                description="The network keeps producing new blocks and making progress, even while some nodes are offline, slow, or malicious."
              />
              <PropertyCard
                icon={Shield}
                term="Fault tolerance"
                tagline="Survival threshold"
                description="The maximum share of faulty or adversarial nodes a protocol can absorb while still holding safety and liveness guarantees."
              />
            </div>
          </div>

          <div className="mt-24 border border-white/10 rounded-2xl p-10 bg-zinc-950/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800/20 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center border border-white/10 bg-zinc-900 rounded-xl text-[#2FD98A] shadow-lg">
                <Triangle size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-[18px] font-medium text-zinc-100">
                  The Blockchain Trilemma
                </h3>
                <p className="text-[15px] leading-relaxed text-zinc-400 mt-3 max-w-3xl">
                  Every consensus mechanism sits somewhere on a triangle of{" "}
                  <span className="text-zinc-200">decentralization</span> (how many
                  independent participants can validate), <span className="text-zinc-200">security</span> (how
                  expensive an attack is), and{" "}
                  <span className="text-zinc-200">scalability</span> (transactions per second). 
                  Pushing hard on any two usually costs you the third. No algorithm escapes this trade-off.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-zinc-500">
                Primary Families
              </h3>
              <button
                onClick={() => navigate("/explorer")}
                className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-zinc-400 hover:text-white transition-colors cursor-pointer group"
                style={{ fontFamily: FONT_MONO }}
              >
                View all {totalFamilies} families
                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FamilyCard
                icon={Cpu}
                name="Proof of Work"
                mechanism="Nodes race to solve a costly cryptographic puzzle; whoever wins proposes the next block. Security comes from wasted energy."
                examples={["Bitcoin", "Dogecoin", "Monero"]}
                onClick={() => navigate("/explorer")}
              />
              <FamilyCard
                icon={Coins}
                name="Proof of Stake"
                mechanism="Validators lock up capital as collateral, and are chosen to propose blocks. Security comes from money at risk."
                examples={["Ethereum", "Cardano", "Polkadot"]}
                onClick={() => navigate("/explorer")}
              />
              <FamilyCard
                icon={Users}
                name="BFT / Voting-based"
                mechanism="A known set of validators explicitly votes on each block across multiple rounds, finalizing it the instant a supermajority agrees."
                examples={["Tendermint", "PBFT"]}
                onClick={() => navigate("/explorer")}
              />
              <FamilyCard
                icon={GitBranch}
                name="DAG-based"
                mechanism="Transactions reference multiple prior transactions directly instead of being bundled into a single-file chain of blocks."
                examples={["IOTA", "Hedera"]}
                onClick={() => navigate("/explorer")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spec index */}
      <section className="bg-zinc-950/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <SectionEyebrow hex="0x01" label="Index Contents" />
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-zinc-100">What's in the explorer</h2>
            <p className="text-[15px] text-zinc-400 mt-2">
              Four analytical lenses to inspect every protocol.
            </p>
          </div>

          <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-2 shadow-2xl">
            <SpecRow
              hex="0x01"
              icon={Shield}
              title="Trilemma Scorecard"
              description="Compare decentralization, security, and scalability trade-offs, along with failure modes."
              tags={["Decentralization", "Security", "Scalability"]}
            />
            <SpecRow
              hex="0x02"
              icon={Zap}
              title="Protocol Explorer"
              description="Filter by consensus family or search directly. Inspect leader election and finality rules."
              tags={["Filter", "Search", "Rules"]}
              onClick={() => navigate("/explorer")}
            />
            <SpecRow
              hex="0x03"
              icon={Cpu}
              title="Real-World Mapping"
              description="See which production blockchains run which algorithm natively on their Layer 1."
              tags={["Bitcoin", "Ethereum", "Solana"]}
            />
            <SpecRow
              hex="0x04"
              icon={Code}
              title="Execution Languages"
              description="Check client implementations across major languages and cross-client compatibility."
              tags={["Go", "Rust", "Solidity"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}