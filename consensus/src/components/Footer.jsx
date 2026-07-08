import { GitMerge } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/[0.06] bg-[#000000] overflow-hidden selection:bg-white/20 selection:text-white">
      {/* Subtle background glow to ground the page */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 py-12 flex flex-col gap-10">
        
        {/* Top Row: Status & Command Hint */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/[0.04] pb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-[#2FD98A] opacity-60"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2FD98A]"></span>
            </div>
            <span className="text-[11px] text-white/50 font-mono tracking-widest uppercase">
              Mainnet Synced
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2.5 text-[12px] text-white/40 font-mono">
            <span>Press</span>
            <div className="flex gap-1">
              <kbd className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-md border border-white/10 bg-white/[0.03] text-white/70 shadow-[0_2px_0_rgba(255,255,255,0.05)]">⌘</kbd>
              <kbd className="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-md border border-white/10 bg-white/[0.03] text-white/70 shadow-[0_2px_0_rgba(255,255,255,0.05)]">K</kbd>
            </div>
            <span>to open command palette</span>
          </div>
        </div>

        {/* Middle Row: Content & Navigation Matrix */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Brand & Disclaimer */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer w-fit">
              <div className="w-6 h-6 rounded bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <GitMerge size={12} className="text-white/60 group-hover:text-black transition-colors" />
              </div>
              <span className="text-[14px] font-medium text-white/90 group-hover:text-white transition-colors">
                Consensus Explorer
              </span>
            </div>
            <p className="text-[13px] text-[#888] font-light leading-relaxed">
              Scores are illustrative, relative comparisons for teaching the trilemma trade-off — not precise benchmarks. Real-world figures shift dynamically as protocols upgrade and chains fork.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20">
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-mono tracking-widest text-white/30 uppercase mb-1">Architecture</h4>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Algorithms</a>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Trilemma Data</a>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Network States</a>
            </div>
            
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-mono tracking-widest text-white/30 uppercase mb-1">Resources</h4>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Whitepapers</a>
              <a href="#" className="text-[13px] text-white/60 hover:text-white transition-colors">Glossary</a>
            </div>

            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] font-mono tracking-widest text-white/30 uppercase mb-1">Project</h4>
              <a href="https://github.com/Aashiq-Edavalapati" target="_blank" rel="noopener noreferrer" className="group text-[13px] text-white/60 hover:text-white flex items-center gap-2.5 transition-colors">
                <img 
                  src="https://skillicons.dev/icons?i=github&theme=dark" 
                  alt="GitHub" 
                  className="w-4 h-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                />
                Source Code
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Meta & Versioning */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 mt-4 border-t border-white/[0.04] text-[11px] font-mono text-white/30 tracking-widest">
          <span>© {new Date().getFullYear()} Open Source Educational Tool</span>
          
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-1.5 hover:text-white/60 transition-colors cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              All systems operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}