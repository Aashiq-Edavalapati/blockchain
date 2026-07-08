import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Layers, RotateCcw, SkipForward } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Consensus is idle. No pending blocks.' },
  { key: 'propose', label: 'Propose', detail: 'Leader proposes value/block.' },
  { key: 'prevote', label: 'Vote Round 1', detail: 'Gathering consensus agreements. Requires supermajority.' },
  { key: 'precommit', label: 'Vote Round 2', detail: 'Securing consensus lock. Requires supermajority.' },
  { key: 'commit', label: 'Commit', detail: 'Block committed to replica state machines.' },
];

const THEME = {
  bg: '#000000',
  surface: '#050505',
  surface2: '#020202',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  red: '#ffffff',
  redDim: 'rgba(255, 255, 255, 0.1)',
  blue: '#3b82f6',
  green: '#ffffff',
  greenDim: 'rgba(255, 255, 255, 0.1)',
  text1: '#ffffff',
  text2: '#888888',
  text3: '#666666',
};

const NODES = [
  { id: 1, name: 'Node 1', x: 40, y: 40 },
  { id: 2, name: 'Node 2', x: 240, y: 40 },
  { id: 3, name: 'Node 3', x: 240, y: 200 },
  { id: 4, name: 'Node 4', x: 40, y: 200 },
];

