import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import { TOTAL, PILLARS } from "../data/constants";
import IconByName from "./IconByName";

export default function TrilemmaScorecard({ algorithm }) {
  const radarData = [
    { subject: TOTAL.scalability, value: algorithm.score.scalability },
    { subject: TOTAL.security, value: algorithm.score.security },
    { subject: TOTAL.decentralization, value: algorithm.score.decentralization },
  ];

  return (
    <div
      className="card-glass p-6 md:p-8"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Radar */}
        <div>
          <h3 className="font-display text-base font-semibold mb-1">Radar View</h3>
          <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
            Higher = stronger pillar, on a 0–100 scale.
          </p>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="78%">
                <PolarGrid stroke="#2A3140" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#8B93A7", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}
                />
                <Radar
                  dataKey="value"
                  stroke={algorithm.color}
                  fill={algorithm.color}
                  fillOpacity={0.25}
                  strokeWidth={2.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bars */}
        <div>
          <h3 className="font-display text-base font-semibold mb-1">Pillar Scores</h3>
          <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
            How {algorithm.shortName} balances the trilemma.
          </p>
          <div className="space-y-4">
            {PILLARS.map(({ key, label, iconName }) => {
              const val = algorithm.score[key];
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                    <span className="flex items-center gap-1.5 font-medium">
                      <IconByName name={iconName} size={12} /> {label}
                    </span>
                    <span className="font-mono font-semibold" style={{ color: "var(--text)" }}>
                      {val}
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>/100</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ background: algorithm.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        <StatBox label="Block Time" value={algorithm.typicalBlockTime} />
        <StatBox label="Throughput" value={algorithm.typicalTPS} />
        <StatBox label="Finality" value={algorithm.finalityType?.split(" ")[0] || "—"} />
        <StatBox label="Energy" value={algorithm.score.energyEfficiency != null ? `${algorithm.score.energyEfficiency}/100` : "—"} />
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      className="rounded-xl p-3.5 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="font-mono text-sm font-semibold mt-1">{value}</p>
    </div>
  );
}
