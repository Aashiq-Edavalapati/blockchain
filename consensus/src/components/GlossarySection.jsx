import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookText, ChevronDown, Lightbulb, Link2 } from "lucide-react";
import glossary from "../data/glossary";

export default function GlossarySection() {
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

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-heading">Glossary</h3>
        <span
          className="text-xs px-2.5 py-0.5 rounded-full font-mono"
          style={{ background: "rgba(139, 147, 255, 0.15)", color: "#8B93FF" }}
        >
          {glossary.length} terms
        </span>
      </div>
      <p className="section-sub mb-6">
        Key blockchain consensus terminology explained simply.
      </p>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-6 max-w-md transition-colors"
        style={{
          background: search ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${search ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <Search size={14} style={{ color: "var(--muted)" }} />
        <input
          type="text"
          placeholder="Search glossary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm w-full outline-none placeholder:text-[#5A6275]"
          style={{ color: "var(--text)" }}
          aria-label="Search glossary"
        />
      </div>

      {/* Terms */}
      <div className="space-y-2">
        {filtered.map((entry, i) => (
          <motion.div
            key={entry.term}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.015 }}
          >
            <button
              onClick={() => toggleTerm(entry.term)}
              className="card-glass w-full text-left p-4 transition-all duration-200"
              style={{
                borderColor: expanded === entry.term ? "rgba(139, 147, 255, 0.2)" : "rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: expanded === entry.term ? "rgba(139, 147, 255, 0.15)" : "rgba(255,255,255,0.04)",
                    color: expanded === entry.term ? "#8B93FF" : "var(--muted)",
                  }}
                >
                  <BookText size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold">{entry.term}</span>
                    <motion.div
                      animate={{ rotate: expanded === entry.term ? 0 : -90 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "var(--muted)" }}
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
                    {entry.definition}
                  </p>

                  <AnimatePresence>
                    {expanded === entry.term && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          {/* Simple explanation */}
                          {entry.simpleExplanation && (
                            <div className="flex gap-2 mb-3">
                              <Lightbulb size={13} className="shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
                              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                                {entry.simpleExplanation}
                              </p>
                            </div>
                          )}

                          {/* Analogy */}
                          {entry.realWorldAnalogy && (
                            <div className="flex gap-2 mb-3">
                              <Lightbulb size={13} className="shrink-0 mt-0.5" style={{ color: "#5FD98A" }} />
                              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                                <span style={{ color: "#5FD98A" }}>Analogy: </span>
                                {entry.realWorldAnalogy}
                              </p>
                            </div>
                          )}

                          {/* Related terms */}
                          {entry.relatedTerms && entry.relatedTerms.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Link2 size={11} style={{ color: "var(--muted)" }} />
                              {entry.relatedTerms.map((rt) => (
                                <span
                                  key={rt}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                                  style={{
                                    background: "rgba(139, 147, 255, 0.1)",
                                    color: "#8B93FF",
                                    border: "1px solid rgba(139, 147, 255, 0.15)",
                                  }}
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
          <div className="card-glass p-8 text-center text-sm" style={{ color: "var(--muted)" }}>
            No terms match your search.
          </div>
        )}
      </div>
    </div>
  );
}
