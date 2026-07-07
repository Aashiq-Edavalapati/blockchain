import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Wait for next slot. Validators locking stake.' },
  { key: 'proposer', label: 'Leader Election', detail: 'Stake-weighted lottery selects the slot leader.' },
  { key: 'propose', label: 'Propose Block', detail: 'Elected leader assembles and proposes a block.' },
  { key: 'attest', label: 'Attestation', detail: 'Other validators sign and vote on the proposal.' },
  { key: 'finalize', label: 'Finalize slot', detail: 'Attestations exceed >2/3 supermajority. Block finalized.' },
];

const THEME = {
  bg: '#0A0A0C',
  surface: '#111114',
  surface2: '#17171B',
  border: '#242429',
  borderStrong: '#33333A',
  blue: '#3b82f6',
  blueDim: 'rgba(59, 130, 246, 0.14)',
  green: '#10b981',
  greenDim: 'rgba(16, 185, 129, 0.14)',
  text1: '#F3F1EC',
  text2: '#8C8C93',
  text3: '#57575E',
};

const INITIAL_VALIDATORS = [
  { id: 'A', name: 'Node Alice', stake: 400, color: '#3b82f6' },
  { id: 'B', name: 'Node Bob', stake: 300, color: '#a855f7' },
  { id: 'C', name: 'Node Charlie', stake: 200, color: '#f59e0b' },
  { id: 'D', name: 'Node David', stake: 100, color: '#10b981' },
];

