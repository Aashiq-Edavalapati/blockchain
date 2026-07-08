import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { Sparkles, ArrowLeftRight, Clock, Zap, Shield, HelpCircle } from "lucide-react";
import IconByName from "./IconByName";

function generateDetailedComparison(a, b) {
  const scoreDiff = {
    security: a.score.security - b.score.security,
    scalability: a.score.scalability - b.score.scalability,
    decentralization: a.score.decentralization - b.score.decentralization,
  };

  const getTrilemmaAnalysis = () => {
    let text = "";
    if (Math.abs(scoreDiff.scalability) > 15) {
      const faster = scoreDiff.scalability > 0 ? a : b;
      const slower = scoreDiff.scalability > 0 ? b : a;
      text += `**Scalability vs. Decentralization:** **${faster.shortName}** achieves high throughput (scoring ${faster.score.scalability} in scalability) by design, limiting message overhead. However, this restricts its validator set, leading to a lower decentralization score of ${faster.score.decentralization}. Conversely, **${slower.shortName}** prioritizes permissionless distribution (scoring ${slower.score.decentralization} in decentralization), accepting lower raw throughput in exchange for increased censorship resistance. `;
    } else {
      text += `**Scalability Profile:** Both protocols show similar throughput scalability (scores: ${a.shortName} = ${a.score.scalability}, ${b.shortName} = ${b.score.scalability}). They achieve their throughput with comparable network overhead and consensus loop latencies. `;
    }

    if (Math.abs(scoreDiff.security) > 10) {
      const secure = scoreDiff.security > 0 ? a : b;
      const lessSecure = scoreDiff.security > 0 ? b : a;
      text += `**Security Thresholds:** **${secure.shortName}** offers stronger protocol-level security guarantees (scoring ${secure.score.security} vs ${lessSecure.score.security}). This is due to its rigid state consensus rules and extensive penalty mechanisms (such as economic slashing or computational cost) which make historical state revision economically ruinous.`;
    } else {
      text += `**Security Assurances:** Both systems provide high-grade security guarantees (scores: ${a.shortName} = ${a.score.security}, ${b.shortName} = ${b.score.security}), relying on robust mathematical models (like BFT voting bounds or massive hash-power work requirements) to protect state immutability.`;
    }
    return text;
  };

  const getCleanText = (str) => {
    if (!str) return "";
    return str.split(".")[0].trim() + ".";
  };

  const getCleanAttacks = (arr) => {
    if (!arr || arr.length === 0) return "None documented";
    return arr.map(atk => atk.split("—")[0].trim()).join(", ");
  };

  return {
    consensusLoop: `Comparing their consensus mechanics, **${a.shortName}** operates via ${a.blockProductionMethod.toLowerCase()} and elects block proposers based on **${a.leaderElection.toLowerCase()}**. In contrast, **${b.shortName}** runs via ${b.blockProductionMethod.toLowerCase()} with proposer selection relying on **${b.leaderElection.toLowerCase()}**. For fork resolution, ${a.shortName} utilizes **${getCleanText(a.forkBehavior)}** whereas ${b.shortName} applies **${getCleanText(b.forkBehavior)}**, leading to **${a.finalityType.split("—")[0].trim().toLowerCase()}** compared to **${b.finalityType.split("—")[0].trim().toLowerCase()}** for ${b.shortName}.`,
    
    securityThreats: `From an adversarial standpoint, the main attack vectors for **${a.shortName}** are *${getCleanAttacks(a.commonAttacks)}*. Its attack resistance is built on **${getCleanText(a.attackResistance)}** and validated by its ${a.validatorType} set. In comparison, **${b.shortName}**'s primary vulnerabilities are *${getCleanAttacks(b.commonAttacks)}*, defending itself via **${getCleanText(b.attackResistance)}** under its ${b.validatorType} model.`,
    
    trilemma: getTrilemmaAnalysis(),
    
    applicationFit: `In production, **${a.shortName}** is highly suited for *${a.bestUseCases.join(", ")}*, but is limited by *${a.limitations.join(", ")}*. Meanwhile, **${b.shortName}** excels in *${b.bestUseCases.join(", ")}*, but struggles with bottlenecks like *${b.limitations.join(", ")}*. This positions ${a.shortName} as ${a.description.split(".")[0].toLowerCase()} and ${b.shortName} as ${b.description.split(".")[0].toLowerCase()}.`
  };
}

