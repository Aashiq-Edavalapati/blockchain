import { monogram } from "../utils/helpers";

export default function LayerClassification({ chains, algorithm }) {
  const l1 = chains.filter((c) => c.layer === "L1");
  const l2 = chains.filter((c) => c.layer === "L2");

  if (l1.length === 0 && l2.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-base font-semibold tracking-tight">Layer Distribution</h3>
        <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: `${algorithm.color}12`, color: algorithm.color }}>
          L1 · L2
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <LayerGroup label="Layer 1" icon="L1" chains={l1} color="#5FD98A" algorithm={algorithm} description="Base settlement layer — secures itself" />
        <LayerGroup label="Layer 2" icon="L2" chains={l2} color="#E8B94C" algorithm={algorithm} description="Borrows security from an L1 below" />
      </div>
    </section>
  );
}

function LayerGroup({ label, icon, chains, color, algorithm, description }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--surface)", border: `1px solid ${color}25` }}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-[10px]" style={{ color: "var(--text-3)" }}>{description}</p>
        </div>
        <span className="ml-auto font-mono text-sm font-bold" style={{ color }}>{chains.length}</span>
      </div>
      <div className="space-y-1">
        {chains.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm"
            style={{ background: "var(--surface-2)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] font-semibold shrink-0"
              style={{ background: `${algorithm.color}12`, color: algorithm.color }}
            >
              {monogram(c.name)}
            </div>
            <span className="truncate text-xs font-medium">{c.name}</span>
            <span className="font-mono text-[10px] ml-auto" style={{ color: "var(--text-3)" }}>{c.symbol}</span>
          </div>
        ))}
        {chains.length === 0 && (
          <p className="text-xs py-3 text-center" style={{ color: "var(--text-3)" }}>
            No {icon} chains for {algorithm.shortName}
          </p>
        )}
      </div>
    </div>
  );
}
