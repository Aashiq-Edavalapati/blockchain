import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, ChevronDown, Star, Layers, Bookmark,
} from "lucide-react";
import IconByName from "./IconByName";

export default function Sidebar({
  open,
  onClose,
  algorithms: filteredAlgorithms,
  allAlgorithms,
  activeId,
  onSelect,
  searchQuery,
  onSearchChange,
  activeFamily,
  onFamilyChange,
  families,
  familyNameToId,
  familyAlgorithms,
  familyData,
  favorites,
  onToggleFavorite,
}) {
  const [expandedFamilies, setExpandedFamilies] = useState(() => {
    const initial = new Set(families.map((f) => f.id));
    return initial;
  });

  const toggleFamily = (id) => {
    setExpandedFamilies((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const familyCounts = useMemo(() => {
    const counts = {};
    for (const [id, algos] of Object.entries(familyAlgorithms)) {
      counts[id] = algos.length;
    }
    return counts;
  }, [familyAlgorithms]);

  const isSearching = searchQuery.length > 0;

  const favoriteAlgorithms = useMemo(
    () => allAlgorithms.filter((a) => favorites.has(a.id)),
    [allAlgorithms, favorites]
  );

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen
        w-[280px] shrink-0 overflow-hidden
        flex flex-col
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      style={{
        background: "rgba(12, 15, 22, 0.92)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <Layers size={14} />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight">Consensus</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md transition-colors"
          style={{ color: "var(--muted)" }}
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-200"
          style={{
            background: searchQuery ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${searchQuery ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
          }}
        >
          <Search size={14} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm w-full outline-none placeholder:text-[#5A6275]"
            style={{ color: "var(--text)" }}
            aria-label="Search algorithms"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="p-0.5" style={{ color: "var(--muted)" }}>
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Family filter chips */}
      <div className="px-4 pb-3 shrink-0 overflow-x-auto scrollbar-thin">
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => onFamilyChange(null)}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 whitespace-nowrap"
            style={{
              background: !activeFamily ? "var(--accent)" : "rgba(255,255,255,0.05)",
              color: !activeFamily ? "#fff" : "var(--muted)",
              border: `1px solid ${!activeFamily ? "transparent" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            All
          </button>
          {families.map((f) => (
            <button
              key={f.id}
              onClick={() => onFamilyChange(activeFamily === f.id ? null : f.id)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-200 whitespace-nowrap"
              style={{
                background: activeFamily === f.id ? "var(--accent)" : "rgba(255,255,255,0.05)",
                color: activeFamily === f.id ? "#fff" : "var(--muted)",
                border: `1px solid ${activeFamily === f.id ? "transparent" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {f.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable algorithm list */}
      <div className="flex-1 overflow-y-auto sidebar-scroll px-2 pb-4">
        {/* Search results */}
        {isSearching && (
          <div className="px-3 py-2">
            <p className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>
              Results ({filteredAlgorithms.length})
            </p>
            <div className="mt-2 space-y-0.5">
              {filteredAlgorithms.map((a) => (
                <AlgorithmItem
                  key={a.id}
                  algorithm={a}
                  isActive={a.id === activeId}
                  isFavorite={favorites.has(a.id)}
                  onSelect={onSelect}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
              {filteredAlgorithms.length === 0 && (
                <p className="text-xs py-4 text-center" style={{ color: "var(--muted)" }}>
                  No algorithms match your search.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Family groups */}
        {!isSearching &&
          families.map((f) => {
            const algos = familyAlgorithms[f.id] || [];
            if (algos.length === 0) return null;
            const isExpanded = expandedFamilies.has(f.id);
            const hasActive = algos.some((a) => a.id === activeId);
            const famInfo = familyData[f.id];

            return (
              <div key={f.id} className="mb-1">
                <button
                  onClick={() => toggleFamily(f.id)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-150"
                  style={{
                    color: hasActive ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="truncate">{famInfo ? famInfo.name : f.id}</span>
                    <span className="text-[10px] opacity-50 shrink-0">{algos.length}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 0 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={12} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5 pl-2 pr-1 pb-1">
                        {algos.map((a) => (
                          <AlgorithmItem
                            key={a.id}
                            algorithm={a}
                            isActive={a.id === activeId}
                            isFavorite={favorites.has(a.id)}
                            onSelect={onSelect}
                            onToggleFavorite={onToggleFavorite}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

        {/* Favorites */}
        {favoriteAlgorithms.length > 0 && !isSearching && (
          <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium" style={{ color: "var(--muted)" }}>
              <Star size={11} />
              Favorites
            </div>
            <div className="space-y-0.5 pl-2">
              {favoriteAlgorithms.map((a) => (
                <AlgorithmItem
                  key={a.id}
                  algorithm={a}
                  isActive={a.id === activeId}
                  isFavorite={true}
                  onSelect={onSelect}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom stats */}
      <div
        className="shrink-0 px-5 py-3 text-[10px] flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "var(--muted)" }}
      >
        <span>{allAlgorithms.length} algorithms</span>
        <span>{families.length} families</span>
      </div>
    </aside>
  );
}

function AlgorithmItem({ algorithm, isActive, isFavorite, onSelect, onToggleFavorite }) {
  return (
    <button
      onClick={() => onSelect(algorithm.id)}
      className="sidebar-item flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm transition-all duration-150 group"
      style={{
        background: isActive ? `${algorithm.color}15` : "transparent",
        color: isActive ? algorithm.color : "var(--text)",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      <span
        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: isActive ? `${algorithm.color}22` : "rgba(255,255,255,0.05)",
          color: isActive ? algorithm.color : "var(--muted)",
        }}
      >
        <IconByName name={algorithm.iconName} size={12} />
      </span>
      <span className="truncate text-[13px] font-medium">{algorithm.shortName}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(algorithm.id);
        }}
        className="ml-auto shrink-0 p-0.5 rounded transition-opacity duration-150 opacity-0 group-hover:opacity-100"
        style={{ color: isFavorite ? "#F59E0B" : "var(--muted)" }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star size={11} fill={isFavorite ? "#F59E0B" : "none"} />
      </button>
    </button>
  );
}
