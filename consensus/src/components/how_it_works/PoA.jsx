import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Cpu, Shield, Coins,
  CheckCircle2, Info, Layers, GitFork, ArrowDown, Activity
} from 'lucide-react';

const STAGES = [
  { id: 'pow_mine', label: '1. PoW Mining', desc: 'Miners hashing a partial block header to locate a valid solution.' },
  { id: 'select_stakers', label: '2. Stake Sampling', desc: 'Header hash acts as a ticket to select N online stakers.' },
  { id: 'collect_sigs', label: '3. Validator Signing', desc: 'Selected stakers review proposed transactions and sign block.' },
  { id: 'finalise', label: '4. Finalization', desc: 'Block is finalized and broadcast once threshold signatures are met.' },
  { id: 'verify_hybrid', label: '5. Hybrid Audit', desc: 'Nodes verifying both PoW header hash and staker signatures.' },
  { id: 'extend_hybrid', label: '6. Extend Ledger', desc: 'Appending validated block to ledger tips.' },
  { id: 'split_reward', label: '7. Reward Split', desc: 'Block reward split between winning miner (60%) and stakers (40%).' },
];

export default function ProofOfActivityVisualizer() {
  const [step, setStep] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState('0'.repeat(64));
  const [signedCount, setSignedCount] = useState(0);
  
  const [validators, setValidators] = useState([
    { name: 'Validator_Alpha', stakeShare: 25, isSelected: false, hasSigned: false },
    { name: 'Validator_Beta', stakeShare: 20, isSelected: false, hasSigned: false },
    { name: 'Validator_Gamma', stakeShare: 15, isSelected: false, hasSigned: false },
    { name: 'Validator_Delta', stakeShare: 10, isSelected: false, hasSigned: false },
  ]);

  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', miner: 'Miner_01', signatures: 0, time: 'Genesis' }
  ]);

  const autoRunTimer = useRef(null);
  const miningTimer = useRef(null);
  const signTimer = useRef(null);

  const isMining = step === 0;
  const isSigning = step === 2;

  // Auto-Simulation Engine
  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimer.current); return; }
    const transition = (delay) => { autoRunTimer.current = setTimeout(() => setStep(s => (s + 1) % 7), delay); };
    
    if (isMining || isSigning) return; 
    
    if (step === 5) {
      commitBlock();
    }

    const delays = [0, 3000, 0, 2500, 2000, 2000, 2500];
    transition(delays[step]);

    return () => clearTimeout(autoRunTimer.current);
  }, [step, isAutoRunning, isMining, isSigning]);

  // Hashing Engine Simulation (Step 0)
  useEffect(() => {
    if (isMining) {
      const target = 40 + (difficulty * 30);
      let count = 0;
      miningTimer.current = setInterval(() => {
        count++;
        setNonce(n => n + 1);
        if (count >= target) {
          clearInterval(miningTimer.current);
          setCurrentHash('0'.repeat(difficulty) + Math.random().toString(16).slice(2, 66 - difficulty));
          setStep(1); // Transition to selection
        } else {
          setCurrentHash(Math.random().toString(16).slice(2, 66));
        }
      }, 40);
    }
    return () => clearInterval(miningTimer.current);
  }, [isMining, difficulty]);

  // Validator Selection (Step 1 -> 2 transition)
  useEffect(() => {
    if (step === 1) {
      // Select 3 validators pseudo-randomly based on hash output
      setValidators(prev => prev.map((val, idx) => ({
        ...val,
        isSelected: idx < 3, // Choose 3 validators
        hasSigned: false
      })));
      setSignedCount(0);
    }
  }, [step]);

  // Validator Signature Collection (Step 2)
  useEffect(() => {
    if (isSigning) {
      let idx = 0;
      signTimer.current = setInterval(() => {
        setValidators(prev => {
          const updated = [...prev];
          const chosen = updated.filter(v => v.isSelected);
          if (idx < chosen.length) {
            const item = chosen[idx];
            const originalIndex = updated.findIndex(v => v.name === item.name);
            updated[originalIndex].hasSigned = true;
            setSignedCount(s => s + 1);
            idx++;
          } else {
            clearInterval(signTimer.current);
            setStep(3); // Transition to finalise
          }
          return updated;
        });
      }, 800);
    }
    return () => clearInterval(signTimer.current);
  }, [isSigning]);

  const commitBlock = () => {
    setBlockchain(prev => {
      if (prev.some(b => b.hash === currentHash)) return prev;
      return [...prev, { 
        height: prev.length, 
        hash: currentHash, 
        miner: 'Miner_01', 
        signatures: signedCount,
        time: new Date().toLocaleTimeString() 
      }];
    });
  };

  const handleManual = () => {
    setIsAutoRunning(false);
    if (step === 5) commitBlock();
    setStep(s => (s + 1) % 7);
  };

  const resetSim = () => {
    setStep(0);
    setBlockchain([blockchain[0]]);
    setIsAutoRunning(false);
    setNonce(0);
    setCurrentHash('0'.repeat(64));
    setSignedCount(0);
    setValidators(prev => prev.map(v => ({ ...v, isSelected: false, hasSigned: false })));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative">
      <style>{`
        @keyframes stream-down { 0% { transform: translateY(-30px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
        .animate-stream { animation: stream-down 1.2s infinite linear; }
        @keyframes block-drop { 0% { transform: translateY(-50px) scale(0.8); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .animate-drop { animation: block-drop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.1; } 100% { transform: scale(0.95); opacity: 0.5; } }
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

      {/* DYNAMIC VISUALIZATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* LEFT PANEL: HYBRID FLOW ARCHITECTURE */}
        <div className="lg:col-span-5 p-12 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="relative w-80 h-80 flex flex-col items-center justify-center">
            {/* Step 1: PoW Phase */}
            {step === 0 && (
              <div className="flex flex-col items-center gap-3">
                <Cpu size={48} className="text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/20">Phase 1: Mining header</span>
              </div>
            )}

            {/* Step 2: Sampling Validators */}
            {step === 1 && (
              <div className="flex flex-col items-center gap-3">
                <GitFork size={48} className="text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/20">Sampling Stakers</span>
              </div>
            )}

            {/* Step 3: Signature Rounds */}
            {step >= 2 && step <= 4 && (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Validator nodes positioned in a ring */}
                {[0, 90, 180, 270].map((angle, i) => {
                  const v = validators[i];
                  return (
                    <div 
                      key={i} className="absolute flex flex-col items-center transition-all duration-500"
                      style={{ top: `${50 + 35 * Math.sin(angle * Math.PI / 180)}%`, left: `${50 + 35 * Math.cos(angle * Math.PI / 180)}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                        ${v.hasSigned ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
                          v.isSelected ? 'border-indigo-500 bg-indigo-500/5 animate-pulse' : 
                          'border-zinc-800 opacity-20'
                        }`}>
                        <Shield size={18} className={v.hasSigned ? 'text-emerald-400' : 'text-zinc-600'} />
                      </div>
                      <span className="text-[7px] font-mono text-zinc-600 mt-1 uppercase whitespace-nowrap">{v.name.slice(10)}</span>
                    </div>
                  );
                })}

                {/* Central Block Template */}
                <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#050505] flex flex-col items-center justify-center relative">
                  <span className="text-[9px] font-mono text-zinc-500">Signatures</span>
                  <span className="text-xl font-bold font-mono text-white mt-1">{signedCount}/3</span>
                </div>
              </div>
            )}

            {/* Step 7: Reward Split Illustration */}
            {step === 6 && (
              <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
                <Coins size={48} className="text-amber-400 animate-bounce" />
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div className="border border-white/5 bg-white/[0.01] p-3 rounded-xl">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block mb-1">Miner Share</span>
                    <strong className="text-white text-sm">60%</strong>
                  </div>
                  <div className="border border-white/5 bg-white/[0.01] p-3 rounded-xl">
                    <span className="text-[8px] font-mono text-zinc-500 uppercase block mb-1">Stakers Share</span>
                    <strong className="text-indigo-400 text-sm">40%</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CONSOLE Stdout */}
        <div className="lg:col-span-7 bg-[#000] p-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full transition-colors ${isMining ? 'bg-amber-500' : isSigning ? 'bg-indigo-500' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">PoA_Hybrid_Daemon</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Threshold: <span className="text-emerald-400 font-bold">3/3 Signatures</span></span>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#050505] p-8 space-y-8 min-h-[380px]">
            {/* Mining stdout */}
            <div className="grid grid-cols-2 gap-8 border-b border-white/[0.04] pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">PoW Nonce (Miner)</span>
                <p className={`text-xl font-bold font-mono tracking-tighter ${isMining ? 'text-white' : 'text-zinc-500'}`}>
                  {nonce.toString().padStart(6, '0')}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">PoW Output Hash</span>
                <p className="text-xs font-mono text-zinc-400 truncate leading-relaxed">
                  {currentHash}
                </p>
              </div>
            </div>

            {/* Validator signature checklist */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase text-zinc-600">Chosen Signers (Stake Weight)</span>
              <div className="space-y-2">
                {validators.map((v, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-xl border text-xs transition-all duration-300
                    ${v.hasSigned ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-bold' : 
                      v.isSelected ? 'border-indigo-500/30 bg-indigo-500/[0.02] text-indigo-400' : 
                      'border-white/[0.02] bg-white/[0.01] opacity-20'
                    }`}>
                    <span className="font-mono">{v.name}</span>
                    <span className="font-mono text-[10px]">
                      {v.hasSigned ? '✓ Signed' : v.isSelected ? 'Awaiting sign...' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            {step >= 3 && (
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-[11px] text-zinc-400 font-sans flex items-center gap-3">
                <Info size={16} className="text-indigo-400 shrink-0" />
                <p>
                  Proof of Activity combines PoW security with PoS cost-efficiency. Miners consume power only to generate header templates. The final signature step stops empty block spam and prevents offline miners from hoarding rewards.
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
              ${i === blockchain.length - 1 && i !== 0 ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)] animate-drop' : 'border-white/[0.08] opacity-80'}
            `}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white text-sm font-bold">Block #{b.height}</h4>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{b.time}</span>
                </div>
                <div className="bg-white/[0.05] p-2 rounded-lg border border-white/[0.05]">
                  <Activity size={16} className="text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-[10px]">
                <div className="space-y-1">
                  <span className="text-zinc-600 uppercase">Block Hash</span>
                  <p className="text-zinc-400 break-all bg-white/[0.02] p-2 rounded border border-white/[0.03]">{b.hash}</p>
                </div>
                <div className="flex justify-between mt-2 text-zinc-500">
                  <span>Signatures: <strong className="text-white font-bold">{b.signatures} stakers</strong></span>
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
