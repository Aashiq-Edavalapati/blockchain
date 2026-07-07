import { Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  return (
    <header className="px-4 md:px-8 pt-6 pb-3 max-w-7xl mx-auto w-full flex items-center justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--text-3)" }}>
          Blockchain Protocol Reference
        </p>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight mt-0.5">
          Consensus Algorithm Explorer
        </h1>
        <p className="text-xs mt-1 max-w-xl leading-relaxed" style={{ color: "var(--text-2)" }}>
          Every chain trades off scalability, security, and decentralization — the blockchain trilemma.
          Select an algorithm from the sidebar to explore its design, chains, and trade-offs.
        </p>
      </div>
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg transition-colors"
        style={{ color: "var(--text-2)" }}
        aria-label="Toggle sidebar"
      >
        <Menu size={18} />
      </button>
    </header>
  );
}
