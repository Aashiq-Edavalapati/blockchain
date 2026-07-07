import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import { TOTAL, PILLARS } from "../data/constants";
import IconByName from "./IconByName";

function PillarGauge({ value, color }) {
  const r = 32;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <svg width="76" height="76" viewBox="0 0 80 80" className="mx-auto">
      {/* Background ring */}
      <circle cx="40" cy="40" r={r} fill="none" stroke="#1A1D26" strokeWidth="5.5" />
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
        fill="#F4F4F7" fontSize="15" fontWeight="700" fontFamily="monospace">
        {value}
      </text>
    </svg>
  );
}

export default function TrilemmaScorecard({ algorithm }) {
  const radarData = [
    { subject: TOTAL.scalability, value: algorithm.score.scalability },
    { subject: TOTAL.security, value: algorithm.score.security },
    { subject: TOTAL.decentralization, value: algorithm.score.decentralization },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Radar Chart Card */}
      <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Trilemma Scorecard</h3>
          <p className="text-[11px] text-zinc-500 mt-1 mb-4">
            Relative 0–100 scale per key pillar
          </p>
        </div>
        <div className="rounded-xl border border-zinc-900 bg-zinc-950/30 p-2 overflow-hidden flex items-center justify-center">
          <div style={{ width: "100%", height: 180 }} className="flex items-center justify-center">
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="#262B37" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#A0A5B5", fontSize: 10, fontWeight: 500 }} />
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
      <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-6">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-5">
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
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-zinc-400">
                  <span className="opacity-70 flex items-center shrink-0" style={{ color: algorithm.color }}>
                    <IconByName name={iconName} size={11} />
                  </span>
                  <span>{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-5 text-center flex flex-col justify-center min-h-[90px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Block Time
          </p>
          <p className="font-mono text-[13px] font-semibold text-zinc-200 leading-snug">
            {algorithm.typicalBlockTime}
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/60 p-5 text-center flex flex-col justify-center min-h-[90px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Throughput
          </p>
          <p className="font-mono text-[13px] font-semibold text-zinc-200 leading-snug">
            {algorithm.typicalTPS}
          </p>
        </div>
      </div>
    </div>
  );
}
