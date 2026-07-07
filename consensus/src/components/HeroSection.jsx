import { ArrowRight, Layers, Shield, Cpu, Zap, Star, Code, ArrowUpRight } from "lucide-react";
import algorithms from "../data/algorithms";
import families from "../data/families";

export default function HeroSection({ navigate }) {
  // Simple summary stats
  const totalAlgos = algorithms.length;
  const totalFamilies = families.length;

  return (
    <div className="bg-[#08090C] text-white">
      {/* Hero Block (Viewport Height) */}
      <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Vercel/Linear style grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-80 pointer-events-none" />

        {/* Dummy spacer to offset absolute navbar */}
        <div className="h-16 shrink-0" />

        {/* Main Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center justify-center text-center">
          {/* Release Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
            <span>Interactive Reference Guide</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300 font-medium">v1.2.0</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6 text-white animate-fade-in">
            The Architecture of <br />
            <span className="text-zinc-400 font-black">
              Decentralized Consensus
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mb-10 leading-relaxed font-normal">
            Explore, compare, and deconstruct the core consensus mechanisms powering modern block and graph-based distributed networks. An elegant reference for blockchain architects.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <button
              onClick={() => navigate("/explorer")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-black bg-white hover:bg-zinc-150 rounded-xl transition-all duration-205 hover:scale-[1.01] cursor-pointer group"
            >
              Start Exploring
              <ArrowRight size={15} className="ml-2 text-black group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={() => {
                const el = document.getElementById("features-bento");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-200 cursor-pointer"
            >
              How it works
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full border-t border-zinc-900/60 pt-10 text-center">
            <div>
              <p className="text-3xl font-bold text-white font-mono">{totalAlgos}</p>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mt-1">Algorithms Analyzed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono">{totalFamilies}</p>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mt-1">Protocol Families</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mt-1">Open-Source Code</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono">20+</p>
              <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold mt-1">Blockchains Mapped</p>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-8 shrink-0" />
      </div>

      {/* Bento Grid Section */}
      <section id="features-bento" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60 bg-[#08090C]">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Structured Protocol Intelligence</h2>
          <p className="text-sm text-zinc-500 mt-2 max-w-xl mx-auto">No placeholders. Full comprehensive mapping of consensus architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Blockchain Trilemma */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-b from-zinc-900 to-[#0c0d12] border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4 text-zinc-300 group-hover:scale-105 transition-transform">
                <Shield size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">The Trilemma Scorecard</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed max-w-md">
                Every distributed ledger system makes critical trade-offs between Decentralization, Security, and Scalability. Inspect exact trilemma scores, failure modes, and security budgets for each consensus algorithm.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-6 border-t border-zinc-800/60 pt-4">
              <span className="text-[11px] font-semibold text-zinc-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> Decentralization
              </span>
              <span className="text-[11px] font-semibold text-zinc-350 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> Security
              </span>
              <span className="text-[11px] font-semibold text-zinc-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> Scalability
              </span>
            </div>
          </div>

          {/* Card 2: Interactive Sandbox */}
          <div 
            onClick={() => navigate("/explorer")}
            className="rounded-2xl bg-gradient-to-b from-zinc-900 to-[#0c0d12] border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 cursor-pointer group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4 text-zinc-300 group-hover:scale-105 transition-transform">
                <Zap size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-1">
                Protocol Explorer
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-zinc-400" />
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Filter by family (Proof of Work, Proof of Stake, DAG, BFT) or search globally. Analyze execution rules, leader election, and consensus properties instantly.
              </p>
            </div>
            <div className="mt-8 text-xs font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors flex items-center gap-1.5">
              Launch consensus sandbox <ArrowRight size={12} />
            </div>
          </div>

          {/* Card 3: Blockchain Mapping */}
          <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-[#0c0d12] border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4 text-zinc-300 group-hover:scale-105 transition-transform">
                <Cpu size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">Real-world Mapping</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                See exactly which major blockchains leverage which algorithms. Connect Bitcoin to PoW, Solana to PoH, Polkadot to Nominated PoS, and Cosmos to Tendermint BFT.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5">
              <span className="text-[10px] bg-zinc-900/60 border border-zinc-800/55 px-2 py-0.5 rounded text-zinc-350">Bitcoin</span>
              <span className="text-[10px] bg-zinc-900/60 border border-zinc-800/55 px-2 py-0.5 rounded text-zinc-350">Ethereum</span>
              <span className="text-[10px] bg-zinc-900/60 border border-zinc-800/55 px-2 py-0.5 rounded text-zinc-350">Solana</span>
              <span className="text-[10px] bg-zinc-900/60 border border-zinc-800/55 px-2 py-0.5 rounded text-zinc-350">Cosmos</span>
            </div>
          </div>

          {/* Card 4: Dev Languages and Compatibility */}
          <div className="rounded-2xl bg-gradient-to-b from-zinc-900 to-[#0c0d12] border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800/40 border border-zinc-700/30 flex items-center justify-center mb-4 text-zinc-300 group-hover:scale-105 transition-transform">
                <Code size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">Execution Languages & Compatibility</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Analyze languages (Rust, Go, C++, Solidity) used to develop the consensus clients, and check a cross-compatible compatibility matrix to see how consensus rules coordinate.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-zinc-800/60 pt-4">
              <div className="flex gap-2">
                <span className="text-[10px] font-mono text-zinc-500">Go</span>
                <span className="text-[10px] font-mono text-zinc-500">Rust</span>
                <span className="text-[10px] font-mono text-zinc-500">C++</span>
                <span className="text-[10px] font-mono text-zinc-500">Solidity</span>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400 flex items-center gap-1">
                Full client tech stacks <ArrowRight size={10} />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
