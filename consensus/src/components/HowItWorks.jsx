import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2 } from "lucide-react";
import PoWVisualizer from "./how_it_works/PoW";
import PoSVisualizer from "./how_it_works/PoS";
import BFTVisualizer from "./how_it_works/BFT";
import DAGVisualizer from "./how_it_works/DAG";
import PoCVisualizer from "./how_it_works/PoC";
import PoBVisualizer from "./how_it_works/PoB";
import PoAVisualizer from "./how_it_works/PoA";
import PoETVisualizer from "./how_it_works/PoET";

export default function HowItWorks({ algorithm }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Disable background body scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  // Determine which visualizer to load
  const renderVisualizer = () => {
    const fam = algorithm.family.toLowerCase();
    const id = algorithm.id.toLowerCase();

    if (id === "proofofcapacity") {
      return <PoCVisualizer algorithm={algorithm} />;
    }
    if (id === "proofofburn") {
      return <PoBVisualizer algorithm={algorithm} />;
    }
    if (id === "proofofactivity") {
      return <PoAVisualizer algorithm={algorithm} />;
    }
    if (id === "proofofelapsedtime") {
      return <PoETVisualizer algorithm={algorithm} />;
    }

    if (
      fam.includes("pow") || 
      id === "pow"
    ) {
      return <PoWVisualizer algorithm={algorithm} />;
    }
    
    if (
      fam.includes("bft") || 
      fam.includes("cft") || 
      id === "pbft" || 
      id === "tendermint" || 
      id === "ibft" || 
      id === "hotstuff" || 
      id === "dbft" || 
      id === "raft"
    ) {
      return <BFTVisualizer algorithm={algorithm} />;
    }
    
    if (
      fam.includes("dag") || 
      id === "avalanche" || 
      id === "snowman" || 
      id === "snowball"
    ) {
      return <DAGVisualizer algorithm={algorithm} />;
    }
    
    // Default fallback is PoS visualizer
    return <PoSVisualizer algorithm={algorithm} />;
  };

  return (
    <div className="space-y-8 w-full">
      {/* Dynamic Interactive Simulation Panel */}
      {isFullscreen ? (
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#000000] p-6 lg:p-12 overflow-y-auto flex flex-col items-center">
            {/* Fullscreen header */}
            <div className="w-full max-w-5xl flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">{algorithm.name} Simulation</h2>
                <p className="text-xs text-white/40 mt-1">Fullscreen Interactive Playground</p>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white border border-white/[0.08] bg-[#050505] hover:bg-white/[0.02] transition-all cursor-pointer shadow-sm"
              >
                <Minimize2 size={13} />
                <span>Exit Fullscreen</span>
              </button>
            </div>
            {/* Visualizer centered container */}
            <div className="w-full max-w-5xl flex-1 flex flex-col items-center">
              {renderVisualizer()}
            </div>
          </div>,
          document.body
        )
      ) : (
        /* Normal view */
        <div className="flex flex-col items-center w-full relative">
          <div className="w-full max-w-4xl flex justify-end mb-2 shrink-0 z-10">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white border border-white/[0.08] bg-[#050505] hover:bg-white/[0.02] transition-all cursor-pointer shadow-sm"
            >
              <Maximize2 size={13} />
              <span>Fullscreen View</span>
            </button>
          </div>
          {renderVisualizer()}
        </div>
      )}

      {/* Overview Intro Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
        <h3 className="text-sm font-bold text-white tracking-tight mb-2">
          How <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Works
        </h3>
        <p className="text-xs leading-relaxed text-[#888]">
          {algorithm.coreMechanism}
        </p>
      </div>

      {/* Blockchain-style step blocks */}
      <div className="space-y-0 w-full">
        {algorithm.stepByStepExplanation.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            {/* Step block */}
            <div
              className="rounded-2xl p-5 w-full border border-white/[0.08] bg-white/[0.02]"
              style={{
                borderLeft: `3px solid ${algorithm.color}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8.5 h-8.5 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold shrink-0 border border-white/[0.08]"
                  style={{
                    background: `${algorithm.color}10`,
                    color: algorithm.color,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-[10px] font-mono font-bold mb-1" style={{ color: algorithm.color }}>
                    STEP_{String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-xs leading-relaxed text-[#888]">
                    {step}
                  </p>
                </div>
              </div>
            </div>

            {/* Connector arrow to next step */}
            {i < algorithm.stepByStepExplanation.length - 1 && (
              <div className="flex flex-col items-center py-2.5 text-white/20">
                <svg width="12" height="16" viewBox="0 0 16 20" fill="none">
                  <path d="M8 0v16M2 10l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
