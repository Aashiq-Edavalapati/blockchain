import React from "react";
import PoWVisualizer from "./how_it_works/PoW";
import PoSVisualizer from "./how_it_works/PoS";
import BFTVisualizer from "./how_it_works/BFT";
import DAGVisualizer from "./how_it_works/DAG";

export default function HowItWorks({ algorithm }) {
  // Determine which visualizer to load
  const renderVisualizer = () => {
    const fam = algorithm.family.toLowerCase();
    const id = algorithm.id.toLowerCase();

    if (
      fam.includes("pow") || 
      id === "pow" || 
      id === "proofofcapacity" || 
      id === "proofofburn" || 
      id === "proofofactivity" || 
      id === "proofofelapsedtime"
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
      <div className="flex flex-col items-center w-full">
        {renderVisualizer()}
      </div>

      {/* Overview Intro Card */}
      <div className="rounded-2xl border border-zinc-900 bg-[#0D0F14]/50 p-6">
        <h3 className="text-sm font-bold text-white tracking-tight mb-2">
          How <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Works
        </h3>
        <p className="text-xs leading-relaxed text-zinc-400">
          {algorithm.coreMechanism}
        </p>
      </div>

      {/* Blockchain-style step blocks */}
      <div className="space-y-0 w-full">
        {algorithm.stepByStepExplanation.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full">
            {/* Step block */}
            <div
              className="rounded-2xl p-5 w-full border border-zinc-900 bg-[#0D0F14]/40"
              style={{
                borderLeft: `3px solid ${algorithm.color}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8.5 h-8.5 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold shrink-0 border border-zinc-900"
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
                  <p className="text-xs leading-relaxed text-zinc-350">
                    {step}
                  </p>
                </div>
              </div>
            </div>

            {/* Connector arrow to next step */}
            {i < algorithm.stepByStepExplanation.length - 1 && (
              <div className="flex flex-col items-center py-2.5 text-zinc-800">
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
