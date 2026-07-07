import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Navbar({ currentPath, navigate }) {
  const isExplorer = currentPath === "/explorer";

  const headerClass = isExplorer
    ? "sticky top-0 z-50 w-full border-b border-zinc-900/40 bg-[#08090C]/95 backdrop-blur-sm"
    : "absolute top-0 left-0 w-full z-50 bg-transparent";

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-800 bg-zinc-900/40 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-lg bg-[#0D0F14] flex items-center justify-center">
              <svg className="w-4.5 h-4.5 text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" />
                <path d="M14 9a2.5 2.5 0 1 0 0 6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight text-white">Consensus Explorer</span>
            <span className="text-[10px] text-zinc-500 font-medium px-1.5 py-0.5 rounded bg-zinc-800/40 border border-zinc-700/30">Educational</span>
          </div>
        </div>

        {/* Right Side: Action Button */}
        <div>
          {isExplorer ? (
            <button
              onClick={() => navigate("/")}
              className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-zinc-350 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:bg-zinc-800/50 hover:border-zinc-700/80 transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <ArrowLeft size={13} className="mr-1.5 text-zinc-400 group-hover:-translate-x-0.5 transition-transform" />
              Take me back!
            </button>
          ) : (
            <button
              onClick={() => navigate("/explorer")}
              className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 rounded-lg transition-all duration-200 cursor-pointer shadow-sm group"
            >
              Go to explorer!
              <ArrowRight size={13} className="ml-1.5 text-white/70 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
