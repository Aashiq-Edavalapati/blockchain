import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Network is at rest. No pending work.' },
  { key: 'broadcast', label: 'Broadcast', detail: 'A new transaction enters the mempool.' },
  { key: 'collect', label: 'Collect', detail: 'Miner assembles a candidate block.' },
  { key: 'solve', label: 'Solve', detail: 'Miner searches for a valid solution.' },
  { key: 'propagate', label: 'Propagate', detail: 'Solution found — block broadcast to peers.' },
  { key: 'verify', label: 'Verify', detail: 'Peers confirm the solution. Chain extends.' },
];

const THEME = {
  bg: '#000000',
  surface: '#050505',
  surface2: '#020202',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.15)',
  amber: '#ffffff',
  amberDim: 'rgba(255, 255, 255, 0.1)',
  green: '#ffffff',
  greenDim: 'rgba(255, 255, 255, 0.1)',
  text1: '#ffffff',
  text2: '#888888',
  text3: '#666666',
};

function useHashRate(active) {
  const [rate, setRate] = useState(0);
  useEffect(() => {
    if (!active) { setRate(0); return; }
    const id = setInterval(() => {
      setRate(180 + Math.random() * 65);
    }, 140);
    return () => clearInterval(id);
  }, [active]);
  return rate;
}

