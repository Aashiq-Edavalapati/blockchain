import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, Layers, Cpu, Coins, RotateCcw, SkipForward } from 'lucide-react';

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

  // Dynamically map STAGES from the database steps
  const STAGES = useMemo(() => {
    const rawSteps = algorithm?.stepByStepExplanation || [];
    if (rawSteps.length === 0) {
      return [
        { key: 'idle', label: 'Idle', detail: 'Wait for next slot. Nodes standing by.' },
        { key: 'proposer', label: 'Election', detail: 'Lottery select slot producer.' },
        { key: 'propose', label: 'Propose Block', detail: 'Elected producer proposes new block.' },
        { key: 'attest', label: 'Attestation', detail: 'Other validators sign and vote on the proposal.' },
        { key: 'finalize', label: 'Finalize slot', detail: 'Supermajority reached. Slot committed.' },
      ];
    }
    return rawSteps.map((stepDesc, idx) => {
      const parts = stepDesc.split(/[—:-]/);
      const label = parts[0].trim().replace(/^\d+\.\s*/, "");
      const detail = parts.slice(1).join("—").trim() || stepDesc;
      return {
        key: `step_${idx}`,
        label: label.length > 22 ? label.slice(0, 20) + "…" : label,
        detail: detail
      };
    });
  }, [algorithm]);

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
          title: algorithm?.name || 'Proof of Stake',
          desc: algorithm?.tagline || 'Simulating slot lottery. Validator election chance is proportional to locked stake.',
          sliderLabel: 'Staked Assets',
          roleLabel: 'PROPOSER',
          nodeNamePre: 'Validator',
          bottomText: 'Stakeholders secure block production slot.',
          color: '#3b82f6',
        };
    }
  };

  const variant = getVariantDetails();

  useEffect(() => {
    if (!isAutoRunning) {
      if (autoRunTimeoutRef.current) clearTimeout(autoRunTimeoutRef.current);
      return;
    }

    const nextStep = (next, delay) => {
      autoRunTimeoutRef.current = setTimeout(() => setStep(next), delay);
    };

    const maxSteps = STAGES.length;

    // Reset loop at end
    if (step >= maxSteps - 1) {
      autoRunTimeoutRef.current = setTimeout(() => {
        const leader = nodes.find(v => v.id === leaderId) || nodes[0];
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
      }, 1500);
      return () => clearTimeout(autoRunTimeoutRef.current);
    }

    if (step === 0) {
      nextStep(1, 1000);
    } else if (step === 1) {
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
    } else if (step === 2) {
      if (algoId === 'poh') {
        let ticks = 0;
        const interval = setInterval(() => {
          ticks++;
          setVdfTicks(ticks * 20);
          if (ticks >= 5) {
            clearInterval(interval);
            nextStep(3, 200);
          }
        }, 150);
        return () => clearInterval(interval);
      } else {
        nextStep(3, 1200);
      }
    } else if (step === 3) {
      const attesting = nodes.filter(v => v.id !== leaderId);
      setAttestations(attesting.map(v => v.id));
      nextStep(Math.min(4, maxSteps - 1), 1200);
    } else {
      nextStep((step + 1) % maxSteps, 1200);
    }

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, nodes, leaderId, totalWeight, algoId, STAGES.length, variant.nodeNamePre]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === STAGES.length - 1) setStep(0);
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    const maxSteps = STAGES.length;

    if (step === maxSteps - 1) {
      const leader = nodes.find(v => v.id === leaderId) || nodes[0];
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
      setStep(Math.min(4, maxSteps - 1));
    } else {
      setStep(s => (s + 1) % maxSteps);
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
      }}
      className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative"
    >
      <style>{`
        .pos-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes pos-pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.06); opacity: 1; } }
        .pos-active-leader { animation: pos-pulse 1.4s ease-in-out infinite; }
        .pos-track-fill { transition: width 0.4s ease; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="pos-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-white/20 font-mono text-xl">/ 0{STAGES.length}</span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            <span className="pos-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--blue)' }}>
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
          <button onClick={manualNextStep} disabled={isAutoRunning || lotterySpin} className="p-3 text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"><SkipForward size={20} /></button>
          <button onClick={resetSimulation} className="p-3 text-zinc-400 hover:text-white transition-all"><RotateCcw size={20} /></button>
        </div>
      </div>

      {/* Body Inner Section wrapper */}
      <div className="p-8 pb-0">
        {/* 2. STEPPER */}
        <div className="flex items-center justify-between pb-8 overflow-x-auto no-scrollbar gap-2">
          {STAGES.map((s, i) => {
            const active = i === step;
            const passed = i < step;
            return (
              <React.Fragment key={s.key}>
                <div className="flex flex-col items-center gap-2 shrink-0" style={{ minWidth: 64 }}>
                  <div
                    className="pos-mono flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all"
                    style={{
                      borderColor: active || passed ? 'var(--blue)' : 'var(--border-strong)',
                      background: active ? 'var(--blue)' : passed ? 'var(--blue-dim)' : 'var(--surface)',
                      color: active ? '#0A0A0C' : passed ? 'var(--blue)' : 'var(--text-3)',
                    }}
                  >
                    {passed ? '✓' : i + 1}
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-wide text-center"
                    style={{ color: active ? 'var(--text-1)' : 'var(--text-3)', fontWeight: active ? 600 : 400 }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STAGES.length - 1 && (
                  <div className="mx-1 h-px flex-1 min-w-[20px]" style={{ background: 'var(--border)', marginBottom: 18 }}>
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
      </div>

      {/* 3. DYNAMIC VISUALIZATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT PANEL: ARENA */}
        <div className="lg:col-span-7 p-10 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="absolute top-4 left-6 pos-mono text-[9px] text-white/40 uppercase tracking-[0.2em]">
            consensus_selection_arena
          </div>

          <div className="relative w-56 h-56 flex items-center justify-center">
            <div className="absolute w-24 h-24 rounded-full border border-white/[0.08] bg-black flex flex-col items-center justify-center z-10 text-center p-3 shadow-2xl">
              <span className="pos-mono text-[8px] uppercase tracking-wider text-white/40">
                {algoId === 'poh' ? 'VDF tick' : 'Active Slot'}
              </span>
              <span className="text-sm font-bold text-white leading-none mt-1">
                {algoId === 'poh' && step === 2 ? `${vdfTicks}%` : `#${blockchain.length}`}
              </span>
            </div>

            {nodes.map((n, i) => {
              const angle = (i * 360) / nodes.length;
              const radius = 88; 
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              const isLeader = n.id === leaderId;
              const hasAttested = attestations.includes(n.id);

              return (
                <div key={n.id} className="absolute flex flex-col items-center gap-1.5 transition-all duration-300" style={{ transform: `translate(${x}px, ${y}px)` }}>
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-sm font-bold transition-all ${isLeader ? 'pos-active-leader shadow-lg' : ''}`} style={{ background: isLeader ? n.color : hasAttested ? `${n.color}25` : 'rgba(255, 255, 255, 0.02)', borderColor: isLeader || hasAttested ? n.color : 'var(--border-strong)', color: isLeader ? '#000' : n.color, boxShadow: isLeader ? `0 0 16px ${n.color}60` : 'none' }}>
                    {n.id}
                  </div>
                  <span className="text-[8.5px] font-bold text-white/40 uppercase">{isLeader ? variant.roleLabel : `${Math.round((n.weight / totalWeight) * 100)}%`}</span>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-center text-center">
            {step === 3 && <div className="text-xs font-mono text-blue-400 animate-pulse">Signatures: {attestations.length}/3 nodes received</div>}
            {step === STAGES.length - 2 && <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">✓ Block signed and committed.</div>}
            {lotterySpin && <div className="text-xs font-mono text-purple-400 animate-pulse">Spinning lottery selector...</div>}
          </div>
        </div>

        {/* RIGHT PANEL: PARAMETERS */}
        <div className="lg:col-span-5 p-10 flex flex-col justify-between bg-black">
          <div>
            <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/[0.04]">Active Parameter settings</h4>
            <div className="space-y-6">
              {nodes.map((n) => (
                <div key={n.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-white/60">{variant.nodeNamePre} {n.id}</span>
                    <span className="font-mono text-white font-bold">{n.weight} stake</span>
                  </div>
                  <input type="range" min="10" max="600" step="10" value={n.weight} onChange={(e) => updateWeight(n.id, Number(e.target.value))} disabled={step > 0} className="w-full accent-current h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" style={{ accentColor: n.color }} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.04] text-[10.5px] text-white/40 leading-relaxed font-sans">{variant.bottomText}</div>
        </div>
      </div>

      {/* 4. ENHANCED BLOCKCHAIN LEDGER */}
      <div className="bg-[#050505] border-t border-white/[0.06] p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-white/40" />
            <span className="pos-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Verified Ledger Archive</span>
          </div>
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Tip: Block #{blockchain.length-1}</div>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {blockchain.map((b) => (
            <div key={b.height} className="shrink-0 w-64 rounded-2xl border border-white/[0.08] bg-black p-5 flex flex-col gap-3 relative transition-all duration-500">
              <div>
                <p className="pos-mono text-[9px] text-white/40">Height: #{b.height}</p>
                <p className="font-bold text-white mt-1 truncate">Proposer: {b.proposer}</p>
              </div>
              <p className="pos-mono text-[9.5px] text-white/40 truncate bg-white/[0.02] p-2 rounded border border-white/[0.04]">Hash: {b.hash}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
