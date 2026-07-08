import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Layers, RotateCcw, SkipForward } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Transactions in mempool have conflicting preferences (Red vs Blue).' },
  { key: 'sample', label: 'Sub-sampling', detail: 'Query node selects a random subset (k=5) of peer nodes.' },
  { key: 'query', label: 'Query', detail: 'Node queries the sample about their transaction preference.' },
  { key: 'tally', label: 'Tally & Flip', detail: 'If confidence threshold (α) is met, node adopts the majority preference.' },
  { key: 'consensus', label: 'Convergence', detail: 'All nodes query recursively, cascading the entire grid into 100% consensus.' },
];

const THEME = {
  bg: '#000000',
  surface: '#050505',
  surface2: '#020202',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  purple: '#ffffff',
  purpleDim: 'rgba(255, 255, 255, 0.1)',
  red: '#EF4444',
  blue: '#3b82f6',
  text1: '#ffffff',
  text2: '#888888',
  text3: '#666666',
};

const INITIAL_TRANSACTIONS = [
  { id: 1, color: '#3b82f6', confidence: 2 },
  { id: 2, color: '#EF4444', confidence: 1 },
  { id: 3, color: '#3b82f6', confidence: 3 },
  { id: 4, color: '#3b82f6', confidence: 1 },
  { id: 5, color: '#EF4444', confidence: 2 },
  { id: 6, color: '#EF4444', confidence: 4 },
  { id: 7, color: '#3b82f6', confidence: 2 },
  { id: 8, color: '#EF4444', confidence: 1 },
  { id: 9, color: '#3b82f6', confidence: 1 },
  { id: 10, color: '#3b82f6', confidence: 2 },
  { id: 11, color: '#EF4444', confidence: 3 },
  { id: 12, color: '#EF4444', confidence: 1 },
  { id: 13, color: '#3b82f6', confidence: 4 },
  { id: 14, color: '#EF4444', confidence: 2 },
  { id: 15, color: '#3b82f6', confidence: 2 },
  { id: 16, color: '#EF4444', confidence: 3 },
];

