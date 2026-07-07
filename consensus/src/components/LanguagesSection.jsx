import { Code2 } from "lucide-react";

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
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-base font-semibold tracking-tight">Smart Contract Languages</h3>
        <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ background: `${algorithm.color}12`, color: algorithm.color }}>
          {entries.length} language{entries.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entries.map(([lang, chainList]) => {
          const shortLang = lang.length > 35 ? lang.slice(0, 33) + "…" : lang;
          return (
            <div
              key={lang}
              className="rounded-xl p-4"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${algorithm.color}12`, color: algorithm.color }}
                >
                  <Code2 size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" title={lang}>{shortLang}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "var(--text-3)" }}>
                    {chainList.length} chain{chainList.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {chainList.map((c) => (
                  <span
                    key={c.id}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-3)" }}
                  >
                    {c.symbol}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
