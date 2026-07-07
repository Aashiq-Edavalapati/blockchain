import CryptoIcon from "./CryptoIcon";

export default function ChainMapping({ chains, algorithm }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-semibold tracking-tight">
          <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Chain Explorer
        </h3>
        <div className="flex items-center gap-2 text-[10px]" style={{ color: "var(--text-3)" }}>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm" style={{ background: algorithm.color }} />
            L1
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }} />
            L2
          </span>
        </div>
      </div>

      {chains.length === 0 ? (
        <div className="rounded-xl p-8 text-center text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
          No chains currently mapped for this algorithm.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chains.map((c) => (
            <div
              key={c.id}
              className="rounded-xl relative overflow-hidden"
              style={{
                background: "var(--surface)",
                border: `1px solid ${c.layer === "L1" ? `${algorithm.color}25` : "var(--border)"}`,
              }}
            >
              {/* Chain header with icon */}
              <div
                className="flex items-center gap-3 p-4 pb-3"
                style={{
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <CryptoIcon symbol={c.symbol} size={28} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate">{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[10px]" style={{ color: "var(--text-3)" }}>{c.symbol}</span>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded font-medium"
                      style={{
                        background: c.layer === "L1" ? `${algorithm.color}12` : "var(--surface-2)",
                        color: c.layer === "L1" ? algorithm.color : "var(--text-3)",
                        border: `1px solid ${c.layer === "L1" ? `${algorithm.color}25` : "var(--border)"}`,
                      }}
                    >
                      {c.layer}
                    </span>
                  </div>
                </div>
              </div>

              {/* Block data */}
              <div className="p-4 space-y-2.5">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--text-3)" }}>
                    Why {algorithm.shortName}
                  </p>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-2)" }}>
                    {c.why}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
                    Lang
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--surface-2)", color: "var(--text-2)" }}>
                    {c.lang}
                  </span>
                </div>
              </div>

              {/* Block footer - hex style */}
              <div
                className="px-4 py-2 text-[9px] font-mono flex items-center justify-between"
                style={{ background: "var(--surface-2)", borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
              >
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
