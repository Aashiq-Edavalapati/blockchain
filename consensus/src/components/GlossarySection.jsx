import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookText, ChevronDown, Lightbulb, Link2 } from "lucide-react";
import glossary from "../data/glossary";

export default function GlossarySection({ algorithm }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return glossary;
    const q = search.toLowerCase();
    return glossary.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.definition.toLowerCase().includes(q)
    );
  }, [search]);

  const toggleTerm = (term) => {
    setExpanded((prev) => (prev === term ? null : term));
  };

  const accentColor = algorithm ? algorithm.color : "#ffffff";

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-xl font-bold tracking-tight">Glossary</h3>
        <span
          className="text-xs px-2 py-0.5 rounded font-mono"
          style={{ background: `${accentColor}12`, color: accentColor }}
        >
          {glossary.length} terms
        </span>
      </div>
      <p className="text-[16px] mb-5" style={{ color: "var(--text-2)" }}>
        Key blockchain consensus terminology explained simply.
      </p>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg mb-5 max-w-md transition-colors"
        style={{
          background: "var(--surface-2)",
          border: `1px solid ${search ? "var(--border-2)" : "var(--border)"}`,
        }}
      >
        <Search size={13} style={{ color: "var(--text-3)" }} />
        <input
          type="text"
          placeholder="Search glossary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm w-full outline-none"
          style={{ color: "var(--text)" }}
          aria-label="Search glossary"
        />
      </div>

      {/* Terms */}
      <div className="space-y-1.5">
        {filtered.map((entry) => (
          <motion.div key={entry.term} layout>
            <button
              onClick={() => toggleTerm(entry.term)}
              className="w-full text-left rounded-lg p-4 transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: `1px solid ${expanded === entry.term ? `${accentColor}30` : "var(--border)"}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: expanded === entry.term ? `${accentColor}15` : "var(--surface-2)",
                    color: expanded === entry.term ? accentColor : "var(--text-3)",
                  }}
                >
                  <BookText size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[16px] font-semibold">{entry.term}</span>
                    <motion.div
                      animate={{ rotate: expanded === entry.term ? 0 : -90 }}
                      transition={{ duration: 0.15 }}
                      style={{ color: "var(--text-3)" }}
                    >
                      <ChevronDown size={13} />
                    </motion.div>
                  </div>
                  <p className="text-[15px] mt-1 leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {entry.definition}
                  </p>

                  <AnimatePresence>
                    {expanded === entry.term && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                          {entry.simpleExplanation && (
                            <div className="flex gap-2 mb-3">
                              <Lightbulb size={12} className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                              <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                                {entry.simpleExplanation}
                              </p>
                            </div>
                          )}

                          {entry.realWorldAnalogy && (
                            <div className="flex gap-2 mb-3">
                              <Lightbulb size={12} className="shrink-0 mt-0.5" style={{ color: "#5FD98A" }} />
                              <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                                <span style={{ color: "#5FD98A" }}>Analogy: </span>
                                {entry.realWorldAnalogy}
                              </p>
                            </div>
                          )}

                          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Link2 size={10} style={{ color: "var(--text-3)" }} />
                              {entry.relatedTerms.map((rt) => (
                                <span
                                  key={rt}
                                  className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                                  style={{ background: `${accentColor}10`, color: accentColor, border: `1px solid ${accentColor}18` }}
                                >
                                  {rt}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-xl p-8 text-center text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
            No terms match your search.
          </div>
        )}
      </div>
    </div>
  );
}
