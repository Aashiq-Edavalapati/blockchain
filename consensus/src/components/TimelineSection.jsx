import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BookOpen, Rocket, Award, FlaskConical, Search } from "lucide-react";
import timeline from "../data/timeline";

const categoryIcons = {
  Foundation: BookOpen,
  Academic: FlaskConical,
  Innovation: Award,
  Launch: Rocket,
};

const categoryColors = {
  Foundation: "#10B981", // Green
  Academic: "#3B82F6",   // Blue
  Innovation: "#F59E0B", // Amber
  Launch: "#EF4444",     // Red
};

const categories = ["All", "Foundation", "Academic", "Innovation", "Launch"];

function SectionEyebrow({ label }) {
  const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
  
  return (
    <div className="inline-flex items-center gap-3 text-[12px] font-medium tracking-widest uppercase text-white/40 mb-8" style={{ fontFamily: FONT_MONO }}>
      <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-white/40" />
      {label}
    </div>
  );
}

export default function TimelineSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTimeline = timeline.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase()) ||
      event.date.includes(search);
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1360px] mx-auto px-6 py-24 border-t border-white/[0.06] bg-[#000000] relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Header text */}
      <div className="text-center md:text-left mb-16">
        <SectionEyebrow label="Protocol Evolution" />
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
          Historical Roadmap of Consensus
        </h2>
        <p className="text-xs md:text-sm text-zinc-500 max-w-xl leading-relaxed">
          Tracing the critical milestones, academic breakthroughs, and production deployments that shaped the distributed ledger landscape from 1997 to the modern era.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/[0.06] pb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? timeline.length
                : timeline.filter((e) => e.category === cat).length;
            const isSelected = selectedCategory === cat;
            const catColor = categoryColors[cat] || "#8B93A7";

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white text-black border-white font-bold"
                    : "bg-transparent text-zinc-500 border-white/[0.06] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? "bg-black/10 text-black" : "bg-white/[0.04] text-zinc-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search milestones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/25 focus:border-white/30 text-white rounded-xl py-2 px-10 text-xs focus:outline-none placeholder-zinc-600 transition-all font-mono"
          />
        </div>
      </div>

      {/* Timeline Tree representation */}
      {filteredTimeline.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-dashed border-white/[0.06] bg-white/[0.01]">
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">No milestones match your search</p>
        </div>
      ) : (
        <div className="relative pl-10 md:pl-12 border-l border-white/[0.06] ml-4 md:ml-6 space-y-12">
          {/* Vertical progress bar indicator */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

          {filteredTimeline.map((event, i) => {
            const Icon = categoryIcons[event.category] || Clock;
            const catColor = categoryColors[event.category] || "#8B93A7";

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.25) }}
                className="relative group"
              >
                {/* Timeline node dot */}
                <div
                  className="absolute -left-[53px] md:-left-[57px] top-1.5 w-7 h-7 rounded-lg border flex items-center justify-center bg-black transition-all duration-300 z-10 group-hover:scale-110"
                  style={{
                    borderColor: catColor,
                    boxShadow: `0 0 10px ${catColor}20`,
                    color: catColor,
                  }}
                >
                  <Icon size={13} strokeWidth={2} />
                </div>

                {/* Milestone Details Card */}
                <div className="rounded-3xl border border-white/[0.06] bg-[#050505] p-6 transition-all duration-300 hover:border-white/10 hover:bg-[#070707]">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        {/* Year Badge */}
                        <span
                          className="px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-widest"
                          style={{
                            background: `${catColor}12`,
                            color: catColor,
                            border: `1px solid ${catColor}20`,
                          }}
                        >
                          {event.date}
                        </span>

                        {/* Category Label */}
                        <span
                          className="text-[9px] uppercase tracking-[0.15em] font-mono text-zinc-500"
                        >
                          {event.category}
                        </span>
                      </div>

                      <h3 className="text-[17px] font-semibold text-white group-hover:text-white/95 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-zinc-500 leading-relaxed max-w-4xl">
                        {event.description}
                      </p>

                      {/* Expandable Why It Matters section */}
                      <details className="group/why mt-4 select-none">
                        <summary className="list-none flex items-center gap-1.5 cursor-pointer text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors focus:outline-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover/why:bg-white transition-colors" />
                          Why it matters
                        </summary>
                        <div className="mt-3 text-xs leading-relaxed text-zinc-400 border border-white/[0.04] bg-[#020202] rounded-2xl p-5 relative overflow-hidden">
                          {/* Muted background category glow inside accordion */}
                          <div className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-3xl pointer-events-none opacity-20" style={{ background: catColor }} />
                          <p className="relative z-10 leading-relaxed font-sans text-zinc-400">
                            {event.importance}
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
