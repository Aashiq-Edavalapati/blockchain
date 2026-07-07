import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const STAGES = [
  { key: 'idle', label: 'Idle', detail: 'Network is at rest. No pending work.' },
  { key: 'broadcast', label: 'Broadcast', detail: 'A new transaction enters the mempool.' },
  { key: 'collect', label: 'Collect', detail: 'Miner assembles a candidate block.' },
  { key: 'solve', label: 'Solve', detail: 'Miner searches for a valid nonce.' },
  { key: 'propagate', label: 'Propagate', detail: 'Solution found — block broadcast to peers.' },
  { key: 'verify', label: 'Verify', detail: 'Peers confirm the hash. Chain extends.' },
];

const THEME = {
  bg: '#0A0A0C',
  surface: '#111114',
  surface2: '#17171B',
  border: '#242429',
  borderStrong: '#33333A',
  amber: '#E8A344',
  amberDim: 'rgba(232, 163, 68, 0.14)',
  green: '#3FCE8E',
  greenDim: 'rgba(63, 206, 142, 0.14)',
  text1: '#F3F1EC',
  text2: '#8C8C93',
  text3: '#57575E',
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

export default function ProofOfWorkVisualizer() {
  const [step, setStep] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [currentHash, setCurrentHash] = useState('0'.repeat(64));
  const [difficulty, setDifficulty] = useState(3);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [blockchain, setBlockchain] = useState([
    { height: 0, hash: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f', nonce: 2083236893, genesis: true },
  ]);

  const miningIntervalRef = useRef(null);
  const autoRunTimeoutRef = useRef(null);
  const hashRate = useHashRate(step === 3);

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
      case 3: break;
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
        '--amber': THEME.amber, '--amber-dim': THEME.amberDim,
        '--green': THEME.green, '--green-dim': THEME.greenDim,
        '--text-1': THEME.text1, '--text-2': THEME.text2, '--text-3': THEME.text3,
        background: 'var(--bg)', color: 'var(--text-1)',
        fontFamily: "'Raleway', 'Inter', sans-serif",
      }}
      className="w-full max-w-4xl rounded-2xl border p-7"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
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
            Consensus · Proof of Work
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
              <span>Difficulty</span>
              <span style={{ color: 'var(--text-1)' }}>{difficulty}</span>
            </div>
            <input
              type="range" min="1" max="5" value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              disabled={isSolving}
              className="w-28 accent-current"
              style={{ accentColor: THEME.amber }}
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
              className="pow-mono border-l px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              style={{ borderColor: 'var(--border)', background: 'var(--surface-2)', color: 'var(--text-1)' }}
            >
              {step === 5 ? 'Restart' : 'Step →'}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center">
        {STAGES.map((s, i) => {
          const done = i < step || step === 5 && i <= 5 ? i < step : i < step;
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
                  className="text-[10px] uppercase tracking-wide"
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
        style={{ borderColor: isSolved ? 'var(--green)' : 'var(--border)', background: '#08080A', transition: 'border-color 0.4s ease' }}
      >
        <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#E05A5A' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--amber)' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="pow-mono ml-2 text-[11px]" style={{ color: 'var(--text-3)' }}>
              candidate_block.mine()
            </span>
          </div>
          <div className="pow-mono flex items-center gap-1.5 text-[11px]" style={{ color: isSolving ? 'var(--amber)' : 'var(--text-3)' }}>
            {isSolving && <span className="pow-scan h-1.5 w-1.5 rounded-full" style={{ background: 'var(--amber)' }} />}
            {isSolving ? `${hashRate.toFixed(0)} H/s` : isSolved ? 'solved' : 'standby'}
          </div>
        </div>

        <div
          className={`grid gap-6 p-5 transition-opacity duration-500 md:grid-cols-[1fr_auto] ${step < 2 ? 'opacity-40' : 'opacity-100'}`}
        >
          <div className="pow-mono space-y-3 text-xs">
            <Row label="prev_hash">
              <span className="truncate opacity-60">{blockchain[blockchain.length - 1].hash}</span>
            </Row>
            <Row label="merkle_root">
              <span style={{ color: 'var(--green)' }}>a3f9c1…e21c8b</span>
            </Row>
            <Row label="nonce">
              <span className="text-base font-semibold tabular-nums" style={{ color: 'var(--text-1)' }}>
                {nonce.toString().padStart(10, '0')}
              </span>
            </Row>

            <div className="pt-1">
              <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
                <span>hash output</span>
                <span>target: {matchLen}/{difficulty} leading zeros</span>
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

          <div className="flex flex-row gap-1.5 md:flex-col md:justify-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < matchLen;
              const isTarget = i < difficulty;
              return (
                <div
                  key={i}
                  className="pow-mono flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold transition-all duration-200"
                  style={{
                    border: `1px solid ${isTarget ? (filled ? THEME.green : THEME.amber) : THEME.border}`,
                    background: filled ? THEME.greenDim : 'transparent',
                    color: filled ? THEME.green : isTarget ? THEME.amber : THEME.text3,
                    opacity: isTarget ? 1 : 0.3,
                  }}
                >
                  0
                </div>
              );
            })}
          </div>
        </div>

        {step === 1 && (
          <div
            className="pow-fade pow-mono absolute right-4 top-14 rounded-lg border px-3 py-1.5 text-[11px]"
            style={{ borderColor: 'var(--green)', background: 'var(--green-dim)', color: 'var(--green)' }}
          >
            tx received · alice → bob · 1.000 BTC
          </div>
        )}
      </div>

      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="pow-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-3)' }}>
            Verified Chain
          </h4>
          <span className="pow-mono text-[11px]" style={{ color: 'var(--text-3)' }}>
            {blockchain.length} block{blockchain.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {blockchain.map((block, i) => (
            <div key={i} className="flex shrink-0 items-center">
              {i > 0 && <div className="mr-3 h-px w-4" style={{ background: 'var(--border-strong)' }} />}
              <div
                className="w-56 rounded-xl border p-3.5"
                style={{ borderColor: block.genesis ? 'var(--border-strong)' : 'var(--border)', background: 'var(--surface)' }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="pow-mono text-[11px] font-semibold" style={{ color: 'var(--text-1)' }}>
                    #{block.height}{block.genesis && <span style={{ color: 'var(--text-3)' }}> · genesis</span>}
                  </span>
                  <span className="pow-mono text-[10px]" style={{ color: 'var(--amber)' }}>
                    n·{block.nonce}
                  </span>
                </div>
                <div className="pow-mono break-all text-[10px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {block.hash}
                </div>
              </div>
            </div>
          ))}

          {step === 5 && (
            <div className="flex shrink-0 items-center">
              <div className="mr-3 h-px w-4" style={{ background: 'var(--green)' }} />
              <div
                className="pow-fade flex w-56 items-center justify-center rounded-xl border border-dashed p-3.5"
                style={{ borderColor: 'var(--green)', background: 'var(--green-dim)' }}
              >
                <span className="pow-mono text-[11px] font-semibold" style={{ color: 'var(--green)' }}>
                  appending #{blockchain.length}…
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <span style={{ color: 'var(--text-3)' }}>{label}</span>
      <span className="max-w-[65%] truncate text-right">{children}</span>
    </div>
  );
}