import { motion } from "framer-motion";
import { Layers, ArrowUpRight } from "lucide-react";
import { monogram } from "../utils/helpers";

export default function LayerClassification({ chains, algorithm }) {
  const l1 = chains.filter((c) => c.layer === "L1");
  const l2 = chains.filter((c) => c.layer === "L2");

  if (l1.length === 0 && l2.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-heading">Layer Distribution</h3>
        <span
          className="text-xs px-2.5 py-0.5 rounded-full font-mono"
          style={{ background: `${algorithm.color}15`, color: algorithm.color }}
        >
          L1 · L2
        </span>
      </div>
      <p className="section-sub mb-6">
        How {algorithm.shortName} chains are distributed across Layer 1 and Layer 2.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        <LayerGroup
          label="Layer 1"
          icon="L1"
          chains={l1}
          color="#5FD98A"
          algorithm={algorithm}
          description="Secures itself — base settlement layer"
        />
        <LayerGroup
          label="Layer 2"
          icon="L2"
          chains={l2}
          color="#E8B94C"
          algorithm={algorithm}
          description="Borrows security from an L1 below it"
        />
      </div>
    </div>
  );
}

function LayerGroup({ label, icon, chains, color, algorithm, description }) {
  return (
    <div
      className="card-glass p-5"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div>
          <p className="font-display text-sm font-semibold">{label}</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{description}</p>
        </div>
        <span
          className="ml-auto font-mono text-xs font-semibold shrink-0"
          style={{ color }}
        >
          {chains.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {chains.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-semibold shrink-0"
              style={{
                background: algorithm.color + "15",
                color: algorithm.color,
              }}
            >
              {monogram(c.name)}
            </div>
            <span className="truncate font-medium text-sm">{c.name}</span>
            <span className="font-mono text-[11px] ml-auto" style={{ color: "var(--muted)" }}>{c.symbol}</span>
          </motion.div>
        ))}
        {chains.length === 0 && (
          <p className="text-xs py-3 text-center" style={{ color: "var(--muted)" }}>
            No {icon} chains for {algorithm.shortName}
          </p>
        )}
      </div>
    </div>
  );
}
