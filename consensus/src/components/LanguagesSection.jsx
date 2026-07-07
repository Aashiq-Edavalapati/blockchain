import { Code2 } from "lucide-react";
import CryptoIcon from "./CryptoIcon";

export default function LanguagesSection({ chains, algorithm }) {
  const langMap = {};
  for (const c of chains) {
    const langs = c.lang.split(",").map((l) => l.trim());
    for (const l of langs) {
      if (!langMap[l]) langMap[l] = [];
      langMap[l].push(c);
    }
  }

  const entries = Object.entries(langMap).sort((a, b) => b[1].length - a[1].length);
  if (entries.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-zinc-900/60">
        <h3 className="text-sm font-bold text-white tracking-tight">Smart Contract client Languages</h3>
        <span
          className="text-[10px] font-bold font-mono px-2 py-0.5 rounded border"
          style={{
            background: `${algorithm.color}10`,
            borderColor: `${algorithm.color}25`,
            color: algorithm.color,
          }}
        >
          {entries.length} language{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([lang, chainList]) => {
          const shortLang = lang.length > 35 ? lang.slice(0, 33) + "…" : lang;
          return (
            <div
              key={lang}
              className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/40 hover:bg-[#0D0F14]/75 p-5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 border border-zinc-900/60"
                  style={{ color: algorithm.color }}
                >
                  <Code2 size={13} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-200 truncate" title={lang}>
                    {shortLang}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">
                    {chainList.length} client{chainList.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {chainList.map((c) => (
                  <CryptoIcon key={c.id} symbol={c.symbol} size={20} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