export default function ByzantineFaultToleranceVisualizer({ algorithm }) {
  const algoId = algorithm?.id || "pbft";
  const [step, setStep] = useState(0);
  const [byzantineId, setByzantineId] = useState(4);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [activeHash, setActiveHash] = useState('7f1e9c...');
  const [preVotes, setPreVotes] = useState([]);
  const [preCommits, setPreCommits] = useState([]);
  const [blockchain, setBlockchain] = useState([
    { height: 0, proposer: 'Genesis', hash: '00000000' }
  ]);

  const autoRunTimeoutRef = useRef(null);

  const getVariantDetails = () => {
    switch (algoId) {
      case 'fba':
        return {
          title: 'Federated Byzantine Agreement',
          desc: 'Simulating individual quorum slices. Nodes define their own trust dependencies (overlapping slices).',
          roleLabel: 'FBA NODE',
          bottomText: 'No global validator set needed. Agreement emerges from overlapping quorum slices.',
          thresholdText: 'Quorum slice overlaps',
          color: '#EF4444',
        };
      case 'raft':
        return {
          title: 'Raft Crash Fault Tolerance (CFT)',
          desc: 'Simulating leader election and log replication. Nodes tolerate silent crash failures (no malicious actions).',
          roleLabel: 'FOLLOWER',
          bottomText: 'Tolerates crash faults only. Halts if >1/2 nodes go offline.',
          thresholdText: 'Replicated logs sync',
          color: '#3B82F6',
        };
      case 'tendermint':
        return {
          title: 'Tendermint BFT',
          desc: 'Simulating round-robin proposer elections. Validators vote in Pre-vote and Pre-commit rounds.',
          roleLabel: 'VALIDATOR',
          bottomText: 'Slashing is applied to any node signing conflicting blocks in the same slot.',
          thresholdText: 'Consensus voting power',
          color: '#10B981',
        };
      case 'hotstuff':
        return {
          title: 'HotStuff BFT',
          desc: 'Simulating pipelined voting. Chained phases reduce communication overhead to O(n) complexity.',
          roleLabel: 'REPLICA',
          bottomText: 'Pipelining allows a node to propose, pre-vote, and pre-commit blocks concurrently.',
          thresholdText: 'QC cryptographic proofs',
          color: '#8B5CF6',
        };
      default:
        return {
          title: 'Practical Byzantine Fault Tolerance (PBFT)',
          desc: 'Simulating three-phase voting rounds (Pre-prepare, Prepare, Commit) with O(n²) replica overhead.',
          roleLabel: 'REPLICA',
          bottomText: 'Requires all-to-all communication. Safe up to 33% malicious nodes.',
          thresholdText: 'Active voting replicas',
          color: '#EF4444',
        };
    }
  };

  const variant = getVariantDetails();

  useEffect(() => {
    if (!isAutoRunning) {
      clearTimeout(autoRunTimeoutRef.current);
      return;
    }

    const nextStep = (next, delay) => {
      autoRunTimeoutRef.current = setTimeout(() => setStep(next), delay);
    };

    switch (step) {
      case 0:
        setPreVotes([]);
        setPreCommits([]);
        nextStep(1, 800);
        break;
      case 1:
        nextStep(2, 1000);
        break;
      case 2:
        const prevoteList = [1, 2, 3, 4].filter(id => id !== byzantineId);
        setPreVotes(prevoteList);
        nextStep(3, 1200);
        break;
      case 3:
        const precommitList = [1, 2, 3, 4].filter(id => id !== byzantineId);
        setPreCommits(precommitList);
        nextStep(4, 1200);
        break;
      case 4:
        autoRunTimeoutRef.current = setTimeout(() => {
          setBlockchain(prev => [
            ...prev,
            {
              height: prev.length,
              proposer: 'Node 1',
              hash: activeHash
            }
          ]);
          setPreVotes([]);
          setPreCommits([]);
          setActiveHash(Math.random().toString(16).substring(2, 8));
          setStep(0);
        }, 1000);
        break;
    }

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, byzantineId, activeHash]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === 4) setStep(0);
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    if (step === 4) {
      setBlockchain(prev => [
        ...prev,
        {
          height: prev.length,
          proposer: 'Node 1',
          hash: activeHash
        }
      ]);
      setPreVotes([]);
      setPreCommits([]);
      setActiveHash(Math.random().toString(16).substring(2, 8));
      setStep(0);
    } else if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const prevoteList = [1, 2, 3, 4].filter(id => id !== byzantineId);
      setPreVotes(prevoteList);
      setStep(3);
    } else if (step === 3) {
      const precommitList = [1, 2, 3, 4].filter(id => id !== byzantineId);
      setPreCommits(precommitList);
      setStep(4);
    }
  };

  const resetSimulation = () => {
    setIsAutoRunning(false);
    setStep(0);
    setPreVotes([]);
    setPreCommits([]);
    setActiveHash('7f1e9c...');
    setBlockchain([{ height: 0, proposer: 'Genesis', hash: '00000000' }]);
  };

  const activeStage = STAGES[step] || STAGES[0];
  return (
    <div
      style={{
        '--bg': THEME.bg, '--surface': THEME.surface, '--surface-2': THEME.surface2,
        '--border': THEME.border, '--border-strong': THEME.borderStrong,
        '--red': variant.color, '--red-dim': `${variant.color}20`,
        '--blue': THEME.blue, '--green': THEME.green, '--green-dim': THEME.greenDim,
        '--text-1': THEME.text1, '--text-2': THEME.text2, '--text-3': THEME.text3,
      }}
      className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative"
    >
      <style>{`
        .bft-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes bft-beam {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        .bft-beam-active {
          stroke-dasharray: 6, 6;
          animation: bft-beam 0.8s linear infinite;
        }
        .bft-track-fill { transition: width 0.4s ease; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="bft-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-white/20 font-mono text-xl">/ 05</span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            <span className="bft-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--red)' }}>
              Consensus · {variant.title}
            </span>
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{activeStage.label}</h2>
            <p className="text-xs text-white/50 font-medium tracking-tight max-w-sm">{activeStage.detail}</p>
          </div>
        </div>

        {/* Speed / Run controls & Byzantine settings */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-1 bg-[#020202] border-white/[0.08]">
            <span className="bft-mono text-[9px] text-white/40 uppercase">Faulty Node:</span>
            <select
              value={byzantineId}
              onChange={(e) => setByzantineId(Number(e.target.value))}
              disabled={step > 0}
              className="bg-transparent text-xs font-bold text-[#E05A5A] focus:outline-none border-none p-1"
            >
              <option value={0} className="bg-[#050505] text-white/60">None</option>
              <option value={1} className="bg-[#050505] text-[#E05A5A]">Node 1 (Leader)</option>
              <option value={2} className="bg-[#050505] text-[#E05A5A]">Node 2</option>
              <option value={3} className="bg-[#050505] text-[#E05A5A]">Node 3</option>
              <option value={4} className="bg-[#050505] text-[#E05A5A]">Node 4</option>
            </select>
          </div>

          <div className="flex bg-zinc-900/30 p-1 rounded-xl border border-white/[0.05]">
            <button onClick={toggleAutoRun} className={`p-3 rounded-lg transition-all ${isAutoRunning ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>
              {isAutoRunning ? <Pause size={20} strokeWidth={2.5} /> : <Play size={20} strokeWidth={2.5} />}
            </button>
            <button onClick={manualNextStep} disabled={isAutoRunning} className="p-3 text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"><SkipForward size={20} /></button>
            <button onClick={resetSimulation} className="p-3 text-zinc-400 hover:text-white transition-all"><RotateCcw size={20} /></button>
          </div>
        </div>
      </div>

      {/* Body Inner Section wrapper */}
      <div className="p-8 pb-0">
        {/* 2. STEPPER */}
        <div className="flex items-center justify-between pb-8">
          {STAGES.map((s, i) => {
            const active = i === step;
            const passed = i < step;
            return (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-2" style={{ minWidth: 64 }}>
                  <div
                    className="bft-mono flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all"
                    style={{
                      borderColor: active || passed ? 'var(--red)' : 'var(--border-strong)',
                      background: active ? 'var(--red)' : passed ? 'var(--red-dim)' : 'var(--surface)',
                      color: active ? '#0A0A0C' : passed ? 'var(--red)' : 'var(--text-3)',
                    }}
                  >
                    {passed ? '✓' : i}
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-wide text-center"
                    style={{ color: active ? 'var(--text-1)' : 'var(--text-3)', fontWeight: active ? 600 : 400 }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="mx-1 h-px flex-1" style={{ background: 'var(--border)', marginBottom: 18 }}>
                    <div
                      className="bft-track-fill h-px"
                      style={{ background: 'var(--red)', width: i < step ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC VISUALIZATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT PANEL: NETWORK TOPOLOGY GRAPH */}
        <div className="lg:col-span-7 p-10 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="absolute top-4 left-6 pos-mono text-[9px] text-white/40 uppercase tracking-[0.2em]">
            consensus_network_nodes
          </div>

          <div className="relative w-[340px] h-[280px]">
            {/* SVG links representation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {Object.keys(NODES).map((id) => {
                const nodeVal = NODES[id];
                return Object.keys(NODES).map((targetId) => {
                  if (id >= targetId) return null;
                  const targetVal = NODES[targetId];

                  const isLinkActive =
                    (step === 1 && (id === '1' || targetId === '1')) || // Propose phase
                    (step === 2) || // Prevote phase
                    (step === 3); // Precommit phase

                  // Check if either node in the link is Byzantine
                  const isByzantineLink =
                    (byzantineId === Number(id)) || (byzantineId === Number(targetId));

                  return (
                    <line
                      key={`${id}-${targetId}`}
                      x1={nodeVal.x}
                      y1={nodeVal.y}
                      x2={targetVal.x}
                      y2={targetVal.y}
                      stroke={
                        isLinkActive
                          ? isByzantineLink
                            ? 'rgba(239, 68, 68, 0.4)'
                            : `${variant.color}60`
                          : 'rgba(255,255,255,0.03)'
                      }
                      strokeWidth={isLinkActive ? 2 : 1}
                      className={isLinkActive ? 'bft-beam-active' : ''}
                      style={{
                        animationDuration: isByzantineLink ? '1.5s' : '0.8s',
                      }}
                    />
                  );
                });
              })}
            </svg>

            {/* Nodes */}
            {Object.keys(NODES).map((id) => {
              const nodeVal = NODES[id];
              const isLeader = id === '1';
              const isByz = Number(id) === byzantineId;
              const hasPreVoted = preVotes.includes(Number(id));
              const hasPreCommitted = preCommits.includes(Number(id));

              let statusColor = 'rgba(255, 255, 255, 0.05)';
              let borderCol = 'var(--border-strong)';
              let labelCol = 'var(--text-3)';

              if (isByz) {
                statusColor = 'rgba(239, 68, 68, 0.15)';
                borderCol = '#EF4444';
                labelCol = '#EF4444';
              } else if (step === 1 && isLeader) {
                statusColor = `${variant.color}30`;
                borderCol = variant.color;
                labelCol = 'var(--text-1)';
              } else if (step === 2 && hasPreVoted) {
                statusColor = `${variant.color}20`;
                borderCol = variant.color;
                labelCol = 'var(--text-1)';
              } else if (step >= 3 && hasPreCommitted) {
                statusColor = 'rgba(16, 185, 129, 0.1)';
                borderCol = '#10B981';
                labelCol = '#10B981';
              }

              return (
                <div
                  key={id}
                  className="absolute flex flex-col items-center gap-1.5 transition-all duration-300 z-10"
                  style={{
                    top: nodeVal.y - 24,
                    left: nodeVal.x - 24,
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-sm font-bold transition-all relative ${
                      isLeader && !isByz ? 'shadow-[0_0_15px_rgba(255,255,255,0.15)]' : ''
                    }`}
                    style={{
                      background: statusColor,
                      borderColor: borderCol,
                      color: isByz ? '#EF4444' : 'var(--text-1)',
                    }}
                  >
                    {id}
                    {isLeader && (
                      <span className="absolute -top-1.5 -right-1.5 bg-white text-black font-mono text-[7px] px-1 rounded-sm uppercase tracking-wider font-bold">
                        LDR
                      </span>
                    )}
                  </div>
                  <span className="text-[8.5px] font-bold uppercase tracking-wider" style={{ color: labelCol }}>
                    {isByz ? 'Offline' : isLeader ? 'Leader' : 'Replica'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: DETAILS & AGREEMENT BARS */}
        <div className="lg:col-span-5 p-10 flex flex-col justify-between bg-black">
          <div>
            <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/[0.04]">
              Agreement State machine
            </h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/40 mb-1.5">
                  <span>{algoId === 'raft' ? 'Log entry proposed' : 'Phase 1 agreement'}</span>
                  <span className={preVotes.length >= 3 ? 'text-emerald-400 font-mono' : 'text-white/40 font-mono'}>
                    {preVotes.length}/4 votes
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 animate-pulse"
                    style={{ width: `${(preVotes.length / 4) * 100}%`, backgroundColor: variant.color }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/40 mb-1.5">
                  <span>{algoId === 'raft' ? 'Commit status' : 'Phase 2 agreement'}</span>
                  <span className={preCommits.length >= 3 ? 'text-emerald-400 font-mono' : 'text-white/40 font-mono'}>
                    {preCommits.length}/4 votes
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${(preCommits.length / 4) * 100}%`, backgroundColor: variant.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10.5px] text-white/40 leading-relaxed font-sans">
            {byzantineId > 0 ? (
              <span className="text-red-400">
                {algoId === 'raft' ? (
                  `Log Sync: Follower ${byzantineId} is offline. Log replication is successful because 3/4 replicas are alive (>1/2 threshold).`
                ) : (
                  `BFT Audit: Node ${byzantineId} is Byzantine. Node 1/2/3 reach agreement because 3/4 is >2/3 supermajority.`
                )}
              </span>
            ) : (
              <span>All replicas honest. Replication cycles are running optimally.</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. ENHANCED LEDGER ARCHIVE */}
      <div className="bg-[#050505] border-t border-white/[0.06] p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-white/40" />
            <span className="bft-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Verified Ledger Archive</span>
          </div>
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Tip: Block #{blockchain.length-1}</div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {blockchain.map((b) => (
            <div
              key={b.height}
              className="shrink-0 w-64 rounded-2xl border border-white/[0.08] bg-black p-5 flex flex-col gap-3 relative transition-all duration-500"
            >
              <div>
                <p className="bft-mono text-[9px] text-white/40">Height: #{b.height}</p>
                <p className="font-bold text-white mt-1 truncate">Leader: {b.proposer}</p>
              </div>
              <p className="bft-mono text-[9.5px] text-white/40 truncate bg-white/[0.02] p-2 rounded border border-white/[0.04]">Hash: {b.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
