import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import { Clock, Zap } from "lucide-react";
import { TOTAL, PILLARS } from "../data/constants";
import IconByName from "./IconByName";
import InfoTooltip from "./InfoTooltip";

function PillarGauge({ value, color }) {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width="76" height="76" viewBox="0 0 80 80" className="mx-auto">
      {/* Background ring */}
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="5.5" />
      {/* Active ring */}
      <motion.circle
        cx="40" cy="40" r={r}
        fill="none" stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="40" textAnchor="middle" dominantBaseline="central"
        fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="monospace">
        {value}
      </text>
    </svg>
  );
}

const formatMetric = (str) => {
  if (!str) return { value: "N/A", detail: "" };
  const parts = str.split(" (");
  if (parts.length > 1) {
    return {
      value: parts[0],
      detail: parts[1].replace(")", ""),
    };
  }
  return { value: str, detail: "" };
};

const getPillarDescription = (key) => {
  if (key === "decentralization") return "Measures how distributed network validation is, validator set size, hardware access barriers, and censorship resistance.";
  if (key === "security") return "Measures cost to attack consensus rules, finality guarantees, and economic security budgets.";
  if (key === "scalability") return "Measures transaction throughput capacity (TPS) and block propagation times under high load.";
  return "";
};

export default function TrilemmaScorecard({ algorithm }) {
  const radarData = [
    { subject: TOTAL.scalability, value: algorithm.score.scalability },
    { subject: TOTAL.security, value: algorithm.score.security },
    { subject: TOTAL.decentralization, value: algorithm.score.decentralization },
  ];

  const blockTime = formatMetric(algorithm.typicalBlockTime);
  const tps = formatMetric(algorithm.typicalTPS);

  return (
    <div className="flex flex-col gap-6">
      {/* Radar Chart Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Trilemma Scorecard</h3>
          <p className="text-[11px] text-white/40 mt-1 mb-4">
            Relative 0–100 scale per key pillar
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-2 overflow-hidden flex items-center justify-center">
          <div style={{ width: "100%", height: 180 }} className="flex items-center justify-center">
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="58%">
                <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 9, fontWeight: 500 }} />
                <Radar
                  dataKey="value"
                  stroke={algorithm.color}
                  fill={algorithm.color}
                  fillOpacity={0.08}
                  strokeWidth={1.5}
                  dot={{ fill: algorithm.color, r: 2.5, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ring Gauges Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-6">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-5">
          Pillar Distribution
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {PILLARS.map(({ key, label, iconName }) => {
            const val = algorithm.score[key];
            return (
              <div key={key} className="text-center">
                <div className="mb-2">
                  <PillarGauge value={val} color={algorithm.color} />
                </div>
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-[#888]">
                  <span className="opacity-70 flex items-center shrink-0" style={{ color: algorithm.color }}>
                    <IconByName name={iconName} size={11} />
                  </span>
                  <span>{label}</span>
                  <InfoTooltip text={getPillarDescription(key)} size={10} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Block Time Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5 flex flex-col justify-between min-h-[110px] hover:border-white/[0.15] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1">
              Block Time
              <InfoTooltip text="The average time interval required to produce, validate, and broadcast a new block to the network." size={10} />
            </span>
            <span style={{ color: `${algorithm.color}aa` }}>
              <Clock size={12} />
            </span>
          </div>
          <div className="mt-2.5 text-left">
            <p className="font-mono text-[16px] font-bold text-white tracking-tight leading-none">
              {blockTime.value}
            </p>
            {blockTime.detail && (
              <p className="text-[10px] text-white/40 font-medium mt-2 leading-tight truncate" title={blockTime.detail}>
                {blockTime.detail}
              </p>
            )}
          </div>
        </div>

        {/* Throughput Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#050505] p-5 flex flex-col justify-between min-h-[110px] hover:border-white/[0.15] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1">
              Throughput
              <InfoTooltip text="Transactions Per Second (TPS) representing the rate of processed and finalized network operations." size={10} />
            </span>
            <span style={{ color: `${algorithm.color}aa` }}>
              <Zap size={12} />
            </span>
          </div>
          <div className="mt-2.5 text-left">
            <p className="font-mono text-[16px] font-bold text-white tracking-tight leading-none">
              {tps.value}
            </p>
            {tps.detail && (
              <p className="text-[10px] text-white/40 font-medium mt-2 leading-tight truncate" title={tps.detail}>
                {tps.detail}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
