import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

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
        background: 'var(--bg)', color: 'var(--text-1)',
        fontFamily: "'Raleway', 'Inter', sans-serif",
      }}
      className="w-full max-w-4xl rounded-2xl border p-7"
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
      `}</style>

      <div style={{ borderColor: 'var(--border)' }} className="flex flex-wrap items-start justify-between gap-6 border-b pb-6">
        <div>
          <div className="bft-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--red)' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--red)' }} />
            Consensus · {variant.title}
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-1)' }}>
            {activeStage.label}
          </h3>
          <p className="mt-1 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            {activeStage.detail}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-1 bg-[#020202] border-white/[0.08]">
            <span className="bft-mono text-[9px] text-white/40 uppercase">Byzantine Replica:</span>
            <select
              value={byzantineId}
              onChange={(e) => setByzantineId(Number(e.target.value))}
              disabled={step > 0}
              className="bg-transparent text-xs font-bold text-red-400 focus:outline-none border-none p-1"
            >
              <option value={0} className="bg-[#050505] text-white/60">None</option>
              <option value={1} className="bg-[#050505] text-red-400">Node 1 (Leader)</option>
              <option value={2} className="bg-[#050505] text-red-400">Node 2</option>
              <option value={3} className="bg-[#050505] text-red-400">Node 3</option>
              <option value={4} className="bg-[#050505] text-red-400">Node 4</option>
            </select>
          </div>

          <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={toggleAutoRun}
              className="bft-mono px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{
                background: isAutoRunning ? 'rgba(224,90,90,0.12)' : 'var(--red-dim)',
                color: isAutoRunning ? '#E05A5A' : 'var(--red)',
              }}
            >
              {isAutoRunning ? (
                <>
                  <Pause size={12} />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play size={12} />
                  <span>Run</span>
                </>
              )}
            </button>
            <button
              onClick={manualNextStep}
              disabled={isAutoRunning}
              className="bft-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer text-white hover:bg-white/[0.06]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              {step === 4 ? 'Restart' : 'Step →'}
            </button>
            <button
              onClick={resetSimulation}
              className="bft-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer text-white/60 hover:text-white hover:bg-white/[0.06]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center">
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

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 mt-7">
        
        <div className="rounded-xl border border-white/[0.08] bg-[#050505] p-4 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
          <div className="absolute top-3 left-4 bft-mono text-[10px] text-white/40">
            consensus_network_nodes
          </div>

          <svg width="280" height="240" className="relative z-10">
            {NODES.map((n1) =>
              NODES.map((n2) => {
                if (n1.id >= n2.id) return null;
                const isProposeRound = step === 1 && (n1.id === 1 || n2.id === 1);
                const isVoteRound = step === 2 || step === 3;
                
                const hasByzantineEndpoint = n1.id === byzantineId || n2.id === byzantineId;
                const strokeColor = hasByzantineEndpoint && (step > 1) ? '#EF4444' : 'rgba(255, 255, 255, 0.08)';
                const strokeWidth = isProposeRound || isVoteRound ? 2 : 1;
                const showBeam = isProposeRound || (isVoteRound && !hasByzantineEndpoint);

                return (
                  <g key={`${n1.id}-${n2.id}`}>
                    <line
                      x1={n1.x + 20} y1={n1.y + 20}
                      x2={n2.x + 20} y2={n2.y + 20}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                    />
                    {showBeam && (
                      <line
                        x1={n1.x + 20} y1={n1.y + 20}
                        x2={n2.x + 20} y2={n2.y + 20}
                        stroke={step === 1 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)'}
                        strokeWidth="2"
                        className="bft-beam-active"
                      />
                    )}
                  </g>
                );
              })
            )}

            {NODES.map((n) => {
              const isLeader = n.id === 1;
              const isByzantine = n.id === byzantineId;
              let bg = 'rgba(255, 255, 255, 0.02)';
              let border = 'var(--border-strong)';
              let text = 'var(--text-2)';

              if (isByzantine) {
                bg = 'rgba(239, 68, 68, 0.15)';
                border = '#EF4444';
                text = '#EF4444';
              } else if (isLeader) {
                bg = 'rgba(59, 130, 246, 0.15)';
                border = '#3b82f6';
                text = '#3b82f6';
              }

              return (
                <g key={n.id}>
                  <circle
                    cx={n.x + 20}
                    cy={n.y + 20}
                    r="20"
                    fill={bg}
                    stroke={border}
                    strokeWidth="2.5"
                  />
                  <text
                    x={n.x + 20}
                    y={n.y + 24}
                    textAnchor="middle"
                    fill={text}
                    fontWeight="bold"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    N{n.id}
                  </text>
                  <text
                    x={n.x + 20}
                    y={n.y - 8}
                    textAnchor="middle"
                    fill={isByzantine ? '#EF4444' : 'var(--text-3)'}
                    fontSize="9"
                    fontWeight="600"
                  >
                    {isByzantine ? 'Byzantine' : isLeader ? 'Proposer' : variant.roleLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.06] pb-2">
              Voting Status
            </h4>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-white/40 mb-1.5">
                  <span>{algoId === 'raft' ? 'AppendEntries RPC' : 'Phase 1 agreement'}</span>
                  <span className={preVotes.length >= 3 ? 'text-emerald-400 font-mono' : 'text-white/40 font-mono'}>
                    {preVotes.length}/4 votes
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] h-2 rounded overflow-hidden">
                  <div
                    className="bg-[#EF4444] h-full transition-all duration-300"
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
                    className="bg-[#EF4444] h-full transition-all duration-300"
                    style={{ width: `${(preCommits.length / 4) * 100}%`, backgroundColor: variant.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] text-white/40 leading-relaxed font-semibold">
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

      <div className="mt-6 border-t border-white/[0.06] pt-6">
        <h4 className="bft-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
          replicated_ledger
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {blockchain.map((b) => (
            <div
              key={b.height}
              className="rounded-xl border border-white/[0.08] bg-[#050505] p-3 text-xs min-w-[125px] flex flex-col justify-between gap-2 shrink-0"
            >
              <div>
                <p className="bft-mono text-[9px] text-white/40">Height: #{b.height}</p>
                <p className="font-bold text-white mt-1 truncate">Leader: {b.proposer}</p>
              </div>
              <p className="bft-mono text-[9px] text-white/40 truncate">Hash: {b.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
