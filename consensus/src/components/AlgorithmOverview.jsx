import { Sparkles, Info } from "lucide-react";
import IconByName from "./IconByName";

export default function AlgorithmOverview({ algorithm }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero card with large icon + core info */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/[0.08] bg-white/[0.02]"
            style={{ color: algorithm.color }}
          >
            <IconByName name={algorithm.id} size={28} />
          </div>
          <div className="min-w-0 pt-1">
            <h2 className="text-xl font-bold tracking-tight text-white">{algorithm.name}</h2>
            <p className="text-[14px] font-semibold mt-1" style={{ color: algorithm.color }}>
              {algorithm.tagline}
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-relaxed text-white/70 mt-5 border-t border-white/[0.06] pt-4">
          {algorithm.coreMechanism}
        </p>
      </div>

      {/* Steps - timeline style */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-5">
          Protocol Steps
        </h3>
        <div className="space-y-0">
          {algorithm.stepByStepExplanation.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-8.5 h-8.5 rounded-xl flex items-center justify-center font-mono text-[13px] font-bold shrink-0 bg-white/[0.02] border border-white/[0.08]"
                  style={{
                    color: algorithm.color,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {i < algorithm.stepByStepExplanation.length - 1 && (
                  <div className="w-px flex-1 my-1.5 bg-white/[0.08]" />
                )}
              </div>
              <div className="pb-5 pt-1.5">
                <p className="text-[15px] leading-relaxed text-[#888] font-sans">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strength & Trade-off side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-1.5">
              <Sparkles size={11} className="text-amber-500" /> Strength
            </p>
            <p className="text-[15px] leading-relaxed text-[#888]">{algorithm.strength}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-1.5">
              <Info size={11} className="text-white/40" /> Trade-off
            </p>
            <p className="text-[15px] leading-relaxed text-[#888]">{algorithm.tradeoff}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
