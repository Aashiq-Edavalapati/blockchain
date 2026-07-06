import { motion } from "framer-motion";
import { Code2, Monitor } from "lucide-react";
import { monogram } from "../utils/helpers";

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
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-heading">Smart Contract Languages</h3>
        <span
          className="text-xs px-2.5 py-0.5 rounded-full font-mono"
          style={{ background: `${algorithm.color}15`, color: algorithm.color }}
        >
          {entries.length} language{entries.length !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="section-sub mb-6">
        Programming languages used to write smart contracts on {algorithm.shortName} chains.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map(([lang, chainList], i) => {
          const shortLang = lang.length > 40 ? lang.slice(0, 38) + "…" : lang;
          return (
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card-glass p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${algorithm.color}15`, color: algorithm.color }}
                >
                  <Code2 size={15} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" title={lang}>{shortLang}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                    {chainList.length} chain{chainList.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {chainList.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {c.symbol}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
