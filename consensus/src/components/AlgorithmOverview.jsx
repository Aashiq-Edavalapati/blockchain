import { Sparkles, Info } from "lucide-react";
import IconByName from "./IconByName";

export default function AlgorithmOverview({ algorithm }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero card with large icon + core info */}
      <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-900 bg-zinc-900/40"
            style={{ color: algorithm.color }}
          >
            <IconByName name={algorithm.id} size={28} />
          </div>
          <div className="min-w-0 pt-1">
            <h2 className="text-xl font-bold tracking-tight text-white">{algorithm.name}</h2>
            <p className="text-xs font-semibold mt-1" style={{ color: algorithm.color }}>
              {algorithm.tagline}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-zinc-400 mt-5 border-t border-zinc-900/60 pt-4">
          {algorithm.coreMechanism}
        </p>
      </div>

      {/* Steps - timeline style */}
      <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6">
        <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-5">
          Protocol Steps
        </h3>
        <div className="space-y-0">
          {algorithm.stepByStepExplanation.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold shrink-0 bg-zinc-900/60 border border-zinc-900/60"
                  style={{
                    color: algorithm.color,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < algorithm.stepByStepExplanation.length - 1 && (
                  <div className="w-px flex-1 my-1.5 bg-zinc-900/60" />
                )}
              </div>
              <div className="pb-5 pt-1.5">
                <p className="text-xs leading-relaxed text-zinc-300 font-sans">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strength & Trade-off side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
              <Sparkles size={11} className="text-amber-500" /> Strength
            </p>
            <p className="text-xs leading-relaxed text-zinc-350">{algorithm.strength}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
              <Info size={11} className="text-zinc-500" /> Trade-off
            </p>
            <p className="text-xs leading-relaxed text-zinc-355">{algorithm.tradeoff}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
