import LanguageIcon, { extractLanguages } from "./LanguageIcon";
import CryptoIcon from "./CryptoIcon";

export default function LanguagesSection({ chains, algorithm }) {
  const langMap = {};
  for (const c of chains) {
    const parsed = extractLanguages(c.lang);
    for (const l of parsed) {
      const key = l.name;
      if (!langMap[key]) {
        langMap[key] = {
          iconId: l.id,
          chainList: [],
        };
      }
      if (!langMap[key].chainList.some((item) => item.id === c.id)) {
        langMap[key].chainList.push(c);
      }
    }
  }

  const entries = Object.entries(langMap).sort((a, b) => b[1].chainList.length - a[1].chainList.length);
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
        {entries.map(([langName, data]) => {
          const shortLang = langName.length > 35 ? langName.slice(0, 33) + "…" : langName;
          return (
            <div
              key={langName}
              className="rounded-2xl border border-zinc-900/50 bg-[#0D0F14]/40 hover:bg-[#0D0F14]/75 p-5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 border border-zinc-900/60 bg-zinc-900/40"
                  style={{ color: algorithm.color }}
                >
                  {data.iconId ? (
                    <LanguageIcon name={data.iconId} size={15} />
                  ) : (
                    <LanguageIcon name="" size={15} />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-200 truncate" title={langName}>
                    {shortLang}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">
                    {data.chainList.length} client{data.chainList.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {data.chainList.map((c) => (
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