export default function DAGVisualizer({ algorithm }) {
  const algoId = algorithm?.id || "avalanche";
  const [step, setStep] = useState(0);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [kSample, setKSample] = useState(5);
  const [alpha, setAlpha] = useState(4);
  const [queryNode, setQueryNode] = useState(null);
  const [sampledPeers, setSampledPeers] = useState([]);
  const [voteTally, setVoteTally] = useState({ red: 0, blue: 0 });

  const autoRunTimeoutRef = useRef(null);
  const isConsensusReached = transactions.every(t => t.color === transactions[0].color);

  const getVariantDetails = () => {
    switch (algoId) {
      case 'snowman':
        return {
          title: 'Snowman Consensus',
          desc: 'Simulating linear block production built on top of Avalanche\'s sub-sampling queries.',
          gridName: 'snowman_block_gossip_grid',
          bottomText: 'Creates a strict linear blockchain using metastable voting mechanics.',
          color: '#8B5CF6',
        };
      case 'snowball':
        return {
          title: 'Snowball Consensus',
          desc: 'Simulating state confidence counters. The node retains historical query confidence parameters.',
          gridName: 'snowball_confidence_state',
          bottomText: 'Adds confidence state variables to increase security against adaptive attackers.',
          color: '#EC4899',
        };
      default:
        return {
          title: 'Avalanche metastable Gossip',
          desc: 'Simulating directed acyclic transaction vertex sub-sampling. Converges conflicting transaction preferences.',
          gridName: 'metastable_dag_gossip_grid',
          bottomText: 'Sub-sampling allows high throughput with zero coordination overhead.',
          color: '#a855f7',
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
        if (isConsensusReached) {
          setIsAutoRunning(false);
          setStep(4);
          return;
        }
        setQueryNode(null);
        setSampledPeers([]);
        setVoteTally({ red: 0, blue: 0 });
        nextStep(1, 800);
        break;
      case 1:
        const qIdx = Math.floor(Math.random() * transactions.length);
        setQueryNode(transactions[qIdx].id);

        const sample = [];
        while (sample.length < kSample) {
          const peerId = Math.floor(Math.random() * transactions.length) + 1;
          if (peerId !== transactions[qIdx].id && !sample.includes(peerId)) {
            sample.push(peerId);
          }
        }
        setSampledPeers(sample);
        nextStep(2, 1000);
        break;
      case 2:
        let redVotes = 0;
        let blueVotes = 0;
        sampledPeers.forEach(id => {
          const tx = transactions.find(t => t.id === id);
          if (tx.color === '#EF4444') redVotes++;
          else blueVotes++;
        });
        setVoteTally({ red: redVotes, blue: blueVotes });
        nextStep(3, 1200);
        break;
      case 3:
        setTransactions(prev => {
          const qNode = prev.find(t => t.id === queryNode);
          if (!qNode) return prev;

          const next = [...prev];
          const nodeIdx = next.findIndex(t => t.id === queryNode);

          if (voteTally.red >= alpha) {
            next[nodeIdx] = {
              ...qNode,
              color: '#EF4444',
              confidence: qNode.color === '#EF4444' ? qNode.confidence + 1 : 1
            };
          } else if (voteTally.blue >= alpha) {
            next[nodeIdx] = {
              ...qNode,
              color: '#3b82f6',
              confidence: qNode.color === '#3b82f6' ? qNode.confidence + 1 : 1
            };
          }
          return next;
        });
        nextStep(0, 1000);
        break;
      case 4:
        break;
    }

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, transactions, kSample, alpha, queryNode, sampledPeers, voteTally, isConsensusReached]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === 4) {
      setTransactions(INITIAL_TRANSACTIONS);
      setStep(0);
    }
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    if (step === 4) {
      setTransactions(INITIAL_TRANSACTIONS);
      setStep(0);
    } else if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      const qIdx = Math.floor(Math.random() * transactions.length);
      setQueryNode(transactions[qIdx].id);
      const sample = [];
      while (sample.length < kSample) {
        const peerId = Math.floor(Math.random() * transactions.length) + 1;
        if (peerId !== transactions[qIdx].id && !sample.includes(peerId)) {
          sample.push(peerId);
        }
      }
      setSampledPeers(sample);
      setStep(2);
    } else if (step === 2) {
      let redVotes = 0;
      let blueVotes = 0;
      sampledPeers.forEach(id => {
        const tx = transactions.find(t => t.id === id);
        if (tx.color === '#EF4444') redVotes++;
        else blueVotes++;
      });
      setVoteTally({ red: redVotes, blue: blueVotes });
      setStep(3);
    } else if (step === 3) {
      setTransactions(prev => {
        const qNode = prev.find(t => t.id === queryNode);
        if (!qNode) return prev;
        const next = [...prev];
        const nodeIdx = next.findIndex(t => t.id === queryNode);
        if (voteTally.red >= alpha) {
          next[nodeIdx] = { ...qNode, color: '#EF4444', confidence: qNode.color === '#EF4444' ? qNode.confidence + 1 : 1 };
        } else if (voteTally.blue >= alpha) {
          next[nodeIdx] = { ...qNode, color: '#3b82f6', confidence: qNode.color === '#3b82f6' ? qNode.confidence + 1 : 1 };
        }
        return next;
      });
      setStep(0);
    }
  };

  const resetSimulation = () => {
    setIsAutoRunning(false);
    setTransactions(INITIAL_TRANSACTIONS);
    setQueryNode(null);
    setSampledPeers([]);
    setStep(0);
  };

  const activeStage = STAGES[step] || STAGES[0];
  return (
    <div
      style={{
        '--bg': THEME.bg, '--surface': THEME.surface, '--surface-2': THEME.surface2,
        '--border': THEME.border, '--border-strong': THEME.borderStrong,
        '--purple': variant.color, '--purple-dim': `${variant.color}20`,
        '--red': THEME.red, '--blue': THEME.blue,
        '--text-1': THEME.text1, '--text-2': THEME.text2, '--text-3': THEME.text3,
      }}
      className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative"
    >
      <style>{`
        .dag-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes dag-query { 0%, 100% { border-color: #242429; } 50% { border-color: #a855f7; } }
        .dag-query-active { animation: dag-query 1s infinite; }
        .dag-track-fill { transition: width 0.4s ease; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="dag-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-white/20 font-mono text-xl">/ 05</span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            <span className="dag-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--purple)' }}>
              Consensus · {variant.title}
            </span>
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{activeStage.label}</h2>
            <p className="text-xs text-white/50 font-medium tracking-tight max-w-sm">{activeStage.detail}</p>
          </div>
        </div>

        {/* Speed / Run controls */}
        <div className="flex bg-zinc-900/30 p-1 rounded-xl border border-white/[0.05]">
          <button onClick={toggleAutoRun} className={`p-3 rounded-lg transition-all ${isAutoRunning ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>
            {isAutoRunning ? <Pause size={20} strokeWidth={2.5} /> : <Play size={20} strokeWidth={2.5} />}
          </button>
          <button onClick={manualNextStep} disabled={isAutoRunning} className="p-3 text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"><SkipForward size={20} /></button>
          <button onClick={resetSimulation} className="p-3 text-zinc-400 hover:text-white transition-all"><RotateCcw size={20} /></button>
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
                    className="dag-mono flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all"
                    style={{
                      borderColor: active || passed ? 'var(--purple)' : 'var(--border-strong)',
                      background: active ? 'var(--purple)' : passed ? 'var(--purple-dim)' : 'var(--surface)',
                      color: active ? '#0A0A0C' : passed ? 'var(--purple)' : 'var(--text-3)',
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
                      className="dag-track-fill h-px"
                      style={{ background: 'var(--purple)', width: i < step ? '100%' : '0%' }}
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
        {/* LEFT PANEL: ARENA */}
        <div className="lg:col-span-7 p-10 border-r border-white/[0.06] flex flex-col items-center justify-center relative bg-[#010101]">
          <div className="absolute top-4 left-6 pos-mono text-[9px] text-white/40 uppercase tracking-[0.2em]">
            consensus_subsampling_grid
          </div>

          <div className="grid grid-cols-4 gap-3 w-56 max-w-full">
            {transactions.map((tx) => {
              const isQueryNode = tx.id === queryNode;
              const isSampled = sampledPeers.includes(tx.id);

              let ringColor = 'transparent';
              let scale = 'scale(1)';

              if (isQueryNode) {
                ringColor = variant.color;
                scale = 'scale(1.15)';
              } else if (isSampled) {
                ringColor = '#3b82f6';
                scale = 'scale(1.05)';
              }

              return (
                <div
                  key={tx.id}
                  className="aspect-square rounded-xl border flex flex-col items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 shadow-md relative"
                  style={{
                    background: tx.color,
                    borderColor: ringColor !== 'transparent' ? ringColor : 'var(--border-strong)',
                    color: '#fff',
                    transform: scale,
                    boxShadow: isQueryNode ? `0 0 14px ${variant.color}80` : isSampled ? '0 0 8px rgba(59, 130, 246, 0.4)' : 'none',
                    borderWidth: ringColor !== 'transparent' ? '2.5px' : '1px',
                  }}
                >
                  {tx.id}
                  <span className="absolute bottom-0.5 right-1 text-[7px] opacity-75">{tx.confidence}</span>
                </div>
              );
            })}
          </div>

          {isConsensusReached && (
            <div className="absolute bottom-4 text-xs font-mono text-emerald-400">
              ✓ Consensus reached! Grid converged on {transactions[0].color === '#3b82f6' ? 'BLUE' : 'RED'}
            </div>
          )}
        </div>

        {/* RIGHT PANEL: PARAMETERS */}
        <div className="lg:col-span-5 p-10 flex flex-col justify-between bg-black">
          <div>
            <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/[0.04]">
              Active Parameter settings
            </h4>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-white/60">Sample size (k)</span>
                  <span className="font-mono text-white font-bold">{kSample} peers</span>
                </div>
                <input
                  type="range" min="2" max="8" value={kSample}
                  onChange={(e) => setKSample(Number(e.target.value))}
                  disabled={step > 0}
                  className="w-full accent-current h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: variant.color }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-white/60">Threshold (α)</span>
                  <span className="font-mono text-white font-bold">{alpha} votes</span>
                </div>
                <input
                  type="range" min="2" max={kSample} value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  disabled={step > 0}
                  className="w-full accent-current h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: variant.color }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10.5px] text-white/40 leading-relaxed font-sans font-semibold">
            {variant.bottomText}
          </div>
        </div>
      </div>
    </div>
  );
}
