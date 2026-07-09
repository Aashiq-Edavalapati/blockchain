import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, RotateCcw, Shield, Clock, Cpu,
  CheckCircle2, Info, Layers, Trophy
} from 'lucide-react';

const STAGES = [
  { id: 'enclave_request', label: '1. SGX Request', desc: 'Miner requests a signed random wait duration from its CPU Enclave.' },
  { id: 'enclave_wait', label: '2. Enclave Sleep', desc: 'Miner enters sleep state for the random elapsed time period.' },
  { id: 'awaken', label: '3. Wake Up', desc: 'Timer expires. Miner wakes up and constructs block candidate.' },
  { id: 'verify_proof', label: '4. Node Audit', desc: 'Other nodes verify the CPU signature on the wait certificate.' },
  { id: 'commit_ledger', label: '5. Extend Chain', desc: 'Winning block is appended to the global ledger.' },
  { id: 'reward', label: '6. Minting', desc: 'Miner receives transaction fees and block subsidy.' },
];

export default function ProofOfElapsedTimeVisualizer() {
  const [step, setStep] = useState(0);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [miners, setMiners] = useState([
    { name: 'Miner_01 (You)', waitTime: 8.5, isWinner: false },
    { name: 'Miner_02', waitTime: 14.2, isWinner: false },
    { name: 'Miner_03', waitTime: 11.9, isWinner: false },
  ]);

  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', miner: 'Genesis', waitTime: 0, time: 'Genesis' }
  ]);

  const autoRunTimeoutRef = useRef(null);
  const sleepTimer = useRef(null);

  const isSleeping = step === 1;

  // Auto-Simulation Engine
  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimeoutRef.current); return; }
    const transition = (delay) => { autoRunTimeoutRef.current = setTimeout(() => setStep(s => (s + 1) % 6), delay); };
    
    if (isSleeping) return; 
    
    if (step === 4) {
      commitBlock();
    }

    const delays = [2000, 0, 2000, 2000, 2000, 2500];
    transition(delays[step]);

    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, isSleeping]);

  // Request Wait Time (Step 0 -> 1 transition)
  useEffect(() => {
    if (step === 1) {
      // Allocate random wait times
      const myTime = Number((Math.random() * 5 + 3).toFixed(1)); // 3s to 8s
      const peer1 = Number((Math.random() * 8 + 5).toFixed(1));
      const peer2 = Number((Math.random() * 8 + 4).toFixed(1));
      const minTime = Math.min(myTime, peer1, peer2);

      const updated = [
        { name: 'Miner_01 (You)', waitTime: myTime, isWinner: myTime === minTime },
        { name: 'Miner_02', waitTime: peer1, isWinner: peer1 === minTime },
        { name: 'Miner_03', waitTime: peer2, isWinner: peer2 === minTime },
      ];
      setMiners(updated);
      setTimeLeft(myTime);

      let ticks = myTime;
      sleepTimer.current = setInterval(() => {
        ticks = Number((ticks - 0.1).toFixed(1));
        if (ticks <= 0) {
          clearInterval(sleepTimer.current);
          setTimeLeft(0);
          setStep(2); // Awaken
        } else {
          setTimeLeft(ticks);
        }
      }, 100);
    }
    return () => clearInterval(sleepTimer.current);
  }, [step]);

  const commitBlock = () => {
    setBlockchain(prev => {
      const winner = miners.find(m => m.isWinner) || miners[0];
      const blockHash = "0000000000000poet" + Math.random().toString(16).slice(2, 14) + winner.waitTime.toString().replace(".", "");
      if (prev.some(b => b.hash === blockHash)) return prev;
      return [...prev, { 
        height: prev.length, 
        hash: blockHash, 
        miner: winner.name, 
        waitTime: winner.waitTime,
        time: new Date().toLocaleTimeString() 
      }];
    });
  };

  const handleManual = () => {
    setIsAutoRunning(false);
    if (isSleeping) {
      clearInterval(sleepTimer.current);
      setTimeLeft(0);
    }
    if (step === 4) commitBlock();
    setStep(s => (s + 1) % 6);
  };

  const resetSim = () => {
    clearInterval(sleepTimer.current);
    clearTimeout(autoRunTimeoutRef.current);
    setStep(0);
    setBlockchain([blockchain[0]]);
    setIsAutoRunning(false);
    setTimeLeft(0);
    setMiners([
      { name: 'Miner_01 (You)', waitTime: 8.5, isWinner: false },
      { name: 'Miner_02', waitTime: 14.2, isWinner: false },
      { name: 'Miner_03', waitTime: 11.9, isWinner: false },
    ]);
  };

  const activeStage = STAGES[step] || STAGES[0];
  return (
    <div className="w-full max-w-5xl mx-auto bg-black border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] text-[#EDEDED] font-sans relative">
      <style>{`
        @keyframes poet-glow { 0%, 100% { box-shadow: 0 0 10px rgba(16,185,129,0.1); } 50% { box-shadow: 0 0 30px rgba(16,185,129,0.3); } }
        .poet-active-shield { animation: poet-glow 1.8s infinite ease-in-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HEADER */}
      <div className="flex items-center justify-between px-10 py-6 border-b border-white/[0.06] bg-[#050505]/95 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-1">Status</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold font-mono text-white leading-none">0{step + 1}</span>
              <span className="text-zinc-800 font-mono text-xl">/ 06</span>
            </div>
          </div>
          <div className="h-12 w-px bg-white/[0.08]" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{activeStage.label}</h2>
            <p className="text-xs text-zinc-500 font-medium tracking-tight">{activeStage.desc}</p>
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
        {/* LEFT PANEL: SGX ENCLAVE CHIP */}
        <div className="lg:col-span-5 p-12 border-r border-white/[0.06] flex items-center justify-center relative bg-[#010101]">
          <div className="relative w-72 h-72 flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-[#030303] p-6 shadow-inner">
            <div className="absolute top-4 left-6 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
              Intel SGX Secure Enclave
            </div>

            {/* Visual: Microprocessor with Shield */}
            <div className="relative flex flex-col items-center justify-center">
              <div className={`w-28 h-28 rounded-2xl border border-white/10 bg-[#080808] flex items-center justify-center relative transition-all duration-500
                ${isSleeping ? 'poet-active-shield border-emerald-500 bg-emerald-500/[0.02]' : ''}
              `}>
                <Cpu size={48} className={isSleeping ? 'text-emerald-400 animate-pulse' : 'text-zinc-700'} />
                
                {/* Shield Overlay */}
                <div className="absolute -top-3 -right-3 p-1.5 rounded-lg border border-white/5 bg-[#050505] shadow-lg">
                  <Shield size={16} className={isSleeping ? 'text-emerald-400' : 'text-zinc-600'} />
                </div>
              </div>

              {/* Timer Text */}
              <div className="mt-8 text-center space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Enclave Clock Wait</span>
                <p className={`text-4xl font-bold font-mono tracking-tighter tabular-nums leading-none ${isSleeping ? 'text-white' : 'text-zinc-800'}`}>
                  {timeLeft.toFixed(1)}s
                </p>
              </div>
            </div>

            {/* Audit validation screen */}
            {step === 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 rounded-2xl animate-fade-in z-30">
                <div className="text-center space-y-2">
                  <CheckCircle2 size={36} className="text-emerald-500 mx-auto animate-bounce" />
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">SGX Signature Verified</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: DAEMON CONSOLE */}
        <div className="lg:col-span-7 bg-[#000] p-12">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full transition-colors ${isSleeping ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-800'}`} />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">PoET_Attestation_Service</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Enclave Attested</span>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#050505] p-8 space-y-8 min-h-[380px]">
            {/* Action explanation */}
            <div className="border-b border-white/[0.04] pb-4">
              <span className="text-[9px] font-mono uppercase text-zinc-600">Hardware Attestation Logs</span>
              <div className="mt-2 space-y-1 text-[11px] font-mono text-zinc-400">
                <p>{step >= 1 ? `[SGX_SERVICE] Wait certificate requested.` : `[SGX_SERVICE] Standing by for challenge...`}</p>
                <p>{step >= 1 ? `[SGX_SERVICE] Assigned sleep period: ${miners[0].waitTime}s` : ''}</p>
                {step === 2 && <p className="text-emerald-400 font-bold">[SGX_SERVICE] Awaken. Yield block candidate signature.</p>}
                {step === 3 && <p className="text-indigo-400">[SGX_SERVICE] Attesting wait validity to peers...</p>}
              </div>
            </div>

            {/* List of active miner times */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase text-zinc-600">Peers Elapsed Wait Certificates</span>
              <div className="space-y-2">
                {miners.map((m, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-xl border text-xs transition-all duration-300
                    ${step < 1 ? 'border-white/[0.02] bg-white/[0.01] opacity-20' : 
                      m.isWinner ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-400 font-bold' : 
                      'border-white/[0.04] bg-black text-zinc-500'
                    }`}>
                    <span className="font-mono flex items-center gap-1.5">
                      {m.isWinner && step >= 2 && <Trophy size={12} className="text-emerald-400 animate-bounce" />}
                      {m.name}
                    </span>
                    <div className="flex gap-4 font-mono text-[10px]">
                      <span className="flex items-center gap-1"><Clock size={10} /> {m.waitTime}s</span>
                      <span>{step >= 2 && m.isWinner ? 'Winner' : 'Sleeping'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details context */}
            {step >= 3 && (
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-zinc-400 font-sans flex items-center gap-3">
                <Info size={16} className="text-emerald-500 shrink-0" />
                <p>
                  Proof of Elapsed Time prevents CPU energy waste by using Intel SGX. The hardware enclave produces a random sleep timer, signs a statement that the miner slept for that duration, and the **shortest wait certificate** is verified and appended.
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
                  <Shield size={16} className="text-emerald-500" />
                </div>
              </div>

              <div className="space-y-2 font-mono text-[10px]">
                <div className="space-y-1">
                  <span className="text-zinc-600 uppercase">Block Hash</span>
                  <p className="text-zinc-400 break-all bg-white/[0.02] p-2 rounded border border-white/[0.03]">{b.hash}</p>
                </div>
                <div className="flex justify-between mt-2 text-zinc-500">
                  <span>Wait Time: <strong className="text-white font-bold">{b.waitTime}s</strong></span>
                  <span>Verified SGX</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
