import CryptoIcon from "./CryptoIcon";
import InfoTooltip from "./InfoTooltip";

export default function LayerClassification({ chains, algorithm }) {
  const l1 = chains.filter((c) => c.layer === "L1");
  const l2 = chains.filter((c) => c.layer === "L2");

  if (l1.length === 0 && l2.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-zinc-900/60">
        <h3 className="text-sm font-bold text-white tracking-tight">Layer Distribution</h3>
        <span
          className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border"
          style={{
            background: `${algorithm.color}10`,
            borderColor: `${algorithm.color}25`,
            color: algorithm.color,
          }}
        >
          L1 · L2
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <LayerGroup
          label="Layer 1"
          icon="L1"
          chains={l1}
          color="#10B981"
          algorithm={algorithm}
          description="Base settlement layer — secures itself"
          tooltipText="Layer 1 (L1) is the core underlying blockchain architecture (e.g. Bitcoin, Ethereum, Solana) that processes, validates, and settles its own transactions independently."
        />
        <LayerGroup
          label="Layer 2"
          icon="L2"
          chains={l2}
          color="#F59E0B"
          algorithm={algorithm}
          description="Borrows security from an L1 below"
          tooltipText="Layer 2 (L2) consists of secondary frameworks or protocols built on top of an L1 (e.g. Lightning Network, Arbitrum) to increase throughput and reduce fees by execution off-chain."
        />
      </div>
    </section>
  );
}

function LayerGroup({ label, icon, chains, color, algorithm, description, tooltipText }) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col justify-between"
      style={{
        background: "rgba(13, 15, 20, 0.4)",
        borderColor: `${color}20`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8.5 h-8.5 rounded-xl flex items-center justify-center font-mono text-xs font-bold border"
          style={{
            background: `${color}10`,
            color,
            borderColor: `${color}25`,
          }}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-bold text-zinc-100">{label}</p>
            <InfoTooltip text={tooltipText} size={11} />
          </div>
          <p className="text-[10px] text-zinc-555 mt-0.5">{description}</p>
        </div>
        <span className="ml-auto font-mono text-xs font-bold" style={{ color }}>
          {chains.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {chains.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs border border-zinc-900/50 bg-zinc-950/20"
          >
            <CryptoIcon symbol={c.symbol} size={18} />
            <span className="truncate text-zinc-300 font-medium">{c.name}</span>
            <span className="font-mono text-[10px] ml-auto text-zinc-550">{c.symbol}</span>
          </div>
        ))}
        {chains.length === 0 && (
          <p className="text-xs py-5 text-center text-zinc-500 font-medium">
            No {icon} chains mapped for {algorithm.shortName}
          </p>
        )}
      </div>
    </div>
  );
}
