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
  Search,
} from "lucide-react";

// Drop-in font stack matching the high-end standard
const FONT_SANS = "'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

export function ConsensusDiagram() {
  // Perfect hexagonal mathematical coordinates
  const nodes = [
    { x: 200, y: 40 },
    { x: 338, y: 120 },
    { x: 338, y: 280 },
    { x: 200, y: 360 },
    { x: 62, y: 280 },
    { x: 62, y: 120 },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto select-none group perspective-1000">
      {/* Precision Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-white/[0.015] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-white/[0.03] group-hover:scale-110 blur-xl" />
      
      <div className="relative p-8 lg:p-10 transition-transform duration-700 group-hover:scale-[1.02]">
        <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-2xl overflow-visible" aria-hidden="true">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Base Topology Mesh (Static) */}
          {nodes.map((n, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            const oppositeNode = nodes[(i + 3) % nodes.length];
            return (
              <g key={`static-mesh-${i}`}>
                {/* Perimeter connections */}
                <line x1={n.x} y1={n.y} x2={nextNode.x} y2={nextNode.y} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
                {/* Center connections */}
                <line x1={n.x} y1={n.y} x2="200" y2="200" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
                {/* Cross-network connections */}
                <line x1={n.x} y1={n.y} x2={oppositeNode.x} y2={oppositeNode.y} stroke="#ffffff" strokeOpacity="0.02" strokeWidth="1" />
              </g>
            );
          })}

          {/* 2. Gossip Protocol (Peer-to-Peer Data Propagation) */}
          {nodes.map((n, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <line
                key={`gossip-${i}`}
                x1={n.x}
                y1={n.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="#ffffff"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="2 240"
                strokeLinecap="round"
                className="gossip-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            );
          })}

          {/* 3. Consensus Finality (Validators submitting to the Ledger) */}
          {nodes.map((n, i) => (
            <line
              key={`consensus-${i}`}
              x1={n.x}
              y1={n.y}
              x2="200"
              y2="200"
              stroke="#ffffff"
              strokeOpacity="0.8"
              strokeWidth="2"
              strokeDasharray="4 200"
              strokeLinecap="round"
              className="consensus-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}

          {/* 4. Validator Nodes (Perimeter) */}
          {nodes.map((n, i) => (
            <g 
              key={`validator-${i}`} 
              className="transition-transform duration-500 ease-out group-hover:scale-125"
              style={{ transformOrigin: `${n.x}px ${n.y}px` }} // PERFECT ALIGNMENT FIX
            >
              {/* Outer Sync Ring */}
              <circle
                cx={n.x}
                cy={n.y}
                r="10"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.15"
                strokeWidth="1"
                strokeDasharray="2 4"
                className="animate-[spin_4s_linear_infinite]"
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              {/* Node Body */}
              <circle cx={n.x} cy={n.y} r="5" fill="#000000" stroke="#555555" strokeWidth="1.5" className="transition-colors duration-500 group-hover:stroke-white" />
              {/* Active Indicator */}
              <circle cx={n.x} cy={n.y} r="2" fill="#ffffff" opacity="0.4" className="transition-opacity duration-500 group-hover:opacity-100" />
            </g>
          ))}

          {/* 5. The Ledger / Finalized Block (Center) */}
          <g 
            className="transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ transformOrigin: "200px 200px" }}
          >
            {/* Finality Shockwave */}
            <circle
              cx="200"
              cy="200"
              r="24"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              className="shockwave-pulse"
            />
            
            {/* Geometric Block Representation (Diamond) */}
            <g transform="rotate(45 200 200)">
              <rect x="186" y="186" width="28" height="28" fill="#050505" stroke="#333333" strokeWidth="1.5" className="transition-colors duration-500 group-hover:stroke-white/60" />
              <rect x="192" y="192" width="16" height="16" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <rect x="197" y="197" width="6" height="6" fill="#ffffff" filter="url(#glow)" className="animate-pulse" />
            </g>
          </g>
        </svg>

        {/* Tactical HUD Label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-3 group-hover:translate-y-0">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] tracking-widest text-white/60 uppercase" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              State_Machine // Synced
            </span>
          </div>
        </div>
      </div>

      <style>{`
        /* P2P Gossip Animation */
        .gossip-pulse {
          animation: travel-perimeter 3s linear infinite;
        }
        
        /* Node to Ledger Animation */
        .consensus-pulse {
          animation: travel-center 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        /* Block Finality Expansion */
        .shockwave-pulse {
          transform-origin: 200px 200px;
          animation: pulse-ring 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        @keyframes travel-perimeter {
          0% { stroke-dashoffset: 242; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes travel-center {
          0% { stroke-dashoffset: 204; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        @keyframes pulse-ring {
          0% { r: 14; opacity: 0; stroke-width: 2; }
          40% { opacity: 1; }
          100% { r: 45; opacity: 0; stroke-width: 0; }
        }
      `}</style>
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
      <div className="w-[120vw] h-[120vh] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgMCAwIDQwIDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_80%)]" />
    </div>
  );
}

function SectionEyebrow({ label }) {
  return (
    <div className="inline-flex items-center gap-3 text-[12px] font-medium tracking-widest uppercase text-white/40 mb-8" style={{ fontFamily: FONT_MONO }}>
      <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-white/40" />
      {label}
    </div>
  );
}

export default function HeroSection({ navigate }) {
  const totalAlgos = 26; // Hardcoded for preview, replace with your data length
  const totalFamilies = 4;

  return (
    <div className="bg-[#000000] text-white min-h-screen overflow-x-hidden selection:bg-white/20 selection:text-white" style={{ fontFamily: FONT_SANS }}>
      
      {/* ============================================================ */}
      {/* HERO SECTION - Side-by-Side Layout */}
      {/* ============================================================ */}
      <div className="relative min-h-[90vh] flex items-center border-b border-white/[0.06]">
        <GridBackground />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center w-full">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <button 
              onClick={() => navigate("/explorer")}
              className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-md mb-8 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[12px] font-medium text-white/70 group-hover:text-white transition-colors">
                Consensus Explorer
              </span>
              <ArrowRight size={12} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>

            <h1 className="text-5xl sm:text-6xl md:text-[4.5rem] font-bold tracking-tighter leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-sm">
              The architecture of <br />
              <span className="inline-flex items-center gap-4 text-white/90 mt-2">
                <span className="bg-white/10 px-4 py-1.5 rounded-2xl border border-white/10 italic text-[0.85em] font-light shadow-2xl">
                  trustless
                </span>
                systems.
              </span>
            </h1>

            <p className="text-[17px] text-[#888] max-w-xl leading-relaxed mb-10 font-light">
              Compare and take apart the consensus mechanisms behind modern block and graph-based networks — trade-offs, failure modes, and the chains that run each one.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={() => navigate("/explorer")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-[14px] font-medium text-black bg-white rounded-full hover:scale-[0.98] hover:bg-[#ebebeb] active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
              >
                Launch Explorer
                <div className="ml-2 bg-black/10 rounded-full p-1 group-hover:bg-black/20 transition-colors">
                  <Search size={14} className="text-black" />
                </div>
              </button>

              <button
                onClick={() => {
                  document.getElementById("fundamentals")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-[14px] font-medium text-white/70 bg-transparent border border-white/[0.12] rounded-full hover:bg-white/[0.05] hover:text-white active:scale-95 transition-all duration-200 cursor-pointer"
              >
                What is consensus?
              </button>
            </div>

            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 text-[12px] text-[#666]"
              style={{ fontFamily: FONT_MONO }}
            >
              <span className="flex items-center gap-2"><Cpu size={14} className="text-white/40"/> {totalAlgos} algorithms</span>
              <span className="text-white/20">/</span>
              <span className="flex items-center gap-2"><GitBranch size={14} className="text-white/40"/> {totalFamilies} families</span>
              <span className="text-white/20">/</span>
              <span className="flex items-center gap-2"><Code size={14} className="text-white/40"/> 100% open source</span>
            </div>
          </div>

          {/* Right: Diagram (Moved back to the side) */}
          <div className="relative w-full">
            <ConsensusDiagram />
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* FUNDAMENTALS - Restored Detailed Text */}
      {/* ============================================================ */}
      <section id="fundamentals" className="relative py-32 border-b border-white/[0.06] bg-[#020202]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionEyebrow label="Fundamentals" />
          
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white max-w-2xl mb-6">
            Why decentralized networks need consensus
          </h2>
          <p className="text-[16px] leading-relaxed text-[#888] max-w-3xl mb-16 font-light">
            A blockchain is, at its core, a ledger with no single owner. Thousands of independent computers around the world each hold a copy of the same history, and none of them is in charge. A <span className="text-white font-medium">consensus mechanism</span> is the set of rules that lets all of these strangers — who don't trust each other, can't verify each other's identity, and may be offline, slow, or actively lying — agree on a single, canonical version of that history anyway.
          </p>

          {/* The Founding Problems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            <div className="p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:border-white/[0.15] transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white mb-6">
                <Users size={18} />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">The Byzantine Generals Problem</h4>
              <p className="text-[15px] leading-relaxed text-[#888]">
                The classic thought experiment behind every consensus algorithm: several generals surround a city and can only coordinate by messenger. They must all attack together or all retreat together — a split decision is a disaster. Consensus mechanisms allow honest actors to agree on a single plan even when participants are actively working against them.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:border-white/[0.15] transition-all duration-300">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white mb-6">
                <Copy size={18} />
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">The Double-Spend Problem</h4>
              <p className="text-[15px] leading-relaxed text-[#888]">
                Digital information is trivially copyable, so what stops someone from spending the same coin twice? A bank solves this with a central ledger. A decentralized network requires every node to independently agree on one strict, ordered history of transactions, allowing provable rejection of duplicate actions.
              </p>
            </div>
          </div>

          {/* Core Guarantees */}
          <div className="mb-24">
            <h3 className="text-[13px] font-medium tracking-widest uppercase text-white/40 mb-8" style={{ fontFamily: FONT_MONO }}>
              What every algorithm has to guarantee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: "Safety", sub: "Nothing bad happens", desc: "All honest nodes agree on the same value and the same order. Once a transaction is finalized, it can never be reversed or contradicted by a competing version of history." },
                { icon: RefreshCw, title: "Liveness", sub: "Something good happens", desc: "The network keeps producing new blocks and making progress, even while some nodes are offline, slow, or malicious. A protocol that just stops is safe but useless." },
                { icon: Shield, title: "Fault Tolerance", sub: "Survival threshold", desc: "The maximum share of faulty or adversarial nodes a protocol can absorb while still holding safety and liveness. PoW tolerates <50% hashpower; BFT tolerates <33% malicious nodes." }
              ].map((prop, i) => (
                <div key={i} className="group p-8 rounded-3xl border border-transparent hover:bg-[#050505] hover:border-white/[0.08] transition-all duration-300">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white mb-5 group-hover:scale-110 transition-transform duration-500">
                    <prop.icon size={18} />
                  </div>
                  <h4 className="text-[16px] font-medium text-white mb-1">{prop.title}</h4>
                  <p className="text-[11px] uppercase tracking-widest text-white/40 mb-4" style={{ fontFamily: FONT_MONO }}>{prop.sub}</p>
                  <p className="text-[14px] leading-relaxed text-[#888]">{prop.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Trilemma */}
          <div className="relative p-10 lg:p-12 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#050505] to-[#000000] overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <Triangle size={20} className="fill-black" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  The Blockchain Trilemma
                </h3>
                <p className="text-[15px] leading-relaxed text-[#888] max-w-4xl font-light">
                  Every consensus mechanism sits somewhere on a triangle of <span className="text-white font-medium">decentralization</span> (how many independent participants can validate the chain, and how cheap it is to become one), <span className="text-white font-medium">security</span> (how expensive an attack on the network's history would be), and <span className="text-white font-medium">scalability</span> (how many transactions it can finalize per second). Pushing hard on any two usually costs you the third: Bitcoin's Proof of Work leans on decentralization and security at the cost of throughput. No algorithm in this index escapes the trade-off — they just choose a different point on the triangle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BENTO GRID: THE FAMILIES - Restored Detail */}
      {/* ============================================================ */}
      <section className="relative py-32 border-b border-white/[0.06]">
        <div className="max-w-[1360px] mx-auto px-6">
          <SectionEyebrow label="Consensus Architectures" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                Four approaches to absolute truth.
              </h2>
            </div>
            <button
              onClick={() => navigate("/explorer")}
              className="group hidden sm:inline-flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: FONT_MONO }}
            >
              See all {totalFamilies} families
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
            {/* PoW */}
            <div className="md:col-span-2 group relative p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden cursor-pointer" onClick={() => navigate("/explorer?family=pow")}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] blur-[80px] rounded-full group-hover:bg-white/[0.04] transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                  <Cpu size={20} className="group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Proof of Work</h3>
                  <p className="text-[#888] text-[15px] max-w-lg leading-relaxed">
                    Nodes race to solve a costly cryptographic puzzle; whoever wins proposes the next block. Rewriting history means outrunning the entire network's combined computing power — security comes from wasted electricity.
                  </p>
                  <div className="flex gap-2 mt-6">
                    {["Bitcoin", "Dogecoin", "Monero"].map(t => (
                      <span key={t} className="text-[11px] font-mono text-white/50 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PoS */}
            <div className="md:row-span-2 group relative p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden cursor-pointer" onClick={() => navigate("/explorer?family=pos")}>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/[0.03] to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                  <Coins size={20} className="group-hover:text-black transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3 mt-8">Proof of Stake</h3>
                  <p className="text-[#888] text-[15px] leading-relaxed mb-6">
                    Validators lock up capital as collateral, and are chosen to propose or attest to blocks roughly in proportion to their stake. Acting dishonestly gets that stake destroyed — security comes from money at risk.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Ethereum", "Solana", "Cardano"].map(t => (
                      <span key={t} className="text-[11px] font-mono text-white/50 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BFT */}
            <div className="group relative p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden cursor-pointer" onClick={() => navigate("/explorer?family=bft")}>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Voting-based (BFT)</h3>
                  <p className="text-[#888] text-[14px] leading-relaxed">
                    A known set of validators explicitly votes on each block, finalizing it the instant a supermajority agrees. Trades permissionless entry for absolute finality.
                  </p>
                </div>
              </div>
            </div>

            {/* DAG */}
            <div className="group relative p-8 rounded-3xl border border-white/[0.08] bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden cursor-pointer" onClick={() => navigate("/explorer?family=dag")}>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                  <GitBranch size={16} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">DAG-based</h3>
                  <p className="text-[#888] text-[14px] leading-relaxed">
                    Transactions reference multiple prior transactions directly instead of being bundled into a single-file chain, letting many branches confirm in parallel.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* INDEX CONTENTS - Restored Descriptions */}
      {/* ============================================================ */}
      <section className="relative py-32 bg-[#020202]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionEyebrow label="In this index" />
          
          <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
            What's in the explorer
          </h2>
          <p className="text-[15px] text-[#888] mb-12">
            Four ways to read every protocol in the reference.
          </p>

          <div className="flex flex-col gap-2">
            {[
              { id: "01", icon: Shield, title: "Trilemma scorecard", desc: "Compare decentralization, security, and scalability trade-offs, along with failure modes and security budgets, for every algorithm." },
              { id: "02", icon: Zap, title: "Protocol explorer", desc: "Filter by consensus family or search directly. Inspect leader election, finality rules, and fault tolerance for each entry." },
              { id: "03", icon: Cpu, title: "Real-world mapping", desc: "See which production blockchains run which algorithm natively — Bitcoin on Proof of Work, Solana on Proof of History." },
              { id: "04", icon: Code, title: "Execution languages", desc: "Check client implementations across major languages (Rust, Go, Solidity), plus a compatibility matrix for cross-client consensus." }
            ].map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 rounded-3xl border border-transparent hover:border-white/[0.08] hover:bg-[#050505] transition-all duration-300 cursor-default"
              >
                <div className="hidden md:block text-[12px] font-mono text-white/20 w-6">{item.id}</div>
                <div className="w-12 h-12 shrink-0 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/50 group-hover:text-white transition-colors duration-300">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[17px] font-medium text-white/90 group-hover:text-white mb-1">{item.title}</h4>
                  <p className="text-[15px] text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}