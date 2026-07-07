import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Wait for next slot. Nodes standing by.' },
  { key: 'proposer', label: 'Election', detail: 'Lottery select slot producer.' },
  { key: 'propose', label: 'Propose Block', detail: 'Elected producer proposes new block.' },
  { key: 'attest', label: 'Attestation', detail: 'Other validators sign and vote on the proposal.' },
  { key: 'finalize', label: 'Finalize slot', detail: 'Supermajority reached. Slot committed.' },
];

const THEME = {
  bg: '#000000',
  surface: '#050505',
  surface2: '#020202',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  blue: '#ffffff',
  blueDim: 'rgba(255, 255, 255, 0.1)',
  green: '#ffffff',
  greenDim: 'rgba(255, 255, 255, 0.1)',
  text1: '#ffffff',
  text2: '#888888',
  text3: '#666666',
};

const INITIAL_NODES = [
  { id: 'A', name: 'Node Alice', weight: 400, color: '#3b82f6' },
  { id: 'B', name: 'Node Bob', weight: 300, color: '#a855f7' },
  { id: 'C', name: 'Node Charlie', weight: 200, color: '#f59e0b' },
  { id: 'D', name: 'Node David', weight: 100, color: '#10b981' },
];

export default function ProofOfStakeVisualizer({ algorithm }) {
  const algoId = algorithm?.id || "pos";
  const [step, setStep] = useState(0);
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [leaderId, setLeaderId] = useState(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lotterySpin, setLotterySpin] = useState(false);
  const [blockchain, setBlockchain] = useState([
    { height: 0, proposer: 'Genesis', hash: '00000000' }
  ]);
  const [attestations, setAttestations] = useState([]);
  const [vdfTicks, setVdfTicks] = useState(0);

  const autoRunTimeoutRef = useRef(null);
  const totalWeight = nodes.reduce((acc, n) => acc + n.weight, 0);

  const getVariantDetails = () => {
    switch (algoId) {
      case 'dpos':
        return {
          title: 'Delegated Proof of Stake',
          desc: 'Simulating delegate lottery. Token holders delegate voting weight to nodes.',
          sliderLabel: 'Delegated votes',
          roleLabel: 'DELEGATE',
          nodeNamePre: 'Delegate',
          bottomText: 'Stakeholder votes dictate election chance.',
          color: '#3B82F6',
        };
      case 'poa':
      case 'clique':
      case 'aura':
      case 'parlia':
        return {
          title: 'Proof of Authority',
          desc: 'Simulating authority round-robin. Selected nodes use identity authority keys.',
          sliderLabel: 'Reputation weight',
          roleLabel: 'AUTHORITY',
          nodeNamePre: 'Signer',
          bottomText: 'Elected via off-chain authority keys, not coin stake.',
          color: '#10B981',
        };
      case 'npos':
        return {
          title: 'Nominated Proof of Stake',
          desc: 'Simulating nominators Phragmén election. Nominators back nodes with stake.',
          sliderLabel: 'Nominators backing',
          roleLabel: 'VALIDATOR',
          nodeNamePre: 'Validator',
          bottomText: 'Active set chosen to maximize total backing stake.',
          color: '#8B5CF6',
        };
      case 'poh':
        return {
          title: 'Proof of History + PoS',
          desc: 'Simulating Verifiable Delay sequence ticks ordering blocks before PoS election.',
          sliderLabel: 'Validator stake',
          roleLabel: 'LEADER',
          nodeNamePre: 'VDF Node',
          bottomText: 'VDF hashes prove elapse of real time between slot steps.',
          color: '#F59E0B',
        };
      case 'proofOfImportance':
        return {
          title: 'Proof of Importance',
          desc: 'Simulating selection based on activity. Nodes earn importance scores.',
          sliderLabel: 'Activity score',
          roleLabel: 'HARVESTER',
          nodeNamePre: 'Harvester',
          bottomText: 'Importance is computed from coin hold + active transfers.',
          color: '#EC4899',
        };
      default:
        return {
          title: 'Proof of Stake',
          desc: 'Simulating slot lottery. Validator election chance is proportional to locked stake.',
          sliderLabel: 'Staked ETH',
          roleLabel: 'PROPOSER',
          nodeNamePre: 'Validator',
          bottomText: 'Stakeholders lock assets to secure block production slot.',
          color: '#3b82f6',
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
        nextStep(1, 800);
        break;
      case 1:
        setLotterySpin(true);
        const spinTimeout = setTimeout(() => {
          setLotterySpin(false);
          let rand = Math.random() * totalWeight;
          let selected = nodes[0].id;
          for (const val of nodes) {
            rand -= val.weight;
            if (rand <= 0) {
              selected = val.id;
              break;
            }
          }
          setLeaderId(selected);
          setStep(2);
        }, 1200);
        return () => clearTimeout(spinTimeout);
      case 2:
        if (algoId === 'poh') {
          // Increment VDF ticks
          let ticks = 0;
          const interval = setInterval(() => {
            ticks++;
            setVdfTicks(ticks * 100);
            if (ticks >= 5) {
              clearInterval(interval);
              nextStep(3, 200);
            }
          }, 150);
          return () => clearInterval(interval);
        } else {
          nextStep(3, 1000);
        }
        break;
      case 3:
        const attesting = nodes.filter(v => v.id !== leaderId);
        setAttestations(attesting.map(v => v.id));
        nextStep(4, 1200);
        break;
      case 4:
        autoRunTimeoutRef.current = setTimeout(() => {
          const leader = nodes.find(v => v.id === leaderId);
          setBlockchain(prev => [
            ...prev,
            {
              height: prev.length,
              proposer: leader ? `${variant.nodeNamePre} ${leader.id}` : 'Unknown',
              hash: Math.random().toString(16).substring(2, 10)
            }
          ]);
          setAttestations([]);
          setLeaderId(null);
          setVdfTicks(0);
          setStep(0);
        }, 1000);
        break;
    }

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, nodes, leaderId, totalWeight, algoId]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === 4) setStep(0);
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    if (step === 4) {
      const leader = nodes.find(v => v.id === leaderId);
      setBlockchain(prev => [
        ...prev,
        {
          height: prev.length,
          proposer: leader ? `${variant.nodeNamePre} ${leader.id}` : 'Unknown',
          hash: Math.random().toString(16).substring(2, 10)
        }
      ]);
      setAttestations([]);
      setLeaderId(null);
      setVdfTicks(0);
      setStep(0);
    } else if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      let rand = Math.random() * totalWeight;
      let selected = nodes[0].id;
      for (const val of nodes) {
        rand -= val.weight;
        if (rand <= 0) {
          selected = val.id;
          break;
        }
      }
      setLeaderId(selected);
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const attesting = nodes.filter(v => v.id !== leaderId);
      setAttestations(attesting.map(v => v.id));
      setStep(4);
    }
  };

  const resetSimulation = () => {
    setIsAutoRunning(false);
    setStep(0);
    setLeaderId(null);
    setLotterySpin(false);
    setBlockchain([{ height: 0, proposer: 'Genesis', hash: '00000000' }]);
    setAttestations([]);
    setVdfTicks(0);
    setNodes(INITIAL_NODES);
  };

  const updateWeight = (id, newWeight) => {
    setNodes(prev =>
      prev.map(n => (n.id === id ? { ...n, weight: Math.max(10, newWeight) } : n))
    );
  };

  const activeStage = STAGES[step] || STAGES[0];

  return (
    <div
      style={{
        '--bg': THEME.bg, '--surface': THEME.surface, '--surface-2': THEME.surface2,
        '--border': THEME.border, '--border-strong': THEME.borderStrong,
        '--blue': variant.color, '--blue-dim': `${variant.color}20`,
        '--green': THEME.green, '--green-dim': THEME.greenDim,
        '--text-1': THEME.text1, '--text-2': THEME.text2, '--text-3': THEME.text3,
        background: 'var(--bg)', color: 'var(--text-1)',
        fontFamily: "'Raleway', 'Inter', sans-serif",
      }}
      className="w-full max-w-4xl rounded-2xl border p-7"
    >
      <style>{`
        .pos-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes pos-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.06); opacity: 1; } }
        .pos-active-leader { animation: pos-pulse 1.4s ease-in-out infinite; }
        .pos-track-fill { transition: width 0.4s ease; }
      `}</style>

      <div style={{ borderColor: 'var(--border)' }} className="flex flex-wrap items-start justify-between gap-6 border-b pb-6">
        <div>
          <div className="pos-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--blue)' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
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
          <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={toggleAutoRun}
              className="pos-mono px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{
                background: isAutoRunning ? 'rgba(224,90,90,0.12)' : 'var(--blue-dim)',
                color: isAutoRunning ? '#E05A5A' : 'var(--blue)',
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
              disabled={isAutoRunning || lotterySpin}
              className="pos-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer text-white hover:bg-white/[0.06]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              {step === 4 ? 'Restart' : 'Step →'}
            </button>
            <button
              onClick={resetSimulation}
              className="pos-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer text-white/60 hover:text-white hover:bg-white/[0.06]"
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
                  className="pos-mono flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all"
                  style={{
                    borderColor: active || passed ? 'var(--blue)' : 'var(--border-strong)',
                    background: active ? 'var(--blue)' : passed ? 'var(--blue-dim)' : 'var(--surface)',
                    color: active ? '#0A0A0C' : passed ? 'var(--blue)' : 'var(--text-3)',
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
                    className="pos-track-fill h-px"
                    style={{ background: 'var(--blue)', width: i < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 mt-7">
        
        <div className="rounded-xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col items-center justify-center min-h-[280px] relative">
          <div className="absolute top-3 left-4 pos-mono text-[10px] text-white/40">
            consensus_selection_arena
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center z-10 text-center p-2 shadow-2xl">
              <span className="pos-mono text-[8px] uppercase tracking-wider text-white/40">
                {algoId === 'poh' ? 'VDF tick' : 'Active Slot'}
              </span>
              <span className="text-xs font-bold text-white leading-none mt-1">
                {algoId === 'poh' && step === 2 ? `${vdfTicks}` : `#${blockchain.length}`}
              </span>
            </div>

            {nodes.map((n, i) => {
              const angle = (i * 360) / nodes.length;
              const radius = 76; 
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              const isLeader = n.id === leaderId;
              const hasAttested = attestations.includes(n.id);

              return (
                <div
                  key={n.id}
                  className="absolute flex flex-col items-center gap-1 transition-all duration-300"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isLeader ? 'pos-active-leader shadow-lg' : ''
                    }`}
                    style={{
                      background: isLeader ? n.color : hasAttested ? `${n.color}25` : 'rgba(255, 255, 255, 0.02)',
                      borderColor: isLeader || hasAttested ? n.color : 'var(--border-strong)',
                      color: isLeader ? '#000' : n.color,
                      boxShadow: isLeader ? `0 0 16px ${n.color}60` : 'none',
                    }}
                  >
                    {n.id}
                  </div>
                  <span className="text-[8px] font-bold text-white/40 uppercase">{isLeader ? variant.roleLabel : `${Math.round((n.weight / totalWeight) * 100)}%`}</span>
                </div>
              );
            })}
          </div>

          {step === 3 && (
            <div className="mt-4 text-xs font-mono text-blue-400 animate-pulse">
              Signatures: {attestations.length}/3 nodes received
            </div>
          )}
          {step === 4 && (
            <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              ✓ Slot committed. Chain ledger updated.
            </div>
          )}
          {lotterySpin && (
            <div className="mt-4 text-xs font-mono text-purple-400 animate-pulse">
              Spinning lottery selector...
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.06] pb-2">
              Parameters
            </h4>
            <div className="space-y-4">
              {nodes.map((n) => (
                <div key={n.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-[#888]">{variant.nodeNamePre} {n.id}</span>
                    <span className="font-mono text-white font-semibold">{n.weight}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    step="10"
                    value={n.weight}
                    onChange={(e) => updateWeight(n.id, Number(e.target.value))}
                    disabled={step > 0}
                    className="w-full accent-current"
                    style={{ accentColor: n.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/[0.06] text-[10px] text-white/40 font-semibold leading-relaxed">
            {variant.bottomText}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-6">
        <h4 className="pos-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
          chain_extended_ledger
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {blockchain.map((b) => (
            <div
              key={b.height}
              className="rounded-xl border border-white/[0.08] bg-[#050505] p-3 text-xs min-w-[125px] flex flex-col justify-between gap-2 shrink-0"
            >
              <div>
                <p className="pos-mono text-[9px] text-white/40">Height: #{b.height}</p>
                <p className="font-bold text-white mt-1 truncate">{b.proposer}</p>
              </div>
              <p className="pos-mono text-[9px] text-white/40 truncate">Hash: {b.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
