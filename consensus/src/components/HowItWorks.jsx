import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minimize2, Cpu } from "lucide-react";

// Assuming these are your local imports
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

    if (id === "proofofcapacity") return <PoCVisualizer algorithm={algorithm} />;
    if (id === "proofofburn") return <PoBVisualizer algorithm={algorithm} />;
    if (id === "proofofactivity") return <PoAVisualizer algorithm={algorithm} />;
    if (id === "proofofelapsedtime") return <PoETVisualizer algorithm={algorithm} />;

    if (fam.includes("pow") || id === "pow") return <PoWVisualizer algorithm={algorithm} />;
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
    
    if (fam.includes("dag") || id === "avalanche" || id === "snowman" || id === "snowball") {
      return <DAGVisualizer algorithm={algorithm} />;
    }
    
    return <PoSVisualizer algorithm={algorithm} />;
  };

  return (
    <div className="w-full flex flex-col gap-12 pb-8">
      
      {/* 1. Dynamic Interactive Simulation Panel */}
      {isFullscreen ? (
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-[#000000] p-6 lg:p-12 overflow-y-auto flex flex-col items-center selection:bg-white/20 selection:text-white">
            <div className="w-full max-w-6xl flex items-center justify-between border-b border-white/[0.06] pb-5 mb-8">
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.02]"
                  style={{ color: algorithm.color }}
                >
                  <Cpu size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white tracking-tight">{algorithm.name} Simulation</h2>
                  <p className="text-[13px] text-white/40 mt-0.5 font-mono tracking-widest uppercase">
                    Interactive Playground
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="group flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium text-white/60 hover:text-white border border-white/[0.12] bg-[#050505] hover:bg-white/[0.05] transition-all cursor-pointer shadow-sm"
              >
                <Minimize2 size={14} className="group-hover:scale-90 transition-transform" />
                <span>Exit Fullscreen</span>
              </button>
            </div>
            <div className="w-full max-w-6xl flex-1 flex flex-col items-center">
              {renderVisualizer()}
            </div>
          </div>,
          document.body
        )
      ) : (
        /* Normal view */
        <div className="flex flex-col items-center w-full relative group">
          <div className="w-full flex justify-end mb-4 shrink-0 z-10 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium text-white/60 hover:text-white border border-white/[0.12] bg-[#050505]/80 backdrop-blur-md hover:bg-white/[0.08] transition-all cursor-pointer shadow-xl"
            >
              <Maximize2 size={14} />
              <span>Expand</span>
            </button>
          </div>
          <div className="w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#020202]">
            {renderVisualizer()}
          </div>
        </div>
      )}

      {/* 2. Mechanics Breakdown Section */}
      <div className="w-full max-w-3xl mx-auto">
        
        {/* Restored Header with Premium Box Layout */}
        <div className="mb-12 p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#050505] to-[#000000] shadow-2xl">
          <h3 className="text-xl font-semibold text-white tracking-tight mb-4 flex items-center gap-2">
            How <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Works
          </h3>
          <p className="text-[15px] leading-relaxed text-[#888] font-light">
            {algorithm.coreMechanism}
          </p>
        </div>

        {/* Modular Stepper Matrix */}
        <div className="flex flex-col gap-6 w-full">
          {algorithm.stepByStepExplanation.map((step, i) => (
            <div key={i} className="relative flex items-stretch gap-6 group">
              
              {/* Subtle Connector Line (Hidden on the last step) */}
              {i !== algorithm.stepByStepExplanation.length - 1 && (
                <div className="absolute left-[24px] top-[48px] bottom-[-24px] w-px bg-gradient-to-b from-white/[0.1] to-transparent z-0" />
              )}

              {/* Heavy Duty Number Badge */}
              <div className="relative z-10 shrink-0">
                <div 
                  className="w-12 h-12 flex items-center justify-center rounded-2xl border border-white/[0.08] bg-[#050505] font-mono text-[13px] font-bold shadow-xl transition-colors duration-300 group-hover:border-white/[0.2] group-hover:bg-[#0a0a0a]"
                  style={{ color: algorithm.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Step Content Block */}
              <div className="flex-1">
                <div className="p-6 md:p-8 rounded-3xl border border-white/[0.06] bg-[#030303] group-hover:bg-[#080808] group-hover:border-white/[0.15] transition-all duration-300">
                  <div className="flex flex-col gap-2">
                    <p className="text-[15px] leading-relaxed text-[#888] font-light">
                      {step}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}