export default function ProofOfWorkVisualizer({ algorithm }) {
  const algoId = algorithm?.id || "pow";
  const [step, setStep] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState('0'.repeat(64));
  const [difficulty, setDifficulty] = useState(3);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', nonce: 2083236893 },
  ]);

  const miningIntervalRef = useRef(null);
  const autoRunTimeoutRef = useRef(null);
  const hashRate = useHashRate(step === 3);

  // Customize based on consensus algorithm variant
  const getVariantDetails = () => {
    switch (algoId) {
      case 'proofOfCapacity':
        return {
          title: 'Proof of Capacity / Space',
          desc: 'Simulating disk plot scanning. Miners pre-allocate disk space for puzzle answers.',
          sliderLabel: 'Allocated Space (TB)',
          unitLabel: 'Plot scanning rate',
          unitValue: `${(hashRate * 1.5).toFixed(0)} GB/s`,
          nonceLabel: 'Plot Index Checked',
          hashHeader: 'best_deadline_lookup()',
          targetText: 'Deadlines found',
          activeAction: 'Scanning plotted files on disk...',
          color: '#E8A344',
        };
      case 'proofOfBurn':
        return {
          title: 'Proof of Burn',
          desc: 'Simulating coin destruction. Burning coins buys virtual mining power.',
          sliderLabel: 'Burned Multiplier',
          unitLabel: 'Burn validation rate',
          unitValue: `${(hashRate * 0.4).toFixed(1)} Burn/s`,
          nonceLabel: 'Virtual Coins Burned',
          hashHeader: 'burn_weight_tally()',
          targetText: 'Burn probability met',
          activeAction: 'Tallying burn transactions...',
          color: '#F59E0B',
        };
      case 'proofOfElapsedTime':
        return {
          title: 'Proof of Elapsed Time',
          desc: 'Simulating trusted enclave wait countdowns. Intel SGX assigns random timers.',
          sliderLabel: 'SGX Timer Limit (s)',
          unitLabel: 'Enclave clock ticks',
          unitValue: `${(hashRate * 0.1).toFixed(1)} Ticks/s`,
          nonceLabel: 'Elapsed Enclave Time',
          hashHeader: 'trusted_sgx_wait_timer()',
          targetText: 'Enclave timer expired',
          activeAction: 'Awaiting trusted SGX enclave countdown...',
          color: '#10B981',
        };
      case 'proofOfActivity':
        return {
          title: 'Proof of Activity',
          desc: 'Simulating hybrid PoW/PoS consensus. PoW generates block, PoS validators sign.',
          sliderLabel: 'Miners Difficulty',
          unitLabel: 'Hash rate',
          unitValue: `${hashRate.toFixed(0)} H/s`,
          nonceLabel: 'Header Nonce',
          hashHeader: 'hybrid_activity_solve()',
          targetText: 'Header solved, signatures ready',
          activeAction: 'Solving header + collecting PoS signs...',
          color: '#3B82F6',
        };
      default:
        return {
          title: 'Proof of Work',
          desc: 'Simulating cryptographic puzzles. Miners search for leading zeros.',
          sliderLabel: 'Difficulty (Zeros)',
          unitLabel: 'Hash rate',
          unitValue: `${hashRate.toFixed(0)} H/s`,
          nonceLabel: 'Nonce value',
          hashHeader: 'candidate_block.mine()',
          targetText: `target: ${difficulty} leading zeros`,
          activeAction: 'Solving cryptographic puzzle...',
          color: '#E8A344',
        };
    }
  };

  const variant = getVariantDetails();

  const generateRandomHash = (forceSuccess = false, diff = difficulty) => {
    const chars = '0123456789abcdef';
    let hash = forceSuccess ? '0'.repeat(diff) : '';
    const length = forceSuccess ? 64 - diff : 64;
    for (let i = 0; i < length; i++) hash += chars[Math.floor(Math.random() * 16)];
    return hash;
  };

  useEffect(() => {
    if (!isAutoRunning) { clearTimeout(autoRunTimeoutRef.current); return; }
    const go = (next, delay) => { autoRunTimeoutRef.current = setTimeout(() => setStep(next), delay); };
    switch (step) {
      case 0: go(1, 700); break;
      case 1: go(2, 1100); break;
      case 2: go(3, 900); break;
      case 3: break; // Solve loop handles transitions
      case 4: go(5, 1300); break;
      case 5:
        autoRunTimeoutRef.current = setTimeout(() => {
          setBlockchain(prev => [...prev, { height: prev.length, hash: currentHash, nonce }]);
          setNonce(0);
          setCurrentHash('0'.repeat(64));
          setStep(0);
        }, 900);
        break;
      default: break;
    }
    return () => clearTimeout(autoRunTimeoutRef.current);
  }, [step, isAutoRunning, currentHash, nonce]);

  useEffect(() => {
    if (step === 3) {
      let attempts = 0;
      const targetAttempts = Math.floor(Math.random() * 20 * Math.pow(1.5, difficulty)) + 10;
      miningIntervalRef.current = setInterval(() => {
        attempts++;
        setNonce(prev => prev + 1);
        if (attempts >= targetAttempts) {
          clearInterval(miningIntervalRef.current);
          setCurrentHash(generateRandomHash(true, difficulty));
          setStep(4);
        } else {
          setCurrentHash(generateRandomHash(false));
        }
      }, 40);
    }
    return () => clearInterval(miningIntervalRef.current);
  }, [step, difficulty]);

  const toggleAutoRun = () => {
    setIsAutoRunning(!isAutoRunning);
    if (!isAutoRunning && step === 5) setStep(0);
  };

  const manualNextStep = () => {
    setIsAutoRunning(false);
    if (step === 5) {
      setBlockchain(prev => [...prev, { height: prev.length, hash: currentHash, nonce }]);
      setNonce(0);
      setCurrentHash('0'.repeat(64));
      setStep(0);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const resetSimulation = () => {
    setIsAutoRunning(false);
    setStep(0);
    setNonce(0);
    setCurrentHash('0'.repeat(64));
    setBlockchain([{ height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', nonce: 2083236893 }]);
  };

  const stage = STAGES[step] || STAGES[0];
  const isSolving = step === 3;
  const isSolved = step >= 4;
  const matchLen = (() => {
    let n = 0;
    while (n < difficulty && currentHash[n] === '0') n++;
    return isSolved ? difficulty : n;
  })();

  return (
    <div
      style={{
        '--bg': THEME.bg, '--surface': THEME.surface, '--surface-2': THEME.surface2,
        '--border': THEME.border, '--border-strong': THEME.borderStrong,
        '--amber': variant.color, '--amber-dim': `${variant.color}20`,
        '--green': THEME.green, '--green-dim': THEME.greenDim,
        '--text-1': THEME.text1, '--text-2': THEME.text2, '--text-3': THEME.text3,
        background: 'var(--bg)', color: 'var(--text-1)',
        fontFamily: "'Raleway', 'Inter', sans-serif",
      }}
      className="w-full max-w-4xl rounded-2xl border p-7"
    >
      <style>{`
        .pow-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        @keyframes pow-fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .pow-fade { animation: pow-fade-in 0.4s ease both; }
        @keyframes pow-glow-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(63,206,142,0.35); } 50% { box-shadow: 0 0 0 6px rgba(63,206,142,0); } }
        .pow-glow { animation: pow-glow-pulse 1.8s ease-in-out infinite; }
        @keyframes pow-scan { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .pow-scan { animation: pow-scan 0.6s ease-in-out infinite; }
        .pow-track-fill { transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
      `}</style>

      <div style={{ borderColor: 'var(--border)' }} className="flex flex-wrap items-start justify-between gap-6 border-b pb-6">
        <div>
          <div className="pow-mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--amber)' }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--amber)' }} />
            Consensus · {variant.title}
          </div>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: 'var(--text-1)' }}>
            {stage.label}
          </h3>
          <p className="mt-1 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            {stage.detail}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-col gap-1.5 rounded-xl border px-3 py-2" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            <div className="pow-mono flex items-center justify-between text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
              <span>{variant.sliderLabel}</span>
              <span style={{ color: 'var(--text-1)' }}>{difficulty}</span>
            </div>
            <input
              type="range" min="1" max="5" value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              disabled={isSolving}
              className="w-28 accent-current"
              style={{ accentColor: variant.color }}
            />
          </div>

          <div className="flex overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={toggleAutoRun}
              className="pow-mono px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{
                background: isAutoRunning ? 'rgba(224,90,90,0.12)' : 'var(--green-dim)',
                color: isAutoRunning ? '#E05A5A' : 'var(--green)',
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
              disabled={isAutoRunning || isSolving}
              className="pow-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer text-white hover:bg-white/[0.06]"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}
            >
              {step === 5 ? 'Restart' : 'Step →'}
            </button>
            <button
              onClick={resetSimulation}
              className="pow-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors cursor-pointer text-white/60 hover:text-white hover:bg-white/[0.06]"
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
                  className={`pow-mono flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition-all ${active ? 'pow-glow' : ''}`}
                  style={{
                    borderColor: active || passed ? 'var(--amber)' : 'var(--border-strong)',
                    background: active ? 'var(--amber)' : passed ? 'var(--amber-dim)' : 'var(--surface)',
                    color: active ? '#0A0A0C' : passed ? 'var(--amber)' : 'var(--text-3)',
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
                    className="pow-track-fill h-px"
                    style={{ background: 'var(--amber)', width: i < step ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        className="relative mt-7 overflow-hidden rounded-xl border"
        style={{ borderColor: isSolved ? 'var(--green)' : 'var(--border)', background: '#050505', transition: 'border-color 0.4s ease' }}
      >
        <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E05A5A' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--amber)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="pow-mono ml-2 text-[11px]" style={{ color: 'var(--text-3)' }}>
              {variant.hashHeader}
            </span>
          </div>
          <div className="pow-mono flex items-center gap-1.5 text-[11px]" style={{ color: isSolving ? 'var(--amber)' : 'var(--text-3)' }}>
            {isSolving && <span className="pow-scan h-1.5 w-1.5 rounded-full" style={{ background: 'var(--amber)' }} />}
            {isSolving ? variant.unitValue : isSolved ? 'solved' : 'standby'}
          </div>
        </div>

        <div
          className={`grid gap-6 p-5 transition-opacity duration-500 md:grid-cols-[1fr_auto] ${step < 2 ? 'opacity-40' : 'opacity-100'}`}
        >
          <div className="pow-mono space-y-3 text-xs">
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-3)' }}>prev_hash</span>
              <span className="truncate opacity-60 ml-4 max-w-[200px] md:max-w-xs">{blockchain[blockchain.length - 1].hash}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-3)' }}>merkle_root</span>
              <span style={{ color: 'var(--green)' }}>a3f9c1…e21c8b</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--text-3)' }}>{variant.nonceLabel}</span>
              <span className="text-base font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>
                {nonce.toString().padStart(10, '0')}
              </span>
            </div>

            <div className="pt-1">
              <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                <span>solution output</span>
                <span>{variant.targetText}</span>
              </div>
              <div
                className="break-all rounded-lg border p-3 text-[11px] leading-relaxed"
                style={{
                  borderColor: isSolved ? 'var(--green)' : 'var(--border)',
                  background: isSolved ? 'var(--green-dim)' : 'var(--surface-2)',
                  color: isSolved ? '#B7F3D6' : 'var(--text-2)',
                }}
              >
                <span
                  className="rounded-sm font-bold"
                  style={{
                    color: isSolved ? 'var(--green)' : matchLen > 0 ? 'var(--amber)' : 'var(--text-2)',
                    background: matchLen > 0 ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                >
                  {currentHash.substring(0, difficulty)}
                </span>
                {currentHash.substring(difficulty)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-6">
        <h4 className="pow-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
          chain_extended_ledger
        </h4>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {blockchain.map((b) => (
            <div
              key={b.height}
              className="rounded-xl border border-white/[0.08] bg-[#050505] p-3 text-xs min-w-[125px] flex flex-col justify-between gap-2 shrink-0 animate-fade-in"
            >
              <div>
                <p className="pow-mono text-[9px] text-white/40">Block: #{b.height}</p>
                <p className="font-bold text-white mt-1">Difficulty: {difficulty}</p>
              </div>
              <p className="pow-mono text-[9px] text-white/40 truncate" title={b.hash}>Hash: {b.hash.slice(0, 8)}...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}