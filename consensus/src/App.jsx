import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import {
  Cpu, Coins, Vote, ShieldCheck, Users, Timer, Layers, Network, Zap,
  Info, ArrowRight, Gauge, Boxes, Sparkles, Link2, Unlink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const ALGORITHMS = [
  {
    id: "pow",
    name: "Proof of Work",
    short: "PoW",
    icon: Cpu,
    color: "#F7931A",
    tagline: "Trust earned by burning energy.",
    mechanism:
      "Miners race to solve a computationally expensive puzzle — finding a hash below a target value. Whoever finds it first proposes the next block; the network follows whichever valid chain took the most cumulative work.",
    steps: [
      "Pending transactions are broadcast and bundled into a candidate block by miners.",
      "Miners repeatedly hash the block header with different nonces, searching for a hash below the difficulty target.",
      "The first miner to find a valid hash broadcasts the solved block to the network.",
      "Peers verify the hash and every transaction, then extend their local chain with the new block.",
      "If two valid blocks appear at nearly the same time, the chain temporarily forks — nodes converge on whichever branch grows longest.",
      "The winning miner collects the block reward and fees; difficulty re-adjusts to keep block time roughly constant.",
    ],
    stats: { blockTime: "~10 min", tps: "~7 TPS" },
    trilemma: { scalability: 22, security: 96, decentralization: 88 },
    pulseDuration: 4,
    strength: "Battle-tested, extremely costly to attack at scale.",
    tradeoff: "Slow, energy-hungry, and throughput-limited.",
  },
  {
    id: "pos",
    name: "Proof of Stake",
    short: "PoS",
    icon: Coins,
    color: "#8B93FF",
    tagline: "Trust earned by putting capital at risk.",
    mechanism:
      "Validators lock up ('stake') native tokens as collateral. The protocol pseudo-randomly picks a stake-weighted proposer for each slot; other validators attest, and dishonest behaviour is punished by destroying ('slashing') stake.",
    steps: [
      "Validator nodes deposit a minimum amount of native tokens into a staking contract as collateral.",
      "The protocol runs a randomized, stake-weighted lottery to choose a block proposer for the current slot.",
      "The chosen validator assembles pending transactions into a block and broadcasts it.",
      "A rotating committee of other validators attests to the block's validity by voting.",
      "Once a supermajority of staked weight attests, the block is finalized and appended to the chain.",
      "Validators caught proposing conflicting blocks or attesting dishonestly have a portion of their stake destroyed.",
    ],
    stats: { blockTime: "~12 sec", tps: "~15–30 TPS (L1)" },
    trilemma: { scalability: 55, security: 80, decentralization: 68 },
    pulseDuration: 2.2,
    strength: "Energy-efficient, large validator sets, scales via L2s.",
    tradeoff: "Wealth can concentrate influence among large stakers.",
  },
  {
    id: "dpos",
    name: "Delegated Proof of Stake",
    short: "DPoS",
    icon: Vote,
    color: "#00D4AA",
    tagline: "Trust earned by winning an election.",
    mechanism:
      "Token holders vote to elect a small, fixed panel of delegates who take turns producing blocks. Voters can eject an underperforming delegate at any time, trading decentralization for speed.",
    steps: [
      "Token holders cast stake-weighted votes to elect a fixed panel of block-producer delegates.",
      "Elected delegates are arranged into a round-robin production schedule.",
      "Each delegate produces its block within its assigned slot and broadcasts it to the network.",
      "The remaining delegates and full nodes verify the block against the consensus rules.",
      "Voters can un-elect an underperforming or malicious delegate at any time, replacing them next round.",
      "Delegates earn block rewards, frequently sharing a cut with the voters who elected them.",
    ],
    stats: { blockTime: "~0.5–3 sec", tps: "1,000–4,000+ TPS" },
    trilemma: { scalability: 90, security: 60, decentralization: 32 },
    pulseDuration: 1.0,
    strength: "Very high throughput, low fees, predictable performance.",
    tradeoff: "Power sits with a small, electable committee.",
  },
  {
    id: "poa",
    name: "Proof of Authority",
    short: "PoA",
    icon: ShieldCheck,
    color: "#FFB800",
    tagline: "Trust earned by a verified real-world identity.",
    mechanism:
      "A small set of pre-approved, identity-verified validators take turns signing blocks. Trust rests on reputation and legal accountability rather than stake or computation.",
    steps: [
      "A limited set of validators is pre-approved, with identities verified and whitelisted by network governance.",
      "Validators take turns producing blocks in a round-robin or randomized schedule among the authorized set.",
      "Each validator signs its block, cryptographically proving authorship.",
      "The other authorized validators verify the signature and transactions before accepting the block.",
      "Because identities are public, a misbehaving validator can be identified and removed by governance.",
      "With a small, known validator set, blocks finalize quickly with minimal computational overhead.",
    ],
    stats: { blockTime: "~1–5 sec", tps: "100s–1,000s TPS" },
    trilemma: { scalability: 93, security: 55, decentralization: 15 },
    pulseDuration: 1.5,
    strength: "Fast, cheap, predictable — good for known-consortium chains.",
    tradeoff: "Heavily centralized; requires trusting the authority set.",
  },
  {
    id: "bft",
    name: "Practical Byzantine Fault Tolerance",
    short: "PBFT / Tendermint",
    icon: Users,
    color: "#FF5D73",
    tagline: "Trust earned through supermajority agreement.",
    mechanism:
      "A known validator set exchanges multiple rounds of votes (pre-prepare, prepare, commit) to agree on a block, tolerating up to one-third faulty validators and finalizing instantly with no forks.",
    steps: [
      "A leader validator proposes a block and sends a 'pre-prepare' message to every other validator.",
      "Validators broadcast 'prepare' messages to each other, confirming they saw the same proposal.",
      "Once a validator collects two-thirds or more matching prepare messages, it broadcasts 'commit'.",
      "Once two-thirds or more commit messages are collected, the block is instantly and irreversibly finalized.",
      "If the leader stalls or misbehaves, a view-change protocol elects a new leader and the round restarts.",
      "The system safely tolerates up to floor((n-1)/3) simultaneously faulty or malicious validators.",
    ],
    stats: { blockTime: "~1–6 sec", tps: "1,000–10,000 TPS" },
    trilemma: { scalability: 78, security: 76, decentralization: 30 },
    pulseDuration: 1.9,
    strength: "Instant deterministic finality — no forks, no reorgs.",
    tradeoff: "Needs a known validator set; communication grows with n.",
  },
  {
    id: "poh",
    name: "Proof of History + PoS",
    short: "PoH",
    icon: Timer,
    color: "#14F195",
    tagline: "Trust earned by a verifiable cryptographic clock.",
    mechanism:
      "A leader continuously hashes its own output to build a verifiable delay sequence, timestamping transactions without validator communication. A PoS overlay (Tower BFT) then votes on the resulting order.",
    steps: [
      "A designated leader continuously hashes its own output, building a Verifiable Delay Function sequence — a trustless clock.",
      "Incoming transactions are hashed into this sequence, timestamping them relative to one another with no need for cross-validator chatter.",
      "The leader, chosen via stake-weighted rotation, streams the ordered entries to validators in real time.",
      "Validators replay the hash sequence to independently confirm order and timing, then vote using a PoS-based BFT overlay.",
      "Stake-weighted votes accumulate confirmations; once enough lock in, the block reaches increasing levels of finality.",
      "Leadership rotates on a fixed schedule to the next stake-weighted validator for the following slot.",
    ],
    stats: { blockTime: "~0.4 sec", tps: "2,000–65,000 TPS (theoretical)" },
    trilemma: { scalability: 98, security: 62, decentralization: 24 },
    pulseDuration: 0.6,
    strength: "Extreme throughput and sub-second block times.",
    tradeoff: "High hardware requirements shrink the validator set.",
  },
];

const CHAINS = [
  // Proof of Work
  { id: "btc", name: "Bitcoin", symbol: "BTC", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "Prioritises maximal security and immutability for a 'digital gold' store of value — speed is a deliberate non-goal." },
  { id: "ltc", name: "Litecoin", symbol: "LTC", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "A lighter, faster PoW fork of Bitcoin (Scrypt hashing, 2.5-min blocks) aimed at everyday payments." },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "Merge-mined with Litecoin; inherited PoW gives it security almost for free while it focuses on tipping and payments." },
  { id: "xmr", name: "Monero", symbol: "XMR", algo: "pow", layer: "L1", lang: "No general smart contracts (privacy scripting only)", why: "A CPU-friendly, ASIC-resistant PoW variant (RandomX) keeps mining decentralized to protect its privacy mission." },
  { id: "ln", name: "Lightning Network", symbol: "LN", algo: "pow", layer: "L2", lang: "No independent consensus — payment channels over Bitcoin", why: "Moves everyday transfers off-chain into payment channels, settling back to Bitcoin's PoW chain for final security." },

  // Proof of Stake
  { id: "eth", name: "Ethereum", symbol: "ETH", algo: "pos", layer: "L1", lang: "Solidity, Vyper", why: "Moved from PoW to PoS ('The Merge') to cut energy use by ~99.9% and open the door to sharding and rollup scaling." },
  { id: "ada", name: "Cardano", symbol: "ADA", algo: "pos", layer: "L1", lang: "Plutus (Haskell), Marlowe", why: "The Ouroboros protocol is peer-reviewed and formally proven, matching Cardano's research-first design philosophy." },
  { id: "dot", name: "Polkadot", symbol: "DOT", algo: "pos", layer: "L1", lang: "Rust (ink!)", why: "Nominated PoS lets a shared relay chain validator set secure many independent 'parachains' at once." },
  { id: "avax", name: "Avalanche", symbol: "AVAX", algo: "pos", layer: "L1", lang: "Solidity (C-Chain, EVM)", why: "A PoS-based Avalanche consensus protocol gives sub-second, near-instant finality for its C-Chain smart contracts." },
  { id: "matic", name: "Polygon PoS", symbol: "POL", algo: "pos", layer: "L2", lang: "Solidity (EVM-compatible)", why: "A PoS-secured commit-chain that periodically checkpoints to Ethereum, borrowing its security while scaling throughput." },
  { id: "arb", name: "Arbitrum", symbol: "ARB", algo: "pos", layer: "L2", lang: "Solidity (EVM-compatible)", why: "An optimistic rollup that executes transactions off-chain and posts proofs back to Ethereum's PoS layer for security." },

  // Delegated Proof of Stake
  { id: "eos", name: "EOS", symbol: "EOS", algo: "dpos", layer: "L1", lang: "C++", why: "21 elected block producers give EOS the high throughput needed for consumer-facing dApps and games." },
  { id: "trx", name: "Tron", symbol: "TRX", algo: "dpos", layer: "L1", lang: "Solidity (TVM, EVM-compatible)", why: "27 Super Representatives keep block times low, tuned for content and media dApps that need speed over decentralization." },

  // Proof of Authority
  { id: "bnb", name: "BNB Smart Chain", symbol: "BNB", algo: "poa", layer: "L1", lang: "Solidity (EVM-compatible)", why: "A small, rotating validator set (Parlia PoSA) keeps fees near-zero and blocks fast for EVM-compatible dApps." },
  { id: "vet", name: "VeChain", symbol: "VET", algo: "poa", layer: "L1", lang: "Solidity (EVM-compatible)", why: "Authorized 'Authority Masternodes' give predictable performance enterprises need for supply-chain tracking." },

  // PBFT / Tendermint family
  { id: "atom", name: "Cosmos Hub", symbol: "ATOM", algo: "bft", layer: "L1", lang: "Rust (CosmWasm), Go", why: "Tendermint BFT gives instant finality, ideal for the hub-and-zone, cross-chain IBC architecture Cosmos is built around." },
  { id: "xrp", name: "XRP Ledger", symbol: "XRP", algo: "bft", layer: "L1", lang: "Hooks (C-like), JavaScript", why: "A Federated Byzantine Agreement variant finalizes in seconds, matching XRPL's goal of fast interbank settlement." },

  // Proof of History
  { id: "sol", name: "Solana", symbol: "SOL", algo: "poh", layer: "L1", lang: "Rust, C, C++ (via Anchor)", why: "PoH's verifiable clock removes most validator chatter, letting Solana chase extreme, single-global-state throughput." },
];

