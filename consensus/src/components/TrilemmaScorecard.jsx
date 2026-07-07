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
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
      <motion.circle
        cx="40" cy="40" r={r}
        fill="none" stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 40 40)"
      />
      <text x="40" y="40" textAnchor="middle" dominantBaseline="central"
        fill="var(--text)" fontSize="16" fontWeight="600" fontFamily="'JetBrains Mono', monospace">
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
    <div className="flex flex-col gap-5">
      {/* Radar chart */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h3 className="font-semibold tracking-tight mb-1">Trilemma Scorecard</h3>
        <p className="text-xs mb-4" style={{ color: "var(--text-2)" }}>
          Relative 0–100 scale per pillar
        </p>
        <div className="rounded-lg" style={{ background: "var(--surface-2)" }}>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="68%">
                <PolarGrid stroke="#2A3144" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#8B93A7", fontSize: 11 }} />
                <Radar
                  dataKey="value"
                  stroke={algorithm.color}
                  fill={algorithm.color}
                  fillOpacity={0.12}
                  strokeWidth={2}
                  dot={{ fill: algorithm.color, r: 3, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gauge indicators */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="grid grid-cols-3 gap-2">
          {PILLARS.map(({ key, label, iconName }) => {
            const val = algorithm.score[key];
            return (
              <div key={key} className="text-center">
                <div className="flex justify-center mb-1">
                  <PillarGauge value={val} color={algorithm.color} />
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] font-medium" style={{ color: "var(--text-3)" }}>
                  <IconByName name={iconName} size={10} /> {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats tiles */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${algorithm.color}08, transparent)`,
            border: `1px solid ${algorithm.color}20`,
          }}
        >
          <p className="text-[9px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: "var(--text-3)" }}>
            Block Time
          </p>
          <p className="font-mono text-lg font-bold" style={{ color: algorithm.color }}>
            {algorithm.typicalBlockTime}
          </p>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: `linear-gradient(135deg, ${algorithm.color}08, transparent)`,
            border: `1px solid ${algorithm.color}20`,
          }}
        >
          <p className="text-[9px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: "var(--text-3)" }}>
            Throughput
          </p>
          <p className="font-mono text-lg font-bold" style={{ color: algorithm.color }}>
            {algorithm.typicalTPS}
          </p>
        </div>
      </div>
    </div>
  );
}
