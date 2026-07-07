import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { Sparkles, Info, ArrowLeftRight, Clock, Zap, Shield, HelpCircle } from "lucide-react";
import IconByName from "./IconByName";

export default function CompareSection({ activeAlgorithm, allAlgorithms }) {
  // Select first algorithm in list that is not active as default compare selection
  const remainingAlgos = allAlgorithms.filter((a) => a.id !== activeAlgorithm.id);
  const [compareId, setCompareId] = useState(remainingAlgos[0]?.id || "");

  const compareAlgorithm = allAlgorithms.find((a) => a.id === compareId);

  if (!compareAlgorithm) {
    return (
      <div className="text-center py-8 text-zinc-500 text-xs">
        No other algorithms available for comparison.
      </div>
    );
  }

  // Combined Radar Chart Data
  const radarData = [
    {
      subject: "Scalability",
      [activeAlgorithm.shortName]: activeAlgorithm.score.scalability,
      [compareAlgorithm.shortName]: compareAlgorithm.score.scalability,
    },
    {
      subject: "Security",
      [activeAlgorithm.shortName]: activeAlgorithm.score.security,
      [compareAlgorithm.shortName]: compareAlgorithm.score.security,
    },
    {
      subject: "Decentralization",
      [activeAlgorithm.shortName]: activeAlgorithm.score.decentralization,
      [compareAlgorithm.shortName]: compareAlgorithm.score.decentralization,
    },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Selector Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-900/60">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <ArrowLeftRight size={14} style={{ color: activeAlgorithm.color }} />
            Protocol Comparison Sandbox
          </h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Compare architectural properties and trilemma scores side-by-side</p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-2.5 rounded-xl border px-3 py-1.5 bg-zinc-950/40 border-zinc-900">
          <span className="font-mono text-[9px] text-zinc-500 uppercase font-bold">Compare with:</span>
          <select
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            className="bg-transparent text-xs font-bold text-zinc-200 focus:outline-none border-none p-1 cursor-pointer"
          >
            {remainingAlgos.map((a) => (
              <option key={a.id} value={a.id} className="bg-[#0D0F14] text-zinc-300 font-semibold">
                {a.name} ({a.shortName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Algorithm Card */}
        <div 
          className="rounded-2xl border p-5 bg-[#0D0F14]/60 transition-all duration-300"
          style={{ borderColor: `${activeAlgorithm.color}25` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-900 bg-zinc-900/40"
              style={{ color: activeAlgorithm.color }}
            >
              <IconByName name={activeAlgorithm.id} size={20} />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-900" style={{ color: activeAlgorithm.color }}>
                Active Protocol
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{activeAlgorithm.name}</h4>
            </div>
          </div>
        </div>

        {/* Compare Algorithm Card */}
        <div 
          className="rounded-2xl border p-5 bg-[#0D0F14]/60 transition-all duration-300"
          style={{ borderColor: `${compareAlgorithm.color}25` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-900 bg-zinc-900/40"
              style={{ color: compareAlgorithm.color }}
            >
              <IconByName name={compareAlgorithm.id} size={20} />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-zinc-900" style={{ color: compareAlgorithm.color }}>
                Compared Protocol
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{compareAlgorithm.name}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Scorecard Overlay */}
      <div className="rounded-2xl border border-zinc-900 bg-[#0C0D12] p-6 flex flex-col items-center">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider self-start mb-4 border-b border-zinc-900 pb-2 w-full">
          Overlay Trilemma Scorecard
        </h4>
        <div style={{ width: "100%", height: 260 }} className="flex items-center justify-center">
          <ResponsiveContainer>
            <RadarChart data={radarData} outerRadius="58%">
              <PolarGrid stroke="#262B37" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#A0A5B5", fontSize: 9, fontWeight: 500 }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 600, color: '#A0A5B5' }} />
              <Radar
                name={activeAlgorithm.shortName}
                dataKey={activeAlgorithm.shortName}
                stroke={activeAlgorithm.color}
                fill={activeAlgorithm.color}
                fillOpacity={0.06}
                strokeWidth={1.5}
                dot={{ fill: activeAlgorithm.color, r: 2.5 }}
              />
              <Radar
                name={compareAlgorithm.shortName}
                dataKey={compareAlgorithm.shortName}
                stroke={compareAlgorithm.color}
                fill={compareAlgorithm.color}
                fillOpacity={0.06}
                strokeWidth={1.5}
                dot={{ fill: compareAlgorithm.color, r: 2.5 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Technical Parameters Matrix */}
      <div className="rounded-2xl border border-zinc-900 bg-[#0D0F14]/40 overflow-hidden">
        <div className="grid grid-cols-3 bg-[#0A0C10]/60 border-b border-zinc-900 p-3 text-[10px] uppercase font-bold text-zinc-500">
          <span>Technical metric</span>
          <span style={{ color: activeAlgorithm.color }}>{activeAlgorithm.shortName}</span>
          <span style={{ color: compareAlgorithm.color }}>{compareAlgorithm.shortName}</span>
        </div>

        <div className="divide-y divide-zinc-900/60 font-mono text-xs">
          <MetricRow 
            icon={<Clock size={12} className="text-zinc-550" />} 
            label="Typical Block Time" 
            valA={activeAlgorithm.typicalBlockTime} 
            valB={compareAlgorithm.typicalBlockTime} 
          />
          <MetricRow 
            icon={<Zap size={12} className="text-zinc-550" />} 
            label="Throughput (TPS)" 
            valA={activeAlgorithm.typicalTPS} 
            valB={compareAlgorithm.typicalTPS} 
          />
          <MetricRow 
            icon={<Shield size={12} className="text-zinc-550" />} 
            label="Sybil Resistance" 
            valA={activeAlgorithm.sybilResistance} 
            valB={compareAlgorithm.sybilResistance} 
          />
          <MetricRow 
            icon={<HelpCircle size={12} className="text-zinc-550" />} 
            label="Finality Type" 
            valA={activeAlgorithm.finality} 
            valB={compareAlgorithm.finality} 
          />
        </div>
      </div>

      {/* Textual Deep-Dive side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Mechanism Comparison */}
        <div className="rounded-2xl border border-zinc-900 bg-[#0D0F14]/40 p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
            Core Mechanism comparison
          </p>
          <div className="space-y-4 text-xs leading-relaxed">
            <div>
              <p className="font-semibold" style={{ color: activeAlgorithm.color }}>{activeAlgorithm.shortName}</p>
              <p className="text-zinc-400 mt-1">{activeAlgorithm.coreMechanism}</p>
            </div>
            <div className="border-t border-zinc-900/60 pt-3">
              <p className="font-semibold" style={{ color: compareAlgorithm.color }}>{compareAlgorithm.shortName}</p>
              <p className="text-zinc-400 mt-1">{compareAlgorithm.coreMechanism}</p>
            </div>
          </div>
        </div>

        {/* Strengths & Trade-offs Comparison */}
        <div className="rounded-2xl border border-zinc-900 bg-[#0D0F14]/40 p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
            Strengths & Trade-offs
          </p>
          <div className="space-y-4 text-xs leading-relaxed">
            <div>
              <p className="font-semibold flex items-center gap-1.5" style={{ color: activeAlgorithm.color }}>
                <Sparkles size={11} className="opacity-80" /> {activeAlgorithm.shortName}
              </p>
              <p className="text-zinc-400 mt-0.5"><span className="font-medium text-zinc-200">Strength:</span> {activeAlgorithm.strength}</p>
              <p className="text-zinc-500 mt-0.5"><span className="font-medium text-zinc-350">Trade-off:</span> {activeAlgorithm.tradeoff}</p>
            </div>
            <div className="border-t border-zinc-900/60 pt-3">
              <p className="font-semibold flex items-center gap-1.5" style={{ color: compareAlgorithm.color }}>
                <Sparkles size={11} className="opacity-80" /> {compareAlgorithm.shortName}
              </p>
              <p className="text-zinc-400 mt-0.5"><span className="font-medium text-zinc-200">Strength:</span> {compareAlgorithm.strength}</p>
              <p className="text-zinc-500 mt-0.5"><span className="font-medium text-zinc-350">Trade-off:</span> {compareAlgorithm.tradeoff}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({ icon, label, valA, valB }) {
  return (
    <div className="grid grid-cols-3 p-3 items-center">
      <div className="flex items-center gap-2 text-zinc-400 font-semibold font-sans">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-zinc-200 font-bold">{valA}</span>
      <span className="text-zinc-200 font-bold">{valB}</span>
    </div>
  );
}