const TOTAL = { scalability: "Scalability", security: "Security", decentralization: "Decentralization" };

/* ------------------------------------------------------------------ */
/*  SMALL HELPERS                                                      */
/* ------------------------------------------------------------------ */

function monogram(name) {
  const words = name.split(" ");
  if (words.length === 1) return name.slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function pairNote(a, b) {
  if (a.id === b.id) return `${a.name} — same chain.`;
  if (a.algo === b.algo) {
    const algo = ALGORITHMS.find((x) => x.id === a.algo);
    return `${a.name} and ${b.name} both run ${algo.name} — similar validator economics and finality assumptions make bridges and shared tooling easier to reason about.`;
  }
  const algoA = ALGORITHMS.find((x) => x.id === a.algo);
  const algoB = ALGORITHMS.find((x) => x.id === b.algo);
  return `${a.name} (${algoA.short}) and ${b.name} (${algoB.short}) use different consensus mechanisms — different finality guarantees mean direct interoperability needs a trust-minimized bridge or oracle.`;
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function ConsensusExplorer() {
  const [activeId, setActiveId] = useState("pow");
  const [hoverCell, setHoverCell] = useState(null);
  const prefersReduced = useReducedMotion();

  const active = useMemo(() => ALGORITHMS.find((a) => a.id === activeId), [activeId]);
  const chainsForActive = useMemo(() => CHAINS.filter((c) => c.algo === activeId), [activeId]);
  const radarData = useMemo(
    () => [
      { subject: TOTAL.scalability, value: active.trilemma.scalability },
      { subject: TOTAL.security, value: active.trilemma.security },
      { subject: TOTAL.decentralization, value: active.trilemma.decentralization },
    ],
    [active]
  );

  return (
    <div
      style={{
        "--bg": "#0A0D13",
        "--surface": "#12161F",
        "--surface-2": "#1A1F2B",
        "--border": "#262C3B",
        "--text": "#E7EAF2",
        "--muted": "#8B93A7",
        "--accent": active.color,
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
      className="w-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .scrollbar-thin::-webkit-scrollbar { height: 8px; width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #2A3140; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .algo-btn:focus-visible, .chain-card:focus-visible, .cell-btn:focus-visible {
          outline: 2px solid var(--accent); outline-offset: 2px;
        }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/* HEADER                                                       */}
      {/* ---------------------------------------------------------- */}
      <header className="px-6 md:px-10 pt-14 pb-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          <Boxes size={14} />
          Protocol Comparison · Six Consensus Families · Eighteen Chains
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-3xl"
        >
          Consensus Algorithms in Blockchain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-lg md:text-xl mt-1"
          style={{ color: "var(--accent)" }}
        >
          A Comparative Explorer
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl text-sm md:text-base"
          style={{ color: "var(--muted)" }}
        >
          Every chain trades off the same three pillars — Scalability, Security and Decentralization — the{" "}
          <span style={{ color: "var(--text)" }}>blockchain trilemma</span>. Pick a consensus family below to see
          how it works, who runs it, and how it stacks up.
        </motion.p>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* ALGORITHM SELECTOR                                           */}
      {/* ---------------------------------------------------------- */}
      <nav
        role="tablist"
        aria-label="Select a consensus algorithm"
        className="px-6 md:px-10 max-w-7xl mx-auto flex gap-3 flex-wrap mb-10 sticky top-0 z-20 py-4"
        style={{ background: "linear-gradient(to bottom, var(--bg) 70%, transparent)" }}
      >
        {ALGORITHMS.map((a) => {
          const isActive = a.id === activeId;
          const Icon = a.icon;
          return (
            <button
              key={a.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(a.id)}
              className="algo-btn relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={{
                background: isActive ? a.color + "20" : "var(--surface)",
                border: `1px solid ${isActive ? a.color : "var(--border)"}`,
                color: isActive ? a.color : "var(--muted)",
              }}
            >
              <Icon size={15} />
              {a.short}
              {isActive && (
                <motion.span
                  layoutId="active-dot"
                  className="w-1.5 h-1.5 rounded-full ml-1"
                  style={{ background: a.color }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <main className="px-6 md:px-10 max-w-7xl mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: 0.35 }}
          >
            {/* ---------------------------------------------------- */}
            {/* OVERVIEW + TRILEMMA                                    */}
            {/* ---------------------------------------------------- */}
            <section className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-12">
              {/* Overview */}
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: active.color + "22", color: active.color }}
                  >
                    <active.icon size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{active.name}</h2>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{active.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {active.mechanism}
                </p>

                {/* Step timeline with block-pulse animation */}
                <div className="mt-8 relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />
                  {!prefersReduced && (
                    <motion.div
                      className="absolute left-[11px] w-2 h-2 rounded-full"
                      style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
                      animate={{ top: ["1%", "97%"] }}
                      transition={{ duration: active.pulseDuration, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <ol className="space-y-5">
                    {active.steps.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * i }}
                        className="relative pl-10 text-sm leading-relaxed"
                      >
                        <span
                          className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs"
                          style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: active.color }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </motion.li>
                    ))}
                  </ol>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-8">
                  <div className="rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--muted)" }}><Sparkles size={13} /> Strength</p>
                    <p className="text-sm mt-1">{active.strength}</p>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--muted)" }}><Info size={13} /> Trade-off</p>
                    <p className="text-sm mt-1">{active.tradeoff}</p>
                  </div>
                </div>
              </div>

              {/* Trilemma scorecard */}
              <div
                className="rounded-2xl p-6 md:p-8 flex flex-col"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-display text-base font-semibold mb-1">Trilemma Scorecard</h3>
                <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
                  Higher reach = stronger pillar, on a 0–100 relative scale.
                </p>
                <div style={{ width: "100%", height: 220 }}>
                  <ResponsiveContainer>
                    <RadarChart data={radarData} outerRadius="75%">
                      <PolarGrid stroke="#2A3140" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#8B93A7", fontSize: 11 }} />
                      <Radar dataKey="value" stroke={active.color} fill={active.color} fillOpacity={0.35} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 mt-2">
                  {[
                    ["Scalability", active.trilemma.scalability, Gauge],
                    ["Security", active.trilemma.security, ShieldCheck],
                    ["Decentralization", active.trilemma.decentralization, Network],
                  ].map(([label, val, Icon]) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
                        <span className="flex items-center gap-1.5"><Icon size={12} /> {label}</span>
                        <span className="font-mono">{val}/100</span>
                      </div>
                      <div className="h-1.5 rounded-full w-full" style={{ background: "var(--surface-2)" }}>
                        <motion.div
                          className="h-1.5 rounded-full"
                          style={{ background: active.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="rounded-xl p-3 text-center" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Block time</p>
                    <p className="font-mono text-sm mt-1">{active.stats.blockTime}</p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Throughput</p>
                    <p className="font-mono text-sm mt-1">{active.stats.tps}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ---------------------------------------------------- */}
            {/* REAL-WORLD MAPPING                                     */}
            {/* ---------------------------------------------------- */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-display text-lg font-semibold">Where {active.short} runs today</h3>
                <div
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  <Layers size={13} />
                  L1 = secures itself · L2 = borrows security from an L1 below it
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chainsForActive.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                    tabIndex={0}
                    className="chain-card rounded-2xl p-5"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                          style={{ background: active.color + "22", color: active.color, border: `1px solid ${active.color}55` }}
                        >
                          {monogram(c.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-tight">{c.name}</p>
                          <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{c.symbol}</p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-mono px-2 py-1 rounded-md shrink-0"
                        style={{
                          background: c.layer === "L1" ? "#1F2A24" : "#2A2418",
                          color: c.layer === "L1" ? "#5FD98A" : "#E8B94C",
                        }}
                      >
                        {c.layer}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{c.why}</p>
                    <div
                      className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg inline-block"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      {c.lang}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </AnimatePresence>

        {/* -------------------------------------------------------- */}
        {/* COMPATIBILITY MATRIX                                       */}
        {/* -------------------------------------------------------- */}
        <section>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-display text-lg font-semibold">Cross-Chain Compatibility Matrix</h3>
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
              <span className="flex items-center gap-1.5"><Link2 size={13} style={{ color: active.color }} /> Same mechanism</span>
              <span className="flex items-center gap-1.5"><Unlink size={13} /> Different mechanism</span>
            </div>
          </div>
          <p className="text-xs mb-4 max-w-2xl" style={{ color: "var(--muted)" }}>
            Rows and columns for the selected algorithm ({active.short}) are highlighted. Hover any cell for a
            plain-language read on that pair's interoperability at the protocol level.
          </p>

          <div
            className="rounded-2xl p-4 overflow-auto scrollbar-thin relative"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", maxHeight: 560 }}
          >
            <table className="border-separate" style={{ borderSpacing: 3 }}>
              <thead>
                <tr>
                  <th className="sticky left-0 top-0 z-20" style={{ background: "var(--surface)" }} />
                  {CHAINS.map((c) => (
                    <th key={c.id} className="sticky top-0 z-10" style={{ background: "var(--surface)" }}>
                      <div
                        className="font-mono text-[10px] px-1 py-2 -rotate-45 origin-bottom-left whitespace-nowrap w-6"
                        style={{ color: c.algo === activeId ? active.color : "var(--muted)" }}
                      >
                        {c.symbol}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHAINS.map((rowChain) => (
                  <tr key={rowChain.id}>
                    <th
                      className="sticky left-0 z-10 text-left pr-3"
                      style={{ background: "var(--surface)" }}
                    >
                      <span
                        className="font-mono text-[11px] whitespace-nowrap"
                        style={{ color: rowChain.algo === activeId ? active.color : "var(--muted)" }}
                      >
                        {rowChain.symbol}
                      </span>
                    </th>
                    {CHAINS.map((colChain) => {
                      const compatible = rowChain.algo === colChain.algo;
                      const algo = ALGORITHMS.find((a) => a.id === rowChain.algo);
                      const isSelf = rowChain.id === colChain.id;
                      const relatedToSelection =
                        rowChain.algo === activeId || colChain.algo === activeId;
                      const key = `${rowChain.id}-${colChain.id}`;
                      return (
                        <td key={colChain.id} className="p-0">
                          <button
                            className="cell-btn w-6 h-6 rounded-md transition-transform"
                            onMouseEnter={() => setHoverCell(key)}
                            onMouseLeave={() => setHoverCell((k) => (k === key ? null : k))}
                            onFocus={() => setHoverCell(key)}
                            style={{
                              background: isSelf
                                ? "var(--border)"
                                : compatible
                                ? algo.color + (relatedToSelection ? "cc" : "55")
                                : "var(--surface-2)",
                              opacity: relatedToSelection || compatible ? 1 : 0.55,
                              transform: hoverCell === key ? "scale(1.35)" : "scale(1)",
                              border: relatedToSelection ? `1px solid ${active.color}88` : "1px solid transparent",
                            }}
                            aria-label={`${rowChain.name} vs ${colChain.name}`}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoverCell && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="mt-3 rounded-xl px-4 py-3 text-sm"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                {(() => {
                  const [rId, cId] = hoverCell.split("-");
                  const r = CHAINS.find((c) => c.id === rId);
                  const cc = CHAINS.find((c) => c.id === cId);
                  if (!r || !cc) return null;
                  return <span style={{ color: "var(--muted)" }}>{pairNote(r, cc)}</span>;
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer
        className="px-6 md:px-10 py-8 max-w-7xl mx-auto text-xs flex items-center gap-2"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
      >
        <ArrowRight size={13} />
        Scores are illustrative, relative comparisons for teaching the trilemma trade-off — not precise
        benchmarks, and real-world figures shift as protocols upgrade.
      </footer>
    </div>
  );
}