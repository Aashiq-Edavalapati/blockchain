import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Award, Grid } from "lucide-react";

import algorithms from "./data/algorithms/index.js";
import chains from "./data/chains";
import familiesData from "./data/families";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchFilterCard from "./components/SearchFilterCard";
import IconByName from "./components/IconByName";
import CryptoIcon from "./components/CryptoIcon";
import AlgorithmOverview from "./components/AlgorithmOverview";
import TrilemmaScorecard from "./components/TrilemmaScorecard";
import HowItWorks from "./components/HowItWorks";
import ChainMapping from "./components/ChainMapping";
import LanguagesSection from "./components/LanguagesSection";
import LayerClassification from "./components/LayerClassification";
import CompatibilityMatrix from "./components/CompatibilityMatrix";
import CompareSection from "./components/CompareSection";
import GlossarySection from "./components/GlossarySection";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "How It Works" },
  { id: "chains", label: "Chains" },
  { id: "compatibility", label: "Compatibility" },
  { id: "compare", label: "Compare" },
  { id: "reference", label: "Reference" },
];

// Simple, robust SPA routing hook
function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return [path, navigate];
}

export default function ConsensusExplorer() {
  const [currentPath, navigate] = usePath();

  const [activeId, setActiveId] = useState("pow");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarTab, setSidebarTab] = useState("algorithms"); // "algorithms" | "cryptos"
  const [selectedCryptoId, setSelectedCryptoId] = useState(null);
  
  const [advancedFilters, setAdvancedFilters] = useState({
    permission: "all",
    finality: "all",
  });

  const handleAdvancedFilterChange = (filterKey, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  // Filter algorithms dynamically
  const filteredAlgorithms = useMemo(() => {
    let result = algorithms;

    // 1. Search Query
    // 1. Search Query (Matches algorithm properties OR mapped blockchain properties)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((a) => {
        const matchesAlgo =
          a.name.toLowerCase().includes(q) ||
          a.shortName.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.family.toLowerCase().includes(q);

        if (matchesAlgo) return true;

        // Match any blockchain mapping to this algorithm
        const matchingChains = chains.filter((c) => c.algo === a.id);
        return matchingChains.some(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.symbol.toLowerCase().includes(q)
        );
      });
    }

    // 2. Primary Filter Pills
    if (activeFilter !== "all") {
      if (activeFilter === "pow") {
        result = result.filter(
          (a) =>
            a.id === "pow" ||
            a.id === "proofOfCapacity" ||
            a.id === "proofOfBurn" ||
            a.id === "proofOfActivity" ||
            a.name.toLowerCase().includes("work")
        );
      } else if (activeFilter === "pos") {
        result = result.filter(
          (a) =>
            a.id === "pos" ||
            a.id === "dpos" ||
            a.id === "npos" ||
            a.id === "bpos" ||
            a.id === "ouroboros" ||
            a.name.toLowerCase().includes("stake")
        );
      } else if (activeFilter === "dag") {
        result = result.filter(
          (a) =>
            a.family.toLowerCase().includes("dag") ||
            a.id === "avalanche" ||
            a.id === "snowman" ||
            a.id === "snowball" ||
            a.id === "poh"
        );
      } else if (activeFilter === "bft") {
        result = result.filter(
          (a) =>
            a.family.toLowerCase().includes("bft") ||
            a.id === "pbft" ||
            a.id === "dbft" ||
            a.id === "tendermint" ||
            a.id === "ibft" ||
            a.id === "hotstuff"
        );
      } else if (activeFilter === "l1l2") {
        result = result.filter((a) => a.id === "pow" || a.id === "pos");
      }
    }

    // 3. Advanced Filters
    if (advancedFilters.permission !== "all") {
      result = result.filter(
        (a) =>
          a.permissionType &&
          a.permissionType.toLowerCase() === advancedFilters.permission.toLowerCase()
      );
    }

    if (advancedFilters.finality !== "all") {
      result = result.filter(
        (a) =>
          a.finalityType &&
          a.finalityType.toLowerCase().includes(advancedFilters.finality.toLowerCase())
      );
    }

    return result;
  }, [searchQuery, activeFilter, advancedFilters]);

  // Filter cryptocurrencies dynamically
  const filteredCryptos = useMemo(() => {
    let result = chains;

    // 1. Search Query (Matches blockchain properties OR consensus algorithm properties)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => {
        const matchesChain =
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q);

        if (matchesChain) return true;

        // Match blockchain's algorithm
        const algoObj = algorithms.find((a) => a.id === c.algo);
        return (
          algoObj &&
          (algoObj.name.toLowerCase().includes(q) ||
           algoObj.shortName.toLowerCase().includes(q) ||
           algoObj.tagline.toLowerCase().includes(q) ||
           algoObj.family.toLowerCase().includes(q))
        );
      });
    }

    // 2. Primary Filter Pills mapped to crypto's consensus type
    if (activeFilter !== "all") {
      if (activeFilter === "pow") {
        result = result.filter((c) => c.algo === "pow");
      } else if (activeFilter === "pos") {
        result = result.filter(
          (c) =>
            c.algo === "pos" ||
            c.algo === "dpos" ||
            c.algo === "npos" ||
            c.algo === "bpos" ||
            c.algo === "ouroboros"
        );
      } else if (activeFilter === "dag") {
        result = result.filter(
          (c) =>
            c.algo === "avalanche" ||
            c.algo === "snowman" ||
            c.algo === "snowball" ||
            c.algo === "poh"
        );
      } else if (activeFilter === "bft") {
        result = result.filter(
          (c) =>
            c.algo === "pbft" ||
            c.algo === "dbft" ||
            c.algo === "tendermint" ||
            c.algo === "ibft" ||
            c.algo === "hotstuff"
        );
      } else if (activeFilter === "l1l2") {
        result = result.filter((c) => c.algo === "pow" || c.algo === "pos");
      }
    }

    // 3. Advanced Filters
    if (advancedFilters.permission !== "all") {
      const matchesPermission = (c) => {
        const algoObj = algorithms.find((a) => a.id === c.algo);
        return (
          algoObj &&
          algoObj.permissionType &&
          algoObj.permissionType.toLowerCase() === advancedFilters.permission.toLowerCase()
        );
      };
      result = result.filter(matchesPermission);
    }

    if (advancedFilters.finality !== "all") {
      const matchesFinality = (c) => {
        const algoObj = algorithms.find((a) => a.id === c.algo);
        return (
          algoObj &&
          algoObj.finalityType &&
          algoObj.finalityType.toLowerCase().includes(advancedFilters.finality.toLowerCase())
        );
      };
      result = result.filter(matchesFinality);
    }

    return result;
  }, [searchQuery, activeFilter, advancedFilters]);

  // Adjust active algorithm to remain inside the filtered set if the old active selection is filtered out
  useEffect(() => {
    if (sidebarTab === "algorithms" && filteredAlgorithms.length > 0) {
      const activeExists = filteredAlgorithms.some((a) => a.id === activeId);
      if (!activeExists) {
        setActiveId(filteredAlgorithms[0].id);
        setSelectedCryptoId(null);
      }
    } else if (sidebarTab === "cryptos" && filteredCryptos.length > 0) {
      // If a crypto is selected, ensure it matches activeId. If not, auto-focus first crypto
      const activeCryptoExists = filteredCryptos.some((c) => c.id === selectedCryptoId);
      if (!activeCryptoExists) {
        setSelectedCryptoId(filteredCryptos[0].id);
        setActiveId(filteredCryptos[0].algo);
      }
    }
  }, [filteredAlgorithms, filteredCryptos, sidebarTab, activeId, selectedCryptoId]);

  const active = useMemo(() => algorithms.find((a) => a.id === activeId) || algorithms[0], [activeId]);
  const chainsForActive = useMemo(() => chains.filter((c) => c.algo === active.id), [active.id]);

  // Handle route matching (support root '/' vs '/explorer')
  const isExplorer = currentPath === "/explorer";

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* CSS vars per active algorithm */}
      <style>{`
        :root { --accent: ${active ? active.color : "#10B981"}; }
      `}</style>

      {/* Top Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Page Routing Switch */}
      <div className="flex-1 flex flex-col">
        {!isExplorer ? (
          // LANDING PAGE PATH: '/'
          <HeroSection navigate={navigate} />
        ) : (
          // EXPLORER PATH: '/explorer'
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 flex-1 flex flex-col">
            
            {/* Top Search & Filter Card (Sticky) */}
            <div className="sticky top-16 z-40 bg-[#08090C] pt-4 pb-4 border-b border-zinc-900/30 mb-6">
              <SearchFilterCard
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                advancedFilters={advancedFilters}
                onAdvancedFilterChange={handleAdvancedFilterChange}
              />
            </div>

            {/* Split Screen Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
              
              {/* Desktop Left Column Sidebar */}
              <aside className="hidden lg:flex flex-col bg-[#0D0F14]/75 border border-zinc-800/80 rounded-2xl p-4 sticky top-[180px] max-h-[calc(100vh-210px)] overflow-hidden">
                {/* Segmented Control Buttons */}
                <div className="flex bg-zinc-950/60 p-0.5 rounded-xl border border-zinc-900 mb-4 shrink-0">
                  <button
                    onClick={() => {
                      setSidebarTab("algorithms");
                      setSelectedCryptoId(null);
                    }}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      sidebarTab === "algorithms"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-550 hover:text-zinc-350"
                    }`}
                  >
                    Algorithms
                  </button>
                  <button
                    onClick={() => {
                      setSidebarTab("cryptos");
                    }}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      sidebarTab === "cryptos"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-550 hover:text-zinc-350"
                    }`}
                  >
                    Cryptos
                  </button>
                </div>

                {/* Vertical Scrollable List */}
                <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin pr-1">
                  {sidebarTab === "algorithms" ? (
                    filteredAlgorithms.map((a) => {
                      const isActive = a.id === active.id;
                      return (
                        <div
                          key={a.id}
                          onClick={() => {
                            setActiveId(a.id);
                            setSelectedCryptoId(null);
                          }}
                          className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 border-transparent bg-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
                          }`}
                          style={{
                            background: isActive ? `${a.color}12` : "",
                            borderColor: isActive ? `${a.color}35` : "",
                          }}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: a.color }}
                            />
                            <span
                              className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-zinc-900/60"
                              style={{ color: isActive ? a.color : "var(--text-3)" }}
                            >
                              <IconByName name={a.id} size={10} />
                            </span>
                            <span className="truncate">{a.shortName}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    filteredCryptos.map((c) => {
                      const isCryptoActive = selectedCryptoId === c.id;
                      const activeAlgo = algorithms.find((a) => a.id === c.algo);
                      const activeAlgoColor = activeAlgo ? activeAlgo.color : "#10B981";

                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            setActiveId(c.algo);
                            setSelectedCryptoId(c.id);
                          }}
                          className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            isCryptoActive
                              ? "text-white"
                              : "text-zinc-400 border-transparent bg-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
                          }`}
                          style={{
                            background: isCryptoActive ? `${activeAlgoColor}12` : "",
                            borderColor: isCryptoActive ? `${activeAlgoColor}35` : "",
                          }}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <CryptoIcon symbol={c.symbol} size={16} />
                            <span className="truncate">{c.name}</span>
                          </div>
                          <span
                            className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0"
                            style={{
                              borderColor: isCryptoActive ? `${activeAlgoColor}30` : "var(--border)",
                              color: isCryptoActive ? activeAlgoColor : "var(--text-3)",
                            }}
                          >
                            {c.layer}
                          </span>
                        </div>
                      );
                    })
                  )}

                  {((sidebarTab === "algorithms" && filteredAlgorithms.length === 0) ||
                    (sidebarTab === "cryptos" && filteredCryptos.length === 0)) && (
                    <div className="text-center py-8 text-zinc-500 text-xs">
                      No matching {sidebarTab}
                    </div>
                  )}
                </div>
              </aside>

              {/* Mobile Horizontal Selector (Sticky below search) */}
              <div className="block lg:hidden w-full overflow-hidden sticky top-[180px] z-30 bg-[#08090C] pt-2 pb-3 border-b border-zinc-900/30 mb-4">
                {/* Segmented Control Buttons */}
                <div className="flex bg-zinc-950/60 p-0.5 rounded-xl border border-zinc-900 mb-3">
                  <button
                    onClick={() => {
                      setSidebarTab("algorithms");
                      setSelectedCryptoId(null);
                    }}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      sidebarTab === "algorithms"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-550"
                    }`}
                  >
                    Algorithms
                  </button>
                  <button
                    onClick={() => {
                      setSidebarTab("cryptos");
                    }}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      sidebarTab === "cryptos"
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "text-zinc-550"
                    }`}
                  >
                    Cryptos
                  </button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none whitespace-nowrap">
                  {sidebarTab === "algorithms" ? (
                    filteredAlgorithms.map((a) => {
                      const isActive = a.id === active.id;
                      return (
                        <button
                          key={a.id}
                          onClick={() => {
                            setActiveId(a.id);
                            setSelectedCryptoId(null);
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 border-zinc-900 bg-zinc-950/40 hover:text-zinc-200"
                          }`}
                          style={{
                            background: isActive ? `${a.color}15` : "",
                            borderColor: isActive ? `${a.color}40` : "",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                          <span>{a.shortName}</span>
                        </button>
                      );
                    })
                  ) : (
                    filteredCryptos.map((c) => {
                      const isCryptoActive = selectedCryptoId === c.id;
                      const activeAlgo = algorithms.find((a) => a.id === c.algo);
                      const activeAlgoColor = activeAlgo ? activeAlgo.color : "#10B981";

                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setActiveId(c.algo);
                            setSelectedCryptoId(c.id);
                          }}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                            isCryptoActive
                              ? "text-white"
                              : "text-zinc-400 border-zinc-900 bg-zinc-950/40 hover:text-zinc-200"
                          }`}
                          style={{
                            background: isCryptoActive ? `${activeAlgoColor}15` : "",
                            borderColor: isCryptoActive ? `${activeAlgoColor}40` : "",
                          }}
                        >
                          <CryptoIcon symbol={c.symbol} size={13} />
                          <span>{c.name}</span>
                        </button>
                      );
                    })
                  )}

                  {((sidebarTab === "algorithms" && filteredAlgorithms.length === 0) ||
                    (sidebarTab === "cryptos" && filteredCryptos.length === 0)) && (
                    <span className="text-xs text-zinc-500">No matching {sidebarTab}</span>
                  )}
                </div>
              </div>

              {/* Workspace Right Column: Detail Content */}
              <main className="flex-1 min-w-0 flex flex-col">
                {((sidebarTab === "algorithms" && filteredAlgorithms.length === 0) ||
                  (sidebarTab === "cryptos" && filteredCryptos.length === 0)) ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0D0F14]/75 border border-zinc-800/80 rounded-2xl min-h-[400px]">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                      <Grid size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">No Matching Records</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mt-2">
                      No consensus protocols or chains matched your filter criteria. Try resetting your search query or filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("all");
                        setSidebarTab("algorithms");
                        setSelectedCryptoId(null);
                        setAdvancedFilters({ permission: "all", finality: "all" });
                      }}
                      className="mt-5 px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  /* Workspace Details */
                  <div className="space-y-6">
                    {/* Sticky Tabs Navigation */}
                    <div className="sticky top-[180px] z-30 bg-[#08090C] py-2 border-b border-zinc-900/40">
                      <nav className="flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
                        {TABS.map((t) => {
                          const isTabActive = activeTab === t.id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => setActiveTab(t.id)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                                isTabActive
                                  ? "text-white bg-[#0D0F14]"
                                  : "text-zinc-500 hover:text-zinc-350 border-transparent bg-transparent"
                              }`}
                              style={{
                                borderColor: isTabActive ? "var(--border)" : "transparent",
                              }}
                            >
                              {t.label}
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Tab Content Panel */}
                    <div className="bg-[#0D0F14]/40 border border-zinc-800/50 rounded-2xl p-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${active.id}-${activeTab}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                          {activeTab === "overview" && (
                            <div className="grid grid-cols-1 xl:grid-cols-[1fr_310px] gap-8 items-start">
                              <div className="space-y-8 min-w-0">
                                <AlgorithmOverview algorithm={active} />
                              </div>
                              <div className="space-y-6 shrink-0 xl:w-[310px]">
                                <TrilemmaScorecard algorithm={active} />
                              </div>
                              <div className="xl:col-span-2 space-y-8 min-w-0 border-t border-zinc-900/60 pt-6 mt-2">
                                <ChainMapping chains={chainsForActive} algorithm={active} />
                                <LanguagesSection chains={chainsForActive} algorithm={active} />
                                <LayerClassification chains={chainsForActive} algorithm={active} />
                              </div>
                            </div>
                          )}

                           {activeTab === "details" && (
                            <div className="w-full">
                              <HowItWorks algorithm={active} />
                            </div>
                          )}

                          {activeTab === "chains" && (
                            <div className="space-y-8">
                              <ChainMapping chains={chainsForActive} algorithm={active} />
                              <LanguagesSection chains={chainsForActive} algorithm={active} />
                              <LayerClassification chains={chainsForActive} algorithm={active} />
                            </div>
                          )}

                          {activeTab === "compatibility" && (
                            <CompatibilityMatrix allChains={chains} activeAlgorithm={active} />
                          )}

                          {activeTab === "compare" && (
                            <CompareSection activeAlgorithm={active} allAlgorithms={algorithms} />
                          )}

                          {activeTab === "reference" && (
                            <div className="space-y-10 w-full">
                              <GlossarySection />
                              <TimelineSection />
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </main>

            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
