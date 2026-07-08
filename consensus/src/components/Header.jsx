import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Navbar({ currentPath, navigate }) {
  const isExplorer = currentPath === "/explorer";

  const headerClass = isExplorer
    ? "sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#000000]/90 backdrop-blur-md"
    : "fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#000000]/90 to-transparent backdrop-blur-[2px]"; 

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className={headerClass}>
      {/* CHANGED: Using a 3-column Grid instead of Flexbox. 
        This guarantees the left, center, and right sections have dedicated, un-collapsible zones.
        On mobile (< 768px), it drops to 2 columns and hides the center pill gracefully.
      */}
      <div className="max-w-[1360px] mx-auto px-6 h-24 grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Left Side: Logo */}
        <div 
          className="flex items-center gap-4 cursor-pointer group justify-self-start z-20"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/[0.05]">
            <svg className="w-4.5 h-4.5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" />
              <path d="M14 9a2.5 2.5 0 1 0 0 6" />
            </svg>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[16px] font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">
              Consensus Explorer
            </span>
            <span className="hidden lg:inline-block text-[10px] text-white/40 font-mono px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] uppercase tracking-widest">
              Educational
            </span>
          </div>
        </div>

        {/* Center Side: Navigation Pill (Landing Page Only) */}
        <div className="hidden md:flex justify-center items-center z-10">
          {!isExplorer && (
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.12] bg-[#050505]/80 backdrop-blur-xl shadow-2xl">
              {[
                { label: "Fundamentals", id: "fundamentals" },
                { label: "Architectures", id: "architectures" },
                { label: "Index", id: "index" },
                { label: "Timeline", id: "timeline" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-1.5 text-[12px] font-medium text-white/50 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Action Button */}
        <div className="flex justify-end z-20">
          {isExplorer ? (
            <button
              onClick={() => navigate("/")}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium text-white/60 bg-transparent border border-white/[0.12] rounded-full hover:bg-white/[0.05] hover:text-white hover:border-white/[0.2] transition-all duration-300 cursor-pointer group"
            >
              <ArrowLeft size={14} className="mr-2 text-white/40 group-hover:-translate-x-1 group-hover:text-white transition-all duration-300" />
              Take me back
            </button>
          ) : (
            <button
              onClick={() => navigate("/explorer")}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-medium text-black bg-white rounded-full hover:scale-[0.98] hover:bg-[#ebebeb] active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              Go to explorer
              <ArrowRight size={14} className="ml-2 text-black/60 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}