import CryptoIcon from "./CryptoIcon";

export default function ChainMapping({ chains, algorithm }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-zinc-900/60">
        <h3 className="text-sm font-bold text-white tracking-tight">
          <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Mapped Blockchains
        </h3>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-zinc-550">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: algorithm.color }} />
            Layer 1
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            Layer 2
          </span>
        </div>
      </div>

      {chains.length === 0 ? (
        <div className="rounded-2xl p-8 text-center text-xs border border-zinc-900/50 bg-[#0D0F14]/60 text-zinc-500">
          No blockchains currently mapped to {algorithm.shortName} in this database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chains.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl relative overflow-hidden flex flex-col justify-between border bg-[#0D0F14]/40 hover:bg-[#0D0F14]/80 transition-all duration-300"
              style={{
                borderColor: c.layer === "L1" ? `${algorithm.color}25` : "var(--border)",
              }}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3.5 p-4 border-b border-zinc-900/50 bg-[#0D0F14]/20">
                <div className="shrink-0 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800/40">
                  <CryptoIcon symbol={c.symbol} size={26} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-100 truncate">{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[9px] font-bold text-zinc-500">{c.symbol}</span>
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 rounded bg-zinc-900/50 border"
                      style={{
                        borderColor: c.layer === "L1" ? `${algorithm.color}20` : "var(--border)",
                        color: c.layer === "L1" ? algorithm.color : "var(--text-3)",
                      }}
                    >
                      {c.layer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-550 mb-1.5">
                    Rationale
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                    {c.why}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">
                    Smart Contract Client
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900/60 border border-zinc-900/60 text-zinc-350 truncate">
                    {c.lang}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-2 border-t border-zinc-900/50 bg-[#0A0C10]/40 text-[9px] font-mono flex items-center justify-between text-zinc-650">
                <span>#{c.id.toUpperCase().slice(0, 8)}</span>
                <span>{c.symbol}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
