import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Cpu, Network, 
  CheckCircle2, Zap, Server, Database, Hash, Info, 
  Layers, Coins, GitFork, Gauge, ArrowDown, Activity, Boxes, Trophy, Link as LinkIcon
} from 'lucide-react';

const STAGES = [
  { id: 'broadcast', label: 'Broadcast', desc: 'Transactions flooding the global P2P mempool.' },
  { id: 'assembly', label: 'Assembly', desc: 'Miners bundling transactions into Merkle Trees.' },
  { id: 'mining', label: 'Mining Race', desc: 'Multiple miners competing to solve the PoW puzzle.' },
  { id: 'propagate', label: 'Winner Found', desc: 'Winning miner broadcasts the solution to the network.' },
  { id: 'verify', label: 'Audit', desc: 'Nodes independently verifying the block and signatures.' },
  { id: 'extend', label: 'Extend', desc: 'Adding validated block to the global chain tip.' },
  { id: 'reward', label: 'Minting', desc: 'Winning miner receives the 6.25 BTC block reward.' },
  { id: 'fork', label: 'Fork Logic', desc: 'Resolving conflicts via the longest chain rule.' },
  { id: 'adjust', label: 'Retarget', desc: 'Difficulty recalibrating for 10min block intervals.' },
];

export default function ProofOfWorkVisualizer() {
  const [step, setStep] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState('0'.repeat(64));
  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', nonce: 2083236893, time: 'Genesis' }
  ]);

  const autoRunTimer = useRef(null);
  const miningTimer = useRef(null);
  const isMining = step === 2;

  // Auto-Simulation Engine
  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimer.current); return; }
    const transition = (delay) => { autoRunTimer.current = setTimeout(() => setStep(s => (s + 1) % 9), delay); };
    
    if (isMining) return; 
    
    // Trigger block commit at the start of step 5 (Extend)
    if (step === 5) {
      commitBlock();
    }

    const delays = [2500, 3000, 0, 2000, 2000, 1800, 2500, 3000, 2500];
    transition(delays[step]);

    return () => clearTimeout(autoRunTimer.current);
  }, [step, isAutoRunning, isMining]);

  // Hashing Engine Simulation
  useEffect(() => {
    if (isMining) {
      const target = 45 + (difficulty * 30);
      let count = 0;
      miningTimer.current = setInterval(() => {
        count++;
        setNonce(n => n + 1);
        if (count >= target) {
          clearInterval(miningTimer.current);
          setCurrentHash('0'.repeat(difficulty) + Math.random().toString(16).slice(2, 66 - difficulty));
          setStep(3);
        } else {
          setCurrentHash(Math.random().toString(16).slice(2, 66));
        }
      }, 35);
    }
    return () => clearInterval(miningTimer.current);
  }, [isMining, difficulty]);

  const commitBlock = () => {
    setBlockchain(prev => {
      // Prevent duplicate commits if auto-run triggers twice
      if (prev.some(b => b.hash === currentHash)) return prev;
      return [...prev, { 
        height: prev.length, 
        hash: currentHash, 
        nonce: nonce, 
        time: new Date().toLocaleTimeString() 
      }];
    });
  };

  const handleManual = () => {
    setIsAutoRunning(false);
    if (step === 5) commitBlock();
    setStep(s => (s + 1) % 9);
  };

  const resetSim = () => {
    setStep(0);
    setBlockchain([blockchain[0]]);
    setIsAutoRunning(false);
    setNonce(0);
    setCurrentHash('0'.repeat(64));
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative">
      <style>{`
        @keyframes stream { 0% { transform: translateY(-30px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
        .animate-stream { animation: stream 1.2s infinite linear; }
        @keyframes block-drop { 0% { transform: translateY(-50px) scale(0.8); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .animate-drop { animation: block-drop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes reward-float { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-60px); opacity: 0; } }
        .reward-anim { animation: reward-float 2s infinite ease-out; }
        @keyframes scan { 0% { transform: translateY(-150%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(150%); opacity: 0; } }
        .node-pos { position: absolute; transform: translate(-50%, -50%); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1. NAVIGATION HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-zinc-800 font-mono text-xl">/ 09</span>
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

      {/* 2. DYNAMIC VISUALIZATION STAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        
        {/* LEFT PANEL: NETWORK TOPOLOGY */}
        <div className="lg:col-span-5 p-12 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-white/[0.03] scale-110" />
            
            {/* STEP 01: BROADCAST */}
            {step === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-4 gap-3 opacity-40">
                   {[...Array(16)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-indigo-500 animate-stream" style={{ animationDelay: `${i * 0.1}s` }} />)}
                </div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/20">Syncing Mempool</span>
              </div>
            )}

            {/* STEP 02: MERKLE ROOT */}
            {step === 1 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="flex gap-10 mb-4 animate-pulse">
                    <div className="w-8 h-8 border border-zinc-800 rounded bg-zinc-900/50" />
                    <div className="w-8 h-8 border border-zinc-800 rounded bg-zinc-900/50" />
                 </div>
                 <div className="w-px h-12 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                 <div className="w-14 h-14 border-2 border-indigo-500 rounded-xl flex items-center justify-center bg-indigo-500/10 mt-2">
                    <Hash size={24} className="text-indigo-400" />
                 </div>
              </div>
            )}

            {/* MULTI-MINER COMPETITION (STEPS 3-7) */}
            {(step >= 2 && step <= 6) && (
              <>
                {[0, 120, 240].map((angle, i) => (
                  <div key={i} className="node-pos" style={{ top: `${50 + 42 * Math.sin(angle * Math.PI / 180)}%`, left: `${50 + 42 * Math.cos(angle * Math.PI / 180)}%` }}>
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-700 relative
                      ${(i === 0 && step === 2) ? 'border-amber-500 bg-amber-500/5' : 
                        (i === 0 && step >= 3) ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]' :
                        (i !== 0 && step === 2) ? 'border-zinc-800 opacity-60 animate-pulse' :
                        (i !== 0 && step === 4) ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]' :
                        'border-zinc-800 opacity-30'
                      }`}>
                      
                      {/* Icons based on state */}
                      {i === 0 && step >= 3 ? (
                        <Trophy size={28} className="text-emerald-400" />
                      ) : i !== 0 && step === 4 ? (
                        <Database size={24} className="text-indigo-400 animate-pulse" />
                      ) : (
                        <Server size={24} className="text-zinc-700" />
                      )}

                      {/* STEP 4 (Audit): PEER VERIFICATION SCANNER */}
                      {i !== 0 && step === 4 && (
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                          <div className="w-full h-0.5 bg-indigo-400 shadow-[0_0_10px_#818cf8] animate-[scan_1.2s_ease-in-out_infinite]" />
                        </div>
                      )}

                      {/* STEP 5 (Extend): WINNER DROPS BLOCK */}
                      {i === 0 && step === 5 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-full h-full border-2 border-emerald-500 rounded-2xl animate-ping opacity-50" />
                          <ArrowDown className="text-emerald-400 absolute -bottom-12 animate-bounce" />
                        </div>
                      )}

                      {/* STEP 5 (Extend): PEERS ACCEPT BLOCK */}
                      {i !== 0 && step === 5 && (
                         <div className="absolute -bottom-6">
                            <CheckCircle2 size={18} className="text-emerald-500 animate-bounce" />
                         </div>
                      )}

                      {/* STEP 6 (Reward): MINTING ANIMATION */}
                      {i === 0 && step === 6 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="reward-anim absolute flex flex-col items-center pointer-events-none">
                             <Coins className="text-amber-400" size={32} />
                             <span className="text-amber-400 font-mono text-[10px] font-bold mt-1 whitespace-nowrap">+6.25 BTC</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Node Labels */}
                    <span className="text-[9px] font-mono text-zinc-600 mt-3 block text-center uppercase tracking-tighter">
                      {i === 0 ? 'Miner_01' : `Peer_0${i}`}
                    </span>

                    {/* Active Audit Status Indicator */}
                    {i !== 0 && step === 4 && (
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/30 whitespace-nowrap">
                        Verifying Hash...
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* STEP 08: FORK LOGIC */}
            {step === 7 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                 <div className="flex gap-2 items-end">
                    <div className="w-6 h-6 border border-zinc-800 rounded bg-zinc-900 opacity-20" />
                    <div className="w-6 h-12 border-2 border-emerald-500 rounded bg-emerald-500/10" />
                 </div>
                 <div className="text-center">
                    <GitFork size={32} className="text-zinc-600 mx-auto" />
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-2">Heaviest Chain Consensus</p>
                 </div>
              </div>
            )}

            {/* STEP 09: RETARGETING */}
            {step === 8 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="w-40 h-40 rounded-full border-2 border-zinc-800 flex items-center justify-center relative">
                    <Gauge size={48} className="text-indigo-500" />
                    <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full border-t-transparent animate-spin" />
                 </div>
                 <span className="text-[10px] font-mono mt-6 text-zinc-500 tracking-[0.3em]">Recalibrating Difficulty</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: COMPUTATION CORE */}
        <div className="lg:col-span-7 bg-[#000] p-12">
           <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full transition-colors ${isMining ? 'bg-amber-500 shadow-[0_0_10px_#F5A623]' : 'bg-zinc-800'}`} />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Miner_Node_Stdout</span>
              </div>
              <div className="flex gap-6">
                <span className="text-[10px] font-mono text-zinc-600">Temp: <span className="text-zinc-300">74°C</span></span>
                <span className={`text-[10px] font-mono ${isMining ? 'text-amber-500' : 'text-zinc-500'}`}>{isMining ? 'HASHING_ACTIVE' : 'STANDBY'}</span>
              </div>
           </div>

           <div className={`h-full rounded-2xl border transition-all duration-700 overflow-hidden ${isMining ? 'border-amber-500/30 bg-amber-500/[0.01]' : 'border-white/[0.06] bg-[#050505]'}`}>
              <div className="px-10 py-10 space-y-12">
                <div className="grid grid-cols-2 gap-12">
                   <div className="space-y-3">
                      <span className="text-[9px] font-mono uppercase text-zinc-600 tracking-[0.2em]">Previous Hash</span>
                      <p className="text-[11px] font-mono text-zinc-400 truncate border-b border-white/[0.04] pb-2 leading-none">{blockchain[blockchain.length-1].hash}</p>
                   </div>
                   <div className="space-y-3">
                      <span className="text-[9px] font-mono uppercase text-zinc-600 tracking-[0.2em]">Merkle Root</span>
                      <p className="text-[11px] font-mono text-zinc-400 truncate border-b border-white/[0.04] pb-2 leading-none">{step >= 1 ? '77d2...f3a1' : 'Awaiting sync...'}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between">
                   <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase text-zinc-600 tracking-[0.2em]">Current Nonce</span>
                      <p className={`text-6xl font-bold font-mono tracking-tighter tabular-nums leading-none ${isMining ? 'text-white' : 'text-zinc-800'}`}>
                        {nonce.toString().padStart(9, '0')}
                      </p>
                   </div>
                   <div className="text-right space-y-4">
                      <span className="text-[9px] font-mono uppercase text-zinc-600 tracking-[0.2em]">Difficulty Target</span>
                      <div className="flex gap-2 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-5 h-7 rounded border-r-2 transition-all ${i < difficulty ? 'bg-amber-500 border-amber-400' : 'border-white/10'}`} />
                        ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase text-zinc-600 tracking-[0.2em]">Block Hash Digest</span>
                      {step >= 3 && <span className="text-[10px] font-bold text-emerald-500 tracking-widest flex items-center gap-2">✓ SOLUTION_MATCH</span>}
                   </div>
                   <div className={`p-6 rounded-2xl border font-mono text-xs leading-loose break-all transition-all duration-500 ${step >= 3 ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' : 'border-white/[0.04] bg-black text-zinc-700'}`}>
                      <span className={currentHash.startsWith('0'.repeat(difficulty)) ? 'text-white font-bold bg-white/20 rounded-sm' : ''}>
                        {currentHash.slice(0, difficulty)}
                      </span>
                      {currentHash.slice(difficulty)}
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* 3. ENHANCED BLOCKCHAIN LEDGER */}
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
              {i > 0 && (
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
                  <div className="w-8 h-px bg-zinc-800" />
                  <LinkIcon size={12} className="text-zinc-700" />
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white text-sm font-bold">Block #{b.height}</h4>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">{b.time}</span>
                </div>
                <div className="bg-white/[0.05] p-2 rounded-lg border border-white/[0.05]">
                  <Database size={16} className="text-emerald-500" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Block Hash</span>
                  <p className="text-[10px] font-mono text-zinc-400 break-all leading-relaxed bg-white/[0.02] p-2 rounded border border-white/[0.03]">
                    <span className="text-emerald-500 font-bold">{b.hash.slice(0, difficulty)}</span>
                    {b.hash.slice(difficulty)}
                  </p>
                </div>
                <div className="flex justify-between items-center px-1">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-zinc-600 uppercase">Nonce</span>
                    <span className="text-[10px] font-mono text-zinc-300">{b.nonce}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] text-zinc-600 uppercase">Status</span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">Immutable</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Syncing/Pending Ghost Block */}
          {step > 1 && step < 5 && (
             <div className="shrink-0 w-80 rounded-2xl border border-dashed border-zinc-800 bg-transparent flex flex-col items-center justify-center p-6 animate-pulse opacity-40">
                <Boxes size={32} className="text-zinc-700 mb-4" />
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.4em]">Mining Candidate...</span>
             </div>
          )}
        </div>
      </div>

      {/* 4. INDUSTRY CONTEXT */}
      <div className="bg-black border-t border-white/[0.06] p-10 flex gap-8 items-start">
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
          <Info size={24} className="text-indigo-400" />
        </div>
        <p className="text-[12px] leading-relaxed text-zinc-500 max-w-5xl">
          <strong className="text-zinc-200">Protocol Design:</strong> In professional environments, Proof of Work acts as a decentralized clock. <strong className="text-zinc-200">Step 05 (Extend)</strong> and <strong className="text-zinc-200">Step 06 (Reward)</strong> are the economic engine; nodes only extend the chain once validation is perfect, and the subsidy ensures honest participation. <strong className="text-zinc-200">Steps 08 & 09</strong> manage the infrastructure, ensuring that even as global hardware increases in power, the network difficulty recalibrates to keep block production steady and secure.
        </p>
      </div>
    </div>
  );
}