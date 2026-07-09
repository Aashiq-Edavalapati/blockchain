import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Flame, Sparkles, Coins,
  CheckCircle2, Server, Info, Layers, Trophy
} from 'lucide-react';

const STAGES = [
  { id: 'burn', label: 'Burn Coins', desc: 'Miners sending native tokens to an unspendable burn address.' },
  { id: 'register', label: 'Power Mapping', desc: 'Calculating miners\' active virtual hash power based on burned totals.' },
  { id: 'decay', label: 'Decay Function', desc: 'Burnt balances decaying over time to enforce constant burning.' },
  { id: 'select', label: 'Weighted Selection', desc: 'Randomized block proposer selection, weighted by mining power.' },
  { id: 'audit', label: 'Verify Burn', desc: 'Validators audit transactions to verify the winner\'s burn weight.' },
  { id: 'extend', label: 'Extend Ledger', desc: 'Adding the validated block to the blockchain.' },
  { id: 'mint', label: 'Subsidy Reward', desc: 'Winner earns block reward, paid in freshly minted tokens.' },
];

export default function ProofOfBurnVisualizer() {
  const [step, setStep] = useState(0);
  const [burnAmount, setBurnAmount] = useState(50); // in SLM
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [miners, setMiners] = useState([
    { name: 'Miner_01 (You)', burntTotal: 120, virtualPower: 120, probability: 40, isWinner: false },
    { name: 'Miner_02', burntTotal: 100, virtualPower: 100, probability: 33, isWinner: false },
    { name: 'Miner_03', burntTotal: 80, virtualPower: 80, probability: 27, isWinner: false },
  ]);
  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '0000000000000burnedgenesisblockhash3f9a2b8e7c1d', burntProof: 0, time: 'Genesis' }
  ]);

  const autoRunTimer = useRef(null);
  const selectTimer = useRef(null);
  const isSelecting = step === 3;

  // Auto-Simulation Engine
  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimer.current); return; }
    const transition = (delay) => { autoRunTimer.current = setTimeout(() => setStep(s => (s + 1) % 7), delay); };
    
    if (isSelecting) return; 
    
    if (step === 5) {
      commitBlock();
    }

    const delays = [2500, 2500, 2500, 0, 2000, 2000, 2500];
    transition(delays[step]);

    return () => clearTimeout(autoRunTimer.current);
  }, [step, isAutoRunning, isSelecting]);

  // Handle Proposer Selection Animation
  useEffect(() => {
    if (isSelecting) {
      let rounds = 0;
      const selectionInterval = setInterval(() => {
        setMiners(prev => prev.map((m, idx) => ({
          ...m,
          isWinner: idx === (rounds % 3)
        })));
        rounds++;
      }, 100);

      selectTimer.current = setTimeout(() => {
        clearInterval(selectionInterval);
        
        // Finalize winner based on probability
        setMiners(prev => {
          const totalPower = prev.reduce((sum, m) => sum + m.virtualPower, 0);
          const rand = Math.random() * totalPower;
          let cumulative = 0;
          let winnerIdx = 0;
          
          for (let i = 0; i < prev.length; i++) {
            cumulative += prev[i].virtualPower;
            if (rand <= cumulative) {
              winnerIdx = i;
              break;
            }
          }

          return prev.map((m, idx) => ({
            ...m,
            isWinner: idx === winnerIdx
          }));
        });
        
        setStep(4);
      }, 2500);
    }
    return () => clearTimeout(selectTimer.current);
  }, [isSelecting]);

  const handleBurn = () => {
    if (step !== 0) return;
    setMiners(prev => {
      const updated = prev.map((m, i) => {
        if (i === 0) {
          const newBurnt = m.burntTotal + burnAmount;
          return { ...m, burntTotal: newBurnt, virtualPower: newBurnt };
        }
        return m;
      });
      // Recalculate probabilities
      const totalPower = updated.reduce((sum, m) => sum + m.virtualPower, 0);
      return updated.map(m => ({
        ...m,
        probability: Math.round((m.virtualPower / totalPower) * 100)
      }));
    });
    setStep(1);
  };

  // Step transitions
  useEffect(() => {
    if (step === 2) {
      // Apply decay: reduce virtual power by 10%
      setMiners(prev => {
        const updated = prev.map(m => {
          const decayed = Math.max(10, Math.round(m.virtualPower * 0.9));
          return { ...m, virtualPower: decayed };
        });
        const totalPower = updated.reduce((sum, m) => sum + m.virtualPower, 0);
        return updated.map(m => ({
          ...m,
          probability: Math.round((m.virtualPower / totalPower) * 100)
        }));
      });
    }
  }, [step]);

  const commitBlock = () => {
    setBlockchain(prev => {
      const winner = miners.find(m => m.isWinner) || miners[0];
      const blockHash = "0000000000000b" + Math.random().toString(16).slice(2, 16) + "ff" + winner.burntTotal;
      if (prev.some(b => b.hash === blockHash)) return prev;
      return [...prev, { 
        height: prev.length, 
        hash: blockHash, 
        winnerName: winner.name,
        burntProof: winner.burntTotal,
        time: new Date().toLocaleTimeString() 
      }];
    });
  };

  const handleManual = () => {
    setIsAutoRunning(false);
    if (step === 0) {
      handleBurn();
    } else {
      if (step === 5) commitBlock();
      setStep(s => (s + 1) % 7);
    }
  };

  const resetSim = () => {
    setStep(0);
    setBlockchain([blockchain[0]]);
    setIsAutoRunning(false);
    setMiners([
      { name: 'Miner_01 (You)', burntTotal: 120, virtualPower: 120, probability: 40, isWinner: false },
      { name: 'Miner_02', burntTotal: 100, virtualPower: 100, probability: 33, isWinner: false },
      { name: 'Miner_03', burntTotal: 80, virtualPower: 80, probability: 27, isWinner: false },
    ]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative">
      <style>{`
        @keyframes flame-burn { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.1) rotate(1deg); filter: brightness(1.2); } }
        .animate-flame { animation: flame-burn 1.5s infinite ease-in-out; }
        @keyframes coin-fall { 0% { transform: translateY(-40px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(40px) scale(0.5); opacity: 0; } }
        .animate-coin { animation: coin-fall 1.5s infinite linear; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-zinc-800 font-mono text-xl">/ 07</span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{STAGES[step].label}</h2>
            <p className="text-xs text-zinc-500 font-medium tracking-tight">{STAGES[step].desc}</p>
          </div>
        </div>

        <div className="flex bg-zinc-900/30 p-1 rounded-xl border border-white/[0.05]">
          <button onClick={() => setIsAutoRunning(!isAutoRunning)} className={`p-3 rounded-lg transition-all ${isAutoRunning ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>
            {isAutoRunning ? <Pause size={20} strokeWidth={2.5} /> : <Play size={20} strokeWidth={2.5} />}
          </button>
          <button onClick={handleManual} className="p-3 text-zinc-400 hover:text-white transition-all"><SkipForward size={20} /></button>
          <button onClick={resetSim} className="p-3 text-zinc-400 hover:text-white transition-all"><RotateCcw size={20} /></button>
        </div>
      </div>

      {/* DYNAMIC STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* LEFT PANEL: WALLET BURN FIRE */}
        <div className="lg:col-span-5 p-12 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="relative w-72 h-72 flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-[#030303] p-6 shadow-inner overflow-hidden">
            {/* Visual: Burning coins in flame */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Burnt address label */}
              <div className="absolute top-4 text-[9px] font-mono text-zinc-600 bg-black/40 px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                Dest: 1BurntCoinXXXXXXXXXXXXXX
              </div>

              {/* Flame Graphics */}
              <div className="relative flex items-center justify-center w-36 h-36">
                <Flame size={72} className="text-orange-500 animate-flame absolute z-10" />
                <Flame size={96} className="text-red-600 animate-flame opacity-30 blur-sm absolute" style={{ animationDelay: '0.2s' }} />
                
                {/* Rising sparks */}
                {step === 0 && (
                  <div className="absolute inset-0 z-20 pointer-events-none">
                    <Coins size={14} className="text-amber-500 animate-coin absolute left-1/3" />
                    <Coins size={14} className="text-amber-500 animate-coin absolute right-1/3" style={{ animationDelay: '0.6s' }} />
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-col items-center space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Burning Furnace</span>
                <span className="text-xs text-orange-400 font-bold font-mono">
                  {step === 0 ? "FURNACE_AWAITING_BURN" : "COINS_BURNED_SUCCESSFULLY"}
                </span>
              </div>
            </div>

            {/* Selection Checkmark overlay */}
            {step === 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-2xl animate-fade-in z-30">
                <div className="text-center space-y-2">
                  <CheckCircle2 size={36} className="text-orange-500 mx-auto animate-bounce" />
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Burn Weights Validated</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: POWER CONSOLE */}
        <div className="lg:col-span-7 bg-[#000] p-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full transition-colors ${isSelecting ? 'bg-orange-500' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">PoB_Power_Index</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600">Virtual Mining Power</span>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#050505] p-8 space-y-8 min-h-[380px]">
            {/* Burn action block */}
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Select Coins to Burn</span>
                <p className="text-xs text-zinc-400 font-sans">Burn more coins for a higher probability tip</p>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="number" min="10" max="200" step="10" value={burnAmount} 
                  onChange={(e) => setBurnAmount(Math.max(10, parseInt(e.target.value)))}
                  disabled={step !== 0}
                  className="w-16 bg-black border border-white/10 rounded px-2 py-1 font-mono text-xs text-white text-center focus:outline-none"
                />
                <button 
                  onClick={handleBurn}
                  disabled={step !== 0}
                  className="px-4 py-1.5 rounded-lg bg-orange-600 text-black font-bold text-xs hover:bg-orange-500 transition-all disabled:opacity-30 cursor-pointer"
                >
                  Burn
                </button>
              </div>
            </div>

            {/* Decay and virtual power info */}
            <div className="grid grid-cols-2 gap-8 border-b border-white/[0.04] pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Power Decay Rate</span>
                <p className="text-xl font-bold font-mono tracking-tighter text-red-500">
                  -10% / Block
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Decayed Power (Miner_01)</span>
                <p className="text-xl font-bold font-mono tracking-tighter text-zinc-400">
                  {miners[0].virtualPower} VP (Burnt: {miners[0].burntTotal})
                </p>
              </div>
            </div>

            {/* Miner probabilities */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase text-zinc-600">Active Miners (Virtual Hash Power)</span>
              <div className="space-y-2">
                {miners.map((m, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-xl border text-xs transition-all duration-300
                    ${m.isWinner ? 'border-orange-500/50 bg-orange-500/5 text-orange-400 font-bold shadow-[0_0_15px_rgba(230,81,0,0.1)]' : 
                      'border-white/[0.04] bg-black text-zinc-500'
                    }`}>
                    <span className="font-mono flex items-center gap-1.5">
                      {m.isWinner && <Trophy size={12} className="text-orange-400 animate-bounce" />}
                      {m.name}
                    </span>
                    <div className="flex gap-4 font-mono text-[10px]">
                      <span>Power: {m.virtualPower}</span>
                      <span>Weight: {m.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            {step >= 3 && (
              <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 text-[11px] text-zinc-400 font-sans flex items-center gap-3">
                <Info size={16} className="text-orange-400 shrink-0" />
                <p>
                  Proposers are chosen via a **weighted lottery** based on their active Virtual Power (VP). To keep the network fair, VP decays at 10% per block, requiring continuous coin burns to maintain mining probability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LEDGER ARCHIVE */}
      <div className="bg-[#050505] border-t border-white/[0.06] p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-zinc-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600">Verified Ledger Archive</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Tip: Block #{blockchain.length-1}</div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 snap-x">
          {blockchain.map((b, i) => (
            <div key={i} className={`shrink-0 w-80 rounded-2xl border bg-black p-6 flex flex-col gap-4 relative transition-all duration-500 snap-start
              ${i === blockchain.length - 1 && i !== 0 ? 'border-orange-500/40 shadow-[0_0_30px_rgba(230,81,0,0.1)] animate-drop' : 'border-white/[0.08] opacity-80'}
            `}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white text-sm font-bold">Block #{b.height}</h4>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{b.time}</span>
                </div>
                <div className="bg-white/[0.05] p-2 rounded-lg border border-white/[0.05]">
                  <Flame size={16} className="text-orange-500" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-[10px]">
                <div className="space-y-1">
                  <span className="text-zinc-600 uppercase">Block Hash</span>
                  <p className="text-zinc-400 break-all bg-white/[0.02] p-2 rounded border border-white/[0.03]">{b.hash}</p>
                </div>
                <div className="flex justify-between mt-2 text-zinc-500">
                  <span>Burnt Burn: <strong className="text-white font-bold">{b.burntProof} SLM</strong></span>
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
