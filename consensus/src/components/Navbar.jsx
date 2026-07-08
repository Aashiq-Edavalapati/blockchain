import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Navbar({ currentPath, navigate }) {
  const isExplorer = currentPath === "/explorer";
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (isExplorer) return;
    const handleScroll = () => {
      // Background translucency toggle
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy tracking
      const sections = ["fundamentals", "architectures", "timeline"];
      let currentSection = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect if section occupies the active header scanline
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExplorer]);

  // Make navbar fixed across the entire app
  // In explorer it has solid black background. In landing page it transitions to blur glass when scrolled.
  const headerClass = isExplorer
    ? "fixed top-0 left-0 right-0 z-50 bg-[#000000] backdrop-blur-md transition-all duration-300"
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#000000]/80 backdrop-blur-lg py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
          : "bg-transparent py-4"
      }`;

  return (
    <header className={headerClass}>
      <div className="max-w-[1360px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.02] transition-all duration-500 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/[0.05]">
            <svg className="w-4.5 h-4.5 text-white/80 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z" />
              <path d="M14 9a2.5 2.5 0 1 0 0 6" />
            </svg>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[15px] font-bold tracking-widest uppercase font-mono text-white/90 group-hover:text-white transition-colors">
              Consensus
            </span>
          </div>
        </div>

        {/* Center: Navigation Pills (Landing Page Only) */}
        {!isExplorer && (
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/60 p-1 backdrop-blur-xl shadow-lg shadow-black/50">
            <button
              onClick={() => {
                const el = document.getElementById("fundamentals");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-4.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === "fundamentals"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Fundamentals
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("architectures");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-4.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === "architectures"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Families
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("timeline");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-4.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                activeSection === "timeline"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              Timeline
            </button>
          </div>
        )}

        {/* Right Side: Action Button */}
        <div>
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