export default function CompareSection({ activeAlgorithm, allAlgorithms }) {
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

  const cleanVal = (val) => {
    if (!val) return "N/A";
    return val;
  };

  const getBriefSybil = (algo) => {
    if (!algo.permissionType || !algo.validatorType) return "N/A";
    const type = algo.validatorType.split(" ")[0].replace(/[^a-zA-Z]/g, "");
    return `${algo.permissionType} (${type})`;
  };

  const getBriefFinality = (algo) => {
    if (!algo.finalityType) return "N/A";
    return algo.finalityType.split("—")[0].trim();
  };

  return (
    <div className="space-y-6 w-full">
      {/* Selector Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <ArrowLeftRight size={14} style={{ color: activeAlgorithm.color }} />
            Protocol Comparison Sandbox
          </h3>
          <p className="text-[11px] text-white/40 mt-0.5">Compare architectural properties and trilemma scores side-by-side</p>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-2.5 rounded-xl border px-3 py-1.5 bg-[#020202] border-white/[0.08]">
          <span className="font-mono text-[9px] text-white/40 uppercase font-bold">Compare with:</span>
          <select
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            className="bg-transparent text-xs font-bold text-white focus:outline-none border-none p-1 cursor-pointer"
          >
            {remainingAlgos.map((a) => (
              <option key={a.id} value={a.id} className="bg-[#050505] text-white/60 font-semibold">
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
          className="rounded-2xl border p-5 bg-[#050505] transition-all duration-300"
          style={{ borderColor: `${activeAlgorithm.color}25` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08] bg-white/[0.02]"
              style={{ color: activeAlgorithm.color }}
            >
              <IconByName name={activeAlgorithm.id} size={20} />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/10" style={{ color: activeAlgorithm.color }}>
                Active Protocol
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{activeAlgorithm.name}</h4>
            </div>
          </div>
        </div>

        {/* Compare Algorithm Card */}
        <div 
          className="rounded-2xl border p-5 bg-[#050505] transition-all duration-300"
          style={{ borderColor: `${compareAlgorithm.color}25` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.08] bg-white/[0.02]"
              style={{ color: compareAlgorithm.color }}
            >
              <IconByName name={compareAlgorithm.id} size={20} />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/10" style={{ color: compareAlgorithm.color }}>
                Compared Protocol
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{compareAlgorithm.name}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Scorecard Overlay */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col items-center">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider self-start mb-4 border-b border-white/[0.06] pb-2 w-full">
          Overlay Trilemma Scorecard
        </h4>
        <div style={{ width: "100%", height: 260 }} className="flex items-center justify-center">
          <ResponsiveContainer>
            <RadarChart data={radarData} outerRadius="58%">
              <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 9, fontWeight: 500 }} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }} />
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
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] overflow-hidden">
        <div className="grid grid-cols-3 bg-[#020202]/40 border-b border-white/[0.06] p-3 text-[10px] uppercase font-bold text-white/40">
          <span>Technical metric</span>
          <span style={{ color: activeAlgorithm.color }}>{activeAlgorithm.shortName}</span>
          <span style={{ color: compareAlgorithm.color }}>{compareAlgorithm.shortName}</span>
        </div>

        <div className="divide-y divide-white/[0.06] font-mono text-xs">
          <MetricRow 
            icon={<Clock size={12} className="text-white/40" />} 
            label="Typical Block Time" 
            valA={cleanVal(activeAlgorithm.typicalBlockTime)} 
            valB={cleanVal(compareAlgorithm.typicalBlockTime)} 
          />
          <MetricRow 
            icon={<Zap size={12} className="text-white/40" />} 
            label="Throughput (TPS)" 
            valA={cleanVal(activeAlgorithm.typicalTPS)} 
            valB={cleanVal(compareAlgorithm.typicalTPS)} 
          />
          <MetricRow 
            icon={<Shield size={12} className="text-white/40" />} 
            label="Sybil Resistance" 
            valA={getBriefSybil(activeAlgorithm)} 
            valB={getBriefSybil(compareAlgorithm)} 
          />
          <MetricRow 
            icon={<HelpCircle size={12} className="text-white/40" />} 
            label="Finality Type" 
            valA={getBriefFinality(activeAlgorithm)} 
            valB={getBriefFinality(compareAlgorithm)} 
          />
        </div>
      </div>

      {/* Textual Deep-Dive side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Core Mechanism Comparison */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
            Core Mechanism comparison
          </p>
          <div className="space-y-4 text-xs leading-relaxed font-sans">
            <div>
              <p className="font-semibold" style={{ color: activeAlgorithm.color }}>{activeAlgorithm.shortName}</p>
              <p className="text-[#888] mt-1">{activeAlgorithm.coreMechanism}</p>
            </div>
            <div className="border-t border-white/[0.06] pt-3">
              <p className="font-semibold" style={{ color: compareAlgorithm.color }}>{compareAlgorithm.shortName}</p>
              <p className="text-[#888] mt-1">{compareAlgorithm.coreMechanism}</p>
            </div>
          </div>
        </div>

        {/* Strengths & Trade-offs Comparison */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
            Strengths & Trade-offs
          </p>
          <div className="space-y-4 text-xs leading-relaxed font-sans">
            <div>
              <p className="font-semibold flex items-center gap-1.5" style={{ color: activeAlgorithm.color }}>
                <Sparkles size={11} className="opacity-80" /> {activeAlgorithm.shortName}
              </p>
              <p className="text-[#888] mt-0.5"><span className="font-medium text-white">Strength:</span> {activeAlgorithm.strength}</p>
              <p className="text-white/40 mt-0.5"><span className="font-medium text-[#888]">Trade-off:</span> {activeAlgorithm.tradeoff}</p>
            </div>
            <div className="border-t border-white/[0.06] pt-3">
              <p className="font-semibold flex items-center gap-1.5" style={{ color: compareAlgorithm.color }}>
                <Sparkles size={11} className="opacity-80" /> {compareAlgorithm.shortName}
              </p>
              <p className="text-[#888] mt-0.5"><span className="font-medium text-white">Strength:</span> {compareAlgorithm.strength}</p>
              <p className="text-white/40 mt-0.5"><span className="font-medium text-[#888]">Trade-off:</span> {compareAlgorithm.tradeoff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Deep-Dive Comparison Narrative */}
      {(() => {
        const narrative = generateDetailedComparison(activeAlgorithm, compareAlgorithm);
        const formatMarkdown = (text) => {
          // simple formatting for bold text (e.g. **text**)
          return text.split("**").map((part, index) => {
            return index % 2 === 1 ? <strong key={index} className="text-white font-bold">{part}</strong> : part;
          });
        };
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Consensus Loop & Election Narrative */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
                Consensus Loop & Proposer Election
              </p>
              <p className="text-xs leading-relaxed text-[#888] font-sans">
                {formatMarkdown(narrative.consensusLoop)}
              </p>
            </div>

            {/* Security Assurances & Slashes */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
                Security Assurances & Attack Surface
              </p>
              <p className="text-xs leading-relaxed text-[#888] font-sans">
                {formatMarkdown(narrative.securityThreats)}
              </p>
            </div>

            {/* Trilemma Trade-off Evaluation */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
                Trilemma Trade-off Analysis
              </p>
              <p className="text-xs leading-relaxed text-[#888] font-sans">
                {formatMarkdown(narrative.trilemma)}
              </p>
            </div>

            {/* Application Environment Suitability */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2.5">
                Application Fit & Bottlenecks
              </p>
              <p className="text-xs leading-relaxed text-[#888] font-sans">
                {formatMarkdown(narrative.applicationFit)}
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function MetricRow({ icon, label, valA, valB }) {
  return (
    <div className="grid grid-cols-3 p-3 items-center">
      <div className="flex items-center gap-2 text-[#888] font-semibold font-sans">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-white font-bold">{valA}</span>
      <span className="text-white font-bold">{valB}</span>
    </div>
  );
}