export default function ProofOfStakeVisualizer() {
  const [step, setStep] = useState(0);
  const [validators, setValidators] = useState(INITIAL_VALIDATORS);
  const [leaderId, setLeaderId] = useState(null);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lotterySpin, setLotterySpin] = useState(false);
  const [blockchain, setBlockchain] = useState([
    { height: 0, proposer: 'System', hash: '00000000000000000000000000000000' }
  ]);
  const [attestations, setAttestations] = useState([]);

  const autoRunTimeoutRef = useRef(null);

  // Total stake computation
  const totalStake = validators.reduce((acc, v) => acc + v.stake, 0);

  // Run slot steps
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
        // Run lottery selection
        setLotterySpin(true);
        const spinTimeout = setTimeout(() => {
          setLotterySpin(false);
          // Weighted random select
          let rand = Math.random() * totalStake;
          let selected = validators[0].id;
          for (const val of validators) {
            rand -= val.stake;
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
        nextStep(3, 1000);
        break;
      case 3:
        // Roll attestations
        const attesting = validators.filter(v => v.id !== leaderId);
        setAttestations(attesting.map(v => v.id));
        nextStep(4, 1200);
        break;
      case 4:
        autoRunTimeoutRef.current = setTimeout(() => {
          // Append block
          const leader = validators.find(v => v.id === leaderId);
          setBlockchain(prev => [
            ...prev,
            {
              height: prev.length,
              proposer: leader ? leader.name : 'Unknown',
              hash: Math.random().toString(16).substring(2, 10) + '...'
            }
          ]);
          setAttestations([]);
          setLeaderId(null);
          setStep(0);
        }, 1000);
        break;
    }

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, validators, leaderId, totalStake]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === 4) setStep(0);
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    if (step === 4) {
      const leader = validators.find(v => v.id === leaderId);
      setBlockchain(prev => [
        ...prev,
        {
          height: prev.length,
          proposer: leader ? leader.name : 'Unknown',
          hash: Math.random().toString(16).substring(2, 10) + '...'
        }
      ]);
      setAttestations([]);
      setLeaderId(null);
      setStep(0);
    } else if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      let rand = Math.random() * totalStake;
      let selected = validators[0].id;
      for (const val of validators) {
        rand -= val.stake;
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
      const attesting = validators.filter(v => v.id !== leaderId);
      setAttestations(attesting.map(v => v.id));
      setStep(4);
    }
  };

  const updateStake = (id, newStake) => {
    setValidators(prev =>
      prev.map(v => (v.id === id ? { ...v, stake: Math.max(10, newStake) } : v))
    );
  };

  const currentLeader = validators.find(v => v.id === leaderId);
  const activeStage = STAGES[step] || STAGES[0];

  return (
    <div
      style={{
        '--bg': THEME.bg, '--surface': THEME.surface, '--surface-2': THEME.surface2,
        '--border': THEME.border, '--border-strong': THEME.borderStrong,
        '--blue': THEME.blue, '--blue-dim': THEME.blueDim,
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

      {/* Header and Controls */}
      <div style={{ borderColor: 'var(--border)' }} className="flex flex-wrap items-start justify-between gap-6 border-b pb-6">
        <div>
          <div className="pos-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--blue)' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--blue)' }} />
            Consensus · Proof of Stake
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
              className="pos-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)', color: 'var(--text-1)' }}
            >
              {step === 4 ? 'Restart' : 'Step →'}
            </button>
          </div>
        </div>
      </div>

      {/* Process Steps Progress bar */}
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

      {/* Dynamic Network Arena & Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 mt-7">
        
        {/* Validator Nodes Ring Animation */}
        <div className="rounded-xl border border-zinc-900 bg-[#08080A] p-6 flex flex-col items-center justify-center min-h-[280px] relative">
          <div className="absolute top-3 left-4 pos-mono text-[10px] text-zinc-500">
            lottery_simulation_arena
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Center Slot Hub */}
            <div className="absolute w-20 h-20 rounded-full border border-zinc-800 bg-[#111116] flex flex-col items-center justify-center z-10 text-center p-2 shadow-2xl">
              <span className="pos-mono text-[8px] uppercase tracking-wider text-zinc-550">Active Slot</span>
              <span className="text-sm font-bold text-white leading-none mt-1">#{blockchain.length}</span>
            </div>

            {/* Render Nodes around the center */}
            {validators.map((v, i) => {
              const angle = (i * 360) / validators.length;
              const radius = 76; 
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              const isLeader = v.id === leaderId;
              const hasAttested = attestations.includes(v.id);

              return (
                <div
                  key={v.id}
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
                      background: isLeader ? v.color : hasAttested ? `${v.color}25` : '#111114',
                      borderColor: isLeader || hasAttested ? v.color : 'var(--border-strong)',
                      color: isLeader ? '#000' : v.color,
                      boxShadow: isLeader ? `0 0 16px ${v.color}60` : 'none',
                    }}
                  >
                    {v.id}
                  </div>
                  <span className="text-[8px] font-bold text-zinc-450 uppercase">{v.id === leaderId ? 'PROPOSER' : `${Math.round((v.stake / totalStake) * 100)}%`}</span>
                </div>
              );
            })}
          </div>

          {/* Attestation indicator */}
          {step === 3 && (
            <div className="mt-4 text-xs font-mono text-blue-400 animate-pulse">
              Attestations received: {attestations.length}/3 nodes signed
            </div>
          )}
          {step === 4 && (
            <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              ✓ Supermajority reached. Block finalized!
            </div>
          )}
          {lotterySpin && (
            <div className="mt-4 text-xs font-mono text-purple-400 animate-pulse">
              Selecting slot leader based on stakes...
            </div>
          )}
        </div>

        {/* Stake Adjustment Controls */}
        <div className="rounded-xl border border-zinc-900 bg-zinc-950/20 p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 border-b border-zinc-900 pb-2">
              Stake Distribution
            </h4>
            <div className="space-y-4">
              {validators.map((v) => (
                <div key={v.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-zinc-400">{v.name}</span>
                    <span className="font-mono text-zinc-300 font-semibold">{v.stake} ETH</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="600"
                    step="10"
                    value={v.stake}
                    onChange={(e) => updateStake(v.id, Number(e.target.value))}
                    disabled={step > 0}
                    className="w-full accent-current"
                    style={{ accentColor: v.color }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-900 text-[10px] text-zinc-500 font-semibold leading-relaxed">
            Adjusting a node's stake directly changes its mathematical probability of winning slot leadership.
          </div>
        </div>
      </div>

      {/* Blockchain Blocks output */}
      <div className="mt-6 border-t border-zinc-900 pt-6">
        <h4 className="pos-mono text-[10px] text-zinc-550 uppercase tracking-widest mb-3">
          slot_finalization_ledger
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {blockchain.map((b) => (
            <div
              key={b.height}
              className="rounded-xl border border-zinc-900 bg-[#0C0D12] p-3 text-xs min-w-[125px] flex flex-col justify-between gap-2 shrink-0"
            >
              <div>
                <p className="pos-mono text-[9px] text-zinc-550">Height: #{b.height}</p>
                <p className="font-bold text-zinc-200 mt-1 truncate">{b.proposer}</p>
              </div>
              <p className="pos-mono text-[9px] text-zinc-500 truncate">Hash: {b.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
