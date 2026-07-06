import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
} from "recharts";
import { TOTAL, PILLARS } from "../data/constants";
import IconByName from "./IconByName";

export default function TrilemmaScorecard({ algorithm }) {
  const radarData = [
    { subject: TOTAL.scalability, value: algorithm.trilemma.scalability },
    { subject: TOTAL.security, value: algorithm.trilemma.security },
    { subject: TOTAL.decentralization, value: algorithm.trilemma.decentralization },
  ];

  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h3 className="font-display text-base font-semibold mb-1">Trilemma Scorecard</h3>
      <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
        Higher reach = stronger pillar, on a 0–100 relative scale.
      </p>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="#2A3140" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#8B93A7", fontSize: 11 }} />
            <Radar dataKey="value" stroke={algorithm.color} fill={algorithm.color} fillOpacity={0.35} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3 mt-2">
        {PILLARS.map(({ key, label, iconName }) => {
          const val = algorithm.trilemma[key];
          return (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
                <span className="flex items-center gap-1.5"><IconByName name={iconName} size={12} /> {label}</span>
                <span className="font-mono">{val}/100</span>
              </div>
              <div className="h-1.5 rounded-full w-full" style={{ background: "var(--surface-2)" }}>
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: algorithm.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Block time</p>
          <p className="font-mono text-sm mt-1">{algorithm.stats.blockTime}</p>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--muted)" }}>Throughput</p>
          <p className="font-mono text-sm mt-1">{algorithm.stats.tps}</p>
        </div>
      </div>
    </div>
  );
}
