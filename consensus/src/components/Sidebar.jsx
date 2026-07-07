import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Star, Layers } from "lucide-react";
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

  const isSearching = searchQuery.length > 0;

  const favoriteAlgorithms = useMemo(
    () => allAlgorithms.filter((a) => favorites.has(a.id)),
    [allAlgorithms, favorites]
  );

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen
        w-[260px] shrink-0 overflow-hidden
        flex flex-col
        transition-transform duration-300 ease-out
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            <Layers size={14} />
          </div>
          <span className="text-sm font-semibold tracking-tight">Consensus</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md transition-colors"
          style={{ color: "var(--text-3)" }}
          aria-label="Close sidebar"
        >
          <X size={15} />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2 shrink-0">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200"
          style={{
            background: searchQuery ? "var(--surface-2)" : "var(--surface-2)",
            border: `1px solid ${searchQuery ? "var(--border-2)" : "var(--border)"}`,
          }}
        >
          <Search size={13} style={{ color: "var(--text-3)" }} />
          <input
            type="text"
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-xs w-full outline-none"
            style={{ color: "var(--text)" }}
            aria-label="Search algorithms"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="p-0.5" style={{ color: "var(--text-3)" }}>
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Family filter chips */}
      <div className="px-3 pb-2 shrink-0 overflow-x-auto scrollbar-thin">
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => onFamilyChange(null)}
            className="text-[10px] font-medium px-2 py-1 rounded-lg transition-all duration-200 whitespace-nowrap"
            style={{
              background: !activeFamily ? "var(--accent)" : "var(--surface-2)",
              color: !activeFamily ? "#fff" : "var(--text-3)",
              border: `1px solid ${!activeFamily ? "transparent" : "var(--border)"}`,
            }}
          >
            All
          </button>
          {families.map((f) => (
            <button
              key={f.id}
              onClick={() => onFamilyChange(activeFamily === f.id ? null : f.id)}
              className="text-[10px] font-medium px-2 py-1 rounded-lg transition-all duration-200 whitespace-nowrap"
              style={{
                background: activeFamily === f.id ? "var(--accent)" : "var(--surface-2)",
                color: activeFamily === f.id ? "#fff" : "var(--text-3)",
                border: `1px solid ${activeFamily === f.id ? "transparent" : "var(--border)"}`,
              }}
            >
              {f.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable algorithm list */}
      <div className="flex-1 overflow-y-auto px-1 pb-4 scrollbar-thin">
        {/* Search results */}
        {isSearching && (
          <div className="px-2 py-2">
            <p className="text-[10px] font-medium mb-2" style={{ color: "var(--text-3)" }}>
              Results ({filteredAlgorithms.length})
            </p>
            <div className="space-y-0.5">
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
                <p className="text-xs py-4 text-center" style={{ color: "var(--text-3)" }}>
                  No matches.
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
              <div key={f.id} className="mb-0.5">
                <button
                  onClick={() => toggleFamily(f.id)}
                  className="flex items-center justify-between w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150"
                  style={{
                    color: hasActive ? "var(--accent)" : "var(--text-3)",
                  }}
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="truncate text-[11px]">{famInfo ? famInfo.name : f.id}</span>
                    <span className="text-[9px] opacity-50 shrink-0">{algos.length}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 0 : -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronDown size={11} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-0.5">
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
          <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium" style={{ color: "var(--text-3)" }}>
              <Star size={10} />
              Favorites
            </div>
            <div className="space-y-0.5">
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
        className="shrink-0 px-4 py-2 text-[9px] flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-3)" }}
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
      className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-xs transition-all duration-150 group"
      style={{
        background: isActive ? `${algorithm.color}10` : "transparent",
        color: isActive ? algorithm.color : "var(--text-2)",
      }}
    >
      <span
        className="w-5 h-5 rounded flex items-center justify-center shrink-0"
        style={{
          background: isActive ? `${algorithm.color}18` : "var(--surface-2)",
          color: isActive ? algorithm.color : "var(--text-3)",
        }}
      >
        <IconByName name={algorithm.id} size={10} />
      </span>
      <span className="truncate text-[11px] font-medium">{algorithm.shortName}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(algorithm.id);
        }}
        className="ml-auto shrink-0 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: isFavorite ? "#F59E0B" : "var(--text-3)" }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star size={9} fill={isFavorite ? "#F59E0B" : "none"} />
      </button>
    </button>
  );
}
