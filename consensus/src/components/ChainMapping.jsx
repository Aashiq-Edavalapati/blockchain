import CryptoIcon from "./CryptoIcon";
import LanguageIcon, { extractLanguages } from "./LanguageIcon";
import InfoTooltip from "./InfoTooltip";

export default function ChainMapping({ chains, algorithm }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/[0.06]">
        <h3 className="text-sm font-bold text-white tracking-tight">
          <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Mapped Blockchains
        </h3>
        <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: algorithm.color }} />
            Layer 1
            <InfoTooltip text="Layer 1 (L1) refers to the base settlement layer of a blockchain network. L1 chains validate and finalize their own transactions." />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            Layer 2
            <InfoTooltip text="Layer 2 (L2) refers to scaling protocols built on top of an L1, inheriting its underlying security guarantees." />
          </span>
        </div>
      </div>

      {chains.length === 0 ? (
        <div className="rounded-2xl p-8 text-center text-xs border border-white/[0.08] bg-[#050505] text-white/40">
          No blockchains currently mapped to {algorithm.shortName} in this database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chains.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl relative flex flex-col justify-between border bg-[#050505] hover:bg-[#020202] transition-all duration-300"
              style={{
                borderColor: c.layer === "L1" ? `${algorithm.color}25` : "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Card Header (with rounded-t-2xl to prevent clipping without overflow-hidden) */}
              <div className="flex items-center gap-3.5 p-4 border-b border-white/[0.06] bg-white/[0.01] rounded-t-2xl">
                <div className="shrink-0 bg-white/[0.02] p-1 rounded-xl border border-white/[0.08]">
                  <CryptoIcon symbol={c.symbol} size={26} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{c.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[9px] font-bold text-white/40">{c.symbol}</span>
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 rounded bg-white/[0.02] border"
                      style={{
                        borderColor: c.layer === "L1" ? `${algorithm.color}20` : "rgba(255, 255, 255, 0.08)",
                        color: c.layer === "L1" ? algorithm.color : "rgba(255, 255, 255, 0.4)",
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
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                    Rationale
                  </p>
                  <p className="text-xs leading-relaxed text-[#888] line-clamp-3">
                    {c.why}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 shrink-0">
                    Smart Contract Client
                  </span>
                  <div className="flex items-center gap-1.5 overflow-hidden flex-wrap">
                    {extractLanguages(c.lang).map((langObj) => {
                      return (
                        <div key={langObj.name} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.08] text-white/70 text-[9px] font-bold font-mono whitespace-nowrap">
                          {langObj.id && (
                            <span style={{ color: algorithm.color }}>
                              <LanguageIcon name={langObj.id} size={11} />
                            </span>
                          )}
                          <span>{langObj.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer (with rounded-b-2xl to prevent clipping without overflow-hidden) */}
              <div className="px-4 py-2 border-t border-white/[0.06] bg-[#020202] text-[9px] font-mono flex items-center justify-between text-white/40 rounded-b-2xl">
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
