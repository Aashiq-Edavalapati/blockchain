import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Check, X, Filter } from "lucide-react";

export default function SearchFilterCard({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  advancedFilters,
  onAdvancedFilterChange,
}) {
  const inputRef = useRef(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // CMD + K / CTRL + K keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const clearSearch = () => {
    onSearchChange("");
    inputRef.current?.focus();
  };

  const handleFilterClick = (filterId) => {
    if (filterId === "more") {
      setShowAdvanced(!showAdvanced);
    } else {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Centered Obsidian Search & Filter Card */}
      <div className="relative rounded-2xl border border-zinc-800/80 bg-[#0B0D12]/90 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-zinc-700/60">
        
        {/* Search Input Row */}
        <div className="relative flex items-center px-4 py-2.5 border-b border-zinc-800/60">
          <Search size={18} className="text-zinc-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search, filter, or explore algorithms... (CMD + K)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills Row */}
        <div className="flex items-center gap-1.5 px-4 py-2 overflow-x-auto scrollbar-none whitespace-nowrap">
          {/* All Families */}
          <button
            onClick={() => handleFilterClick("all")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "all"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeFilter === "all" ? "bg-emerald-400" : "bg-zinc-600"}`} />
            All Families
          </button>

          {/* PoW */}
          <button
            onClick={() => handleFilterClick("pow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "pow"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            PoW
          </button>

          {/* PoS (all variants) */}
          <button
            onClick={() => handleFilterClick("pos")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "pos"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            PoS (all variants)
          </button>

          {/* DAG-based */}
          <button
            onClick={() => handleFilterClick("dag")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "dag"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            DAG-based
          </button>

          {/* BFT Families */}
          <button
            onClick={() => handleFilterClick("bft")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "bft"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            BFT Families
          </button>

          {/* L1 vs L2 */}
          <button
            onClick={() => handleFilterClick("l1l2")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              activeFilter === "l1l2"
                ? "bg-zinc-800/90 text-white border-zinc-700/60"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            L1 vs L2
          </button>

          {/* Divider */}
          <span className="w-[1px] h-4 bg-zinc-800 mx-1 shrink-0" />

          {/* More Filters */}
          <button
            onClick={() => handleFilterClick("more")}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer border ${
              showAdvanced
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/40"
            }`}
          >
            <Filter size={12} className="mr-0.5" />
            More Filters
            <ChevronDown size={12} className={`transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Advanced Filters Expandable Drawer */}
        {showAdvanced && (
          <div className="px-4 py-3 bg-[#090b0e] border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
            {/* Permission Type */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Permission Mode</span>
              <div className="flex gap-1.5 mt-1.5">
                {["all", "permissionless", "permissioned"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => onAdvancedFilterChange("permission", mode)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border capitalize transition-all duration-150 cursor-pointer ${
                      advancedFilters.permission === mode
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Finality Type */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Finality Type</span>
              <div className="flex gap-1.5 mt-1.5">
                {["all", "probabilistic", "deterministic"].map((type) => (
                  <button
                    key={type}
                    onClick={() => onAdvancedFilterChange("finality", type)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border capitalize transition-all duration-150 cursor-pointer ${
                      advancedFilters.finality === type
                        ? "bg-zinc-800 text-white border-zinc-700"
                        : "bg-zinc-900/40 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
