import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Database, HardDrive, 
  CheckCircle2, Clock, Server, Hash, Info, Layers, Coins, GitFork
} from 'lucide-react';

const STAGES = [
  { id: 'plotting', label: 'Plotting HDD', desc: 'Pre-generating plots (nonces) on hard drive storage.' },
  { id: 'challenge', label: 'Scoop Lookup', desc: 'New block height challenge determines the target scoop index.' },
  { id: 'read', label: 'Disk Reading', desc: 'Miners reading only the target scoop from stored plots.' },
  { id: 'deadline', label: 'Deadline Check', desc: 'Calculating wait times (deadlines); lowest deadline wins.' },
  { id: 'verify', label: 'Verification', desc: 'Nodes verifying the scoop read proof and wait time.' },
  { id: 'extend', label: 'Extend Chain', desc: 'Adding the validated block to the blockchain ledger.' },
  { id: 'reward', label: 'Minting', desc: 'Winning miner receives the block reward.' },
];

export default function ProofOfCapacityVisualizer() {
  const [step, setStep] = useState(0);
  const [plotSize, setPlotSize] = useState(64); // in TB
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [currentScoop, setCurrentScoop] = useState(128);
  const [deadlines, setDeadlines] = useState([
    { miner: 'Miner_01 (You)', value: 89, isBest: false },
    { miner: 'Miner_02', value: 240, isBest: false },
    { miner: 'Miner_03', value: 12, isBest: true },
  ]);
  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '0000000000000ea54b28bcde9c085ae165831e934ff763ae46a2a6c172b3f1b2', deadline: 0, time: 'Genesis' }
  ]);

  const autoRunTimer = useRef(null);
  const readTimer = useRef(null);
  const isReading = step === 2;

  // Auto-Simulation Engine
  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimer.current); return; }
    const transition = (delay) => { autoRunTimer.current = setTimeout(() => setStep(s => (s + 1) % 7), delay); };
    
    if (isReading) return; 
    
    if (step === 5) {
      commitBlock();
    }

    const delays = [2500, 2500, 0, 3000, 2000, 2000, 2500];
    transition(delays[step]);

    return () => clearTimeout(autoRunTimer.current);
  }, [step, isAutoRunning, isReading]);

  // Disk Reading Animation
  useEffect(() => {
    if (isReading) {
      // Calculate random deadlines based on plot size
      const baseValue = Math.max(5, Math.round(500 / (plotSize / 10)));
      const readInterval = setInterval(() => {
        setCurrentScoop(Math.floor(Math.random() * 4096));
      }, 50);

      readTimer.current = setTimeout(() => {
        clearInterval(readInterval);
        setCurrentScoop(246); // Target scoop
        
        const myDeadline = Math.round(Math.random() * baseValue) + 3;
        const peer1 = Math.round(Math.random() * 100) + 15;
        const peer2 = Math.round(Math.random() * 200) + 35;
        const minVal = Math.min(myDeadline, peer1, peer2);

        setDeadlines([
          { miner: 'Miner_01 (You)', value: myDeadline, isBest: myDeadline === minVal },
          { miner: 'Miner_02', value: peer1, isBest: peer1 === minVal },
          { miner: 'Miner_03', value: peer2, isBest: peer2 === minVal },
        ]);
        setStep(3);
      }, 2500);
    }
    return () => clearTimeout(readTimer.current);
  }, [isReading, plotSize]);

  const commitBlock = () => {
    setBlockchain(prev => {
      const winner = deadlines.find(d => d.isBest) || deadlines[0];
      const blockHash = "0000000000000" + Math.random().toString(16).slice(2, 18) + "de" + winner.value.toString(16);
      if (prev.some(b => b.hash === blockHash)) return prev;
      return [...prev, { 
        height: prev.length, 
        hash: blockHash, 
        deadline: winner.value,
        winnerName: winner.miner,
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
    setDeadlines([
      { miner: 'Miner_01 (You)', value: 89, isBest: false },
      { miner: 'Miner_02', value: 240, isBest: false },
      { miner: 'Miner_03', value: 12, isBest: true },
    ]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative">
      <style>{`
        @keyframes disk-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-rotate { animation: disk-rotate 2s infinite linear; }
        @keyframes scan-line { 0% { top: 0%; opacity: 0; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        .animate-scan { animation: scan-line 1.5s infinite linear; }
        @keyframes block-drop { 0% { transform: translateY(-50px) scale(0.8); opacity: 0; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        .animate-drop { animation: block-drop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
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
        {/* LEFT PANEL: HARD DRIVE VISUALIZATION */}
        <div className="lg:col-span-5 p-12 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="relative w-72 h-72 flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-[#030303] p-6 shadow-inner">
            {/* Plotting Phase Visual */}
            {step === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Database size={48} className="text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/20">Writing Plot Files</span>
                <p className="text-[11px] text-zinc-500 font-sans max-w-[200px]">Generating cryptographic sharded nonces to hard disk...</p>
              </div>
            )}

            {/* Read/Active Simulation */}
            {step > 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full relative">
                {/* Stylized HDD Platter */}
                <div className="relative w-40 h-40 rounded-full border-4 border-zinc-800 flex items-center justify-center">
                  <div className={`w-36 h-36 rounded-full border border-zinc-700 bg-gradient-to-tr from-zinc-900 to-black flex items-center justify-center ${isReading ? 'animate-rotate' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 border-4 border-zinc-950" />
                  </div>
                  {/* Read Arm */}
                  <div className="absolute top-1/2 left-1/2 w-20 h-2 origin-[0%_50%] -rotate-45 bg-zinc-600 rounded-full" style={{ left: "70%", top: "20%", transform: "rotate(-120deg)" }} />
                </div>

                <div className="mt-8 flex flex-col items-center space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">HDD Read Status</span>
                  <div className="flex items-center gap-2">
                    <HardDrive size={14} className="text-zinc-600" />
                    <span className={`text-xs font-mono font-bold ${isReading ? 'text-amber-500' : 'text-zinc-400'}`}>
                      {isReading ? `SCANNING_SCOOP_${currentScoop}` : 'DISK_IDLE'}
                    </span>
                  </div>
                </div>

                {/* Verification Checkmark overlay */}
                {step === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-2xl animate-fade-in">
                    <div className="text-center space-y-2">
                      <CheckCircle2 size={36} className="text-emerald-500 mx-auto animate-bounce" />
                      <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Scoop Verified</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CONSOLE EXECUTOR */}
        <div className="lg:col-span-7 bg-[#000] p-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full transition-colors ${isReading ? 'bg-amber-500' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Signum_Miner_Disk_Daemon</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600">Storage Allocated: <span className="text-emerald-400 font-bold">{plotSize} TB</span></span>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#050505] p-8 space-y-8 min-h-[380px]">
            {/* Input Config Row */}
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Storage Capacity Slider</span>
                <p className="text-xs text-zinc-400 font-sans">More capacity increases scoop density</p>
              </div>
              <input 
                type="range" min="10" max="500" value={plotSize} 
                onChange={(e) => setPlotSize(parseInt(e.target.value))}
                disabled={isReading}
                className="w-32 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Target Scoop Info */}
            <div className="grid grid-cols-2 gap-8 border-b border-white/[0.04] pb-4">
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Target Scoop Index</span>
                <p className="text-xl font-bold font-mono tracking-tighter text-white">
                  {step >= 1 ? `Scoop #${currentScoop}` : 'Awaiting challenge...'}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase text-zinc-600">Estimated Scan Time</span>
                <p className="text-xl font-bold font-mono tracking-tighter text-zinc-400">
                  {step >= 2 ? `${(2.5 - (plotSize / 500) * 1.5).toFixed(2)}s` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Deadlines list */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase text-zinc-600">Calculated Deadlines</span>
              <div className="space-y-2">
                {deadlines.map((d, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-xl border text-xs transition-all duration-300
                    ${step < 3 ? 'border-white/[0.02] bg-white/[0.01] opacity-20' : 
                      d.isBest ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-bold' : 
                      'border-white/[0.04] bg-black text-zinc-500'
                    }`}>
                    <span className="font-mono">{d.miner}</span>
                    <span className="font-mono font-bold flex items-center gap-1.5">
                      <Clock size={12} /> {d.value} seconds
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlighted winner section */}
            {step >= 3 && (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-zinc-400 font-sans flex items-center gap-3">
                <Info size={16} className="text-emerald-500 shrink-0" />
                <p>
                  Miner with the **lowest deadline** ({deadlines.find(d => d.isBest)?.value}s) earns the right to forge. The blockchain timer ticks; if no other node registers a lower deadline before this expires, the block is appended.
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
                  <Database size={16} className="text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-[10px]">
                <div className="space-y-1">
                  <span className="text-zinc-600 uppercase">Block Hash</span>
                  <p className="text-zinc-400 break-all bg-white/[0.02] p-2 rounded border border-white/[0.03]">{b.hash}</p>
                </div>
                <div className="flex justify-between mt-2 text-zinc-500">
                  <span>Deadline: <strong className="text-white font-bold">{b.deadline}s</strong></span>
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
